// 歌词显示组件 - 支持滚动高亮显示
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LyricsLine {
  time: number;
  text: string;
}

interface LyricsDisplayProps {
  lyrics: LyricsLine[];
  currentTime: number;
  isVisible: boolean;
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ 
  lyrics, 
  currentTime, 
  isVisible 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  // 找到当前应该高亮的歌词行
  const getCurrentLineIndex = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        return i;
      }
    }
    return 0;
  };

  const currentLineIndex = getCurrentLineIndex();

  // 滚动到当前歌词行
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeLine = activeLineRef.current;
      const containerHeight = container.clientHeight;
      const lineTop = activeLine.offsetTop;
      const lineHeight = activeLine.clientHeight;
      
      const scrollTop = lineTop - containerHeight / 2 + lineHeight / 2;
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }, [currentLineIndex]);

  if (!isVisible || lyrics.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
    >
      <h3 className="text-white font-semibold mb-4 text-center">歌词</h3>
      
      <div 
        ref={containerRef}
        className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
      >
        <div className="space-y-3">
          {lyrics.map((line, index) => {
            const isActive = index === currentLineIndex;
            
            return (
              <motion.div
                key={index}
                ref={isActive ? activeLineRef : null}
                className={`text-center transition-all duration-300 ${
                  isActive 
                    ? 'text-white text-lg font-semibold' 
                    : 'text-white/60 text-sm'
                }`}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  opacity: isActive ? 1 : 0.6
                }}
              >
                {line.text}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default LyricsDisplay;
