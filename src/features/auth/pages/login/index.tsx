import { Button, Form, Input, Layout, Typography } from 'antd';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import React from 'react';
import { ReactComponent as User } from 'assets/images/user.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

const { Content } = Layout;
const { Title } = Typography;
const cx = classNames.bind(style);
export default function LoginPage() {
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);

  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    dispatch(
      authActions.login({
        username: values.username,
        password: values.password,
      })
    );
  };

  const submitLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Layout className={cx('container')}>
      <Content className={cx('wrapper')}>
        <User className={cx('user-icon')} />
        <Title>Student Management System</Title>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Username" name='username'>
            <Input placeholder="admin" />
          </Form.Item>
          <Form.Item label="Password" name='password'>
            <Input placeholder="admin" type='password'/>
          </Form.Item>
          <Form.Item style={{textAlign: 'center'}}>
            <Button
              htmlType="submit"
              loading={isLogging}
              type="primary"
              className={cx('login-button')}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <Button onClick={submitLogout}> Logout </Button>
      </Content>
    </Layout>
  );
}
