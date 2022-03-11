import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { DashboardTwoTone, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import style from './index.module.scss';

export interface SideBarProps {}

const cx = classNames.bind(style);
const { Sider } = Layout;
const Trigger = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
};

export function SideBar(props: SideBarProps) {
  const [collapsed, setCollapsed] = useState(false);

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
      <div className={cx('logo')} >
          Student Management
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<DashboardTwoTone />}>
          Dashboard
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
