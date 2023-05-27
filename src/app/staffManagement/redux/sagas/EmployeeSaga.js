import { takeEvery, put, call } from "redux-saga/effects";
import {
  addEmployeeFailed,
  addEmployeeSucceeded,
  deleteEmployeeFailed,
  deleteEmployeeSucceeded,
  editEmployeeFailed,
  editEmployeeSucceeded,
  getAllEmployeeFailed,
  getAllEmployeeSucceeded,
  resetEmployeeActionSucceeded,
  setEmployeeActionSucceeded,
} from "../actions/EmployeeAction";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployee,
  getEmployeeById,
} from "app/staffManagement/api/EmployeeServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SUCCESS } from "app/staffManagement/constants/constants";
import {
  ADD_EMPLOYEE_REQUESTED,
  DELETE_EMPLOYEE_REQUESTED,
  EDIT_EMPLOYEE_REQUESTED,
  GET_ALL_EMPLOYEE_REQUESTED,
  RESET_EMPLOYEE,
  SET_EMPLOYEE,
} from "../constants/employeeConstant";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

export function* fetchGetEmployeeById(action) {
  try {
    const result = yield call(getEmployeeById, action.payload);
    if (result?.data?.code === SUCCESS) {
      yield put(setEmployeeActionSucceeded(result?.data?.data));
    } else {
      toast.error(result?.data?.message);
    }
  } catch (error) {
    toast.error("Lỗi máy chủ rồi!!!");
  }
}

export function* resetEmployee(action) {
  yield put(resetEmployeeActionSucceeded(action.payload));
}

export function* fetchGetAllEmployee(action) {
  try {
    const result = yield call(
      getAllEmployee,
      action.payload.status,
      action.payload.page,
      action.payload.rowPerPage
    );
    if (result?.data?.code === SUCCESS) {
      yield put(getAllEmployeeSucceeded(result?.data?.data));
    } else {
      yield put(getAllEmployeeFailed());
      toast.error(result?.data?.message);
    }
  } catch (error) {
    toast.error("Lỗi máy chủ rồi!!!");
  }
}

function* fetchAddEmployee(action) {
  try {
    const result = yield call(addEmployee, action.payload);
    if (result?.data?.code === SUCCESS) {
      yield put(addEmployeeSucceeded());
      toast.success(result?.data?.message);
    } else {
      yield put(addEmployeeFailed());
    }
  } catch (error) {
    toast.error("Lỗi máy chủ rồi!!!");
  }
}

function* fetchEditEmployee(action) {
  try {
    const result = yield call(editEmployee, action.payload);
    if (result?.data?.code === SUCCESS) {
      yield put(editEmployeeSucceeded());
      toast.success(result?.data?.message);
    } else {
      yield put(editEmployeeFailed());
      toast.error(result?.data?.message);
    }
  } catch (error) {
    toast.error("Lỗi máyaaa chủ rồi!!!");
  }
}

function* fetchDeleteEmployee(action) {
  try {
    const result = yield call(deleteEmployee, action.payload);
    if (result?.data?.code === SUCCESS) {
      yield put(deleteEmployeeSucceeded());
      toast.success(result?.data?.message);
    } else {
      yield put(deleteEmployeeFailed());
      toast.error(result?.data?.message);
    }
  } catch (error) {
    toast.error("Lỗi máy chủ rồi!!!");
  }
}

export default function* rootEmployeeSaga() {
  yield takeEvery(SET_EMPLOYEE, fetchGetEmployeeById);
  yield takeEvery(RESET_EMPLOYEE, resetEmployee);
  yield takeEvery(GET_ALL_EMPLOYEE_REQUESTED, fetchGetAllEmployee);
  yield takeEvery(ADD_EMPLOYEE_REQUESTED, fetchAddEmployee);
  yield takeEvery(EDIT_EMPLOYEE_REQUESTED, fetchEditEmployee);
  yield takeEvery(DELETE_EMPLOYEE_REQUESTED, fetchDeleteEmployee);
}
