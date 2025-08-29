// 音乐播放器组件 - 模仿酷狗音乐播放器样式
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, 
  FaPause, 
  FaStepForward, 
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaRedo,
  FaRandom,
  FaHeart,
  FaShare,
  FaList
} from 'react-icons/fa';
import { MusicInfo } from '../types/music';
import { useMusicPlayer } from '../hooks/useMusicPlayer';

interface MusicPlayerProps {
  music: MusicInfo;
  onNext?: () => void;
  onPrev?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onShowPlaylist?: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  music,
  onNext,
  onPrev,
  onLike,
  onShare,
  onShowPlaylist
}) => {
  const {
    playState,
    play,
    pause,
    seek,
    setVolume,

    toggleLoop,
    formatTime
  } = useMusicPlayer(music);

  const [showVolume, setShowVolume] = useState(false);
  const [isLiked, setIsLiked] = useState(false);



  // 处理进度条点击
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * playState.duration;
    seek(newTime);
  };

  // 处理音量调节
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
  };

  // 处理喜欢按钮
  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl"
    >
      {/* 专辑封面 */}
      <div className="relative mb-6">
        <motion.div
          className="w-64 h-64 mx-auto rounded-full overflow-hidden shadow-2xl"
          animate={{ 
            rotate: playState.isPlaying ? 360 : 0 
          }}
          transition={{ 
            duration: 3, 
            repeat: playState.isPlaying ? Infinity : 0,
            ease: "linear"
          }}
        >
          <img
            src={music.coverUrl}
            alt={music.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* 播放状态指示器 */}
        <AnimatePresence>
          {playState.isPlaying && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 rounded-full border-4 border-primary/30 pulse-glow"
            />
          )}
        </AnimatePresence>
      </div>

      {/* 音乐信息 */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2 truncate">
          {music.title}
        </h2>
        <p className="text-white/80 text-sm mb-1">
          {music.artist}
        </p>
        <p className="text-white/60 text-xs">
          {music.album}
        </p>
      </div>

      {/* 进度条 */}
      <div className="mb-6">
        <div
          className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative"
          onClick={handleProgressClick}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
            style={{ width: `${(playState.currentTime / playState.duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
          </motion.div>
        </div>
        <div className="flex justify-between text-white/60 text-xs mt-2">
          <span>{formatTime(playState.currentTime)}</span>
          <span>{formatTime(playState.duration)}</span>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        <button
          onClick={onPrev}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <FaStepBackward className="text-white text-lg" />
        </button>

        <motion.button
                      onClick={playState.isPlaying ? pause : play}
          className="p-4 rounded-full bg-primary hover:bg-primary/80 transition-colors shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {playState.isPlaying ? (
            <FaPause className="text-white text-xl" />
          ) : (
            <FaPlay className="text-white text-xl ml-1" />
          )}
        </motion.button>

        <button
          onClick={onNext}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <FaStepForward className="text-white text-lg" />
        </button>
      </div>

      {/* 功能按钮 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* 音量控制 */}
          <div className="relative">
            <button
              onClick={() => setShowVolume(!showVolume)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {playState.isMuted ? (
                <FaVolumeMute className="text-white" />
              ) : (
                <FaVolumeUp className="text-white" />
              )}
            </button>
            
            <AnimatePresence>
              {showVolume && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-black/80 rounded-lg"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={playState.volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #1db954 0%, #1db954 ${playState.volume * 100}%, rgba(255,255,255,0.2) ${playState.volume * 100}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 循环播放 */}
          <button
            onClick={toggleLoop}
            className={`p-2 rounded-full transition-colors ${
              playState.isLoop 
                ? 'bg-primary text-white' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FaRedo className="text-sm" />
          </button>

          {/* 随机播放 */}
          <button
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <FaRandom className="text-sm" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* 喜欢 */}
          <motion.button
            onClick={handleLike}
            className={`p-2 rounded-full transition-colors ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart className="text-sm" />
          </motion.button>

          {/* 分享 */}
          <button
            onClick={onShare}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <FaShare className="text-sm" />
          </button>

          {/* 播放列表 */}
          <button
            onClick={onShowPlaylist}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <FaList className="text-sm" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
