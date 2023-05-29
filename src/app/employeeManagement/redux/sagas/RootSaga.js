import { all } from "redux-saga/effects";
import rootEmployeeSaga from "./EmployeeSaga";

export default function* RootSaga() {
  yield all([rootEmployeeSaga()]);
}
