import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  TextField,
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
import { GENDER } from "../../constains";

export default function FamilyRelationshipForm(props) {
  const { listFamilyRelation, setListFamilyRelation } = props;
  const [familyRelation, setFamilyRelation] = useState({});
  const [idFamilyRelation, setIdFamilyRelation] = useState();
  const [dialogDelete, setDialogDelete] = useState(false);

  const handleChangeValue = (e) => {
    setFamilyRelation({ ...familyRelation, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFamilyRelation({
      ...familyRelation,
      dateOfBirth: moment(date).format("YYYY-MM-DD"),
    });
  };

  const handleSubmit = () => {
    familyRelation?.familyId
      ? handleEditFamilyRelation()
      : handleAddRelationship();
    setFamilyRelation({});
  };

  const handleAddRelationship = () => {
    const data = {
      ...familyRelation,
      gender: +familyRelation.gender,
    };
    setListFamilyRelation([...listFamilyRelation, data]);
  };

  const handleEditFamilyRelation = () => {
    const newListFamilyRelation = listFamilyRelation;

    const familyRelationIndex = listFamilyRelation.findIndex(
      (item) => item?.familyId === familyRelation?.familyId
    );

    newListFamilyRelation[familyRelationIndex] = familyRelation;

    setListFamilyRelation([...newListFamilyRelation]);
  };

  const handleOpenDialogDelete = (rowData) => {
    setDialogDelete(true);
    setIdFamilyRelation(rowData.familyId);
  };

  const handleDeleteFamilyRelation = () => {
    const newListFamilyRelation = listFamilyRelation.filter(
      (item) => item.familyId !== idFamilyRelation
    );
    setListFamilyRelation([...newListFamilyRelation]);
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
              <IconButton
                size="small"
                onClick={() => setFamilyRelation(rowData)}
              >
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
    { title: "Tên", field: "name" },
    {
      title: "Giới tính",
      field: "gender",
      render: (rowData) => {
        return GENDER.map((item) => {
          if (+item.id === rowData.gender) {
            return item.name;
          }
        });
      },
    },
    { title: "Mối quan hệ", field: "relation" },
    { title: "Căn cước công dân", field: "citizenId" },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      render: (rowData) => {
        return moment(rowData?.dateOfBirth).format("DD/MM/YYYY");
      },
    },
    { title: "Số điện thoại", field: "phone" },
    { title: "Email", field: "email" },
    { title: "Địa chỉ", field: "address" },
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
      </DialogContent>

      <DialogActions>
        <div className="flex flex-space-between flex-middle mt-10">
          <Button
            variant="contained"
            className="mr-12"
            color="primary"
            onClick={handleSubmit}
          >
            {familyRelation?.familyId
              ? "Sửa thông tin"
              : "Thêm quan hệ gia đình"}
          </Button>
        </div>
      </DialogActions>

      <MaterialTable
        style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 8px" }}
        title={
          <span
            style={{ color: "#1d6d1e", fontSize: "18px", fontWeight: "500" }}
          >
            Danh sách quan hệ gia đình
          </span>
        }
        columns={columns}
        data={listFamilyRelation}
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
          handleDelete={handleDeleteFamilyRelation}
        />
      )}
    </Grid>
  );
}
