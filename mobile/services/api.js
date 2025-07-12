import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.94:8000',
});

export const sendThought = (thought) =>
  API.post('/process', { thought });
