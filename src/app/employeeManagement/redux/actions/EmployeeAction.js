import {
  LEADER_ACTION_REQUESTED,
  LEADER_ACTION_SUCCEEDED,
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
  UPDATE_FORM_EMPLOYEE_REQUEST,
  UPDATE_FORM_EMPLOYEE_SUCCEEDED,
  GET_TOTAL_EMPLOYEE,
  GET_TOTAL_EMPLOYEE_SUCCEEDED,
  RESET_EMPLOYEE,
  RESET_EMPLOYEE_SUCCEEDED,
  SET_EMPLOYEE,
  SET_EMPLOYEE_SUCCEEDED,
} from "../constants/employeeConstant";

// ROW DATA
export const getEmployeeById = (payload) => {
  return {
    type: SET_EMPLOYEE,
    payload: payload,
  };
};

export const getEmployeeByIdSucceeded = (payload) => {
  return {
    type: SET_EMPLOYEE_SUCCEEDED,
    payload: payload,
  };
};

export const resetEmployeeAction = (payload) => {
  return {
    type: RESET_EMPLOYEE,
    payload: payload,
  };
};

export const resetEmployeeActionSucceeded = (payload) => {
  return {
    type: RESET_EMPLOYEE_SUCCEEDED,
    payload: payload,
  };
};

export const getTotalEmployeeCountRequested = (payload) => {
  return {
    type: GET_TOTAL_EMPLOYEE,
    payload: payload,
  };
};

export const getTotalEmployeeCountSucceeded = (payload) => {
  return {
    type: GET_TOTAL_EMPLOYEE_SUCCEEDED,
    payload: payload,
  };
};

// GET ALL EMPLOYEES
export const getAllEmployeeRequested = (payload) => {
  return {
    type: GET_ALL_EMPLOYEE_REQUESTED,
    payload: payload,
  };
};

export const getAllEmployeeSucceeded = (payload) => {
  return {
    type: GET_ALL_EMPLOYEE_SUCCEEDED,
    payload: payload,
  };
};

export const getAllEmployeeFailed = (payload) => {
  return {
    type: GET_ALL_EMPLOYEE_FAILED,
    payload: payload,
  };
};

// ADD EMPLOYEE
export const addEmployeeRequested = (payload) => {
  return {
    type: ADD_EMPLOYEE_REQUESTED,
    payload: payload,
  };
};

export const addEmployeeSucceeded = (payload) => {
  return {
    type: ADD_EMPLOYEE_SUCCEEDED,
    payload: payload,
  };
};

export const addEmployeeFailed = (payload) => {
  return {
    type: ADD_EMPLOYEE_FAILED,
    payload: payload,
  };
};

// EDIT EMPLOYEE
export const editEmployeeRequested = (payload) => {
  return {
    type: EDIT_EMPLOYEE_REQUESTED,
    payload: payload,
  };
};

export const editEmployeeSucceeded = (payload) => {
  return {
    type: EDIT_EMPLOYEE_SUCCEEDED,
    payload: payload,
  };
};

export const editEmployeeFailed = (payload) => {
  return {
    type: EDIT_EMPLOYEE_FAILED,
    payload: payload,
  };
};

// DELETE EMPLOYEE
export const deleteEmployeeRequested = (payload) => {
  return {
    type: DELETE_EMPLOYEE_REQUESTED,
    payload: payload,
  };
};

export const deleteEmployeeSucceeded = (payload) => {
  return {
    type: DELETE_EMPLOYEE_SUCCEEDED,
    payload: payload,
  };
};

export const deleteEmployeeFailed = (payload) => {
  return {
    type: DELETE_EMPLOYEE_FAILED,
    payload: payload,
  };
};

// GET FORM EMPLOYEE
export const getFormEmployeeRequested = (payload) => {
  return {
    type: GET_FORM_EMPLOYEE,
    payload: payload,
  };
};

export const getFormEmployeeSucceeded = (payload) => {
  return {
    type: GET_FORM_EMPLOYEE_SUCCEEDED,
    payload: payload,
  };
};

//UPDATE FORM EMPLOYEE
export const updateFormEmployeeRequested = (payload) => {
  return {
    type: UPDATE_FORM_EMPLOYEE_REQUEST,
    payload: payload,
  };
};

export const updateFormEmployeeSucceeded = (payload) => {
  return {
    type: UPDATE_FORM_EMPLOYEE_SUCCEEDED,
    payload: payload,
  };
};

// ADDITIONAL REQUEST

export const leaderActionRequest = (payload) => {
  return {
    type: LEADER_ACTION_REQUESTED,
    payload: payload,
  };
};

export const leaderActionSucceeded = (payload) => {
  return {
    type: LEADER_ACTION_SUCCEEDED,
    payload: payload,
  };
};
