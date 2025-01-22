import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface UseAxiosReturn<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  fetch: (options: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

function useAxios<T = any>(): UseAxiosReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  // Set up an axios instance with the base URL
  const axiosInstance = axios.create({
    baseURL: import.meta.env.REACT_APP_BASE_URL || "http://localhost:8000",
  });

  const fetch = async (
    options: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance<T>(options);
      setData(response.data);
      setLoading(false);
      return response;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError);
      setData(null);
      setLoading(false);
      throw axiosError;
    }
  };

  return { data, loading, error, fetch };
}

export default useAxios;
