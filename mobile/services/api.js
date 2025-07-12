import axios from 'axios';

const API = axios.create({
  baseURL: 'https://triplecolumn-production.up.railway.app',
});

export const sendThought = (thought) =>
  API.post('/process', { thought });
