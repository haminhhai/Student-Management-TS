/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import { useAppDispatch } from 'app/hooks';
import classNames from 'classnames/bind';
import { authActions } from 'features/auth/authSlice';
import style from './index.module.scss';
import { ReactComponent as User } from 'assets/images/user.svg';
import { DingtalkCircleFilled } from '@ant-design/icons';

export interface HeaderProps {}

const { Header: AntHeader } = Layout;
const cx = classNames.bind(style);

export function Header(props: HeaderProps) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLogout}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className={cx('container')}>
      <div className={cx('logo')}>
        <DingtalkCircleFilled className={cx('logo_icon')} />
        <p>Student Management</p>
      </div>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Avatar className={cx('avatar')} size={40} icon={<User className={cx('user-ic')} />} />
      </Dropdown>
    </AntHeader>
  );
}
