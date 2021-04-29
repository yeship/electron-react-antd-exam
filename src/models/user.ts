import { Effect, Reducer, history } from 'umi';
import { stringify } from 'querystring';
// import { ResponseData } from '@/utils/request';
// import { queryCurrent, queryMessage } from '@/services/user';
import { removeToken } from '@/utils/localToken';
import { getUser } from '@/utils/localUser';

export interface CurrentUser {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
}

export interface UserModelState {
  currentUser: CurrentUser;
  message: number;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    logout: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    saveMessage: Reducer<UserModelState>;
  };
}

const initState: UserModelState = {
  currentUser: {
    id: 0,
    name: '',
    avatar: '',
    roles: [],
  },
  message: 0,
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: initState,

  effects: {
    *fetchCurrent(_, { call, put }) {
      try {
        // const response: ResponseData = yield call(queryCurrent);
        // const { data } = response;
        let data = yield call(getUser)
        yield put({
          type: 'saveCurrentUser',
          payload: JSON.parse(data) || {},
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    *logout(_, { call, put }) {
      const { location } = history;
      const { pathname, search } = location;
      yield call(removeToken);
      yield put({
        type: 'saveCurrentUser',
        payload: {
          ...initState.currentUser,
        },
      });
      if (pathname !== '/user/login') {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: pathname + search,
          }),
        });
      }
    },
  },

  reducers: {
    saveCurrentUser(state, { payload }) {
      return {
        ...initState,
        ...state,
        currentUser: {
          ...initState.currentUser,
          ...payload,
        },
      };
    },
    saveMessage(state, { payload }) {
      return {
        ...initState,
        ...state,
        message: payload,
      };
    },
  },
};

export default UserModel;
