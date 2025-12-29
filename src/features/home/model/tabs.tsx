import type { ReactNode } from 'react';
import SpeedIcon from '@mui/icons-material/Speed';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export type SubTab = {
  label: string;
  value: string;
  icon?: ReactNode;
};

export type MainTab = {
  label: string;
  value: string;
  type: string;
  id: number;
  subTabs: SubTab[];
};

// Шаблон подтабов, который будет использоваться для всех ПК
export const SUB_TABS_TEMPLATE: SubTab[] = [
  {
    label: 'Текущие параметры',
    value: 'current',
    icon: <SpeedIcon fontSize="small" />,
  },
  {
    label: 'Мнемосхема',
    value: 'mnemo',
    icon: <SchemaOutlinedIcon fontSize="small" />,
  },
  {
    label: 'Графики',
    value: 'charts',
    icon: <ShowChartIcon fontSize="small" />,
  },
];

// Конфигурация единиц (type и id отдельно для упрощения)
const UNITS = [
  { label: 'ПК №1', type: 'carbonization', id: 1 },
  { label: 'ПК №2', type: 'carbonization', id: 2 },
  { label: 'МПА №1', type: 'mpa', id: 1 },
  { label: 'МПА №2', type: 'mpa', id: 2 },
  { label: 'МПА №3', type: 'mpa', id: 3 },
  // Здесь можно легко добавить новые единицы, просто указав type и id
] as const;

// Генерация табов на основе конфигурации
export const TABS: MainTab[] = UNITS.map((unit) => ({
  label: unit.label,
  value: `${unit.type}-${unit.id}`, // Для обратной совместимости
  type: unit.type,
  id: unit.id,
  subTabs: SUB_TABS_TEMPLATE,
}));

export const DEFAULT_MAIN = TABS[0]?.value ?? '';
export const DEFAULT_SUB = TABS[0]?.subTabs[0]?.value ?? '';

// Вспомогательные функции для работы с роутами
export const getRoutePath = (type: string, id: number, sub: string = DEFAULT_SUB) => {
  return `/${type}/${id}/${sub}`;
};

export const parseRouteParams = (type?: string, id?: string) => {
  const unitType = type ?? 'carbonization';
  const unitId = id ? parseInt(id, 10) : 1;
  return { type: unitType, id: unitId };
};

