import { Effect } from 'umi';
import { submitAnswer } from './service';

export interface StateType {}

export interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        submitAnswer: Effect;
    };
    reducers: {};
}
const initState: StateType = {};

const Model: ModelType = {
    namespace: 'answer',
    state: initState,
    effects: {
        *submitAnswer({ payload }, { call, put }) {
            try {
                const data = yield call(submitAnswer, payload);
                return data;
            } catch (error) {
                return null;
            }
        },
    },
    reducers: {},
};

export default Model;
