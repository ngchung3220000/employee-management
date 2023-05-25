import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import DateFnsUtils from "@date-io/date-fns";
import { GENDER } from "app/staffManagement/constants/constants";
import moment from "moment";

export default function FamilyRelationshipForm(props) {
  const { employee, setEmployee } = props;
  const [familyRelation, setFamilyRelation] = useState({});
  const [listFamilyRelation, setListFamilyRelation] = useState(
    employee?.familyRelations || []
  );
  console.log(familyRelation, listFamilyRelation);
  useEffect(() => {
    if (employee?.employeeInfo?.employeeId) {
      listFamilyRelation.map((item) => {
        if (item.employeeId === employee?.employeeInfo?.employeeId) {
          return setFamilyRelation(item);
        }
      });
    }
  }, [employee?.employeeInfo?.employeeId, listFamilyRelation]);

  const handleChangeValue = (e) => {
    setFamilyRelation({ ...familyRelation, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFamilyRelation({
      ...familyRelation,
      dateOfBirth: moment(date).format("YYYY-MM-DD"),
    });
  };

  return (
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
          value={familyRelation?.name || ""}
          name="name"
          size="small"
          validators={["required", "matchRegexp:^(?! )[^]+(?<! )$"]}
          errorMessages={[
            "Đừng để trống nhé",
            "Đừng để dấu cách ở đầu và cuối dòng nhé",
          ]}
          onChange={handleChangeValue}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          select
          variant="outlined"
          size="small"
          label="Giới tính"
          value={
            familyRelation?.employeeId
              ? +familyRelation?.gender
              : familyRelation?.gender || ""
          }
          name="gender"
          onChange={handleChangeValue}
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
              Mối quan hệ
            </span>
          }
          type="text"
          value={familyRelation?.relation || ""}
          name="relation"
          size="small"
          validators={["required"]}
          errorMessages={["Đừng để trống nhé"]}
          onChange={handleChangeValue}
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
          type="number"
          value={familyRelation?.citizenId || ""}
          name="citizenId"
          size="small"
          validators={["required"]}
          errorMessages={["Đừng để trống nhé"]}
          onChange={handleChangeValue}
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
            value={familyRelation?.dateOfBirth || null}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
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
          type="number"
          value={familyRelation?.phone || ""}
          name="phone"
          size="small"
          validators={["required"]}
          errorMessages={["Đừng để trống nhé"]}
          onChange={handleChangeValue}
        />
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
          type="email"
          value={familyRelation?.email || ""}
          name="email"
          size="small"
          validators={["required", "isEmail"]}
          errorMessages={["Đừng để trống nhé", "Email sai định dạng"]}
          onChange={handleChangeValue}
        />
      </Grid>

      <Grid item xs={6}>
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
          value={familyRelation?.address || ""}
          name="address"
          size="small"
          validators={["required", "matchRegexp:^(?! )[^]+(?<! )$"]}
          errorMessages={[
            "Đừng để trống nhé",
            "Đừng để dấu cách ở đầu và cuối dòng nhé",
          ]}
          onChange={handleChangeValue}
        />
      </Grid>
    </Grid>
  );
}
