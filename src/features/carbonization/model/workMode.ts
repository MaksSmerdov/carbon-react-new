export type WorkMode = 'not-working' | 'warming-up' | 'established';

export interface WorkModeInfo {
  mode: WorkMode;
  label: string;
  alarmsEnabled: boolean;
}

/**
 * Определяет режим работы печи на основе температуры 1-СК
 * @param temperature1SK - температура 1-СК
 * @returns информация о режиме работы
 */
export const getWorkMode = (temperature1SK: number | undefined): WorkModeInfo => {
  if (temperature1SK === undefined || temperature1SK < 10) {
    return {
      mode: 'not-working',
      label: 'Печь не в работе',
      alarmsEnabled: false,
    };
  }

  if (temperature1SK >= 10 && temperature1SK < 550) {
    return {
      mode: 'warming-up',
      label: 'Выход на режим',
      alarmsEnabled: true,
    };
  }

  return {
    mode: 'established',
    label: 'Установившийся режим',
    alarmsEnabled: true,
  };
};

/**
 * Получает уставку для 3-СК в зависимости от режима работы
 * @param mode - режим работы
 * @returns значение уставки
 */
export const get3SKThreshold = (mode: WorkMode): number => {
  switch (mode) {
    case 'warming-up':
      return 750;
    case 'established':
      return 400;
    case 'not-working':
    default:
      return 750;
  }
};

