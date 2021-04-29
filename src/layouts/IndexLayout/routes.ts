import { RoutesDataItem } from '@/utils/routes';

/**
 * Index Layout 路由页面
 */
const IndexLayoutRoutes: RoutesDataItem[] = [
  {
    icon: 'components',
    title: '考试管理',
    path: '/exam',
    redirect: '/exam/list',
    routes: [
      {
        icon: 'control',
        title: '试题列表',
        path: 'list',
        component: '@/pages/exam',
      },
      {
        icon: 'control',
        title: '正在考试',
        path: 'answer',
        hidden: true,
        component: '@/pages/exam/components/Answer',
      },
      {
        icon: 'control',
        title: '考试结果',
        path: 'result',
        hidden: true,
        component: '@/pages/exam/components/Result',
      },
  ]}
];

export default IndexLayoutRoutes;
