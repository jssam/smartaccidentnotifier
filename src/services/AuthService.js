/* eslint-disable max-len */
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from './ApiService';
import config from '../config';
import NavigationService from './NavigationService';


const { CLIENT_ID, CLIENT_SECRET, VERSION } = config;

const ENDPOINTS = {
  LOGIN: 'auth/token',
  LOGIND: '/login/driver',
  LOGINU: '/login/customer',
  SIGN_D: '/driver',
  SIGN_U: '/customer',
  LOGOUT: 'auth/logout',
  FACEBOOK: '/auth/social/facebook',
  GOOGLE: '/auth/social/google',
  FORGOT_PASSWORD: '/user/forgot-password',
  RESET_PASSWORD: '/user/reset-password',
  accept: '/accept',
  accident:"/popups",
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
      phone: loginData.email,
      password:loginData.password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });
    await this.createSession({ ...loginData,    phone: loginData.email,userType:loginData.userType });
    if(data?.accessToken!=null){
    navigation.navigate('HomeScreen');
  }
    return data;
  };
  loginD = async (loginData,navigation) => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIND, {
      phone: loginData.email,
      password:loginData.password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });
    await this.createSession({ ...data,    phone: loginData.email,userType:loginData.userType });
    if(data?.accessToken!=null){
    navigation.navigate('HomeScreen');
  }
    return data;
  };
  loginU = async (loginData,navigation) => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGINU, {
      phone: loginData.email,
      password:loginData.password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });
    await this.createSession({ ...data,    phone: loginData.email,userType:loginData.userType });
    if(data?.accessToken!=null){
    navigation.navigate('HomeScreen');
  }
    return data;
  };
  accept = async (loginData) => {
    const { data } = await this.apiClient.post(ENDPOINTS.accept,
      loginData
    );
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

  signupU = async (signupData,navigation) => {
    const { data } =  await this.apiClient.post(ENDPOINTS.SIGN_U, signupData);

    if(data?.accessToken!=null){
      await this.createSession({ ...data,    email: signupData.email });
    navigation.navigate('HomeScreen');
  }
    return data;
  };

  signupD = async (signupData,navigation) => {
    const { data } =  await this.apiClient.post(ENDPOINTS.SIGN_D, signupData);

    if(data?.accessToken!=null){
      await this.createSession({ ...data,    phonenumber: signupData.email });
    navigation.navigate('HomeScreen');
  }
    return data;
  };
  accident = async () => {
    const { data } =  await this.apiClient.get(ENDPOINTS.accident,{});
    return data;
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
