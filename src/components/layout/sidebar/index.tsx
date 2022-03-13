import { Layout, Menu } from 'antd';
import React, { useMemo, useState } from 'react';
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import { useHistory, useLocation } from 'react-router-dom';

export interface SideBarProps {}

const cx = classNames.bind(style);
const { Sider } = Layout;
const Trigger = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
};

export function SideBar(props: SideBarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const activeDashboard = useMemo(() => location.pathname.includes('admin/dashboard'), [location]);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider
      trigger={<Trigger isCollapsed={collapsed} />}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className={cx('logo')}>Student Management</div>
      <Menu theme="dark" mode="inline" selectedKeys={[activeDashboard ? '1' : '2']}>
        <Menu.Item
          key="1"
          icon={<DashboardOutlined />}
          onClick={() => history.push('/admin/dashboard')}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<UnorderedListOutlined />}
          onClick={() => history.push('/admin/students')}
        >
          Student
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
