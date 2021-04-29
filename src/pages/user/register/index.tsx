import React from 'react';
import { connect, Link, Dispatch, history } from 'umi';
import { Form, Input, Button, message, Select  } from 'antd';

import { StateType } from './model';

import styles from './style.less';

const { Option } = Select;

interface RegisterProps {
  userregister: StateType;
  submitLoading?: boolean;
  dispatch: Dispatch;
}

const Register: React.FC<RegisterProps> = props => {
  const { submitLoading, dispatch } = props;
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      const fieldsValue = await form.validateFields();
      console.log(fieldsValue)
      const res: boolean = await dispatch({
        type: 'userregister/register',
        payload: fieldsValue,
      });
      if (res) {
        message.success('注册成功！');
        history.replace('/user/login');
      }
    } catch (error) {
      message.warning('请输入必填项！');
    }
  };

  const onGenderChange = (value: string) => {
    switch (value) {
      case '网络工程1班':
        form.setFieldsValue({ note: '网络工程1班' });
        return;
      case '网络工程2班':
        form.setFieldsValue({ note: '网络工程2班' });
        return;
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>
        {' '}
        注册账号{' '}
      </h1>

      <Form form={form} name="basic">
        <Form.Item name="grade" label="" rules={[{ required: true,message: '请选择班级' }]}>
          <Select
              placeholder="请选择班级"
              onChange={onGenderChange}
              allowClear
          >
            <Option value="网络工程1班">网络工程1班</Option>
            <Option value="网络工程2班">网络工程2班</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label=""
          name="username"
          rules={[
            {
              required: true,
              message: '请输入账号',
            },
          ]}
        >
          <Input
            placeholder={'请输入账号'}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password
            placeholder={'请输入密码'}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="confirm"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('您输入的两个密码不匹配!');
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={'确认密码'}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className={styles.submit}
            onClick={() => onFinish()}
            loading={submitLoading}
          >
            注册
          </Button>
          <div className="text-align-right">
            <Link to="/user/login">
              已有账户？现在登录！
            </Link>
          </div>
        </Form.Item>

        {/*{errorMsg !== '' &&*/}
        {/*  typeof errorMsg !== 'undefined' &&*/}
        {/*  !submitLoading && <Alert message={errorMsg} type="error" showIcon />}*/}
      </Form>
    </div>
  );
};

export default connect(
  ({
    userregister,
    loading,
  }: {
    userregister: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userregister: userregister,
    submitLoading: loading.effects['userregister/register'],
  }),
)(Register);
