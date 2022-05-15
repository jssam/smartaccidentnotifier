

/* eslint-disable indent */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from './NavigationService';

import config from '../config';

const { API_BASE_URL } = config;

class HttpService {
  constructor(options = {}) {
    this.client = axios.create(options);
    this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
    this.unauthorizedCallback = () => {};
  }

  attachHeaders(headers) {
    Object.assign(this.client.defaults.headers, headers);
  }

  removeHeaders(headerKeys) {
    headerKeys.forEach(key => delete this.client.defaults.headers[key]);
  }

  handleSuccessResponse(response) {
    return response;
  }

  handleErrorResponse = error => {
    try {
      const { status } = error.response;

      switch (status) {
        case 401:
          AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
          NavigationService.navigate('TypeOfUser');
          break;
        default:
          break;
      }
      return Promise.reject(error);
    } catch (e) {
      return Promise.reject(error);
    }
  };

  setUnauthorizedCallback(callback) {
    this.unauthorizedCallback = callback;
  }
}

const options = {
  baseURL: API_BASE_URL
};
const httpService = new HttpService(options);

export default httpService;
