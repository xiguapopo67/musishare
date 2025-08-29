import { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { Howl } from 'howler';
import { MusicInfo } from '../types/music';

export interface PlayState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoop: boolean;
  isMuted: boolean;
}

export interface MusicPlayerControls {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleLoop: () => void;
  formatTime: (time: number) => string;
}

export const useMusicPlayer = (music?: MusicInfo) => {
  const [playState, setPlayState] = useState<PlayState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isLoop: false,
    isMuted: false
  });

  const soundRef = useRef<Howl | null>(null);
  const intervalRef = useRef<number | null>(null);

  // 初始化音频
  useEffect(() => {
    if (music?.audioUrl) {
      // 停止当前播放的音频
      if (soundRef.current) {
        soundRef.current.stop();
      }

      // 创建新的音频实例
      soundRef.current = new Howl({
        src: [music.audioUrl],
        html5: true,
        volume: playState.volume,
        loop: playState.isLoop,
        onload: () => {
          setPlayState(prev => ({
            ...prev,
            duration: soundRef.current?.duration() || 0
          }));
        },
        onplay: () => {
          setPlayState(prev => ({ ...prev, isPlaying: true }));
          startProgressTracking();
        },
        onpause: () => {
          setPlayState(prev => ({ ...prev, isPlaying: false }));
          stopProgressTracking();
        },
        onstop: () => {
          setPlayState(prev => ({ 
            ...prev, 
            isPlaying: false, 
            currentTime: 0 
          }));
          stopProgressTracking();
        },
        onend: () => {
          setPlayState(prev => ({ ...prev, isPlaying: false }));
          stopProgressTracking();
        }
      });
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
      stopProgressTracking();
    };
  }, [music?.audioUrl]);

  // 开始进度跟踪
  const startProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      if (soundRef.current && playState.isPlaying) {
        setPlayState(prev => ({
          ...prev,
          currentTime: soundRef.current?.seek() || 0
        }));
      }
    }, 100);
  };

  // 停止进度跟踪
  const stopProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 播放控制
  const play = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const pause = () => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  };

  const seek = (time: number) => {
    if (soundRef.current) {
      soundRef.current.seek(time);
      setPlayState(prev => ({ ...prev, currentTime: time }));
    }
  };

  const setVolume = (volume: number) => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
      setPlayState(prev => ({ ...prev, volume }));
    }
  };

  const toggleMute = () => {
    if (soundRef.current) {
      const newMuted = !playState.isMuted;
      soundRef.current.mute(newMuted);
      setPlayState(prev => ({ ...prev, isMuted: newMuted }));
    }
  };

  const toggleLoop = () => {
    if (soundRef.current) {
      const newLoop = !playState.isLoop;
      soundRef.current.loop(newLoop);
      setPlayState(prev => ({ ...prev, isLoop: newLoop }));
    }
  };

  // 格式化时间
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    playState,
    play,
    pause,
    seek,
    setVolume,
    toggleMute,
    toggleLoop,
    formatTime
  };
};
