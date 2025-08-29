// 模拟音乐数据
import { MusicInfo } from '../types/music';

export const mockMusicList: MusicInfo[] = [
  {
    id: '1',
    title: '起风了',
    artist: '买辣椒也用券',
    album: '起风了',
    coverUrl: 'https://picsum.photos/300/300?random=1',
    audioUrl: 'https://example.com/audio1.mp3',
    duration: 325,
    playCount: 1234567,
    likeCount: 89012,
    shareCount: 3456,
    commentCount: 1234,
    tags: ['流行', '华语', '治愈'],
    releaseDate: '2019-01-01',
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
      { time: 60, text: '也甘愿赴汤蹈火去走它一遍' },
      { time: 65, text: '如今走过这世间' },
      { time: 70, text: '万般流连' },
      { time: 75, text: '翻过岁月不同侧脸' },
      { time: 80, text: '措不及防闯入你的笑颜' }
    ]
  },
  {
    id: '2',
    title: '光年之外',
    artist: '邓紫棋',
    album: '新的心跳',
    coverUrl: 'https://picsum.photos/300/300?random=2',
    audioUrl: 'https://example.com/audio2.mp3',
    duration: 235,
    playCount: 987654,
    likeCount: 65432,
    shareCount: 2345,
    commentCount: 987,
    tags: ['流行', '华语', '爱情'],
    releaseDate: '2016-01-01',
    lyrics: [
      { time: 0, text: '感受停在我发端的指尖' },
      { time: 5, text: '如何瞬间冻结时间' },
      { time: 10, text: '记住望着我坚定的双眼' },
      { time: 15, text: '也许已经没有明天' },
      { time: 20, text: '面对浩瀚的星海' },
      { time: 25, text: '我们微小得像尘埃' },
      { time: 30, text: '漂浮在一片无奈' },
      { time: 35, text: '缘分让我们相遇乱世以外' },
      { time: 40, text: '命运却要我们危难中相爱' },
      { time: 45, text: '也许未来遥远在光年之外' },
      { time: 50, text: '我愿守候未知里为你等待' },
      { time: 55, text: '我没想到为了你我能疯狂到' },
      { time: 60, text: '山崩海啸没有你根本不想逃' },
      { time: 65, text: '我的大脑为了你已经疯狂到' },
      { time: 70, text: '脉搏心跳没有你根本不重要' }
    ]
  },
  {
    id: '3',
    title: '海阔天空',
    artist: 'Beyond',
    album: '海阔天空',
    coverUrl: 'https://picsum.photos/300/300?random=3',
    audioUrl: 'https://example.com/audio3.mp3',
    duration: 326,
    playCount: 2345678,
    likeCount: 123456,
    shareCount: 5678,
    commentCount: 2345,
    tags: ['摇滚', '粤语', '经典'],
    releaseDate: '1993-01-01',
    lyrics: [
      { time: 0, text: '今天我寒夜里看雪飘过' },
      { time: 5, text: '怀着冷却了的心窝漂远方' },
      { time: 10, text: '风雨里追赶' },
      { time: 15, text: '雾里分不清影踪' },
      { time: 20, text: '天空海阔你与我' },
      { time: 25, text: '可会变（谁没在变）' },
      { time: 30, text: '多少次迎着冷眼与嘲笑' },
      { time: 35, text: '从没有放弃过心中的理想' },
      { time: 40, text: '一刹那恍惚' },
      { time: 45, text: '若有所失的感觉' },
      { time: 50, text: '不知不觉已变淡' },
      { time: 55, text: '心里爱（谁明白我）' },
      { time: 60, text: '原谅我这一生不羁放纵爱自由' },
      { time: 65, text: '也会怕有一天会跌倒' },
      { time: 70, text: '背弃了理想谁人都可以' },
      { time: 75, text: '哪会怕有一天只你共我' }
    ]
  },
  {
    id: '4',
    title: '稻香',
    artist: '周杰伦',
    album: '魔杰座',
    coverUrl: 'https://picsum.photos/300/300?random=4',
    audioUrl: 'https://example.com/audio4.mp3',
    duration: 269,
    playCount: 3456789,
    likeCount: 234567,
    shareCount: 7890,
    commentCount: 3456,
    tags: ['流行', '华语', '励志'],
    releaseDate: '2008-01-01',
    lyrics: [
      { time: 0, text: '对这个世界如果你有太多的抱怨' },
      { time: 5, text: '跌倒了就不敢继续往前走' },
      { time: 10, text: '为什么人要这么的脆弱堕落' },
      { time: 15, text: '请你打开电视看看' },
      { time: 20, text: '多少人为生命在努力勇敢的走下去' },
      { time: 25, text: '我们是不是该知足' },
      { time: 30, text: '珍惜一切就算没有拥有' },
      { time: 35, text: '还记得你说家是唯一的城堡' },
      { time: 40, text: '随着稻香河流继续奔跑' },
      { time: 45, text: '微微笑小时候的梦我知道' },
      { time: 50, text: '不要哭让萤火虫带着你逃跑' },
      { time: 55, text: '乡间的歌谣永远的依靠' },
      { time: 60, text: '回家吧回到最初的美好' },
      { time: 65, text: '不要这么容易就想放弃' },
      { time: 70, text: '就像我说的' },
      { time: 75, text: '追不到的梦想换个梦不就得了' }
    ]
  },
  {
    id: '5',
    title: '夜曲',
    artist: '周杰伦',
    album: '十一月的萧邦',
    coverUrl: 'https://picsum.photos/300/300?random=5',
    audioUrl: 'https://example.com/audio5.mp3',
    duration: 215,
    playCount: 4567890,
    likeCount: 345678,
    shareCount: 8901,
    commentCount: 4567,
    tags: ['流行', '华语', '古典'],
    releaseDate: '2005-01-01',
    lyrics: [
      { time: 0, text: '一群嗜血的蚂蚁被腐肉所吸引' },
      { time: 5, text: '我面无表情看孤独的风景' },
      { time: 10, text: '失去你爱恨开始分明' },
      { time: 15, text: '失去你还有什么事好关心' },
      { time: 20, text: '当鸽子不再象征和平' },
      { time: 25, text: '我终于被提醒' },
      { time: 30, text: '广场上喂食的是秃鹰' },
      { time: 35, text: '我用漂亮的押韵' },
      { time: 40, text: '形容被掠夺一空的爱情' },
      { time: 45, text: '啊乌云开始遮蔽夜色不干净' },
      { time: 50, text: '公园里葬礼的回音在漫天飞行' },
      { time: 55, text: '送你的白色玫瑰' },
      { time: 60, text: '在纯黑的环境凋零' },
      { time: 65, text: '乌鸦在树枝上诡异的很安静' },
      { time: 70, text: '静静听我黑色的大衣' },
      { time: 75, text: '想温暖你日渐冰冷的回忆' }
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
