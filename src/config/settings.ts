export interface SettingsType {
  /**
   * 站点名称
   */
  siteTitle: string;

  /**
   * 顶部菜单开启
   */
  topNavEnable: boolean;

  /**
   * 头部固定开启
   */
  headFixed: boolean;

  /**
   * 站点本地存储Token 的 Key值
   */
  siteTokenKey: string;

  /**
   * Ajax请求头发送Token 的 Key值
   */
  ajaxHeadersTokenKey: string;

  /**
   * Ajax返回值不参加统一验证的api地址
   */
  ajaxResponseNoVerifyUrl: string[];

  /**
   * iconfont.cn 项目在线生成的 js 地址
   */
  iconfontUrl: string[];

  /**
   * 404 模板路径
   */
  notFoundComponent: string;
}

const settings: SettingsType = {
  siteTitle: '在线考试小系统',
  topNavEnable: false,
  headFixed: true,
  siteTokenKey: 'yeship_token',
  ajaxHeadersTokenKey: 'x-token',
  ajaxResponseNoVerifyUrl: [
    '/users/login', // 用户登录
    '/users/info', // 获取用户信息
  ],
  iconfontUrl: [],
  notFoundComponent: '@/pages/404',
};

export default settings;
