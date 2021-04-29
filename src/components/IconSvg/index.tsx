
import React from 'react';
import style from './style.less';

const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('../../assets/iconsvg', false, /\.svg$/));
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}

export interface IconSvgProps {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}

const IconSvg: React.FC<IconSvgProps> = props => {
  const { type, className, ...attr } = props;

  return (
    <svg className={`${style['icon-svg']} ${className || ''}`} {...attr}>
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};

export default IconSvg;
