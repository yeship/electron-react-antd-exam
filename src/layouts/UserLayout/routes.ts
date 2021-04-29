import { RoutesDataItem } from '@/utils/routes';

/**
 * User Layout 路由页面
 */
const UserLayoutRoutes: RoutesDataItem[] = [
  {
    title: '登录',
    path: '/user/login',
    component: '@/pages/user/login',
  },
  {
    title: '注册',
    path: '/user/register',
    component: '@/pages/user/register',
  },
];

export default UserLayoutRoutes;
