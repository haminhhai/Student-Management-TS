import { Layout } from 'antd';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import React from 'react';

export interface PublicLayoutProps {
    children: React.ReactNode;
}

const cx = classNames.bind(style);
const { Content } = Layout;
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <Layout className={cx('container')}>
      <Content className={cx('wrapper')}>
        {children}
      </Content>
    </Layout>
  );
}
