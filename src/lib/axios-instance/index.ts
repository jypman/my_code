import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

export const handleRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  console.log('baseURL', config.baseURL);
  console.log('method', config.method);
  console.log('url', config.url);
  console.log('qs params', config.params);
  console.log('request body', config.data);

  return config;
};

export const handleErrorReq = (error: AxiosError): Promise<never> => {
  return Promise.reject(error);
};

export const handleResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const handleErrorRes = async (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
