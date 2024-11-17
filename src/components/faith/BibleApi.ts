import axios from "axios";

export const bibleApi = axios.create({
    baseURL: 'https://bible-api.com/'
});
