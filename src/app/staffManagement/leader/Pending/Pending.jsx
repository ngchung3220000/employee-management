import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { Breadcrumb } from "egret";
import { Grid, Icon, IconButton } from "@material-ui/core";
import {
  STATUSES,
  STATUS_OF_PENDING,
} from "app/staffManagement/constants/constants";
import {
  getAllEmployeeRequested,
  getTotalEmployeeCountRequested,
  getEmployeeById,
  getFormEmployeeRequested,
} from "app/staffManagement/redux/actions/EmployeeAction";
import moment from "moment";
import { GENDER } from "app/staffManagement/staff/constains";
import Pagination from "app/staffManagement/components/Pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";
import PendingDialog from "./PendingDialog";

export default function Pending() {
  const dispatch = useDispatch();
  const listEmployee = useSelector((state) => state.employee.listEmployee);
  const totalEmployeeCount = useSelector(
    (state) => state.employee.totalEmployeeCount
  );
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [pendingDialog, setPendingDialog] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    dispatch(
      getAllEmployeeRequested({
        status: STATUS_OF_PENDING,
        page: 1,
        rowPerPage: 10,
      })
    );

    dispatch(getTotalEmployeeCountRequested(STATUS_OF_PENDING));
  }, [dispatch, page, rowPerPage, reloadData]);

  const handleOpenPendingDialog = (rowData) => {
    setPendingDialog(true);
    dispatch(getFormEmployeeRequested(rowData.employeeId));
  };

  const columns = [
    {
      title: "Thao tác",
      field: "action",
      render: (rowData) => {
        return (
          <div className="none_wrap">
            <IconButton
              size="small"
              onClick={() => handleOpenPendingDialog(rowData)}
            >
              <Icon color="inherit" style={{ fontSize: "20px" }}>
                visibility
              </Icon>
            </IconButton>
          </div>
        );
      },
      width: "10%",
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
            { name: "Lãnh đạo", path: "/" },
            { name: "Chờ duyệt" },
          ]}
        />
      </div>

      <Grid container>
        <Grid item xs={12}>
          <MaterialTable
            title="Danh sách chờ duyệt"
            data={listEmployee}
            columns={columns}
            options={{
              paging: false,
              exportButton: true,
              exportAllData: true,
              maxBodyHeight: 568,
              minBodyHeight: 568,
              headerStyle: {
                backgroundColor: "#358600",
                color: "#FFF",
                paddingRight: "0px",
              },
            }}
          />
        </Grid>

        <Pagination
          page={page}
          setPage={setPage}
          rowPerPage={rowPerPage}
          setRowPerPage={setRowPerPage}
          totalEmployeeCount={totalEmployeeCount}
        />
      </Grid>

      {pendingDialog && (
        <PendingDialog
          open={pendingDialog}
          setDialogSubmit={setPendingDialog}
          reloadData={reloadData}
          setReloadData={setReloadData}
        />
      )}
    </div>
  );
}
