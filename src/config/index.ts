import prodConfig from './prod';
import devConfig from './dev';

export interface Config {
  readonly REACTION_TIMER: number;
  readonly SCREEN_SHARE_FPS: number;
  readonly MOUSE_SHARE_FPS: number;
  readonly SENTRY_DSN?: string;
  readonly SOCKET_BASE_URL: string;
  readonly API_BASE_URL: string;
  readonly ENABLE_TWILIO: boolean;
  readonly MIN_CHROME_BROWSER: number;
  readonly VERSION: string;
  readonly COMMIT: string;
  readonly DEBUG: boolean;
  readonly APP_ENV: string;
  readonly GOOGLE_OAUTH_CLIENT_ID: string;
  readonly WHATSAPP_NUMBER: string;
  readonly SUPPORT_PHONE_NUMBER: string;
  readonly GTM_ID?: string;
  readonly GRADES: Array<string>;
}

const defaultConfig: Config = {
  REACTION_TIMER: 2,
  SCREEN_SHARE_FPS: 12,
  MOUSE_SHARE_FPS: 18,
  ENABLE_TWILIO: false,
  API_BASE_URL: '',
  SOCKET_BASE_URL: '',
  MIN_CHROME_BROWSER: 80,
  VERSION: 'unknown',
  COMMIT: 'unknown',
  DEBUG: false,
  APP_ENV: 'unknown',
  GOOGLE_OAUTH_CLIENT_ID: '',
  WHATSAPP_NUMBER: '+91 91509 33505',
  SUPPORT_PHONE_NUMBER: '080 689 44 557',
  GRADES: ['3rd', '4th', '5th', '6th', '7th', '8th', '9th', 'Others']
};

var config: Config = defaultConfig;

if (process.env.NODE_ENV === 'production') {
  config = {
    ...defaultConfig,
    ...prodConfig,
    VERSION: process.env.REACT_APP_RELEASE_VERSION || 'untagged',
    COMMIT: process.env.REACT_APP_RELEASE_COMMIT || 'untagged',
    APP_ENV: process.env.REACT_APP_ENV || 'production',
  };
} else {
  config = {
    ...defaultConfig,
    ...devConfig,
    VERSION: 'development',
    COMMIT: 'development',
    APP_ENV: 'development',
    DEBUG: true,
  };
}

// (window as any).SQCONFIG = config;

export default config;
