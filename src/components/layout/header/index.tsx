import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout } from 'antd';
import * as React from 'react';

export interface HeaderProps {
}

const { Header: AntHeader } = Layout;

export function Header (props: HeaderProps) {
  return (
    <AntHeader>
        <Avatar size={32} icon={<UserOutlined />} />
    </AntHeader>
  );
}
