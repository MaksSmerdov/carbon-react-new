import { Alert, type AlertProps } from '@mui/material';
import styles from './Error.module.scss';

export interface ErrorProps extends AlertProps {
  className?: string;
  message?: string;
}

export const Error = ({ className, message = 'Произошла ошибка загрузки данных', ...rest }: ErrorProps) => {
  const mergedClassName = className ? `${styles['error']} ${className}` : styles['error'];

  return (
    <Alert {...rest} severity="error" className={mergedClassName}>
      {message}
    </Alert>
  );
};
