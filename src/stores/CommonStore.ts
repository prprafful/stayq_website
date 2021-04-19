import { types } from 'mobx-state-tree';
import { reaction } from 'mobx';
// import config from 'config';

const CommonStore = types
  .model('CommonStore', {
    token: types.maybeNull(types.string),
    appLoaded: false,
    lastProblem: types.maybe(types.string),
    autoplayBlocked: true,
    localPrefs: types.frozen({ micDeviceId: '', camDeviceId: '' }),
    idle: false,
    aboutToIdle: false,
    appLoadError: false,
  })
  .actions((self) => ({
    clickHandler() {
      self.autoplayBlocked = false;
    },
    // setAutoplayStatus(result: boolean) {
    //   self.autoplayBlocked = result;
    // },
    setIdleStatus(result: boolean) {
      self.idle = result;
    },
    setIdleWarnStatus(result: boolean) {
      self.aboutToIdle = result;
    },
    setToken(token: string | null) {
      self.token = token;
    },
    setAppLoaded() {
      self.appLoaded = true;
    },
    setAppLoadError() {
      self.appLoadError = true;
    },
    setNetworkProblem(problem: string) {
      self.lastProblem = problem;
    },
    dismissNetworkProblem() {
      self.lastProblem = undefined;
    },
    // setPreferredMicrophone(micDeviceId: string) {
    //   self.localPrefs = { ...self.localPrefs, micDeviceId };
    // },
    // setPreferredWebcam(camDeviceId: string) {
    //   self.localPrefs = { ...self.localPrefs, camDeviceId };
    // },
  }))
  .actions((self) => {
    var iid: number;
    var iidwarning: number;

    const resetIdleTimer = () => {
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll'];
      events.forEach((name) => {
        if(typeof document !== 'undefined'){
          document.removeEventListener(name, resetIdleTimer, true);
        }
      });

      self.setIdleStatus(false);
      const timeout = 600 * 1000; //idles in about 10 minutes
      clearTimeout(iid);
      var iid = setTimeout(() => {
        self.setIdleStatus(true);
      }, timeout);

      self.setIdleWarnStatus(false);
      clearTimeout(iidwarning);
      var iidwarning = setTimeout(() => {
        self.setIdleWarnStatus(true);
      }, timeout - Math.max(timeout * 0.1, 5 * 1000)); // atleast 5 sec prior warning

      setTimeout(() => {
        /// Idle timers
        events.forEach((name) => {
          if(typeof document !== 'undefined'){
            document.addEventListener(name, resetIdleTimer, true);
          }
        });
      }, 2000);
    };

    const afterCreate = () => {
      self.token = typeof window !== 'undefined' ? window.localStorage.getItem('jwt') : null;
      self.localPrefs = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('localPrefs') || '{}') : null;

      // if (config.ENABLE_TWILIO)
      //   canAutoplay.audio().then(({ result, error }: { result: boolean; error: Error }) => {
      //     if (error) {
      //       console.info(error);
      //     }
      //     self.setAutoplayStatus(!result);
      //   });
      // else {
      //   self.setAutoplayStatus(false);
      // }
      if (typeof document !== 'undefined'){
        document.addEventListener('click', self.clickHandler, { once: true });
      }

      reaction(
        () => self.localPrefs,
        (prefs) => {
          window.localStorage.setItem('localPrefs', JSON.stringify(prefs));
        }
      );

      reaction(
        () => self.token,
        (token) => {
          if (token === null) {
            window.localStorage.removeItem('jwt');
          } else {
            window.localStorage.setItem('jwt', token);
          }
        }
      );

      resetIdleTimer();
    };

    return { afterCreate, resetIdleTimer };
  })
// .views((self) => ({
//   get audioConfig() {
//     if (self.localPrefs.micDeviceId) {
//       return { deviceId: self.localPrefs.micDeviceId };
//     }
//     return {};
//   },
//   get videoConfig() {
//     if (self.localPrefs.camDeviceId) {
//       return { deviceId: self.localPrefs.camDeviceId };
//     }
//     return {};
//   },
// }));

export default CommonStore;
