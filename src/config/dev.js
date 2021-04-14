// document.domain = 'localhost';
const stagin_domain = 'app.stayqrious.net'
const testing_domain = 'localhost:8000'

const devConfig = {
  SOCKET_BASE_URL: 'ws://' + 'localhost' + ':8000',
  API_BASE_URL: 'http://' + testing_domain + '/api/',
  ENABLE_TWILIO: !!1,
  GOOGLE_OAUTH_CLIENT_ID: '191043065282-n7d2u5ngh2j740kf0n9n7cnfqh4avunb.apps.googleusercontent.com',
};

export default devConfig;
