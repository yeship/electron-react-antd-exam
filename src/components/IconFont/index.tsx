
import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

import settings from '@/config/settings';

export interface IconFontProps {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}

const IconFontCN = createFromIconfontCN({
  scriptUrl: settings.iconfontUrl,
});

const IconFont: React.FC<IconFontProps> = props => {
  return <IconFontCN {...props} />;
};

export default IconFont;
