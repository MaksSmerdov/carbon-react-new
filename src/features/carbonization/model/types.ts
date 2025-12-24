type SensorData = Record<string, number>;

interface LevelData {
  value: number;
  percent: number;
}

export interface Carbonization {
  temperatures: SensorData;
  levels: Record<string, LevelData>;
  pressures: SensorData;
  vacuums: SensorData;
  im: Record<string, boolean | number>;
  gorelka: SensorData;
}

export interface Notis {
  data: SensorData;
  status?: 'idle' | 'working';
}
