// 分享模态框组件 - 模仿酷狗音乐分享功能
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaWeixin, 
  FaQq, 
  FaWeibo, 
  FaQrcode,
  FaCopy,

} from 'react-icons/fa';
import { MusicInfo } from '../types/music';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  music: MusicInfo;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, music }) => {
  const shareUrl = `${window.location.origin}/share/${music.id}`;
  
  const shareOptions = [
    {
      name: '微信',
      icon: FaWeixin,
      color: '#07C160',
      action: () => {
        // 微信分享逻辑
        console.log('分享到微信');
      }
    },
    {
      name: 'QQ',
      icon: FaQq,
      color: '#12B7F5',
      action: () => {
        // QQ分享逻辑
        console.log('分享到QQ');
      }
    },
    {
      name: '微博',
      icon: FaWeibo,
      color: '#E6162D',
      action: () => {
        // 微博分享逻辑
        const text = `我正在听《${music.title}》- ${music.artist}，快来一起听吧！`;
        const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: '复制链接',
      icon: FaCopy,
      color: '#666',
      action: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          alert('链接已复制到剪贴板');
        } catch (err) {
          console.error('复制失败:', err);
        }
      }
    }
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-white rounded-t-3xl p-6 shadow-2xl"
          >
            {/* 关闭按钮 */}
            <div className="flex justify-end mb-4">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FaTimes className="text-gray-600" />
              </button>
            </div>

            {/* 音乐信息 */}
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
              <img
                src={music.coverUrl}
                alt={music.title}
                className="w-16 h-16 rounded-lg object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 truncate">
                  {music.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {music.artist}
                </p>
              </div>
            </div>

            {/* 分享选项 */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {shareOptions.map((option) => (
                <motion.button
                  key={option.name}
                  onClick={option.action}
                  className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                    style={{ backgroundColor: option.color }}
                  >
                    <option.icon className="text-white text-xl" />
                  </div>
                  <span className="text-xs text-gray-700">{option.name}</span>
                </motion.button>
              ))}
            </div>

            {/* 分享链接 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分享链接
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                />
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(shareUrl);
                      alert('链接已复制');
                    } catch (err) {
                      console.error('复制失败:', err);
                    }
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
                >
                  <FaCopy className="text-sm" />
                </button>
              </div>
            </div>

            {/* 二维码 */}
            <div className="text-center">
              <div className="inline-block p-4 bg-gray-50 rounded-2xl">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <FaQrcode className="text-4xl text-gray-400" />
                </div>
                <p className="text-xs text-gray-600">扫码分享</p>
              </div>
            </div>

            {/* 底部安全区域 */}
            <div className="h-4" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
