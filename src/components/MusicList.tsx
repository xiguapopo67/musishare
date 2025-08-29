// 音乐列表组件 - 展示所有可播放的音乐
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaHeart, FaShare, FaEye } from 'react-icons/fa';
import { MusicInfo } from '../types/music';

interface MusicListProps {
  musicList: MusicInfo[];
  currentMusic: MusicInfo;
  onSelectMusic: (music: MusicInfo) => void;
  onLike: (music: MusicInfo) => void;
  onShare: (music: MusicInfo) => void;
  isVisible: boolean;
}

const MusicList: React.FC<MusicListProps> = ({
  musicList,
  currentMusic,
  onSelectMusic,
  onLike,
  onShare,
  isVisible
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
    >
      <h3 className="text-white font-semibold mb-4 text-center">播放列表</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {musicList.map((music, index) => {
            const isCurrent = music.id === currentMusic.id;
            
            return (
              <motion.div
                key={music.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                  isCurrent 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => onSelectMusic(music)}
              >
                {/* 专辑封面 */}
                <div className="relative mr-3">
                  <img
                    src={music.coverUrl}
                    alt={music.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <FaPlay className="text-white text-sm" />
                    </motion.div>
                  )}
                </div>

                {/* 音乐信息 */}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium truncate ${
                    isCurrent ? 'text-primary' : 'text-white'
                  }`}>
                    {music.title}
                  </h4>
                  <p className="text-white/60 text-xs truncate">
                    {music.artist} - {music.album}
                  </p>
                  <div className="flex items-center mt-1 space-x-3 text-xs text-white/40">
                    <span className="flex items-center">
                      <FaEye className="mr-1" />
                      {music.playCount?.toLocaleString() || '0'}
                    </span>
                    <span className="flex items-center">
                      <FaHeart className="mr-1" />
                      {music.likeCount?.toLocaleString() || '0'}
                    </span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike(music);
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaHeart className="text-white text-xs" />
                  </motion.button>
                  
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(music);
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaShare className="text-white text-xs" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 底部统计 */}
      <div className="mt-4 pt-4 border-t border-white/10 text-center">
        <p className="text-white/60 text-xs">
          共 {musicList.length} 首歌曲
        </p>
      </div>
    </motion.div>
  );
};

export default MusicList;
