import { create, ApiResponse } from 'apisauce';
import axios, { CancelToken } from 'axios';
import config from '../config';

const api = create({
    baseURL: config.API_BASE_URL,
    timeout: 5000,
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

interface OtpProps {
    username: string;
}

export const signup = ({
    parentName,
    parentEmail,
    phone,
    kidName,
    kidSchool,
    grade,
    extraInfo,
    otp
}: SignupProps) => {
    api.post(`auth/student/signup/`, { parentName, parentEmail, phone, kidName, kidSchool, grade, extraInfo, otp });
}

export const postOtp = ({ username }: OtpProps) => api.post(`users/otp/request`, { username });

export const guestLogin = ({
    name,
    grade,
    phone
}: {
    name: string,
    grade: string,
    phone: string,
}) =>
    api.post('users/guest/login/', { name, grade, phone });
