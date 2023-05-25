import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import EmployeeForm from "./InformationForm/EmployeeForm";
import CertificateForm from "./InformationForm/CertificateForm";
import FamilyRelationshipForm from "./InformationForm/FamilyRelationshipForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addEmployee } from "app/staffManagement/api/EmployeeServices";
import {
  addEmployeeRequested,
  editEmployeeRequested,
} from "app/staffManagement/redux/actions/EmployeeAction";
import moment from "moment";
import { create } from "lodash";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ padding: "30px 10px" }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EmployeeDialogSubmit(props) {
  const { open, close, employee, setEmployee } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  console.log(employee);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(employee);
    employee?.employeeInfo?.employeeId
      ? dispatch(
          editEmployeeRequested({
            ...employee,
            employeeInfo: {
              ...employee.employeeInfo,
              gender: +employee?.employeeInfo?.gender,

              dateOfBirth: moment(employee?.employeeInfo?.dateOfBirth).format(
                "YYYY-MM-DD"
              ),
            },
          })
        )
      : dispatch(
          addEmployeeRequested({
            ...employee,
            employeeInfo: {
              ...employee.employeeInfo,
              gender: +employee?.employeeInfo?.gender,
            },
          })
        );
    close();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog maxWidth="lg" fullWidth={true} open={open} onClose={close}>
      <DialogTitle style={{ paddingBottom: "10px" }}>
        <span style={{ color: "#1d6d1e" }}>
          {employee?.employeeInfo?.employeeId
            ? "Sửa nhân viên"
            : "Thêm nhân viên"}
        </span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={close}
        >
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>
      <ValidatorForm onSubmit={handleOnSubmit}>
        <DialogContent style={{ padding: "10px 0px" }}>
          {/* <SimpleTabs /> */}
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <EmployeeForm employee={employee} setEmployee={setEmployee} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CertificateForm employee={employee} setEmployee={setEmployee} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <FamilyRelationshipForm
              employee={employee}
              setEmployee={setEmployee}
            />
          </TabPanel>
        </DialogContent>

        <DialogActions>
          <div className="flex flex-space-between flex-middle mt-10">
            <Button
              variant="contained"
              className="mr-12"
              color="secondary"
              onClick={() => {}}
            >
              Đăng ký
            </Button>

            <Button
              variant="contained"
              className="mr-12"
              color="default"
              onClick={() => close()}
            >
              Hủy
            </Button>

            <Button
              type="submit"
              variant="contained"
              className="mr-12"
              color="primary"
            >
              {employee?.employeeInfo?.employeeId ? "Sửa nhân viên" : "Lưu"}
            </Button>
          </div>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}
