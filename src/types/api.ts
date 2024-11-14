import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    // baseURL: 'http://127.0.0.1:8000/', // Update with your API base URL
    baseURL: 'https://api.dailysync.net/', // Update with your API base URL
});

let authToken: string | null = null;
let userId: number | null = null;

export const setAuthToken = () => {
    authToken = localStorage.getItem('token');
};

export const setUserId = () => {
    userId = localStorage.getItem('user_id') ? parseInt(localStorage.getItem('user_id') as string, 10) : null;
};

api.interceptors.request.use(
    (config) => {
        if (authToken) {
            config.headers['Authorization'] = `Token ${authToken}`;
        }
        if (userId !== null) {
            if (config.method === 'get') {
                // Add owner to params for GET requests
                config.params = { ...config.params, owner: userId };
            } else if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
                // Add owner to data for POST, PUT, and DELETE requests
                config.data = { ...config.data, owner: userId };
            }
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