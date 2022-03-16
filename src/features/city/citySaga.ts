import { PayloadAction } from "@reduxjs/toolkit";
import cityApi from "api/city";
import { City, ListResponse } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";

function* fetchCityList() {
    try {
        const response: ListResponse<City> = yield call(cityApi.getAll);
        yield put(cityActions.fetchCityListSuccess(response));
    } catch (error) {
        yield put(cityActions.fetchCityListFailed());
    }
    }

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
