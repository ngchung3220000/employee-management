import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT;

export const getTotalEmployeeCount = (status) => {
  return axios.get(API_PATH + `/employees/total?statuses=${status}`);
};

export const getAllEmployee = (status, page, rowPerPage) => {
  return axios.get(
    API_PATH + `/employees?statuses=${status}&page=${page}&size=${rowPerPage}`
  );
};

export const getEmployeeById = (id) => {
  return axios.get(API_PATH + `/employees/${id}`);
};

export const addEmployee = (item) => {
  return axios.post(API_PATH + "/employees", item);
};

export const editEmployee = (item) => {
  return axios.put(
    API_PATH + `/employees/${item.employeeInfo.employeeId}`,
    item
  );
};

export const deleteEmployee = (id) => {
  const data = { status: 14 };
  return axios.put(API_PATH + `/employees/${id}/status`, data);
};

// REGIST API

export const addRegist = (id, item) => {
  return axios.put(API_PATH + `/employees/${id}/status`, item);
};
