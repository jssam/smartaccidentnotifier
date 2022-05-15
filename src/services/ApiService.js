import httpService from './HttpService';

class ApiService {
  constructor() {
    this.api = httpService;
    this.apiClient = this.api.client;
  }
}

export const apiClient = httpService.client;
export const api = httpService

export default ApiService;
