import { createContext, useContext, type ReactNode, useMemo } from 'react';
import type { ThresholdsConfig, ThresholdCheckResult } from './types';
import { checkValueAgainstThresholds } from './utils';

interface ThresholdContextValue {
  thresholds: ThresholdsConfig;
}

const ThresholdContext = createContext<ThresholdContextValue | null>(null);

interface ThresholdProviderProps {
  children: ReactNode;
  thresholds: ThresholdsConfig;
}

/**
 * Provider для передачи уставок через дерево компонентов
 */
export const ThresholdProvider = ({ children, thresholds }: ThresholdProviderProps) => {
  const value = useMemo(() => ({ thresholds }), [thresholds]);
  return <ThresholdContext.Provider value={value}>{children}</ThresholdContext.Provider>;
};

/**
 * Хук для использования уставок из Context
 */
export const useThresholdContext = (): ThresholdContextValue => {
  const context = useContext(ThresholdContext);
  if (!context) {
    throw new Error('useThresholdContext must be used within ThresholdProvider');
  }
  return context;
};

/**
 * Хук для проверки одного значения через Context
 */
export const useThresholdValueFromContext = (
  key: string,
  value: number | undefined
): ThresholdCheckResult => {
  const { thresholds } = useThresholdContext();
  return useMemo(() => {
    if (value === undefined) return { isExceeded: false };
    return checkValueAgainstThresholds(key, value, thresholds);
  }, [key, value, thresholds]);
};

