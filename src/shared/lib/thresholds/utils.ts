import type { Threshold, ThresholdsConfig, ThresholdCheckResult } from './types';
import { ALARM_CLASS_NAME } from './constants';

/**
 * Проверяет значение против одного уставки
 */
export const checkThreshold = (currentValue: number, threshold: Threshold): boolean => {
  const { value, operator } = threshold;

  switch (operator) {
    case '>':
      return currentValue > value;
    case '<':
      return currentValue < value;
    case '>=':
      return currentValue >= value;
    case '<=':
      return currentValue <= value;
    case '===':
      return currentValue === value;
    case '!==':
      return currentValue !== value;
    default:
      return false;
  }
};

/**
 * Проверяет значение против уставок для конкретного ключа
 */
export const checkValueAgainstThresholds = (
  key: string,
  value: number,
  thresholds: ThresholdsConfig
): ThresholdCheckResult => {
  const thresholdConfig = thresholds[key];
  if (!thresholdConfig) return { isExceeded: false };

  const thresholdsArray = Array.isArray(thresholdConfig) ? thresholdConfig : [thresholdConfig];

  for (const threshold of thresholdsArray) {
    if (checkThreshold(value, threshold)) {
      return { isExceeded: true, threshold };
    }
  }

  return { isExceeded: false };
};

/**
 * Получает CSS класс для анимации аларма на основе результата проверки уставки
 * @param isExceeded - флаг превышения уставки
 * @returns имя CSS класса или пустая строка
 */
export const getAlarmClassName = (isExceeded: boolean): string => {
  return isExceeded ? ALARM_CLASS_NAME : '';
};

