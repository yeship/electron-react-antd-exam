import React from 'react';
import { Link } from 'umi';
import { Result, Button } from 'antd';

export default () => {
  return (
    <div className="indexlayout-main-conent">
      <Result
        status="404"
        title="404"
        subTitle="很抱歉, 您访问的资源已不在."
        extra={
          <Link to="/">
            <Button type="primary">返回主页</Button>
          </Link>
        }
      />
    </div>
  );
};
