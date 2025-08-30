// APP配置文件 - 管理不同APP的配置信息

export interface AppLaunchConfig {
  iosUrlScheme: string;
  androidIntent: string;
  iosAppStoreUrl: string;
  androidPlayStoreUrl: string;
  webUrl: string;
  appName: string;
  appIcon?: string;
  description?: string;
  [key: string]: string | undefined; // 添加索引签名
}

// Melon音乐APP配置
export const MELON_APP_CONFIG: AppLaunchConfig = {
  iosUrlScheme: 'melon://',
  androidIntent: 'intent://melon.app#Intent;scheme=melon;package=com.melon.app;end',
  iosAppStoreUrl: 'https://apps.apple.com/app/melon/id123456789', // 需要替换为实际的App Store链接
  androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.melon.app', // 需要替换为实际的Google Play链接
  webUrl: 'https://melon.app',
  appName: 'Melon',
  appIcon: '/musishare/images/logos/logo.png',
  description: '发现好音乐，分享好心情'
};

// 酷狗音乐APP配置（示例）
export const KUGOU_APP_CONFIG: AppLaunchConfig = {
  iosUrlScheme: 'kugou://',
  androidIntent: 'intent://kugou.com#Intent;scheme=kugou;package=com.kugou.android;end',
  iosAppStoreUrl: 'https://apps.apple.com/app/kugou-music/id123456789',
  androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.kugou.android',
  webUrl: 'https://www.kugou.com',
  appName: '酷狗音乐',
  appIcon: '/musishare/images/icons/kugou-icon.png',
  description: '音乐就是力量'
};

// 网易云音乐APP配置（示例）
export const NETEASE_APP_CONFIG: AppLaunchConfig = {
  iosUrlScheme: 'orpheus://',
  androidIntent: 'intent://music.163.com#Intent;scheme=orpheus;package=com.netease.cloudmusic;end',
  iosAppStoreUrl: 'https://apps.apple.com/app/netease-cloud-music/id123456789',
  androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.netease.cloudmusic',
  webUrl: 'https://music.163.com',
  appName: '网易云音乐',
  appIcon: '/musishare/images/icons/netease-icon.png',
  description: '音乐的力量'
};

// QQ音乐APP配置（示例）
export const QQ_MUSIC_APP_CONFIG: AppLaunchConfig = {
  iosUrlScheme: 'qqmusic://',
  androidIntent: 'intent://y.qq.com#Intent;scheme=qqmusic;package=com.tencent.qqmusic;end',
  iosAppStoreUrl: 'https://apps.apple.com/app/qq-music/id123456789',
  androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.tencent.qqmusic',
  webUrl: 'https://y.qq.com',
  appName: 'QQ音乐',
  appIcon: '/musishare/images/icons/qqmusic-icon.png',
  description: '听我想听的歌'
};

// 默认使用Melon配置
export const DEFAULT_APP_CONFIG = MELON_APP_CONFIG;

// 获取APP配置的辅助函数
export const getAppConfig = (appName: string): AppLaunchConfig => {
  const configs: { [key: string]: AppLaunchConfig } = {
    'melon': MELON_APP_CONFIG,
    'kugou': KUGOU_APP_CONFIG,
    'netease': NETEASE_APP_CONFIG,
    'qqmusic': QQ_MUSIC_APP_CONFIG
  };
  
  return configs[appName.toLowerCase()] || DEFAULT_APP_CONFIG;
};

// 验证APP配置是否完整
export const validateAppConfig = (config: AppLaunchConfig): boolean => {
  const requiredFields = [
    'iosUrlScheme',
    'androidIntent', 
    'iosAppStoreUrl',
    'androidPlayStoreUrl',
    'webUrl',
    'appName'
  ];
  
  return requiredFields.every(field => 
    config[field] && typeof config[field] === 'string' && (config[field] as string).length > 0
  );
};
