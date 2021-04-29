import React from 'react';
import { connect, Dispatch } from 'umi';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { UserModelState, CurrentUser } from '@/models/user';
import styles from '../style.less';

interface RightTopUserProps {
  currentUser?: CurrentUser;
  dispatch: Dispatch;
}

const RightTopUser: React.FC<RightTopUserProps> = props => {
  const { currentUser, dispatch } = props;

  const onMenuClick = (event: MenuInfo) => {
    const { key } = event;

    if (key === 'logout') {
      dispatch({ type: 'user/logout' });
      return;
    }
  };

  const UserDropdownMenu = (
    <Menu onClick={onMenuClick}>
      {/*<Menu.Item key="userinfo">*/}
      {/*  个人信息*/}
      {/*</Menu.Item>*/}
      <Menu.Item key="logout">
        退出
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={UserDropdownMenu}>
      <a
        className={`${styles['indexlayout-top-usermenu']} ant-dropdown-link`}
        onClick={e => e.preventDefault()}
      >
        {currentUser?.name} <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default connect(({ user }: { user: UserModelState }) => ({
  currentUser: user.currentUser,
}))(RightTopUser);
