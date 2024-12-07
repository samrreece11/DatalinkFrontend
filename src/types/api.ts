import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    // baseURL: 'http://127.0.0.1:8000/', // Update with your API base URL
    baseURL: 'https://api.dailysync.net/', // Update with your API base URL
});

let authToken: string | null = null;

export const setAuthToken = () => {
    authToken = localStorage.getItem('token');
};

api.interceptors.request.use(
    (config) => {
        if (authToken) {
            config.headers['Authorization'] = `Token ${authToken}`;
        }

        const csrfToken = Cookies.get('csrftoken');
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;