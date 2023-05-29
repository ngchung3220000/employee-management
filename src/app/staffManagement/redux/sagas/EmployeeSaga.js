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
  getTotalEmployeeCountSucceeded,
  resetEmployeeActionSucceeded,
  getEmployeeByIdSucceeded,
  getFormEmployeeSucceeded,
} from "../actions/EmployeeAction";
import {
  addEmployee,
  leaderAction,
  deleteEmployee,
  editEmployee,
  getAllEmployeeByStatus,
  getEmployeeById,
  getFormEmployee,
  getTotalEmployeeCount,
} from "app/staffManagement/api/EmployeeServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SUCCESS } from "app/staffManagement/constants/constants";
import {
  LEADER_ACTION_REQUESTED,
  ADD_EMPLOYEE_REQUESTED,
  DELETE_EMPLOYEE_REQUESTED,
  EDIT_EMPLOYEE_REQUESTED,
  GET_ALL_EMPLOYEE_REQUESTED,
  GET_FORM_EMPLOYEE,
  GET_TOTAL_EMPLOYEE,
  RESET_EMPLOYEE,
  SET_EMPLOYEE,
} from "../constants/employeeConstant";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

export function* fetchGetTotalEmployee(action) {
  try {
    const result = yield call(getTotalEmployeeCount, action.payload);
    if (result?.data?.code === SUCCESS) {
      yield put(getTotalEmployeeCountSucceeded(result?.data?.data));
    } else {
      toast.error(result?.data?.message);
    }
  } catch (error) {
    toast.error("Máy chủ lỗi!!!");
  }
}

export function* fetchGetEmployeeById(action) {
  try {
    const result = yield call(getEmployeeById, action.payload);
    if (result?.data?.code === SUCCESS) {
      yield put(getEmployeeByIdSucceeded(result?.data?.data));
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
      getAllEmployeeByStatus,
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
      yield put(addEmployeeSucceeded(action.payload));
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
      yield put(editEmployeeSucceeded(action.payload));
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

export function* fetchGetFormEmployee(action) {
  try {
    const result = yield call(getFormEmployee, action.payload);
    if (result?.data?.code === SUCCESS) {
      yield put(getFormEmployeeSucceeded(result?.data?.data));
    } else {
      toast.error(result?.data?.message);
    }
  } catch (error) {
    toast.error("Lỗi máy chủ rồi!!!");
  }
}

export function* fetchLeaderAction(action) {
  try {
    const result = yield call(
      leaderAction,
      action.payload.id,
      action.payload.data
    );
    if (result?.data?.code === SUCCESS) {
      toast.success("Gửi yêu cầu thành công");
    } else {
      toast.error("Gửi yêu cầu thất bại");
    }
  } catch (error) {
    toast.error("Máy chủ lỗi!!!");
  }
}

export default function* rootEmployeeSaga() {
  yield takeEvery(SET_EMPLOYEE, fetchGetEmployeeById);
  yield takeEvery(RESET_EMPLOYEE, resetEmployee);
  yield takeEvery(GET_TOTAL_EMPLOYEE, fetchGetTotalEmployee);
  yield takeEvery(GET_ALL_EMPLOYEE_REQUESTED, fetchGetAllEmployee);
  yield takeEvery(ADD_EMPLOYEE_REQUESTED, fetchAddEmployee);
  yield takeEvery(EDIT_EMPLOYEE_REQUESTED, fetchEditEmployee);
  yield takeEvery(DELETE_EMPLOYEE_REQUESTED, fetchDeleteEmployee);
  yield takeEvery(GET_FORM_EMPLOYEE, fetchGetFormEmployee);
  yield takeEvery(LEADER_ACTION_REQUESTED, fetchLeaderAction);
}
