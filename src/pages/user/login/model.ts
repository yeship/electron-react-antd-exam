import { Effect, Reducer } from 'umi';
// import { setToken } from '@/utils/localToken';
import { setUser } from '@/utils/localUser';
import { ResponseData } from '@/utils/request';
import { accountLogin } from './service';

export interface StateType {
  loginStatus?: 'ok' | 'error';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const initState: StateType = {
  loginStatus: undefined,
};

const Model: ModelType = {
  namespace: 'userlogin',
  state: initState,
  effects: {
    *login({ payload }, { call, put }) {
      let status = undefined;
      try {
        const response: ResponseData = yield call(accountLogin, payload);
        const { data } = response;
        yield call(setUser, JSON.stringify(data) || '');
        status = 'ok';
      } catch (error) {
        if (error.message && error.message === 'CustomError') {
          status = 'error';
        }
      }
      yield put({
        type: 'changeLoginStatus',
        payload: status,
      });

      if (status === 'ok') {
        return true;
      } else if (status === 'error') {
        return false;
      }
      return undefined;
    },
  },
  // effects: {
  //   *login({ payload }, { call, put }) {
  //     try {
  //       yield call(accountLogin,payload);
  //       // localforage.setItem('user','')
  //       return true;
  //     } catch (error) {
  //       return false;
  //     }
  //   },
  // },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...initState,
        ...state,
        loginStatus: payload,
      };
    },
  },
};

export default Model;
