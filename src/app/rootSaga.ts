import { all } from 'redux-saga/effects';
import authSaga from 'features/auth/authSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import studentSaga from 'features/student/studentSaga';
import citySaga from 'features/city/citySaga';

export default function* RootSaga() {
  yield all([authSaga(), dashboardSaga(), studentSaga(), citySaga()]);
}
