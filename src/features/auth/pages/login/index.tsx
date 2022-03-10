import { Button, Layout, Typography } from 'antd';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import React from 'react';
import { ReactComponent as User } from 'assets/images/user.svg';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

const { Content } = Layout;
const { Title } = Typography;
const cx = classNames.bind(style);
export default function LoginPage() {
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        dispatch(authActions.login({
            username: 'admin',
            password: 'admin',
        }))
    }
  return (
    <Layout className={cx('container')}>
      <Content className={cx('wrapper')}>
        <User className={cx('user-icon')} />
        <Title>Student Management System</Title>
        <Button type="primary" className={cx('login-button')} onClick={handleSubmit}>
          Login
        </Button>
      </Content>
    </Layout>
  );
}
