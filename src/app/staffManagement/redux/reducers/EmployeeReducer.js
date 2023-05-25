import {
  ADD_EMPLOYEE_FAILED,
  ADD_EMPLOYEE_REQUESTED,
  ADD_EMPLOYEE_SUCCEEDED,
  DELETE_EMPLOYEE_FAILED,
  DELETE_EMPLOYEE_REQUESTED,
  DELETE_EMPLOYEE_SUCCEEDED,
  EDIT_EMPLOYEE_FAILED,
  EDIT_EMPLOYEE_REQUESTED,
  EDIT_EMPLOYEE_SUCCEEDED,
  GET_EMPLOYEES_FAILED,
  GET_EMPLOYEES_REQUESTED,
  GET_EMPLOYEES_SUCCEEDED,
  RESET_EMPLOYEE,
  RESET_EMPLOYEE_SUCCEEDED,
  SET_EMPLOYEE,
  SET_EMPLOYEE_SUCCEEDED,
} from "../constants/employeeConstant";

const initialState = {
  listEmployee: [],
  employee: {},
  loading: false,
  error: false,
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_REQUESTED:
    case ADD_EMPLOYEE_REQUESTED:
    case EDIT_EMPLOYEE_REQUESTED:
    case DELETE_EMPLOYEE_REQUESTED:
    case SET_EMPLOYEE:
    case RESET_EMPLOYEE:
      return { ...state, loading: true };

    // CASE SUCCESS:
    case SET_EMPLOYEE_SUCCEEDED:
    case RESET_EMPLOYEE_SUCCEEDED:
      return { ...state, employee: action.payload };

    case GET_EMPLOYEES_SUCCEEDED:
      return {
        ...state,
        listEmployee: action.payload,
        loading: false,
        error: false,
      };

    case ADD_EMPLOYEE_SUCCEEDED:
    case EDIT_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case DELETE_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: false,
      };

    // CASE FAIL:
    case GET_EMPLOYEES_FAILED:
    case ADD_EMPLOYEE_FAILED:
    case EDIT_EMPLOYEE_FAILED:
    case DELETE_EMPLOYEE_FAILED:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default EmployeeReducer;
