import { forwardRef } from 'react';
import { TextField, type TextFieldProps } from '@mui/material';
import styles from './Input.module.scss';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  className?: string;
}

export const Input = forwardRef<HTMLDivElement, InputProps>(({ className, ...rest }, ref) => {
  const mergedClassName = className ? `${styles['input']} ${className}` : styles['input'];

  return <TextField {...rest} ref={ref} variant='outlined' className={mergedClassName} />;
});

Input.displayName = 'Input';
