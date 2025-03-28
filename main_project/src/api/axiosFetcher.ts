import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import { useAuthStore } from "../store/useAuthStore";

const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL;

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const { accessToken } = useAuthStore.getState();
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`; 
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const { refreshToken, setAuth, clearAuth } = useAuthStore.getState();

      if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
        originalRequest._retry = true;
        try {
          const res = await axios.post(
            `${getApiBaseUrl()}/members/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          const newAccessToken = res.data.access;
          const { user } = useAuthStore.getState();
          setAuth(newAccessToken, refreshToken, user!);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; 
          return instance(originalRequest);
        } catch (refreshError) {
          clearAuth();
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const apiInstance = createAxiosInstance(getApiBaseUrl());

export const axiosFetcher = {
  get: async <T = any>(
    path: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance.get(path, {
      params,
      ...config,
      paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
    });
    return response.data;
  },

  post: async <T = any>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance.post(path, data, config);
    return response.data;
  },

  put: async <T = any>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance.put(path, data, config);
    return response.data;
  },

  patch: async <T = any>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance.patch(path, data, config);
    return response.data;
  },

  delete: async <T = any>(
    path: string,
    config?: AxiosRequestConfig & { data?: any }
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance.delete(path, config);
    return response.data;
  },
};
