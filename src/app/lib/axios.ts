import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bellapassi.admin.engineers2.com/', // Laravel API URL
  withCredentials: false,            // include cookies (needed if using Sanctum)
});

export default api;
