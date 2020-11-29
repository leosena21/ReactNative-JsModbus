import axios from 'axios';
import Constants from '../Utils/constants';

const api = axios.create({
  baseURL: Constants.baseUrl,
});

export default api;
