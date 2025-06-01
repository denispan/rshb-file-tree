import styles from './styles.module.css';
import React from 'react';
import cn from 'classnames';

export interface ButtonProps {
  title?: string;
  onClick: () => void;
  bgColor?: 'yellow' | 'lightGreen';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  bgColor = 'lightGreen',
}) => {

  return (
    <button
      className={cn(
        styles.button,
        styles[bgColor],
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
