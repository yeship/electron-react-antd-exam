import React from 'react';
import { connect, Dispatch, Link, history } from 'umi';
import { Form, Input, Button, Alert, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';

import { LoginParamsType } from './data.d';
import { StateType } from './model';

import styles from './style.less';

interface LoginProps {
  userlogin: StateType;
  submitLoading?: boolean;
  dispatch: Dispatch;
  location: Location & { query: any };
}

const Login: React.FC<LoginProps> = props => {
  const { userlogin, submitLoading, dispatch, location } = props;
  const { query } = location;
  const { redirect } = query;
  const { loginStatus } = userlogin;


  // 登录
  const handleSubmit = async (values: LoginParamsType) => {
    const res: boolean = await dispatch({
      type: 'userlogin/login',
      payload: values,
    });
    if (res === true) {
      message.success(
        '登录成功！'
      );
      history.replace(redirect || '/');
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>
        在线考试小系统
      </h1>

      <Form name="basic" onFinish={handleSubmit}>
        <Form.Item
          label=""
          name="username"
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入正确的账号',
          //   },
          // ]}
        >
          <Input
            placeholder={'请输入账号'}
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入密码',
          //   },
          // ]}
        >
          <Input.Password
            placeholder={'请输入密码'}
            prefix={<UnlockOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className={styles.submit}
            htmlType="submit"
            loading={submitLoading}
          >
            登录
          </Button>
          <div className="text-align-right">
            <Link to="/user/register">
              还没有账号，现在去注册！
            </Link>
          </div>
        </Form.Item>

        {loginStatus === 'error' && !submitLoading && (
          <Alert
            message={'账号或者密码不正确!'}
            type="error"
            showIcon
          />
        )}
      </Form>
    </div>
  );
};

export default connect(
  ({
    userlogin,
    loading,
  }: {
    userlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userlogin: userlogin,
    submitLoading: loading.effects['userlogin/login'],
  }),
)(Login);
