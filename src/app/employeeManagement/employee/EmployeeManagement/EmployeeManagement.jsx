import moment from "moment";
import React from "react";
import { GENDER } from "../constains";
import { STATUSES } from "app/employeeManagement/constants/constants";
import { Breadcrumb } from "egret";
import { Button, Grid, Icon, IconButton } from "@material-ui/core";
import MaterialTable from "material-table";

export default function EmployeeManagement() {
  const columns = [
    {
      title: "Thao tác",
      field: "action",
      render: (rowData) => {
        return (
          <div className="none_wrap">
            <IconButton size="small" onClick={() => {}}>
              <Icon color="primary">edit</Icon>
            </IconButton>

            <IconButton size="small" onClick={() => {}}>
              <Icon style={{ color: "red" }}>delete</Icon>
            </IconButton>

            <IconButton size="small" onClick={() => {}}>
              <Icon color="inherit">visibility</Icon>
            </IconButton>
          </div>
        );
      },
    },
    {
      title: "Tên",
      field: "fullName",
    },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      render: (rowData) => {
        return moment(rowData.dateOfBirth).format("DD/MM/YYYY");
      },
    },
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
    { title: "Email", field: "email" },
    { title: "Địa chỉ", field: "address" },
    { title: "Số điện thoại", field: "phone" },
    {
      title: "Trạng thái",
      field: "status",
      render: (rowData) => {
        return STATUSES[rowData?.status];
      },
    },
  ];
  return (
    <div className="m-sm-30">
      <div style={{ marginBottom: "20px" }}>
        <Breadcrumb
          routeSegments={[
            { name: "Quản lý", path: "/" },
            { name: "Nhân viên" },
          ]}
        />
      </div>

      <Grid container>
        <Grid item xs={12}>
          <MaterialTable
            data={[]}
            columns={columns}
            options={{
              paging: false,
              search: false,
              maxBodyHeight: 568,
              toolbar: false,
              headerStyle: {
                backgroundColor: "#358600",
                color: "#FFF",
                paddingRight: "0px",
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
