import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchCount } from "./counterAPI";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

function* test() {
    yield fetchCount(2)

    yield put(incrementSagaSuccess(2))
}

function* handelIncrementSaga(action: PayloadAction<number>) {
  yield delay(2000)
  yield put(incrementSagaSuccess(action.payload))
}

export default function* counterSaga() {
    yield takeLatest(incrementSaga.toString(), handelIncrementSaga)
}