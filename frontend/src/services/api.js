import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // 🔐 Automatically include cookie with requests
});

export default API;
