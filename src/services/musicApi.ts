// 音乐API服务 - 模拟后端接口
import { MusicInfo } from '../types/music';
import { mockMusicList } from '../data/mockData';

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MusicApiService {
  // 获取音乐列表
  static async getMusicList(): Promise<MusicInfo[]> {
    await delay(500); // 模拟网络延迟
    return mockMusicList;
  }

  // 根据ID获取音乐
  static async getMusicById(id: string): Promise<MusicInfo | null> {
    await delay(300);
    const music = mockMusicList.find(m => m.id === id);
    return music || null;
  }

  // 搜索音乐
  static async searchMusic(keyword: string): Promise<MusicInfo[]> {
    await delay(400);
    const results = mockMusicList.filter(music => 
      music.title.toLowerCase().includes(keyword.toLowerCase()) ||
      music.artist.toLowerCase().includes(keyword.toLowerCase()) ||
      music.album.toLowerCase().includes(keyword.toLowerCase())
    );
    return results;
  }

  // 获取推荐音乐
  static async getRecommendedMusic(): Promise<MusicInfo[]> {
    await delay(600);
    // 随机返回3首音乐作为推荐
    const shuffled = [...mockMusicList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  // 喜欢音乐
  static async likeMusic(musicId: string): Promise<boolean> {
    await delay(200);
    console.log(`喜欢音乐: ${musicId}`);
    return true;
  }

  // 取消喜欢音乐
  static async unlikeMusic(musicId: string): Promise<boolean> {
    await delay(200);
    console.log(`取消喜欢音乐: ${musicId}`);
    return true;
  }

  // 分享音乐
  static async shareMusic(musicId: string, platform: string): Promise<boolean> {
    await delay(300);
    console.log(`分享音乐 ${musicId} 到 ${platform}`);
    return true;
  }

  // 获取音乐播放统计
  static async getMusicStats(musicId: string): Promise<{
    playCount: number;
    likeCount: number;
    shareCount: number;
  }> {
    await delay(200);
    const music = mockMusicList.find(m => m.id === musicId);
    return {
      playCount: music?.playCount || 0,
      likeCount: music?.likeCount || 0,
      shareCount: music?.shareCount || 0,
    };
  }

  // 更新播放次数
  static async updatePlayCount(musicId: string): Promise<boolean> {
    await delay(100);
    console.log(`更新播放次数: ${musicId}`);
    return true;
  }
}

// 导出默认实例
export default MusicApiService;
