import moment from "moment";
import React, { useEffect, useState } from "react";
import { GENDER } from "../constains";
import {
  STATUSES,
  STATUS_OF_APPROVED,
} from "app/employeeManagement/constants/constants";
import { Breadcrumb } from "egret";
import { Button, Grid, Icon, IconButton, Tooltip } from "@material-ui/core";
import MaterialTable from "material-table";
import Pagination from "app/employeeManagement/components/Pagination/Pagination";
import {
  getAllEmployeeRequested,
  getTotalEmployeeCountRequested,
} from "app/employeeManagement/redux/actions/EmployeeAction";
import { useDispatch, useSelector } from "react-redux";
import EmployeeManagementDialog from "./EmployeeManagementDialog";

export default function EmployeeManagement() {
  const dispatch = useDispatch();
  const listEmployee = useSelector((state) => state.employee.listEmployee);
  const totalEmployeeCount = useSelector(
    (state) => state.employee.totalEmployeeCount
  );
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [dialogUpdate, setDialogUpdate] = useState(false);
  const [dialogInfo, setDialogInfo] = useState(false);

  useEffect(() => {
    dispatch(
      getAllEmployeeRequested({
        status: STATUS_OF_APPROVED,
        page: page + 1,
        rowPerPage,
      })
    );

    dispatch(getTotalEmployeeCountRequested(STATUS_OF_APPROVED));
  }, [dispatch, page, rowPerPage]);

  const handleOpenDialogUpdate = () => {
    setDialogUpdate(true);
  };

  const columns = [
    {
      title: "Thao tác",
      field: "action",
      render: (rowData) => {
        return (
          <div className="none_wrap">
            <Tooltip title="Cập nhật diễn biến" className="pr-10">
              <IconButton
                size="small"
                onClick={() => handleOpenDialogUpdate(rowData)}
              >
                <Icon color="primary">update</Icon>
              </IconButton>
            </Tooltip>

            <Tooltip title="Xem thông tin">
              <IconButton size="small" onClick={() => {}}>
                <Icon color="inherit">visibility</Icon>
              </IconButton>
            </Tooltip>
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
            data={listEmployee}
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

          {dialogUpdate && (
            <EmployeeManagementDialog
              dialogUpdate={dialogUpdate}
              setDialogUpdate={setDialogUpdate}
            />
          )}
        </Grid>
        <Pagination
          page={page}
          setPage={setPage}
          rowPerPage={rowPerPage}
          setRowPerPage={setRowPerPage}
          totalEmployeeCount={totalEmployeeCount}
        />
      </Grid>
    </div>
  );
}
