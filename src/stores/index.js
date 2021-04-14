// import SignUpStore from './SignupStore';
// import CommonStore from './CommonStore';
// import UserStore from './UserStore';

import { useMemo } from "react"
import CommonStore from "./CommonStore";
import SignUpStore from "./SignupStore";
import UserStore from "./UserStore";
import AuthStore from "./AuthStore";

export const userStore = UserStore.create({});
export const commonStore = CommonStore.create({});
export const signUpStore = SignUpStore.create({}, { userStore, commonStore });
export const authStore = AuthStore.create({}, { userStore, commonStore });


// let _store = {};
// export const useStore = () => {
//     const store = useMemo(() => {
//         _store['userStore'] = UserStore.create({});
//         _store['commonStore'] = CommonStore.create({});
//         _store['signUpStore'] = SignUpStore.create({});
//         return _store;
//     }, []);

//     return store;
// }