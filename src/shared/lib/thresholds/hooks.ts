import { useMemo } from 'react';
import type { ThresholdsConfig, ThresholdCheckResult } from './types';
import { checkValueAgainstThresholds } from './utils';

/**
 * Универсальный хук для проверки уставок для набора данных
 * @param data - данные для проверки (Record<string, number>)
 * @param thresholds - конфигурация уставок
 * @returns объект с ключами и флагами превышения уставок
 */
export const useThresholdCheck = <T extends Record<string, number>>(
  data: T | undefined,
  thresholds: ThresholdsConfig
): Record<string, boolean> => {
  return useMemo(() => {
    if (!data) return {};

    const result: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = checkValueAgainstThresholds(key, value, thresholds).isExceeded;
    }
    return result;
  }, [data, thresholds]);
};

/**
 * Хук для проверки одного значения
 * @param key - ключ параметра
 * @param value - значение для проверки
 * @param thresholds - конфигурация уставок
 * @returns результат проверки
 */
export const useThresholdValue = (
  key: string,
  value: number | undefined,
  thresholds: ThresholdsConfig
): ThresholdCheckResult => {
  return useMemo(() => {
    if (value === undefined) return { isExceeded: false };
    return checkValueAgainstThresholds(key, value, thresholds);
  }, [key, value, thresholds]);
};

