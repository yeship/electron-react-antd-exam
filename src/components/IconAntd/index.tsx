
import React from 'react';
import * as Icons from '@ant-design/icons';

export interface IconAntdProps {
  type: string;
  rotate?: number;
  spin?: boolean;
  twoToneColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

const IconAntd: React.FC<IconAntdProps> = props => {
  const { type, ...attr } = props;

  return Icons[type] ? React.createElement(Icons[type], { ...attr }) : null;
};

export default IconAntd;
