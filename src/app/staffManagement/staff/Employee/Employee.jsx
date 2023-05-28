import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { Button, Grid, Icon, IconButton } from "@material-ui/core";
import moment from "moment";
import { Breadcrumb } from "egret";
import { toast } from "react-toastify";
import EmployeeDialogSubmit from "./EmployeeDialogSubmit";
import DialogDelete from "../dialog/DialogDelete";
import {
  deleteEmployeeRequested,
  getAllEmployeeRequested,
  getTotalEmployeeCountRequested,
  resetEmployeeAction,
  getEmployeeById,
} from "../../redux/actions/EmployeeAction";
import {
  DELETE_STATUS,
  EDIT_STATUSES,
  STATUSES,
  STATUS_OF_ADD_EMPLOYEE,
  VIEW_DETAILS_STATUSES,
} from "app/staffManagement/constants/constants";
import "react-toastify/dist/ReactToastify.css";
import { GENDER } from "../constains";
import Pagination from "app/staffManagement/components/Pagination/Pagination";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function Employee() {
  const dispatch = useDispatch();
  const listEmployee = useSelector((state) => state.employee.listEmployee);
  const totalEmployeeCount = useSelector(
    (state) => state.employee.totalEmployeeCount
  );
  const [dialogSubmit, setDialogSubmit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [idEmployee, setIdEmployee] = useState();
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    dispatch(
      getAllEmployeeRequested({
        status: STATUS_OF_ADD_EMPLOYEE,
        page: page + 1,
        rowPerPage,
      })
    );

    dispatch(getTotalEmployeeCountRequested(STATUS_OF_ADD_EMPLOYEE));
  }, [dispatch, page, rowPerPage, reloadData]);

  const handleOpenDialogDelete = (rowData) => {
    const condition = DELETE_STATUS === rowData?.status.toString();

    if (condition) {
      setDialogDelete(true);
      setIdEmployee(rowData?.employeeId);
    } else {
      toast.warning("Chỉ được xóa nhân viên ở trạng thái lưu mới");
    }
  };

  const handleDeleteEmployee = () => {
    dispatch(deleteEmployeeRequested(idEmployee));
    setDialogDelete(false);
    setReloadData(!reloadData);
  };

  const handleEditEmployee = (rowData) => {
    const condition = Object.keys(EDIT_STATUSES).includes(
      rowData?.status.toString()
    );
    if (condition) {
      // Get employee by id
      dispatch(getEmployeeById(rowData.employeeId));
      setDialogSubmit(true);
    } else {
      toast.warning(
        "Trạng thái được phép chỉnh sửa (Lưu mới, Yêu cầu bổ sung, Từ chối)"
      );
    }
  };

  const handleClose = () => {
    dispatch(resetEmployeeAction({}));
    setDialogSubmit(false);
    setReloadData(!reloadData);
  };

  const handleViewDetails = (rowData) => {
    const condition = Object.keys(VIEW_DETAILS_STATUSES).includes(
      rowData?.status.toString()
    );

    condition
      ? setDialogSubmit(true)
      : toast.warning("Chỉ hiển thị ở trạng thái (Chờ xử lý, Chờ duyệt)");

    setIdEmployee(rowData?.employeeId);
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
                onClick={() => handleEditEmployee(rowData)}
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

            <div>
              <IconButton
                size="small"
                onClick={() => handleViewDetails(rowData)}
              >
                <Icon color="inherit" style={{ fontSize: "20px" }}>
                  visibility
                </Icon>
              </IconButton>
            </div>
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
            title={
              <>
                <Button
                  className="align-bottom mr-16 mb-16"
                  variant="contained"
                  color="primary"
                  style={{ top: "5px" }}
                  onClick={() => setDialogSubmit(true)}
                >
                  Thêm nhân viên
                </Button>
              </>
            }
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

          {dialogSubmit && (
            <EmployeeDialogSubmit
              setReloadData={setReloadData}
              open={dialogSubmit}
              close={handleClose}
            />
          )}

          {dialogDelete && (
            <DialogDelete
              dialogDelete={dialogDelete}
              setDialogDelete={setDialogDelete}
              handleDelete={handleDeleteEmployee}
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

export default Employee;
