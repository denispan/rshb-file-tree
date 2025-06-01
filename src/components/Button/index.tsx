import styles from './styles.module.css';
import React from 'react';
import cn from 'classnames';

export interface ButtonProps {
  title?: string;
  onClick: () => void;
  bgColor?: 'yellow' | 'lightGreen' | 'default';
  children?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  children,
  bgColor = 'default',
  className,
}) => {

  return (
    <button
      className={cn(
        styles.button,
        styles[bgColor],
        className,
      )}
      onClick={onClick}
    >
      {title}
      {children}
    </button>
  );
};

export default Button;
