import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { SMS_TOKEN } from 'constants/index';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { getToken } from 'utils';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(2000);
    const userData = {
      id: 1,
      name: 'HaiHM',
      role: 'admin'
    }
    yield put(authActions.loginSuccess(userData));
    localStorage.setItem(SMS_TOKEN, 'abcdefu');
    yield put(push('/admin/dashboard'))
  } catch (error: any) {
      yield put(authActions.loginFailed(error.message))
  }
}

function* handleLogout() {
  localStorage.removeItem(SMS_TOKEN);
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = getToken() !== null;
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
