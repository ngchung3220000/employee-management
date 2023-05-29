import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Icon,
  IconButton,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { TextValidator } from "react-material-ui-form-validator";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import MaterialTable from "material-table";
import DialogDelete from "../../dialog/DialogDelete";

export default function CertificateForm(props) {
  const { listCertificate, setListCertificate } = props;
  const [certificate, setCertificate] = useState({});
  const [idCertificate, setIdCertificate] = useState();
  const [dialogDelete, setDialogDelete] = useState(false);

  function handleChangeValue(e) {
    setCertificate({ ...certificate, [e.target.name]: e.target.value });
  }

  const handleDateChange = (name, date) => {
    setCertificate({
      ...certificate,
      [name]: moment(date).format("YYYY-MM-DD"),
    });
  };

  const handleSubmitCertificate = () => {
    certificate?.employeeId ? handleEditCertificate() : handleAddCertificate();
    setCertificate({});
  };

  const handleAddCertificate = () => {
    const data = { ...certificate };
    setListCertificate([...listCertificate, data]);
  };

  const handleEditCertificate = () => {
    const newListCertificate = listCertificate;

    const certificateIndex = listCertificate.findIndex(
      (item) => item?.certificateId === certificate?.certificateId
    );

    newListCertificate[certificateIndex] = certificate;

    setListCertificate([...newListCertificate]);
  };

  const handleOpenDialogDelete = (rowData) => {
    setDialogDelete(true);
    setIdCertificate(rowData.certificateId);
  };

  const handleDeleteCertificate = () => {
    setListCertificate(
      listCertificate.filter((item) => item.certificateId !== idCertificate)
    );
    setDialogDelete(false);
  };

  const columns = [
    {
      title: "Thao tác",
      field: "action",
      render: (rowData) => {
        return (
          <div className="none_wrap">
            <div>
              <IconButton size="small" onClick={() => setCertificate(rowData)}>
                <Icon color="primary">edit</Icon>
              </IconButton>

              <IconButton
                size="small"
                onClick={() => handleOpenDialogDelete(rowData)}
              >
                <Icon style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                  delete
                </Icon>
              </IconButton>
            </div>
          </div>
        );
      },
    },
    { title: "Tên văn bằng", field: "name" },
    { title: "Lĩnh vực", field: "field" },
    { title: "Nơi cấp", field: "educationalOrg" },
    {
      title: "Ngày cấp",
      field: "issuanceDate",
      render: (rowData) => {
        return moment(rowData?.issuanceDate).format("DD/MM/YYYY");
      },
    },
  ];

  return (
    <Grid>
      <DialogContent style={{ padding: "10px 0px", overflow: "hidden" }}>
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <div className="flex flex-space-between flex-middle mt-10">
          <Button
            variant="contained"
            className="mr-12"
            color="primary"
            onClick={handleSubmitCertificate}
          >
            {certificate?.employeeId ? "Sửa văn bằng" : "Thêm văn bằng"}
          </Button>
        </div>
      </DialogActions>

      <MaterialTable
        style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 8px" }}
        title={
          <span
            style={{ color: "#1d6d1e", fontSize: "18px", fontWeight: "500" }}
          >
            Danh sách văn bằng
          </span>
        }
        columns={columns}
        data={listCertificate}
        options={{
          headerStyle: {
            backgroundColor: "#358600",
            color: "#FFF",
            paddingRight: "0px",
          },
        }}
      />

      {dialogDelete && (
        <DialogDelete
          dialogDelete={dialogDelete}
          setDialogDelete={setDialogDelete}
          handleDelete={handleDeleteCertificate}
        />
      )}
    </Grid>
  );
}
