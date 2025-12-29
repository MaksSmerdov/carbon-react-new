import type { SensorData } from "@shared/types/types";

export interface Activation {
    temperatures: SensorData,
    pressures: SensorData
}