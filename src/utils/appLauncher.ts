// APP启动器工具 - 处理不同平台的APP跳转
import { AppLaunchConfig, DEFAULT_APP_CONFIG } from '../config/appConfig';

// 导出默认配置
export const melonAppConfig = DEFAULT_APP_CONFIG;

// 设备检测
export const detectDevice = () => {
  const userAgent = navigator.userAgent;
  return {
    isIOS: /iPad|iPhone|iPod/.test(userAgent),
    isAndroid: /Android/.test(userAgent),
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  };
};

// 打开APP的主要函数
export const openApp = (config: AppLaunchConfig) => {
  const device = detectDevice();
  
  // 创建隐藏的iframe用于检测APP是否安装
  const createHiddenIframe = (url: string) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
    
    // 清理iframe
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  // 尝试打开APP
  const tryOpenApp = () => {
    if (device.isIOS) {
      // iOS设备
      window.location.href = config.iosUrlScheme;
      
      // 如果APP没有安装，2秒后跳转到App Store
      setTimeout(() => {
        window.location.href = config.iosAppStoreUrl;
      }, 2000);
      
    } else if (device.isAndroid) {
      // Android设备
      try {
        // 使用Intent打开APP
        window.location.href = config.androidIntent;
        
        // 备用方案：直接尝试URL Scheme
        setTimeout(() => {
          window.location.href = config.iosUrlScheme;
        }, 1000);
        
        // 如果都失败了，跳转到Google Play
        setTimeout(() => {
          window.location.href = config.androidPlayStoreUrl;
        }, 3000);
        
      } catch (error) {
        console.error('打开Android APP失败:', error);
        window.location.href = config.androidPlayStoreUrl;
      }
      
    } else {
      // 桌面设备或其他设备
      window.open(config.webUrl, '_blank');
    }
  };

  // 执行打开APP
  tryOpenApp();
  
  // 记录用户行为
  console.log(`用户尝试打开${config.appName} APP`);
  
  // 可以在这里添加统计代码
  // analytics.track('app_launch_attempt', { app: config.appName, device: device });
};

// 检查APP是否已安装（仅适用于某些场景）
export const checkAppInstalled = (config: AppLaunchConfig): Promise<boolean> => {
  return new Promise((resolve) => {
    const device = detectDevice();
    
    if (!device.isMobile) {
      resolve(false);
      return;
    }
    
    // 创建一个隐藏的iframe来检测APP
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    
    let hasApp = false;
    
    // 监听页面可见性变化
    const handleVisibilityChange = () => {
      if (document.hidden) {
        hasApp = true;
        resolve(true);
        cleanup();
      }
    };
    
    const cleanup = () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // 尝试打开APP
    iframe.src = device.isIOS ? config.iosUrlScheme : config.androidIntent;
    document.body.appendChild(iframe);
    
    // 如果2秒内没有检测到APP，则认为未安装
    setTimeout(() => {
      if (!hasApp) {
        resolve(false);
        cleanup();
      }
    }, 2000);
  });
};

// 显示APP未安装的提示
export const showAppNotInstalledMessage = (config: AppLaunchConfig) => {
  const device = detectDevice();
  
  if (device.isIOS) {
    alert(`${config.appName} APP未安装，即将跳转到App Store下载`);
  } else if (device.isAndroid) {
    alert(`${config.appName} APP未安装，即将跳转到Google Play下载`);
  } else {
    alert(`${config.appName} APP未安装，请访问官网下载`);
  }
};
