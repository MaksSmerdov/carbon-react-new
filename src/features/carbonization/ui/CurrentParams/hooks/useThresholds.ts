import { useThresholdCheck } from '@shared/lib/thresholds';
import type { ThresholdsConfig } from '@shared/lib/thresholds';

interface UseThresholdsParams {
  orderedTemperatures?: Record<string, number>;
  pressures?: Record<string, number>;
  vacuums?: Record<string, number>;
  levelsData?: Record<string, number>;
  imData?: Record<string, number>;
  gorelka?: Record<string, number>;
  thresholds: ThresholdsConfig;
}

export const useThresholds = ({
  orderedTemperatures,
  pressures,
  vacuums,
  levelsData,
  imData,
  gorelka,
  thresholds,
}: UseThresholdsParams) => {
  const temperaturesExceeded = useThresholdCheck(orderedTemperatures, thresholds);
  const pressuresExceeded = useThresholdCheck(pressures, thresholds);
  const vacuumsExceeded = useThresholdCheck(vacuums, thresholds);
  const levelsExceeded = useThresholdCheck(levelsData, thresholds);
  const imExceeded = useThresholdCheck(imData, thresholds);
  const gorelkaExceeded = useThresholdCheck(gorelka, thresholds);

  return {
    temperaturesExceeded,
    pressuresExceeded,
    vacuumsExceeded,
    levelsExceeded,
    imExceeded,
    gorelkaExceeded,
  };
};

