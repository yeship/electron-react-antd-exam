import React from 'react';

import styles from '../style.less';

export interface RightFooterProps {}

const RightFooter: React.FC<RightFooterProps> = () => {
  return (
    <div className={styles['indexlayout-right-footer']}>
      <div className={styles['footer-links']}>
        <a href="" rel="noreferrer">
          在线考试小系统
        </a>
      </div>
      <div>Copyright © 2021 YESHIP, All Rights Reserved</div>
    </div>
  );
};

export default RightFooter;
