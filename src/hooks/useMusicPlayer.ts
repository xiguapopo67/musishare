import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { MusicInfo, PlayState } from '../types/music';

export const useMusicPlayer = () => {
  const [currentMusic, setCurrentMusic] = useState<MusicInfo | null>(null);
  const [playState, setPlayState] = useState<PlayState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isLoop: false,
    isShuffle: false,
  });

  const soundRef = useRef<Howl | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 加载音乐
  const loadMusic = useCallback((music: MusicInfo) => {
    // 停止当前播放的音乐
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    // 创建新的Howl实例
    soundRef.current = new Howl({
      src: [music.url],
      html5: true,
      volume: playState.volume,
      onload: () => {
        setPlayState(prev => ({
          ...prev,
          duration: soundRef.current?.duration() || 0,
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
        if (playState.isLoop) {
          soundRef.current?.play();
        } else {
          setPlayState(prev => ({ 
            ...prev, 
            isPlaying: false, 
            currentTime: 0 
          }));
        }
        stopProgressTracking();
      },
    });

    setCurrentMusic(music);
  }, [playState.volume, playState.isLoop]);

  // 播放/暂停
  const togglePlay = useCallback(() => {
    if (!soundRef.current) return;

    if (playState.isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  }, [playState.isPlaying]);

  // 停止播放
  const stop = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  }, []);

  // 设置播放进度
  const seek = useCallback((time: number) => {
    if (soundRef.current) {
      soundRef.current.seek(time);
      setPlayState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  // 设置音量
  const setVolume = useCallback((volume: number) => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
      setPlayState(prev => ({ ...prev, volume }));
    }
  }, []);

  // 静音/取消静音
  const toggleMute = useCallback(() => {
    if (soundRef.current) {
      const newMuted = !playState.isMuted;
      soundRef.current.mute(newMuted);
      setPlayState(prev => ({ ...prev, isMuted: newMuted }));
    }
  }, [playState.isMuted]);

  // 切换循环播放
  const toggleLoop = useCallback(() => {
    if (soundRef.current) {
      const newLoop = !playState.isLoop;
      soundRef.current.loop(newLoop);
      setPlayState(prev => ({ ...prev, isLoop: newLoop }));
    }
  }, [playState.isLoop]);

  // 开始进度跟踪
  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (soundRef.current && playState.isPlaying) {
        const currentTime = soundRef.current.seek() as number;
        setPlayState(prev => ({ ...prev, currentTime }));
      }
    }, 100);
  }, [playState.isPlaying]);

  // 停止进度跟踪
  const stopProgressTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 格式化时间
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // 清理资源
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentMusic,
    playState,
    loadMusic,
    togglePlay,
    stop,
    seek,
    setVolume,
    toggleMute,
    toggleLoop,
    formatTime,
  };
};
