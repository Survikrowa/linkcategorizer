import axios from 'axios';
// import { BASE_API_URL } from 'react-native-dotenv';

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.15:8080/api',
});
