import axios from 'axios';
import { handleRequest, handleErrorReq, handleResponse, handleErrorRes } from '@/lib/axios-instance';

export const booksHttp = axios.create({
  baseURL: '/',
});

booksHttp.interceptors.request.use(handleRequest, handleErrorReq);

booksHttp.interceptors.response.use(handleResponse, handleErrorRes);
