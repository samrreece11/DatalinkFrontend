import axios from 'axios';

const api = axios.create({
    baseURL: 'http://datalink-env.eba-b4qnvega.us-east-1.elasticbeanstalk.com/api/', // Update with your API base URL
});

export default api;