import type { SensorData } from '@shared/types/types';
import { getAlarmClassName } from '@shared/lib/thresholds';
import styles from './Table.module.scss';

export interface TableProps {
  title: string;
  data?: SensorData;
  unit?: string;
  recommended?: boolean;
  exceededKeys?: Record<string, boolean>;
  recommendedValues?: Record<string, string>;
}

export const Table = ({ title, data, unit, recommended, exceededKeys, recommendedValues }: TableProps) => {
  return (
    <div>
      {title && <div className={styles['table__title']}>{title}</div>}
      <table className={styles['table']}>
        <thead className={styles['table__thead']}>
          <tr className="table__tr">
            <th className="table__th table__left">Наименования</th>
            <th className="table__th">Значения {unit}</th>
            {recommended && <th className="table__th">Рекомендуемые параметры</th>}
          </tr>
        </thead>
        <tbody className={styles['table__body']}>
          {Object.entries(data || {}).map(([key, value]) => (
            <tr key={key} className="table__tr">
              <td className="table__td table__left">{key}</td>
              <td className={`table__td table__value ${getAlarmClassName(exceededKeys?.[key] ?? false)}`}>
                {String(value)}
              </td>
              {recommended && <td className="table__td">{recommendedValues?.[key] || '-'}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
