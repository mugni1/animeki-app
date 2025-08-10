import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://animeki-api.vercel.app',
    headers: { 'Content-Type': 'application/json' },
  })
  return instance
}

const axiosInstance = createAxiosInstance()

export const httpClient = {
  get: (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axiosInstance.get(url, config)
  },
  post: (url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axiosInstance.post(url, data, config)
  },
  put: (url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axiosInstance.put(url, data, config)
  },
  delete: (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axiosInstance.delete(url, config)
  },
}
