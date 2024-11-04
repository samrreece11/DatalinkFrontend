import axios from 'axios';

const api = axios.create({
    baseURL: '/api/', // Update with your API base URL
});

export default api;