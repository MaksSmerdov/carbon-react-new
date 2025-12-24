export interface Range {
  min?: number;
  max?: number;
  unit: string;
}

export interface EffectiveRangeParam {
  min?: number;
  max?: number;
  unit?: string;
  steady?: Range;
  startup?: Range;
}

export const recommendedTemperatures: Record<string, EffectiveRangeParam> = {
  '1-СК': { min: 550, max: 800, unit: '°C' },
  '2-СК': { max: 700, unit: '°C' },
  '3-СК': {
    steady: { max: 400, unit: '°C' },
    startup: { max: 750, unit: '°C' },
  },
  'В топке': { max: 1000, unit: '°C' },
  'Вверху камеры загрузки': { max: 1000, unit: '°C' },
  'Внизу камеры загрузки': { min: 1000, max: 1100, unit: '°C' },
  'На входе печи дожига': { max: 1200, unit: '°C' },
  'На выходе печи дожига': { max: 1200, unit: '°C' },
  'Камеры выгрузки': { max: 750, unit: '°C' },
  'Дымовых газов котла': { max: 1100, unit: '°C' },
  'Газов до скруббера': { max: 400, unit: '°C' },
  'Газов после скруббера': { max: 100, unit: '°C' },
  'Воды в ванне скруббера': { max: 90, unit: '°C' },
  'Гранул после холод-ка': { max: 70, unit: '°C' },
};

export const recommendedLevels: Record<string, Range> = {
  'В ванне скруббера': { min: 250, unit: 'мм' },
  'В барабане котла': { min: -100, max: 100, unit: 'мм' },
  'В емкости ХВО': { min: 1500, unit: 'мм' },
};

export const recommendedPressures: Record<string, Range> = {
  'Давление газов после скруббера': { max: 20, unit: 'кгс/м²' },
  'Давление пара в барабане котла': { max: 5, unit: 'кгс/см²' },
};

export const recommendedVacuums: Record<string, Range> = {
  'В топке печи': { min: -4.0, max: -1.0, unit: 'кгс/м²' },
  'В котле утилизаторе': { min: -12.0, max: -3.0, unit: 'кгс/м²' },
  'Низ загрузочной камеры': { min: -5.0, max: -1.0, unit: 'кгс/м²' },
};

