import { Layout } from 'antd';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/student';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, SideBar } from '..';

const { Content } = Layout;

export const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <SideBar />
        <Content style={{ padding: '32px' }}>
          <Switch>
            <Route path="/admin/dashboard">
              <Dashboard />
            </Route>
            <Route path="/admin/students">
              <StudentFeature />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
