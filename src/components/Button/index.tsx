import styles from './styles.module.css';
import React from 'react';
import cn from 'classnames';
import { ICON_SIZES, ICONS } from '../Icon/icons';
import Icon from '../Icon';

export interface ButtonProps {
  title?: string;
  onClick: (e?: React.MouseEvent) => void;
  bgColor?: 'yellow' | 'lightGreen' | 'deepGreen' | 'default';
  className?: string;
  icon?: keyof typeof ICONS;
  iconSize?: keyof typeof ICON_SIZES;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  bgColor = 'default',
  className,
  icon,
  iconSize = 'small',
}) => {
  return (
    <button
      className={cn(
        className,
        styles.button,
        styles[bgColor],
      )}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={iconSize} />}
      {title}
    </button>
  );
};

export default Button;
