import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditStudent from './pages/add-edit-student';
import ListStudents from './pages/list-students';

export interface StudentFeatureProps {
}

export default function StudentFeature (props: StudentFeatureProps) {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList())
  }, [dispatch])

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
