// Базовый URL API в зависимости от режима
const getBaseUrl = (): string => {
  const isDevelopment = import.meta.env.MODE === 'production';

  if (isDevelopment) {
    return 'http://localhost:3002';
  }

  return 'http://169.254.0.156:3002';
};

export const API_BASE_URL = getBaseUrl();

// Вспомогательная функция для создания полного URL эндпоинта
export const createApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Константы для конкретных эндпоинтов
export const API_ENDPOINTS = {
  VR1_DATA: 'api/vr1-data',
  VR2_DATA: 'api/vr2-data',
  NOTIS1_DATA: 'api/notis1-data',
  NOTIS2_DATA: 'api/notis2-data',

} as const;
