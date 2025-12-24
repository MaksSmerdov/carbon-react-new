export type ThresholdOperator = '>' | '<' | '>=' | '<=' | '===' | '!==';

export interface Threshold {
  key: string;
  value: number;
  operator: ThresholdOperator;
}

export type ThresholdsConfig = Record<string, Threshold | Threshold[]>;

export interface ThresholdCheckResult {
  isExceeded: boolean;
  threshold?: Threshold;
}

