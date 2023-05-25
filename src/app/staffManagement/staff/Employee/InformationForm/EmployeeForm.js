import { Avatar, Grid, MenuItem, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { GENDER, TEAMS } from "app/staffManagement/constants/constants";
import { useSelector } from "react-redux";

export default function EmployeeForm(props) {
  const { employee, setEmployee } = props;

  const handleChangeImg = (e) => {
    setEmployee({
      ...employee,
      employeeInfo: {
        ...employee.employeeInfo,
        photoUrl: URL.createObjectURL(e.target.files[0]),
      },
    });
  };

  const handleOnChangeValue = (e) => {
    setEmployee({
      ...employee,
      employeeInfo: {
        ...employee.employeeInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleDateChange = (date) => {
    setEmployee({
      ...employee,
      employeeInfo: {
        ...employee.employeeInfo,
        dateOfBirth: moment(date).format("YYYY-MM-DD"),
      },
    });
  };

  return (
    <Grid container style={{ display: "flex" }}>
      <Grid item xs={4}>
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={employee?.employeeInfo?.photoUrl || ""}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />
          <input
            style={{ display: "none" }}
            id="avatar"
            type="file"
            onChange={handleChangeImg}
          />
          <label style={{ cursor: "pointer" }} htmlFor="avatar">
            Chọn ảnh
          </label>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextValidator
              variant="outlined"
              className="w-100"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Tên
                </span>
              }
              type="text"
              value={employee?.employeeInfo?.fullName || ""}
              name="fullName"
              size="small"
              validators={["required", "matchRegexp:^(?! )[^]+(?<! )$"]}
              errorMessages={[
                "Đừng để trống nhé",
                "Đừng để dấu cách ở đầu và cuối dòng nhé",
              ]}
              onChange={handleOnChangeValue}
            />
          </Grid>

          <Grid item xs={6}>
            <TextValidator
              variant="outlined"
              className="w-100"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Mã
                </span>
              }
              type="text"
              value={employee?.employeeInfo?.code || ""}
              name="code"
              size="small"
              validators={["required", "matchRegexp:^\\S{6,10}$"]}
              errorMessages={[
                "Đừng để trống nhé",
                "Mã sai định dạng nè (phải không dấu 'cách' và độ dài 6-10 ký tự nhé)",
              ]}
              onChange={handleOnChangeValue}
            />
          </Grid>

          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                inputVariant="outlined"
                className="w-100"
                size="small"
                disableToolbar
                format="dd/MM/yyyy"
                label="Ngày sinh"
                name="dateOfBirth"
                value={employee?.employeeInfo?.dateOfBirth || null}
                onChange={(e) => handleDateChange(e)}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              variant="outlined"
              size="small"
              label="Giới tính"
              value={
                employee?.employeeInfo?.employeeId
                  ? +employee?.employeeInfo?.gender
                  : employee?.employeeInfo?.gender || ""
              }
              name="gender"
              onChange={handleOnChangeValue}
            >
              {GENDER.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextValidator
              variant="outlined"
              className="w-100"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Email
                </span>
              }
              type="text"
              value={employee?.employeeInfo?.email || ""}
              name="email"
              size="small"
              validators={["required", "isEmail"]}
              errorMessages={["Đừng để trống nhé", "Email sai định dạng nè!!!"]}
              onChange={handleOnChangeValue}
            />
          </Grid>

          <Grid item xs={6}>
            <TextValidator
              variant="outlined"
              className="w-100"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Số điện thoại
                </span>
              }
              type="text"
              value={employee?.employeeInfo?.phone || ""}
              name="phone"
              size="small"
              validators={["required"]}
              errorMessages={[
                // , "matchRegexp:^\\d{11}$"
                "Đừng để trống nhé",
                "Số điện thoại phải đủ 11 số nhé",
              ]}
              onChange={handleOnChangeValue}
            />
          </Grid>

          <Grid item xs={6}>
            <TextValidator
              variant="outlined"
              className="w-100"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Căn cước công dân
                </span>
              }
              type="text"
              value={employee?.employeeInfo?.citizenId || ""}
              name="citizenId"
              size="small"
              validators={["required", "isNumber"]}
              errorMessages={["Đừng để trống nhé", "Chỉ nhận số thôi nè"]}
              onChange={handleOnChangeValue}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Nhóm"
              variant="outlined"
              size="small"
              value={employee?.employeeInfo?.teamId || ""}
              name="teamId"
              onChange={handleOnChangeValue}
            >
              {TEAMS.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextValidator
              variant="outlined"
              className="w-100"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Địa chỉ
                </span>
              }
              type="text"
              value={employee?.employeeInfo?.address || ""}
              name="address"
              size="small"
              validators={["required"]}
              errorMessages={["Đừng để trống nhé"]}
              onChange={handleOnChangeValue}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
