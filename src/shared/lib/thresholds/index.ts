// Типы
export type { Threshold, ThresholdsConfig, ThresholdCheckResult, ThresholdOperator } from './types';

// Константы
export { ALARM_CLASS_NAME } from './constants';

// Утилиты
export { checkThreshold, checkValueAgainstThresholds, getAlarmClassName } from './utils';

// Хуки
export { useThresholdCheck, useThresholdValue } from './hooks';

// Context (опционально, для глубоко вложенных компонентов)
export { ThresholdProvider, useThresholdContext, useThresholdValueFromContext } from './context';
