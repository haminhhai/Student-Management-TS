import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(2000);
    console.log('handleLogin', payload);
    localStorage.setItem('SMS_TOKEN', 'abcdefu');
    yield put(authActions.loginSuccess({
      id: 1,
      name: 'HaiHM'
    }))
    yield put(push('/admin'))
  } catch (error: any) {
      yield put(authActions.loginFailed(error.message))
  }
}

function* handleLogout() {
  console.log('handleLogout');
  localStorage.removeItem('SMS_TOKEN');
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = localStorage.getItem('SMS_TOKEN') !== null;
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
