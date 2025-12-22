import { CurrentParams } from '@features/carbonization/sections/current-params/CurrentParams';
import styles from './CurrentParamsPage.module.scss';

export const CurrentParamsPage = () => {
  return (
    <div className={styles['currentParamsPage']}>
      <CurrentParams />
    </div>
  );
};