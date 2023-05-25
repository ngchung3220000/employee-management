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

// ROW DATA
export const setEmployeeAction = (payload) => {
  return {
    type: SET_EMPLOYEE,
    payload: payload,
  };
};

export const setEmployeeActionSucceeded = (payload) => {
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

// GET ALL EMPLOYEES
export const getAllEmployeeRequested = (payload) => {
  return {
    type: GET_EMPLOYEES_REQUESTED,
    payload: payload,
  };
};

export const getAllEmployeeSucceeded = (payload) => {
  return {
    type: GET_EMPLOYEES_SUCCEEDED,
    payload: payload,
  };
};

export const getAllEmployeeFailed = (payload) => {
  return {
    type: GET_EMPLOYEES_FAILED,
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
