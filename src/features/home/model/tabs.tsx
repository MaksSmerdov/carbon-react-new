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

// Конфигурация ПК
const CARBONIZATION_UNITS = [
  { label: 'ПК №1', value: 'carbonization-1' },
  { label: 'ПК №2', value: 'carbonization-2' },
  // Здесь можно легко добавить ПК №3, №4 и т.д.
] as const;

// Генерация табов на основе конфигурации
export const TABS: MainTab[] = CARBONIZATION_UNITS.map((unit) => ({
  label: unit.label,
  value: unit.value,
  subTabs: SUB_TABS_TEMPLATE,
}));

export const DEFAULT_MAIN = TABS[0]?.value ?? '';
export const DEFAULT_SUB = TABS[0]?.subTabs[0]?.value ?? '';

