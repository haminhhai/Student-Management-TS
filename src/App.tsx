import { NotFound, PrivateRoute } from 'components/common';
import { AdminLayout, PublicLayout } from 'components/layout';
import LoginPage from 'features/auth/pages/login';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getToken } from 'utils';

export default function App() {
  const isLoggedIn = Boolean(getToken());

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return isLoggedIn ? <Redirect to={'/admin'} /> : <Redirect to="/login" />;
          }}
        />
        <Route path="/login">
          <PublicLayout>
            <LoginPage />
          </PublicLayout>
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}
