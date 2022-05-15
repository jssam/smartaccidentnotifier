/* eslint-disable max-len */
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from './ApiService';
import config from '../config';
import NavigationService from './NavigationService';


const { CLIENT_ID, CLIENT_SECRET, VERSION } = config;

const ENDPOINTS = {
  LOGIN: 'auth/token',
  SIGN_UP: '/auth/register',
  LOGOUT: 'auth/logout',
  FACEBOOK: '/auth/social/facebook',
  GOOGLE: '/auth/social/google',
  FORGOT_PASSWORD: '/user/forgot-password',
  RESET_PASSWORD: '/user/reset-password',
  GENERATE_AND_SEND_OTP: 'auth/generate-otp'
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = async () => {
    const token = this.getToken();
    const user = this.getUser();
    this.api.attachHeaders({ 'App-Version': VERSION });
    if (token && user) {
      await this.setAuthorizationHeader();
      this.api.setUnauthorizedCallback(this.destroySession.bind(this));
    }
  };

  setAuthorizationHeader = async () => {
    const token = await this.getToken();
    if (token) {
      this.api.attachHeaders({
        Authorization: `Bearer ${token}`
      });
    }
  };

  createSession = async user => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await this.setAuthorizationHeader();
  };

  getSessionCount = async () => {
    const sessionCount = await AsyncStorage.getItem('sessionCount');
    return sessionCount ? JSON.parse(sessionCount) : 0;
  }

  setSessionCount = async () => {
    const sessionCount = await this.getSessionCount();
    const updatedSessionCount = Number(sessionCount) + 1
    await AsyncStorage.setItem('sessionCount', JSON.stringify(updatedSessionCount));
  };

  destroySession = async () => {
    await AsyncStorage.clear();
    this.api.removeHeaders(['Authorization']);
  };

  login = async (loginData,navigation) => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, {
      email: loginData.email,
      password:loginData.password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });
    await this.createSession({ ...loginData,    email: loginData.email,userType:loginData.userType });
    if(data?.accessToken!=null){
    navigation.navigate('HomeScreen');
  }
    return data;
  };


  logout = async (navigation) => {
    // const { data } = await this.apiClient.post(ENDPOINTS.LOGOUT);
    await this.destroySession();
    navigation.navigate('TypeOfUser');
    return { ok: true, data };
  };

  forgotPassword = data => this.apiClient.post(ENDPOINTS.FORGOT_PASSWORD, data);

  resetPassword = data => this.apiClient.post(ENDPOINTS.RESET_PASSWORD, data);

  signup = async signupData => {
    await this.apiClient.post(ENDPOINTS.SIGN_UP, signupData);
    const { email, password } = signupData;
    return this.login({ email, password });
  };

  getToken = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user).accessToken : undefined;
  };

  getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
  };

  updateUserInStorage = async property => {
    const user = await AsyncStorage.getItem('user');
    let jsonUser = JSON.parse(user);
    jsonUser = { ...jsonUser, ...property };
    AsyncStorage.setItem('user', JSON.stringify(jsonUser));
  };

  generateAndSendOTP = async phoneNumber => {
    const { data } = await this.apiClient.post(ENDPOINTS.GENERATE_AND_SEND_OTP, {
      phone_number: phoneNumber
    });
    return data;
  };
}

const authService = new AuthService();

export default authService;
