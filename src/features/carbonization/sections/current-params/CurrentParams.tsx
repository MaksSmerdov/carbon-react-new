import { Table } from '@shared/ui';
import { useData } from '@shared/hooks/useData';
import type { Carbonization, Notis } from '@features/carbonization/types/types';
import { Loader } from '@shared/ui/loader/Loader';
import { Error } from '@shared/ui/error/Error';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { createApiUrl, API_ENDPOINTS } from '@shared/config/api';
import { TEMPERATURE_ORDER } from './constants/temperatureOrder';
import { reorderObject } from './utils/reorderObject';

// Маппинг между значением таба и эндпоинтом API для VR данных
const TAB_TO_VR_ENDPOINT: Record<string, keyof typeof API_ENDPOINTS> = {
  'carbonization-1': 'VR1_DATA',
  'carbonization-2': 'VR2_DATA',
};

// Маппинг между значением таба и эндпоинтом API для NOTIS данных
const TAB_TO_NOTIS_ENDPOINT: Record<string, keyof typeof API_ENDPOINTS> = {
  'carbonization-1': 'NOTIS1_DATA',
  'carbonization-2': 'NOTIS2_DATA',
};

export const CurrentParams = () => {
  const params = useParams<{ main?: string }>();
  const mainTab = params.main ?? 'carbonization-1';

  // Определяем эндпоинт для VR данных на основе текущего таба
  const vrEndpointKey = TAB_TO_VR_ENDPOINT[mainTab] ?? 'VR1_DATA';
  const vrEndpoint = API_ENDPOINTS[vrEndpointKey];

  // Определяем эндпоинт для NOTIS данных на основе текущего таба
  const notisEndpointKey = TAB_TO_NOTIS_ENDPOINT[mainTab] ?? 'NOTIS1_DATA';
  const notisEndpoint = API_ENDPOINTS[notisEndpointKey];

  const { data, loading, error } = useData<Carbonization>(createApiUrl(vrEndpoint));
  const { data: notis } = useData<Notis>(createApiUrl(notisEndpoint));

  const orderedTemperatures = useMemo(() => {
    return reorderObject(data?.temperatures, TEMPERATURE_ORDER);
  }, [data?.temperatures]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px',
      }}
    >
      <Table data={orderedTemperatures} unit="(°C)" title="Температуры" />
      <Table data={data?.pressures} unit="(кгс/м²)" title="Давления" />
      <Table data={data?.vacuums} unit="(кгс/м²)" title="Разрежения" />
      <Table
        data={Object.fromEntries(Object.entries(data?.levels ?? '-').map(([key, level]) => [key, level.value]))}
        unit="(мм)"
        title="Уровни"
      />
      <Table data={data?.im} title="ИМ" />
      <Table data={data?.gorelka} unit="(%)" title="Горелки" />
      <Table data={notis?.data} title="Нотис" />
    </div>
  );
};
