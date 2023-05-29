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
  GET_ALL_EMPLOYEE_FAILED,
  GET_ALL_EMPLOYEE_REQUESTED,
  GET_ALL_EMPLOYEE_SUCCEEDED,
  GET_FORM_EMPLOYEE,
  GET_FORM_EMPLOYEE_SUCCEEDED,
  GET_TOTAL_EMPLOYEE,
  GET_TOTAL_EMPLOYEE_SUCCEEDED,
  RESET_EMPLOYEE,
  RESET_EMPLOYEE_SUCCEEDED,
  SET_EMPLOYEE,
  SET_EMPLOYEE_SUCCEEDED,
  SET_LIST_CERTIFICATE,
  SET_LIST_FAMILY_RELATIONSHIP,
} from "../constants/employeeConstant";

const initialState = {
  listEmployee: [],
  employee: {
    employeeInfo: {},
    certificates: [],
    familyRelations: [],
  },
  totalEmployeeCount: 0,
  formEmployee: {},
  loading: false,
  error: false,
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOTAL_EMPLOYEE:
    case GET_ALL_EMPLOYEE_REQUESTED:
    case ADD_EMPLOYEE_REQUESTED:
    case EDIT_EMPLOYEE_REQUESTED:
    case DELETE_EMPLOYEE_REQUESTED:
    case SET_EMPLOYEE:
    case RESET_EMPLOYEE:
    case GET_FORM_EMPLOYEE:
      return { ...state, loading: true };

    // CASE SUCCESS:
    case SET_EMPLOYEE_SUCCEEDED:
    case RESET_EMPLOYEE_SUCCEEDED:
      return { ...state, employee: action.payload };

    case GET_TOTAL_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        totalEmployeeCount: action.payload,
      };

    case GET_ALL_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        listEmployee: action.payload,
        loading: false,
        error: false,
      };

    case ADD_EMPLOYEE_SUCCEEDED:
    case EDIT_EMPLOYEE_SUCCEEDED:
      console.log("payload reducer", action);
      return {
        ...state,
        loading: false,
        error: false,
        employee: action.payload,
      };

    case DELETE_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case GET_FORM_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        formEmployee: action.payload,
      };

    // CASE FAIL:
    case GET_ALL_EMPLOYEE_FAILED:
    case ADD_EMPLOYEE_FAILED:
    case EDIT_EMPLOYEE_FAILED:
    case DELETE_EMPLOYEE_FAILED:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default EmployeeReducer;
