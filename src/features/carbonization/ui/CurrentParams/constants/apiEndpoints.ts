import { API_ENDPOINTS } from '@shared/config/api';

export const TAB_TO_VR_ENDPOINT: Record<string, keyof typeof API_ENDPOINTS> = {
  'carbonization-1': 'VR1_DATA',
  'carbonization-2': 'VR2_DATA',
};

export const TAB_TO_NOTIS_ENDPOINT: Record<string, keyof typeof API_ENDPOINTS> = {
  'carbonization-1': 'NOTIS1_DATA',
  'carbonization-2': 'NOTIS2_DATA',
};

export const getApiEndpoints = (mainTab: string) => {
  const vrEndpointKey = TAB_TO_VR_ENDPOINT[mainTab] ?? 'VR1_DATA';
  const notisEndpointKey = TAB_TO_NOTIS_ENDPOINT[mainTab] ?? 'NOTIS1_DATA';

  return {
    vr: API_ENDPOINTS[vrEndpointKey],
    notis: API_ENDPOINTS[notisEndpointKey],
  };
};

