import { Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector } from "react-redux";
import moment from "moment";

export default function CertificateForm(props) {
  const { employee, setEmployee } = props;
  const [date, setDate] = useState();
  const [certificate, setCertificate] = useState({});
  const [listCertificates, setListCertificates] = useState(
    employee?.certificates || []
  );

  useEffect(() => {
    if (employee?.employeeInfo?.employeeId)
      listCertificates.map((certificate) => {
        if (certificate?.employeeId === employee?.employeeInfo?.employeeId) {
          return setCertificate(certificate);
        }
      });
  }, []);

  const handleChangeValue = (e) => {
    setCertificate({ ...certificate, [e.target.name]: e.target.value });
  };

  console.log(certificate);
  const handleDateChange = (name, date) => {
    setCertificate({
      ...certificate,
      [name]: moment(date).format("YYYY-MM-DD"),
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
          value={certificate?.name || ""}
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
        <TextValidator
          variant="outlined"
          className="w-100"
          label={
            <span className="font">
              <span style={{ color: "red" }}> * </span>
              Lĩnh vực
            </span>
          }
          type="text"
          value={certificate?.field || ""}
          name="field"
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
        <TextValidator
          variant="outlined"
          className="w-100"
          label={
            <span className="font">
              <span style={{ color: "red" }}> * </span>
              Nội dung
            </span>
          }
          type="text"
          value={certificate?.content || ""}
          name="content"
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
        <TextValidator
          variant="outlined"
          className="w-100"
          label={
            <span className="font">
              <span style={{ color: "red" }}> * </span>
              Nơi cấp
            </span>
          }
          type="text"
          value={certificate?.educationalOrg || ""}
          name="educationalOrg"
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
        <TextValidator
          variant="outlined"
          className="w-100"
          label={
            <span className="font">
              <span style={{ color: "red" }}> * </span>
              Bằng cấp
            </span>
          }
          type="text"
          value={certificate?.graduatedWith || ""}
          name="graduatedWith"
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            inputVariant="outlined"
            className="w-100"
            size="small"
            disableToolbar
            format="dd/MM/yyyy"
            label="Ngày cấp"
            name="issuanceDate"
            value={certificate?.issuanceDate || null}
            onChange={(e) => handleDateChange("issuanceDate", e)}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            inputVariant="outlined"
            className="w-100"
            size="small"
            disableToolbar
            format="dd/MM/yyyy"
            label="Ngày bắt đầu"
            name="educationStartDate"
            value={certificate?.educationStartDate || null}
            onChange={(e) => handleDateChange("educationStartDate", e)}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            inputVariant="outlined"
            className="w-100"
            size="small"
            disableToolbar
            format="dd/MM/yyyy"
            label="Ngày kết thúc"
            name="educationEndDate"
            value={certificate?.educationEndDate || null}
            onChange={(e) => handleDateChange("educationEndDate", e)}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
}
