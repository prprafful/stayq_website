import { create, ApiResponse } from 'apisauce';
import axios, { CancelToken } from 'axios';
import { authStore, commonStore } from 'stores';
import config from '../config';


const api = create({
    baseURL: config.API_BASE_URL,
    timeout: 5000,
});

api.addRequestTransform((request) => {
    if (request.url !== `auth/token/login/`) {
        if (commonStore.token) {
            request.headers['Authorization'] = `Token ${commonStore.token}`;
        }
        const impersonateUser = window.localStorage.getItem('impersonate');
        if (impersonateUser) request.headers['x-impersonate-user'] = impersonateUser;
    }
});

api.addResponseTransform((response) => {
    if (response.status === 401) {
        authStore.logout();
    }
});

interface SignupProps {
    parentName: string;
    parentEmail: string;
    phone: string;
    kidName: string;
    kidSchool: string;
    grade: string;
    extraInfo: Map<string, string>;
    otp: string;
}

export const signup = ({ parentName, parentEmail, phone, kidName, kidSchool, grade, extraInfo, otp }: SignupProps) =>
    api.post(`auth/student/signup/`, { parentName, parentEmail, phone, kidName, kidSchool, grade, extraInfo, otp });

interface OtpProps {
    phone: string;
}

interface LoginProps {
    username: string;
    password: string;
    token?: string;
}

export const login = ({ username, password, token }: LoginProps) =>
    api.post(`auth/token/login/`, { username, password, token });

export const postOtp = ({ phone }: OtpProps) => api.post(`users/otp/request`, { phone });

export const guestLogin = ({ name, grade }: { name: string; grade: string }) =>
    api.post('users/guest/login/', { name, grade });

export const getCurrentUser = () => api.get(`users/me/`);

interface UserProps {
    name: string;
}

export const saveCurrentUser = ({ name }: UserProps) => api.patch(`users/me/`, { name });

interface SignupOtpProps {
    parentName: string;
    parentEmail: string;
    phone: string;
    kidName: string;
    kidSchool: string;
    grade: string;
    extraInfo: Map<string, string>;
}
export const signupOtp = ({ parentName, parentEmail, phone, kidName, kidSchool, grade, extraInfo }: SignupOtpProps) =>
    api.post(`auth/student/request_otp/`, { parentName, parentEmail, phone, kidName, kidSchool, grade, extraInfo });


export const fetchOpenMasterClassSession = () => api.get('masterclass_open/');

export const masterClassRegister = ({ sessionName }: { sessionName: string }) =>
    api.post(`masterclass/${sessionName}/register/`, { session_name: sessionName });

export default api;