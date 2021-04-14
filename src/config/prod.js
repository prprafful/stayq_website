const prod_domain = 'app.stayqrious.com'
const testing_domain = 'localhost:8000'

const prodConfig = {
  REACTION_TIMER: 10,
  SENTRY_DSN: 'https://e6c99c308a7745f1b3261f1346a06319@sentry.io/2548096',
  // SOCKET_BASE_URL: `wss://${window.location.host}`,
  // API_BASE_URL: `https://${window.location.host}/api/`,

  SOCKET_BASE_URL: `wss://${prod_domain}`,
  API_BASE_URL: `https://${prod_domain}/api/`,
  ENABLE_TWILIO: true,
  GOOGLE_OAUTH_CLIENT_ID: '581542018185-unn4n0hji123nke7gq0rtrjdrgbtbocv.apps.googleusercontent.com',
  GTM_ID: 'G-DPX5TQCP9D'
};

export default prodConfig;
