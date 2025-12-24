import { CurrentParams } from '@features/carbonization';
import styles from './CurrentParamsPage.module.scss';

export const CurrentParamsPage = () => {
  return (
    <div className={styles['currentParamsPage']}>
      <CurrentParams />
    </div>
  );
};
