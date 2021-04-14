import { guestLogin, postOtp, signup } from 'api';
import { ApiResponse } from 'apisauce';
import { flow, Instance, types, getEnv } from 'mobx-state-tree';

const SignUpStore = types
  .model('SignUpStore', {
    loading: false,
    errors: types.map(types.array(types.string)),
    parentName: types.optional(types.string, ''),
    parentEmail: types.optional(types.string, ''),
    countryCode: types.optional(types.string, ''),
    phone: types.optional(types.string, ''),
    kidName: types.optional(types.string, ''),
    kidSchool: types.optional(types.string, ''),
    kidGrade: types.optional(types.string, ''),
    signupSuccess: false,
    extraInfo: types.map(types.string),
    hasLaptop: types.maybe(types.boolean),
    username: types.optional(types.string, ''),
    otp: types.optional(types.string, ''),
  })
  .actions((self) => ({
    validate() {
      const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (emailRegex.test(self.parentEmail)) {
        self.errors.delete('parentEmail');
      } else {
        this.setErrors({ parentEmail: ['Please enter a valid email!'] });
      }

      const phoneRegex = /^(\+?91|0)?[6789]\d{9}$/;
      if (self.phone === '') {
        this.setErrors({ phone: ['Please enter a valid phone number!'] });
      } else if ((self.phone.startsWith('91') || self.phone.startsWith('+91')) && !phoneRegex.test(self.phone)) {
        this.setErrors({ phone: ['Please enter a valid phone number!'] });
      } else {
        self.errors.delete('phone');
      }
    },
    setParentName(parentName: string) {
      self.errors.delete('parentName');
      self.parentName = parentName;
    },
    setParentEmail(parentEmail: string) {
      self.errors.delete('parentEmail');
      self.parentEmail = parentEmail;
    },
    setPhone(phone: string) {
      self.errors.delete('phone');
      self.phone = phone;
    },
    setKidName(kidName: string) {
      self.errors.delete('kidName');
      self.kidName = kidName;
    },
    setKidSchool(kidSchool: string) {
      self.errors.delete('kidSchool');
      self.kidSchool = kidSchool;
    },
    setKidGrade(kidGrade: string) {
      self.errors.delete('grade');
      self.kidGrade = kidGrade;
    },
    setExtraInfo(params: { [key: string]: string }) {
      self.extraInfo.merge(params);
    },
    setCountryCode(code: string) {
      self.errors.delete('phone');
      self.countryCode = code;
    },
    setHasLaptop(option: boolean) {
      self.hasLaptop = option;
    },
    setOtp(otp: string) {
      self.errors.delete('otp');
      self.otp = otp;
    },
    setErrors(errors: { [key: string]: Array<string> }) {
      self.errors.merge(errors);
    },
    signup: flow(function* () {
      self.loading = true;
      self.errors.clear();
      try {
        const response: ApiResponse<any> = yield signup({
          parentName: self.parentName,
          parentEmail: self.parentEmail,
          phone: self.countryCode + self.phone,
          kidName: self.kidName,
          kidSchool: self.kidSchool,
          grade: self.kidGrade,
          extraInfo: self.extraInfo,
          otp: self.otp,
        });
        if (response.problem) {
          if (response.status === 400) {
            self.errors.merge(response.data);
          } else {
            self.errors.merge({ error: ["oops!! there's some issue at our end, Please try again afer some time"] });
          }
          return;
        }
        if (response.status === 201) {
          self.signupSuccess = true;
          const { data } = response;
          getEnv(self).commonStore.setToken(data.auth_token);
        }
      } finally {
        self.loading = false;
      }
    }),
    postOtp: flow(function* () {
      self.errors.clear();
      try {
        const response: ApiResponse<any> = yield postOtp({
          username: self.username,
        });
        if (response.problem) {
          if (response.status === 403) {
            self.errors.merge({ otp: ['Unable to send OTP'] });
          }
          return response;
        }
        return response;
      } finally {
      }
    }),
    guestLogin: flow(function* () {
      self.loading = true;
      try {
        const response: ApiResponse<any> = yield guestLogin({
          name: self.kidName,
          grade: self.kidGrade,
          phone: self.countryCode + self.phone,
        });
        if (response.problem) {
          if (response.status === 400) {
            self.errors.merge(response.data);
          }
        }
        if (response.status === 201) {
          self.username = response.data.username;
          getEnv(self).commonStore.setToken(response.data.auth_token);
        }
        return response;
      } finally {
        self.loading = false;
      }
    }),
  }));

export default SignUpStore;

export interface ISignUpStore extends Instance<typeof SignUpStore> { }
