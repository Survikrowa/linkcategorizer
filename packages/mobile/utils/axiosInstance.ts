import axios from 'axios';
import { ENV_VARIABLES } from '../env.variables';

export const axiosInstance = axios.create({
  baseURL: `${ENV_VARIABLES}/api`,
});
