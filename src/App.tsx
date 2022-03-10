import React, { useEffect } from 'react';
import cityApi from 'api/city';
import studentApi from 'api/student';
import LoginPage from 'features/auth/pages/login';
import { AdminLayout } from 'components/layout';
import { NotFound, PrivateRoute } from 'components/common';
import { Route, Switch } from 'react-router-dom';

function App() {
  useEffect(() => {
    cityApi.getAll().then((res) => {
      console.log(res);
    });
  });

  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>

      <PrivateRoute path="/admin">
        <AdminLayout />
      </PrivateRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
