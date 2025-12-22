import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';

type FetchResult<T> = {
  loading: boolean;
  data: T | null;
  error: boolean;
};

export const useData = <T,>(path: string, interval: number = 5000): FetchResult<T> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await axios.get<T>(`${path}`, {
        signal: controller.signal,
      });
      setData(res.data);
      setError(false);
    } catch (err) {
      if (axios.isCancel(err)) return;
      console.error('Ошибка при загрузке данных:', (err as AxiosError)?.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    void fetchData();
    const intervalId = setInterval(() => {
      void fetchData();
    }, interval);
    return () => {
      clearInterval(intervalId);
      abortRef.current?.abort();
    };
  }, [fetchData]);

  return { loading, data, error };
};
