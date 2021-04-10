document.domain = window.location.hostname;

const devConfig = {
  SOCKET_BASE_URL: 'ws://' + window.location.hostname + ':8000',
  API_BASE_URL: 'http://' + window.location.hostname + ':8000/api/',
  ENABLE_TWILIO: !!1,
  GOOGLE_OAUTH_CLIENT_ID: '191043065282-n7d2u5ngh2j740kf0n9n7cnfqh4avunb.apps.googleusercontent.com',
};

export default devConfig;
