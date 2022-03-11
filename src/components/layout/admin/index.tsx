import { Layout } from 'antd';
import React from 'react';
import { Header, SideBar } from '..';

export interface AdminLayoutProps {}

const { Content } = Layout;

export function AdminLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <SideBar />
      <Layout>
        <Header />
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
}
