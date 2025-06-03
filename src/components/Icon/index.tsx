import React from 'react';
import { ICON_SIZES, ICONS } from './icons';

interface IconProps {
  className?: string;
  name: keyof typeof ICONS;
  size?: keyof typeof ICON_SIZES;
}

const Icon: React.FC<IconProps> = ({ className, name, size = 'medium' }) => {
  const IconComponent = ICONS[name];
  const { width, height } = ICON_SIZES[size];

  return (
      <IconComponent
      className={className}
      width={width}
      height={height}
      />
  );
};

export default Icon;
