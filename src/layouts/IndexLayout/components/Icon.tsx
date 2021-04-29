
import React from 'react';
import Icons from '@/components/IconSvg';

export interface IconProps {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}

const Icon: React.FC<IconProps> = props => {
  return <Icons {...props} />;
};

export default Icon;
