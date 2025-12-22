import { Button as MUIButton, type ButtonProps as MUIButtonProps } from '@mui/material';
import styles from './Button.module.scss';

export interface ButtonProps extends MUIButtonProps {
  className?: string;
}

export const Button = ({ className, children, ...rest }: ButtonProps) => {
  const mergedClassName = className ? `${styles['button']} ${className}` : styles['button'];

  return (
    <MUIButton {...rest} className={mergedClassName} disableElevation>
      {children}
    </MUIButton>
  );
};
