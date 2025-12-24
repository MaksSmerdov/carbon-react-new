import type { Range, EffectiveRangeParam } from './recommendedValues';
import type { WorkMode } from './workMode';

/**
 * Форматирует рекомендуемое значение для отображения в таблице
 * @param param - параметр с рекомендуемыми значениями
 * @param workMode - режим работы (для 3-СК)
 * @returns отформатированная строка
 */
export const formatRecommendedValue = (
  param: EffectiveRangeParam | Range | undefined,
  workMode?: WorkMode
): string => {
  if (!param) return '-';

  // Если это EffectiveRangeParam с steady/startup (для 3-СК)
  if ('steady' in param && 'startup' in param) {
    const range = workMode === 'established' ? param.steady : param.startup;
    if (!range) return '-';
    
    if (range.min !== undefined && range.max !== undefined) {
      return `от ${range.min} до ${range.max} ${range.unit}`;
    }
    if (range.max !== undefined) {
      return `не более ${range.max} ${range.unit}`;
    }
    if (range.min !== undefined) {
      return `не менее ${range.min} ${range.unit}`;
    }
    return '-';
  }

  // Обычный Range
  const range = param as Range;
  
  if (range.min !== undefined && range.max !== undefined) {
    return `от ${range.min} до ${range.max} ${range.unit}`;
  }
  if (range.max !== undefined) {
    return `не более ${range.max} ${range.unit}`;
  }
  if (range.min !== undefined) {
    return `не менее ${range.min} ${range.unit}`;
  }
  
  return '-';
};

