import request from '@/utils/request';

import { AnswerParamsType } from './data.d';

export async function submitAnswer(params: AnswerParamsType): Promise<any> {
    return request('/users/submitAnswer', {
        method: 'POST',
        data: params,
    });
}
