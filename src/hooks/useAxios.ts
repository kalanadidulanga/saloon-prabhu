import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface UseAxiosReturn<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  fetch: (
    options:
      | {
          url: string;
          method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
          data?: any;
          params?: Record<string, any>;
        }
      | AxiosRequestConfig
  ) => Promise<{ data: T } | AxiosResponse<T>>;
}

function useAxios<T = any>(): UseAxiosReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  // Set up an axios instance with the base URL
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8000",
  });

  const fetch = useCallback(
    async (
      options:
        | {
            url: string;
            method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
            data?: any;
            params?: Record<string, any>;
          }
        | AxiosRequestConfig
    ): Promise<{ data: T } | AxiosResponse<T>> => {
      setLoading(true);
      setError(null);

      try {
        let requestConfig: AxiosRequestConfig;

        if ("url" in options) {
          // Handle the old method signature
          requestConfig = {
            url: options.url,
            method: options.method || "GET",
            ...(options.data && { data: options.data }),
            ...(options.params && { params: options.params }),
          };
        } else {
          // Handle the new method signature
          requestConfig = options;
        }

        const response = await axiosInstance<T>(requestConfig);
        setData(response.data);
        setLoading(false);

        // If old method signature, return response with `data` wrapped
        if ("url" in options) {
          return { data: response.data as T };
        }

        // If new method signature, return the full AxiosResponse
        return response;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError);
        setData(null);
        setLoading(false);
        throw axiosError;
      }
    },
    []
  );

  return { data, loading, error, fetch };
}

export default useAxios;
