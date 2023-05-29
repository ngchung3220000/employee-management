import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  STATUSES,
  STATUS_OF_APPROVED,
} from "app/employeeManagement/constants/constants";
import { Breadcrumb } from "egret";
import { Button, Grid, Icon, IconButton } from "@material-ui/core";
import MaterialTable from "material-table";
import { GENDER } from "app/employeeManagement/employee/constains";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployeeRequested,
  getTotalEmployeeCountRequested,
} from "app/employeeManagement/redux/actions/EmployeeAction";
import Pagination from "app/employeeManagement/components/Pagination/Pagination";

export default function Approved() {
  const dispatch = useDispatch();
  const listEmployee = useSelector((state) => state.employee.listEmployee);
  const totalEmployeeCount = useSelector(
    (state) => state.employee.totalEmployeeCount
  );
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);

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

  const columns = [
    // {
    //   title: "Thao tác",
    //   field: "action",
    //   render: (rowData) => {
    //     return (
    //       <div className="none_wrap">
    //         <IconButton size="small" onClick={() => {}}>
    //           <Icon color="inherit">visibility</Icon>
    //         </IconButton>
    //       </div>
    //     );
    //   },
    // },
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
            { name: "Đã duyệt" },
          ]}
        />
      </div>

      <Grid container>
        <Grid item xs={12}>
          <MaterialTable
            title="Danh sách đã duyệt"
            data={listEmployee}
            columns={columns}
            options={{
              paging: false,
              maxBodyHeight: 568,
              minBodyHeight: 420,
              headerStyle: {
                backgroundColor: "#358600",
                color: "#FFF",
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
    </div>
  );
}
