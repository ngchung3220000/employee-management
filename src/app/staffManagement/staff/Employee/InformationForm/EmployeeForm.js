import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, Grid, MenuItem, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { TextValidator } from "react-material-ui-form-validator";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { GENDER, TEAMS } from "../../constains";

export default function EmployeeForm(props) {
  const { employeeInfo, setEmployeeInfo } = props;

  const handleChangeImg = (e) => {
    setEmployeeInfo({
      ...employeeInfo,
      photoUrl: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleOnChangeValue = (e) => {
    setEmployeeInfo({
      ...employeeInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setEmployeeInfo({
      ...employeeInfo,
      dateOfBirth: moment(date).format("YYYY-MM-DD"),
    });
  };

  return (
    <Grid container>
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
            src={employeeInfo?.photoUrl || ""}
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
              value={employeeInfo?.fullName || ""}
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
              value={employeeInfo?.code || ""}
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
                value={employeeInfo?.dateOfBirth || null}
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
              value={employeeInfo?.gender || ""}
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
              value={employeeInfo?.email || ""}
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
              value={employeeInfo?.phone || ""}
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
              value={employeeInfo?.citizenId || ""}
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
              value={employeeInfo?.teamId || ""}
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
              value={employeeInfo?.address || ""}
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
