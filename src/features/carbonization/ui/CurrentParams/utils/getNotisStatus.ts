import type { Notis } from '@features/carbonization/model/types';

export const getNotisStatus = (notis: Notis | undefined): string => {
  if (!notis) return 'Нет данных';

  switch (notis.status) {
    case 'working':
      return 'Работает';
    case 'idle':
      return 'Не работает';
    default:
      return 'Неизвестно';
  }
};

