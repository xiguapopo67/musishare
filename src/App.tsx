// 主应用组件 - 音乐分享页面
import { useState, useMemo, useEffect, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import ShareModal from './components/ShareModal';
import { getRandomMusic } from './data/mockData';
import { MusicInfo } from './types/music';
import { openApp, melonAppConfig } from './utils/appLauncher';

// 歌词行类型
type LyricLine = {
  startTime: number;
  endTime: number;
  text: string;
}

// 音乐数据类型
type Music = {
  id: number;
  url: string;
  cover: string;
  title: string;
  lyrics: string | LyricLine[];
  genres: string[];
}

function App() {
  const [currentMusic] = useState<MusicInfo>(getRandomMusic());
  const [showShareModal, setShowShareModal] = useState(false);
  const [musicInfo, setMusicInfo] = useState<Music>({
    id: 0,
    url: '',
    cover: '',
    title: '',
    lyrics: '',
    genres: []
  });

  // 音频播放相关状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  // 引用
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const currentLyricRef = useRef<HTMLDivElement>(null);
  const scrollHeight = useRef(0);

  // 秒数转换
  const timeToSec = (t: string) => {
    const [min, sec] = t.split(":").map(Number);
    return min * 60 + sec;
  };



  // 解析歌词数据
  const lyricArr = useMemo((): LyricLine[] => {
    if (!musicInfo.lyrics) return [];

    let lyricsData: any[];

    // 如果是字符串，尝试解析JSON
    if (typeof musicInfo.lyrics === 'string') {
      try {
        lyricsData = JSON.parse(musicInfo.lyrics);
      } catch (error) {
        console.error('解析歌词JSON失败:', error);
        return [];
      }
    } else {
      lyricsData = musicInfo.lyrics;
    }

    // 确保是数组格式
    if (Array.isArray(lyricsData)) {
      return lyricsData
        .map((item: any) => {
          // 检查是否是有效的歌词行格式
          if (item && typeof item === 'object' && 'startTime' in item && 'endTime' in item && 'text' in item) {
            return {
              startTime: item.startTime,
              endTime: item.endTime,
              text: item.text,
            };
          }
          // 兼容数组格式 [startTime, endTime, text]
          if (Array.isArray(item) && item.length >= 3) {
            const [startTime, endTime, text] = item;
            return {
              startTime: typeof startTime === 'string' ? timeToSec(startTime) : startTime,
              endTime: typeof endTime === 'string' ? timeToSec(endTime) : endTime,
              text: text,
            };
          }
          return null;
        })
        .filter((item): item is LyricLine => item !== null);
    }

    return [];
  }, [musicInfo.lyrics]);

  // 从URL参数获取音乐数据
  const getMusicDataFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const musicDataStr = urlParams.get('musicData');

    if (musicDataStr) {
      try {
        return JSON.parse(musicDataStr);
      } catch (error) {
        console.error('解析音乐数据失败:', error);
      }
    }

    // 如果没有musicData参数，尝试从其他参数构建
    const musicData = {
      id: Number(urlParams.get('workId')) || 0,
      title: urlParams.get('workTitle') || '',
      cover: urlParams.get('workCover') || '',
      url: urlParams.get('workUrl') || '',
      genres: urlParams.get('workGenres')?.split(',') || [],
      lyrics: urlParams.get('workLyrics') || '',
    };

    setMusicInfo(musicData);
    return musicData;
  };

  // 音频事件处理
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    // 音频元数据加载完成
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentLyricIndex(-1);
  };

  // 播放/暂停切换
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 歌词滚动逻辑 - 轮播方式
  useEffect(() => {
    if (lyricArr.length === 0) return;

    // 找到当前应该高亮的歌词
    let currentIndex = -1;

    // 如果时间还没到第一句歌词，不显示任何高亮
    if (currentTime < lyricArr[0].startTime) {
      currentIndex = -1;
    } else {
      // 找到当前时间对应的歌词
      for (let i = 0; i < lyricArr.length; i++) {
        const lyric = lyricArr[i];
        const nextLyric = lyricArr[i + 1];

        if (nextLyric) {
          // 如果当前时间在这个歌词的时间范围内
          if (currentTime >= lyric.startTime && currentTime < nextLyric.startTime) {
            currentIndex = i;
            break;
          }
        } else {
          // 最后一句歌词
          if (currentTime >= lyric.startTime) {
            currentIndex = i;
            break;
          }
        }
      }
    }

    if (currentIndex !== currentLyricIndex) {
      setCurrentLyricIndex(currentIndex);

      // 轮播方式滚动到当前歌词
      if (currentIndex >= 0 && currentLyricRef.current && lyricsContainerRef.current) {
        const container = lyricsContainerRef.current;
        const currentElement = currentLyricRef.current;

        // 计算滚动位置 - 轮播效果
        const elementHeight = currentElement.clientHeight;

        // 计算目标滚动位置，让当前歌词显示在容器中间
        container.scrollTo({
          top: scrollHeight.current + elementHeight + 10,
          behavior: 'smooth'
        });
        scrollHeight.current = scrollHeight.current + elementHeight + 10;
      }
    }
  }, [currentTime, lyricArr, currentLyricIndex]);

  // 初始化音乐数据
  useEffect(() => {
    const musicData = getMusicDataFromUrl();
    console.log('音乐数据:', musicData);

    // 如果没有URL参数，使用默认的测试数据
    if (!musicData.url) {
      setMusicInfo({
        id: 1,
        title: '测试歌曲',
        cover: '',
        url: 'https://cdn.mureka.cn/cos-prod/open/song/20250818/85320288698369-BcUnw88rH9HmRhmPJNX8ve.mp3',
        genres: [],
        lyrics: [
          {
            "startTime": 31.16,
            "endTime": 37.52,
            "text": "老照片里是你我笑颜如花"
          },
          {
            "startTime": 38.08,
            "endTime": 45.36,
            "text": "旧书信里藏着思念无价"
          },
          {
            "startTime": 45.92,
            "endTime": 50,
            "text": "熟悉的味道飘过每个角落"
          },
          {
            "startTime": 51.44,
            "endTime": 56.88,
            "text": "那些日子温暖又甜蜜"
          },
          {
            "startTime": 61.64,
            "endTime": 68.12,
            "text": "时光匆匆带走多少记忆"
          },
          {
            "startTime": 68.76,
            "endTime": 75.72,
            "text": "心中留下的只有温柔"
          },
          {
            "startTime": 76.12,
            "endTime": 81.04,
            "text": "回忆里的你我未曾离去"
          },
          {
            "startTime": 81.6,
            "endTime": 87.8,
            "text": "在每个梦里轻轻低语"
          },
          {
            "startTime": 90.68,
            "endTime": 98.8,
            "text": "夕阳下我们曾许下诺言"
          },
          {
            "startTime": 100,
            "endTime": 103.32,
            "text": "如今只剩下风中的誓言"
          },
          {
            "startTime": 106.4,
            "endTime": 113.28,
            "text": "那些温暖的时光不遥远"
          },
          {
            "startTime": 113.96,
            "endTime": 118.76,
            "text": "只是藏在心底最柔软"
          },
          {
            "startTime": 137.8,
            "endTime": 144.28,
            "text": "熟悉的街角有我们笑声"
          },
          {
            "startTime": 145,
            "endTime": 151.8,
            "text": "如今只剩雨后的空巷"
          },
          {
            "startTime": 152.32,
            "endTime": 159.72,
            "text": "每一片落叶都藏着故事"
          },
          {
            "startTime": 160.2,
            "endTime": 164.48,
            "text": "每一道晚霞都是过往"
          },
          {
            "startTime": 167.32,
            "endTime": 172.32,
            "text": "那些年的梦想如今何方"
          },
          {
            "startTime": 174.24,
            "endTime": 180,
            "text": "是否还记得最初的向往"
          },
          {
            "startTime": 182.08,
            "endTime": 189.88,
            "text": "虽然时光带走了模样"
          },
          {
            "startTime": 190.2,
            "endTime": 196.84,
            "text": "那份纯真却永远难忘"
          },
          {
            "startTime": 197.8,
            "endTime": 204.64,
            "text": "温暖的回忆照亮夜晚"
          },
          {
            "startTime": 205.44,
            "endTime": 212.32,
            "text": "即使孤单也不再害怕"
          },
          {
            "startTime": 213.08,
            "endTime": 219.96,
            "text": "那些过去的日子多美好"
          },
          {
            "startTime": 220.92,
            "endTime": 224.6,
            "text": "心中有爱就不再彷徨"
          }
        ]
      });
    }
  }, []);

  // 打开Melon APP
  const openMelonApp = () => {
    openApp(melonAppConfig);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 音频播放器 */}
      <audio
        ref={audioRef}
        src={musicInfo.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

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
          <div
            className="w-40 h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage: musicInfo.cover ? `url(${musicInfo.cover})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* 添加半透明遮罩层，确保播放按钮可见 */}
            <div className="absolute inset-0 bg-black/30 rounded-full"></div>

            {/* 播放按钮 */}
            <div className="relative z-10">
              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300"
              >
                {isPlaying ?
                  <FaPause className="text-white text-lg" /> :
                  <FaPlay className="text-white text-lg ml-1" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* 音乐信息 */}
        <div className="text-center mb-8">
          <h2 className="text-white text-xl font-bold mb-2">
            {musicInfo.title}
          </h2>
          <p className="text-gray-400 text-sm">{musicInfo.genres?.join(',')}</p>
        </div>

        {/* 歌词轮播播放 */}
        <div className="w-full h-full max-w-sm text-center mb-8">
          <div
            ref={lyricsContainerRef}
            className="rounded-lg p-4 max-h-48 overflow-y-auto custom-scrollbar"
            style={{
              scrollBehavior: 'auto', // 禁用默认滚动行为，使用自定义动画
              scrollbarWidth: 'none', // 隐藏滚动条
              msOverflowStyle: 'none' // IE隐藏滚动条
            }}
          >
            <div className="space-y-4">
              {/* 顶部空白区域 */}
              <div className="h-24"></div>

              {lyricArr.length > 0 ?
                lyricArr.map((line, index) => (
                  <div
                    key={index}
                    ref={index === currentLyricIndex ? currentLyricRef : null}
                    className={`transition-all duration-500 ease-in-out transform ${index === currentLyricIndex
                      ? 'text-primary text-xl font-bold scale-110'
                      : index === currentLyricIndex - 1 || index === currentLyricIndex + 1
                        ? 'text-gray-300 text-base'
                        : 'text-gray-500 text-sm opacity-60'
                      }`}
                    style={{
                      transform: index === currentLyricIndex ? 'scale(1.1)' : 'scale(1)',
                      filter: index === currentLyricIndex ? 'drop-shadow(0 0 8px rgba(255, 165, 0, 0.5))' : 'none'
                    }}
                  >
                    {line.text}
                  </div>
                )) : (
                  <div className="text-gray-400 text-sm">暂无歌词</div>
                )
              }

              {/* 底部空白区域 */}
              <div className="h-24"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部按钮区域 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent h-60 flex items-end justify-center pb-8">
        <div className="flex space-x-4 w-full max-w-sm px-6">
          <button
            className="flex-1 bg-transparent border border-primary text-white py-3 rounded-xl font-medium text-base"
            onClick={() => {
              console.log('下载APP');
            }}
          >
            Download APP
          </button>
          <button
            className="flex-1 bg-primary text-black py-3 rounded-xl font-medium text-base"
            onClick={() => {
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