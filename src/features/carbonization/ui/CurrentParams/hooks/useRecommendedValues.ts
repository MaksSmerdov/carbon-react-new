import { useMemo } from 'react';
import type { SensorData } from '@shared/types/types';
import type { WorkMode } from '@features/carbonization/model/workMode';
import {
  recommendedTemperatures,
  recommendedLevels,
  recommendedPressures,
  recommendedVacuums,
} from '@features/carbonization/model/recommendedValues';
import { formatRecommendedValue } from '@features/carbonization/model/formatRecommendedValue';

interface UseRecommendedValuesParams {
  orderedTemperatures?: SensorData;
  pressures?: SensorData;
  vacuums?: SensorData;
  levelsData?: SensorData;
  workMode?: WorkMode;
}

export const useRecommendedValues = ({
  orderedTemperatures,
  pressures,
  vacuums,
  levelsData,
  workMode,
}: UseRecommendedValuesParams) => {
  const temperaturesRecommended = useMemo(() => {
    const result: Record<string, string> = {};
    if (orderedTemperatures) {
      for (const key of Object.keys(orderedTemperatures)) {
        const param = recommendedTemperatures[key];
        if (param) {
          result[key] = formatRecommendedValue(param, workMode);
        }
      }
    }
    return result;
  }, [orderedTemperatures, workMode]);

  const pressuresRecommended = useMemo(() => {
    const result: Record<string, string> = {};
    if (pressures) {
      for (const key of Object.keys(pressures)) {
        const param = recommendedPressures[key];
        if (param) {
          result[key] = formatRecommendedValue(param);
        }
      }
    }
    return result;
  }, [pressures]);

  const vacuumsRecommended = useMemo(() => {
    const result: Record<string, string> = {};
    if (vacuums) {
      for (const key of Object.keys(vacuums)) {
        const param = recommendedVacuums[key];
        if (param) {
          result[key] = formatRecommendedValue(param);
        }
      }
    }
    return result;
  }, [vacuums]);

  const levelsRecommended = useMemo(() => {
    const result: Record<string, string> = {};
    if (levelsData) {
      for (const key of Object.keys(levelsData)) {
        const param = recommendedLevels[key];
        if (param) {
          result[key] = formatRecommendedValue(param);
        }
      }
    }
    return result;
  }, [levelsData]);

  return {
    temperaturesRecommended,
    pressuresRecommended,
    vacuumsRecommended,
    levelsRecommended,
  };
};

