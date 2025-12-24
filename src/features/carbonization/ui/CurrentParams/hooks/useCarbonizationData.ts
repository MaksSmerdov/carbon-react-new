import { useMemo } from 'react';
import type { Carbonization } from '@features/carbonization/model/types';
import { TEMPERATURE_ORDER } from '../constants/temperatureOrder';
import { reorderObject } from '../utils/reorderObject';

export const useCarbonizationData = (data: Carbonization | undefined) => {
  const orderedTemperatures = useMemo(() => {
    return reorderObject(data?.temperatures, TEMPERATURE_ORDER);
  }, [data?.temperatures]);

  const imData = useMemo(() => {
    if (!data?.im) return undefined;
    return Object.fromEntries(
      Object.entries(data.im).map(([key, value]) => [
        key,
        typeof value === 'boolean' ? (value ? 1 : 0) : value,
      ])
    );
  }, [data?.im]);

  const levelsData = useMemo(() => {
    if (!data?.levels) return undefined;
    return Object.fromEntries(
      Object.entries(data.levels).map(([key, level]) => [key, level.value])
    );
  }, [data?.levels]);

  return {
    orderedTemperatures,
    imData,
    levelsData,
  };
};

