import type { ThresholdsConfig } from '@shared/lib/thresholds';
import { getWorkMode, get3SKThreshold } from './workMode';
import { CARBONIZATION_THRESHOLDS } from './thresholds';

/**
 * Получает динамические уставки с учетом режима работы печи
 * @param temperature1SK - температура 1-СК для определения режима
 * @param baseThresholds - базовые уставки
 * @returns уставки с учетом режима работы
 */
export const getDynamicThresholds = (
  temperature1SK: number | undefined,
  baseThresholds: ThresholdsConfig = CARBONIZATION_THRESHOLDS
): ThresholdsConfig => {
  const workModeInfo = getWorkMode(temperature1SK);
  const threshold3SK = get3SKThreshold(workModeInfo.mode);

  // Создаем копию базовых уставок
  const dynamicThresholds: ThresholdsConfig = { ...baseThresholds };

  // Обновляем уставку для 3-СК в зависимости от режима
  dynamicThresholds['3-СК'] = {
    key: '3-СК',
    value: threshold3SK,
    operator: '>',
  };

  return dynamicThresholds;
};

/**
 * Получает уставки с учетом режима работы и возможности отключения алармов
 * @param temperature1SK - температура 1-СК
 * @param baseThresholds - базовые уставки
 * @returns уставки (пустой объект если алармы отключены)
 */
export const getThresholdsWithWorkMode = (
  temperature1SK: number | undefined,
  baseThresholds: ThresholdsConfig = CARBONIZATION_THRESHOLDS
): ThresholdsConfig => {
  const workModeInfo = getWorkMode(temperature1SK);

  // Если печь не в работе, возвращаем пустые уставки (алармы отключены)
  if (!workModeInfo.alarmsEnabled) {
    return {};
  }

  return getDynamicThresholds(temperature1SK, baseThresholds);
};

