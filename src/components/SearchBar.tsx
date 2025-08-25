// 搜索栏组件 - 支持音乐搜索功能
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaMicrophone } from 'react-icons/fa';
import { MusicInfo } from '../types/music';

interface SearchBarProps {
  onSearch: (results: MusicInfo[]) => void;
  onClear: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onClear, 
  placeholder = "搜索音乐、歌手、专辑..." 
}) => {
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 处理搜索
  const handleSearch = async () => {
    if (!keyword.trim()) {
      onClear();
      return;
    }

    setIsSearching(true);
    try {
      // 这里可以调用实际的搜索API
      // const results = await MusicApiService.searchMusic(keyword);
      // onSearch(results);
      
      // 模拟搜索结果
      await new Promise(resolve => setTimeout(resolve, 500));
      onSearch([]);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    
    if (!value.trim()) {
      onClear();
    }
  };

  // 处理回车搜索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 清空搜索
  const handleClear = () => {
    setKeyword('');
    onClear();
    inputRef.current?.focus();
  };

  // 语音搜索（模拟）
  const handleVoiceSearch = () => {
    setShowVoice(true);
    // 模拟语音识别
    setTimeout(() => {
      setShowVoice(false);
      const mockVoiceResult = '起风了';
      setKeyword(mockVoiceResult);
      // 这里可以触发搜索
    }, 2000);
  };

  // 自动聚焦
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto mb-6"
    >
      <div className="relative">
        {/* 搜索输入框 */}
        <div className="relative flex items-center">
          <div className="absolute left-4 text-white/60">
            <FaSearch className="text-sm" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
          
          {/* 清空按钮 */}
          <AnimatePresence>
            {keyword && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClear}
                className="absolute right-16 p-1 text-white/60 hover:text-white transition-colors"
              >
                <FaTimes className="text-sm" />
              </motion.button>
            )}
          </AnimatePresence>
          
          {/* 语音搜索按钮 */}
          <motion.button
            onClick={handleVoiceSearch}
            className={`absolute right-4 p-2 rounded-full transition-all duration-300 ${
              showVoice 
                ? 'bg-red-500 text-white' 
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaMicrophone className="text-sm" />
          </motion.button>
        </div>

        {/* 搜索状态指示器 */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 text-center"
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white/80 text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/60 border-t-transparent mr-2"></div>
                搜索中...
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 语音搜索状态 */}
        <AnimatePresence>
          {showVoice && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
            >
              <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                正在听...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 搜索建议（可以扩展） */}
      {keyword && !isSearching && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center"
        >
          <p className="text-white/60 text-xs">
            按回车键搜索 "{keyword}"
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;
