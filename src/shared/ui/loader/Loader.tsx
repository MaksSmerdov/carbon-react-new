import { CircularProgress, type CircularProgressProps } from '@mui/material';
import styles from './Loader.module.scss';

export interface LoaderProps extends CircularProgressProps {
  className?: string;
}

export const Loader = ({ className, ...rest }: LoaderProps) => {
  const containerClassName = className ? `${styles['loader']} ${className}` : styles['loader'];
  const spinnerClassName = styles['loader__spinner'];

  return (
    <div className={containerClassName}>
      <CircularProgress {...rest} className={spinnerClassName} />
    </div>
  );
};
