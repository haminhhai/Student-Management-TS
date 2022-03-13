import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import { useAppDispatch } from 'app/hooks';
import classNames from 'classnames/bind';
import { authActions } from 'features/auth/authSlice';
import * as React from 'react';
import style from './index.module.scss';

export interface HeaderProps {}

const { Header: AntHeader } = Layout;
const cx = classNames.bind(style);

export function Header(props: HeaderProps) {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLogout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className={cx('container')}>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Avatar className={cx('avatar')} size={40} icon={<UserOutlined />} />
      </Dropdown>
    </AntHeader>
  );
}
