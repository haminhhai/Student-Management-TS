import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditStudent from './pages/add-edit-student';
import ListStudents from './pages/list-students';

export interface StudentFeatureProps {
}

export default function StudentFeature (props: StudentFeatureProps) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.path} exact >
        <ListStudents />
      </Route>
      <Route path={`${match.path}/add`}>
        <AddEditStudent />
      </Route>
      <Route path={`${match.path}/:studentId`}>
        <AddEditStudent />
      </Route>
    </Switch>
  );
}
