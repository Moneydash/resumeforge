import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('API URL Configuration:', {
  env: import.meta.env.VITE_API_URL,
  final: API_URL
});

const client = axios.create({ baseURL: API_URL });

// Add a request interceptor for adding auth token
client.interceptors.request.use(
  (config) => {
    const baseURL = config.baseURL || '';
    const url = config.url || '';
    console.log('Request Details:', {
      method: config.method?.toUpperCase(),
      url: url,
      baseURL: baseURL,
      fullURL: baseURL + url,
      headers: config.headers
    });
    
    // Get token from cookies
    const token = Cookies.get('access_token'); // Get token from cookies
    if (token) { // Set the header only if the token exists
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling errors
client.interceptors.response.use(
  (response) => {
    console.log('Response Details:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error);
      return Promise.reject(new Error('Request timeout. Please check your internet connection.'));
    }
    
    if (!error.response) {
      console.error('Network Error Details:', {
        message: error.message,
        code: error.code,
        config: {
          url: error.config?.url,
          baseURL: error.config?.baseURL,
          method: error.config?.method
        }
      });
      return Promise.reject(new Error('Network error. Please check your internet connection and try again.'));
    }
    
    return Promise.reject(error);
  }
);

export default client; 