import { Table } from '@shared/ui';
import type { Notis } from '@features/carbonization/model/types';
import type { SensorData } from '@shared/types/types';

interface TablesListProps {
  orderedTemperatures?: SensorData;
  pressures?: SensorData;
  vacuums?: SensorData;
  levelsData?: SensorData;
  im?: Record<string, boolean | number>;
  gorelka?: SensorData;
  notis?: Notis;
  temperaturesExceeded: Record<string, boolean>;
  pressuresExceeded: Record<string, boolean>;
  vacuumsExceeded: Record<string, boolean>;
  levelsExceeded: Record<string, boolean>;
  imExceeded: Record<string, boolean>;
  gorelkaExceeded: Record<string, boolean>;
  temperaturesRecommended: Record<string, string>;
  pressuresRecommended: Record<string, string>;
  vacuumsRecommended: Record<string, string>;
  levelsRecommended: Record<string, string>;
}

export const TablesList = ({
  orderedTemperatures,
  pressures,
  vacuums,
  levelsData,
  im,
  gorelka,
  notis,
  temperaturesExceeded,
  pressuresExceeded,
  vacuumsExceeded,
  levelsExceeded,
  imExceeded,
  gorelkaExceeded,
  temperaturesRecommended,
  pressuresRecommended,
  vacuumsRecommended,
  levelsRecommended,
}: TablesListProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px',
      }}
    >
      <Table
        data={orderedTemperatures}
        unit="(°C)"
        title="Температуры"
        exceededKeys={temperaturesExceeded}
        recommended={true}
        recommendedValues={temperaturesRecommended}
      />
      <Table
        data={pressures}
        unit="(кгс/м²)"
        title="Давления"
        exceededKeys={pressuresExceeded}
        recommended={true}
        recommendedValues={pressuresRecommended}
      />
      <Table
        data={vacuums}
        unit="(кгс/м²)"
        title="Разрежения"
        exceededKeys={vacuumsExceeded}
        recommended={true}
        recommendedValues={vacuumsRecommended}
      />
      <Table
        data={levelsData}
        unit="(мм)"
        title="Уровни"
        exceededKeys={levelsExceeded}
        recommended={true}
        recommendedValues={levelsRecommended}
      />
      <Table data={im} title="ИМ" exceededKeys={imExceeded} />
      <Table data={gorelka} unit="(%)" title="Горелки" exceededKeys={gorelkaExceeded} />
      <Table data={notis?.data} title="Нотис" />
    </div>
  );
};

