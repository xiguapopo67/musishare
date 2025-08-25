// 模拟音乐数据
import { MusicInfo } from '../types/music';

export const mockMusicList: MusicInfo[] = [
  {
    id: '1',
    title: '起风了',
    artist: '买辣椒也用券',
    album: '起风了',
    cover: 'https://picsum.photos/300/300?random=1',
    duration: 325,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // 示例音频
    playCount: 1234567,
    likeCount: 89012,
    shareCount: 3456,
    tags: ['流行', '华语', '治愈'],
    lyrics: [
      { time: 0, text: '这一路上走走停停' },
      { time: 5, text: '顺着少年漂流的痕迹' },
      { time: 10, text: '迈出车站的前一刻' },
      { time: 15, text: '竟有些犹豫' },
      { time: 20, text: '不禁笑这近乡情怯' },
      { time: 25, text: '仍无可避免' },
      { time: 30, text: '而长野的天' },
      { time: 35, text: '依旧那么暖' },
      { time: 40, text: '风吹起了从前' },
      { time: 45, text: '从前初识这世间' },
      { time: 50, text: '万般流连' },
      { time: 55, text: '看着天边似在眼前' },
      { time: 60, text: '也甘愿赴汤蹈火去走它一遍' }
    ]
  },
  {
    id: '2',
    title: '海阔天空',
    artist: 'Beyond',
    album: '海阔天空',
    cover: 'https://picsum.photos/300/300?random=2',
    duration: 326,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    playCount: 2345678,
    likeCount: 123456,
    shareCount: 5678,
    tags: ['摇滚', '粤语', '经典'],
    lyrics: [
      { time: 0, text: '今天我 寒夜里看雪飘过' },
      { time: 5, text: '怀着冷却了的心窝漂远方' },
      { time: 10, text: '风雨里追赶' },
      { time: 15, text: '雾里分不清影踪' },
      { time: 20, text: '天空海阔你与我' },
      { time: 25, text: '可会变（谁没在变）' },
      { time: 30, text: '多少次 迎着冷眼与嘲笑' },
      { time: 35, text: '从没有放弃过心中的理想' },
      { time: 40, text: '一刹那恍惚 若有所失的感觉' },
      { time: 45, text: '不知不觉已变淡' },
      { time: 50, text: '心里爱（谁明白我）' },
      { time: 55, text: '原谅我这一生不羁放纵爱自由' },
      { time: 60, text: '也会怕有一天会跌倒' }
    ]
  },
  {
    id: '3',
    title: '稻香',
    artist: '周杰伦',
    album: '魔杰座',
    cover: 'https://picsum.photos/300/300?random=3',
    duration: 229,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    playCount: 3456789,
    likeCount: 234567,
    shareCount: 7890,
    tags: ['流行', '华语', '励志'],
    lyrics: [
      { time: 0, text: '对这个世界如果你有太多的抱怨' },
      { time: 5, text: '跌倒了就不敢继续往前走' },
      { time: 10, text: '为什么人要这么的脆弱 堕落' },
      { time: 15, text: '请你打开电视看看' },
      { time: 20, text: '多少人为生命在努力勇敢的走下去' },
      { time: 25, text: '我们是不是该知足' },
      { time: 30, text: '珍惜一切就算没有拥有' },
      { time: 35, text: '还记得你说家是唯一的城堡' },
      { time: 40, text: '随着稻香河流继续奔跑' },
      { time: 45, text: '微微笑 小时候的梦我知道' },
      { time: 50, text: '不要哭让萤火虫带着你逃跑' },
      { time: 55, text: '乡间的歌谣永远的依靠' },
      { time: 60, text: '回家吧 回到最初的美好' }
    ]
  },
  {
    id: '4',
    title: '夜曲',
    artist: '周杰伦',
    album: '十一月的萧邦',
    cover: 'https://picsum.photos/300/300?random=4',
    duration: 215,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    playCount: 4567890,
    likeCount: 345678,
    shareCount: 9012,
    tags: ['流行', '华语', '古典'],
    lyrics: [
      { time: 0, text: '一群嗜血的蚂蚁 被腐肉所吸引' },
      { time: 5, text: '我面无表情 看孤独的风景' },
      { time: 10, text: '失去你 爱恨开始分明' },
      { time: 15, text: '失去你 还有什么事好关心' },
      { time: 20, text: '当鸽子不再象征和平' },
      { time: 25, text: '我终于被提醒' },
      { time: 30, text: '广场上喂食的是秃鹰' },
      { time: 35, text: '我用漂亮的押韵' },
      { time: 40, text: '形容被掠夺一空的爱情' },
      { time: 45, text: '啊 乌云开始遮蔽 夜色不干净' },
      { time: 50, text: '公园里 葬礼的回音 在漫天飞行' },
      { time: 55, text: '送你的 白色玫瑰' },
      { time: 60, text: '在纯黑的环境凋零' }
    ]
  },
  {
    id: '5',
    title: '青花瓷',
    artist: '周杰伦',
    album: '我很忙',
    cover: 'https://picsum.photos/300/300?random=5',
    duration: 233,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    playCount: 5678901,
    likeCount: 456789,
    shareCount: 12345,
    tags: ['流行', '华语', '中国风'],
    lyrics: [
      { time: 0, text: '素胚勾勒出青花笔锋浓转淡' },
      { time: 5, text: '瓶身描绘的牡丹一如你初妆' },
      { time: 10, text: '冉冉檀香透过窗心事我了然' },
      { time: 15, text: '宣纸上走笔至此搁一半' },
      { time: 20, text: '釉色渲染仕女图韵味被私藏' },
      { time: 25, text: '而你嫣然的一笑如含苞待放' },
      { time: 30, text: '你的美一缕飘散 去到我去不了的地方' },
      { time: 35, text: '天青色等烟雨 而我在等你' },
      { time: 40, text: '炊烟袅袅升起 隔江千万里' },
      { time: 45, text: '在瓶底书汉隶仿前朝的飘逸' },
      { time: 50, text: '就当我为遇见你伏笔' },
      { time: 55, text: '天青色等烟雨 而我在等你' },
      { time: 60, text: '月色被打捞起 晕开了结局' }
    ]
  }
];

// 获取随机音乐
export const getRandomMusic = (): MusicInfo => {
  const randomIndex = Math.floor(Math.random() * mockMusicList.length);
  return mockMusicList[randomIndex];
};

// 根据ID获取音乐
export const getMusicById = (id: string): MusicInfo | undefined => {
  return mockMusicList.find(music => music.id === id);
};
