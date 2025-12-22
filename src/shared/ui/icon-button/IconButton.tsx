import { IconButton as MUIIconButton, type IconButtonProps as MUIIconButtonProps } from '@mui/material';
import styles from './IconButton.module.scss';

export interface IconButtonProps extends MUIIconButtonProps {
  className?: string;
}

export const IconButton = ({ className, children, ...rest }: IconButtonProps) => {
  const mergedClassName = className ? `${styles['iconButton']} ${className}` : styles['iconButton'];

  return (
    <MUIIconButton {...rest} className={mergedClassName}>
      {children}
    </MUIIconButton>
  );
};
