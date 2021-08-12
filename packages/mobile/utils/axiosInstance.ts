import axios from 'axios';
// import { BASE_API_URL } from 'react-native-dotenv';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
});
