import request from '@/utils/request';

import { LoginParamsType } from './data.d';

export async function accountLogin(params: LoginParamsType): Promise<any> {
  return request('/users/login', {
    method: 'POST',
    data: params,
  });
}
