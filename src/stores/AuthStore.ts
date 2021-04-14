import { flow, types, getEnv } from 'mobx-state-tree';
import { login, postOtp } from '../api';
import { ApiResponse } from 'apisauce';

const AuthStore = types
  .model('AuthStore', {
    loading: false,
    errors: types.optional(types.string, ''),
    username: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    otp: types.optional(types.string, ''),
    token: types.maybe(types.string),
  })
  .actions((self) => ({
    setUsername(username: string) {
      self.username = username;
    },
    setPassword(password: string) {
      self.password = password;
    },
    setErrors(error: string) {
      self.errors = error;
    },
    setOtp(otp: string) {
      self.otp = otp;
    },
    setToken(token: string) {
      self.token = token;
    },
    reset() {
      self.username = '';
      self.password = '';
    },
    login: flow(function* () {
      self.loading = true;
      try {
        const response: ApiResponse<any> = yield login({
          username: self.username,
          password: self.password,
          token: self.token
        });
        if (response.problem) {
          if (response.status === 400) {
            self.errors = 'Invalid Credentials';
          } else {
            getEnv(self).commonStore.setNetworkProblem(response.problem);
          }
          return;
        }

        const { data } = response;
        getEnv(self).commonStore.setToken(data.auth_token);

        yield getEnv(self).userStore.pullUser();
      } finally {
        self.loading = false;
      }
    }),
    logout() {
      getEnv(self).commonStore.setToken(null);
      getEnv(self).userStore.forgetUser();
      window.localStorage.clear();
      window.localStorage.setItem('hasSeen', 'yes');
      return Promise.resolve();
    },
    postOtp: flow(function* () {
      self.errors = '';
      try {
        const response: ApiResponse<any> = yield postOtp({
          username: self.username,
        });
        if (response.problem) {
          if (response.status === 403) {
            self.errors = 'Phone number is not registered';
          }
          return response;
        }
        return response;
      } finally {
      }
    }),
  }));

export default AuthStore;
