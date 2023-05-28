import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getTotalEmployeeCount = (status) => {
  return axios.get(API_PATH + `/employees/total?statuses=${status}`);
};

export const getAllEmployeeByStatus = (status, page, rowPerPage) => {
  return axios.get(
    API_PATH + `/employees?statuses=${status}&page=${page}&size=${rowPerPage}`
  );
};

export const getEmployeeById = (id) => {
  return axios.get(API_PATH + `/employees/${id}`);
};

export const addEmployee = (data) => {
  return axios.post(API_PATH + "/employees", data);
};

export const editEmployee = (data) => {
  return axios.put(
    API_PATH + `/employees/${data.employeeInfo.employeeId}`,
    data
  );
};

export const deleteEmployee = (id) => {
  const data = { status: 14 };
  return axios.put(API_PATH + `/employees/${id}/status`, data);
};

// REGIST API

export const addRegist = (id, data) => {
  return axios.put(API_PATH + `/employees/${id}/status`, data);
};

export const getFormEmployee = (id) => {
  return axios.get(API_PATH + `/employees/${id}/form`);
};

export const additionalRequest = (id, data) => {
  return axios.put(API_PATH + `/employees/${id}/status`, data);
};
