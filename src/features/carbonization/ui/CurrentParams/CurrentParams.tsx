import { useData } from '@shared/hooks/useData';
import type { Carbonization, Notis } from '@features/carbonization/model/types';
import { Loader } from '@shared/ui/loader/Loader';
import { Error } from '@shared/ui/error/Error';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { createApiUrl } from '@shared/config/api';
import Header from '@shared/components/Header/Header';
import { ThresholdProvider } from '@shared/lib/thresholds';
import { getWorkMode } from '../../model/workMode';
import { getThresholdsWithWorkMode } from '../../model/getDynamicThresholds';
import { getApiEndpoints } from './constants/apiEndpoints';
import { parseRouteParams } from '@features/home/model/tabs';
import { getNotisStatus } from './utils/getNotisStatus';
import { useCarbonizationData } from './hooks/useCarbonizationData';
import { useThresholds } from './hooks/useThresholds';
import { useRecommendedValues } from './hooks/useRecommendedValues';
import { TablesList } from './components/TablesList';

export const CurrentParams = () => {
  const params = useParams<{ type?: string; id?: string }>();
  const { id } = parseRouteParams(params.type, params.id);

  const { vr, notis: notisEndpoint } = getApiEndpoints(id);
  const { data, loading, error } = useData<Carbonization>(createApiUrl(vr));
  const { data: notis } = useData<Notis>(createApiUrl(notisEndpoint));

  const { orderedTemperatures, imData, levelsData } = useCarbonizationData(data ?? undefined);

  const temperature1SK = orderedTemperatures?.['1-СК'];
  const workModeInfo = useMemo(() => getWorkMode(temperature1SK), [temperature1SK]);
  const dynamicThresholds = useMemo(() => getThresholdsWithWorkMode(temperature1SK), [temperature1SK]);

  const thresholds = useThresholds({
    orderedTemperatures,
    pressures: data?.pressures,
    vacuums: data?.vacuums,
    levelsData,
    imData,
    gorelka: data?.gorelka,
    thresholds: dynamicThresholds,
  });

  const recommended = useRecommendedValues({
    orderedTemperatures,
    pressures: data?.pressures,
    vacuums: data?.vacuums,
    levelsData,
    workMode: workModeInfo.mode,
  });

  const notisStatus = useMemo(() => getNotisStatus(notis ?? undefined), [notis]);
  const headerTitle = `Печь карбонизации №${id}`;

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <ThresholdProvider thresholds={dynamicThresholds}>
      <Header title={headerTitle} mode={true} workMode={workModeInfo.label} notisStatus={notisStatus} />
      <TablesList
        orderedTemperatures={orderedTemperatures}
        pressures={data?.pressures}
        vacuums={data?.vacuums}
        levelsData={levelsData}
        im={data?.im}
        gorelka={data?.gorelka}
        notis={notis ?? undefined}
        {...thresholds}
        {...recommended}
      />
    </ThresholdProvider>
  );
};
