// 主应用组件 - 音乐分享页面
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import ShareModal from './components/ShareModal';
import { getRandomMusic } from './data/mockData';
import { MusicInfo } from './types/music';
import { openApp, melonAppConfig } from './utils/appLauncher';

function App() {
  const [currentMusic] = useState<MusicInfo>(getRandomMusic());
  const [showShareModal, setShowShareModal] = useState(false);

  // 打开Melon APP
  const openMelonApp = () => {
    // 使用APP启动器工具打开Melon APP
    openApp(melonAppConfig);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">  

      {/* 导航栏 */}
      <div className="bg-white px-4 py-2">
        <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                           <img 
                src="/musishare/images/logos/logo.png"
                alt="Logo"
                className="w-8 h-8"
              />
             <div className="flex flex-col">
               <span className="text-black font-semibold text-lg">Melon</span>
               <span className="text-gray-400 text-xs">MELON SLOGAN</span>
             </div>
           </div>
          <button className="bg-primary text-white px-4 py-1 rounded-lg text-sm" onClick={openMelonApp}>
            立即体验
          </button>
        </div>
        
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* 专辑封面区域 */}
        <div className="relative mb-8">
          <div className="w-40 h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
              <FaPlay className="text-white text-lg" />
            </div>
          </div>
        </div>

        {/* 音乐信息 */}
        <div className="text-center mb-8">
          <h2 className="text-white text-xl font-bold mb-2">
            {currentMusic.title} - {currentMusic.artist}
          </h2>
          <p className="text-gray-400 text-sm">{currentMusic.album}</p>
        </div>

                 {/* 歌词预览 */}
         <div className="w-full max-w-sm text-center mb-8">
           <div className="bg-gray-900/50 rounded-lg p-4 max-h-48 overflow-y-auto custom-scrollbar">
             <p className="text-white text-sm leading-relaxed">
               {currentMusic.lyrics ? 
                 currentMusic.lyrics.slice(0, 8).map((line: any, index) => (
                   <span key={index} className="block mb-2">
                     {typeof line === 'string' ? line : line.text}
                   </span>
                 )) : '暂无歌词'}
             </p>
           </div>
         </div>

      </div>

      {/* 底部按钮区域 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent h-60 flex items-end justify-center pb-8">
        <div className="flex space-x-4 w-full max-w-sm px-6">
          <button 
            className="flex-1 bg-transparent border border-primary text-white py-3 rounded-xl font-medium text-base"
            onClick={() => {
              // 下载APP逻辑
              console.log('下载APP');
            }}
          >
            Download APP
          </button>
          <button 
            className="flex-1 bg-primary text-black py-3 rounded-xl font-medium text-base"
            onClick={() => {
              // 打开Melon APP逻辑
              openMelonApp();
            }}
          >
            Open Melon
          </button>
        </div>
      </div>

      {/* 分享模态框 */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        music={currentMusic}
      />
    </div>
  );
}

export default App;
