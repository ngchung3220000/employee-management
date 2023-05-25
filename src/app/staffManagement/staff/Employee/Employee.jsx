import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import {
  Button,
  Grid,
  Icon,
  IconButton,
  TablePagination,
} from "@material-ui/core";
import { Breadcrumb } from "egret";
import { toast } from "react-toastify";
import EmployeeDialogSubmit from "./EmployeeDialogSubmit";
import DialogDelete from "../dialog/DialogDelete";
import {
  deleteEmployeeRequested,
  getAllEmployeeRequested,
} from "../../redux/actions/EmployeeAction";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {
  getEmployeeById,
  getTotalEmployeeCount,
} from "app/staffManagement/api/EmployeeServices";
import {
  DELETE_STATUS,
  EDIT_STATUSES,
  GENDER,
  STATUSES,
  STATUS_OF_ADD_EMPLOYEE,
  SUCCESS,
  VIEW_DETAILS_STATUSES,
} from "app/staffManagement/constants/constants";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function Employee() {
  const dispatch = useDispatch();
  const listEmployee = useSelector((state) => state.employee.listEmployee);

  const [dialogSubmit, setDialogSubmit] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [idEmployee, setIdEmployee] = useState();
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [reloadData, setReloadData] = useState(false);
  const [totalEmployeeCount, setTotalEmployeeCount] = useState();
  const [employee, setEmployee] = useState({});

  console.log(employee);

  const fetchData = async (api, data, setState) => {
    try {
      const result = await api(data);
      if (result?.data?.code === SUCCESS) {
        setState(result?.data?.data);
      } else {
        toast.error(result?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(
      getAllEmployeeRequested({
        status: STATUS_OF_ADD_EMPLOYEE,
        page: page + 1,
        rowPerPage,
      })
    );

    getTotalEmployeeCount(STATUS_OF_ADD_EMPLOYEE).then((res) =>
      setTotalEmployeeCount(res?.data?.data)
    );
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
      fetchData(getEmployeeById, rowData?.employeeId, setEmployee);
      setDialogSubmit(true);
    } else {
      toast.warning(
        "Trạng thái được phép chỉnh sửa (Lưu mới, Yêu cầu bổ sung, Từ chối)"
      );
    }
  };

  const handleClose = () => {
    setDialogSubmit(false);
    setEmployee({});
    setReloadData(!reloadData);
  };

  const handleChangeRowPerPage = (e) => {
    setRowPerPage(e.target.value);
    setPage(0);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
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
        // eslint-disable-next-line array-callback-return
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
    <div style={{ margin: "10px" }}>
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
              employee={employee}
              setEmployee={setEmployee}
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
        <TablePagination
          component="div"
          style={{
            width: "100%",
            position: "fixed",
            bottom: "0px",
            right: "10px",
          }}
          rowsPerPageOptions={[5, 10, 20]}
          page={page}
          count={totalEmployeeCount || Number()}
          rowsPerPage={rowPerPage}
          labelRowsPerPage={"Số hàng mỗi trang:"}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} ${"trong"} 
            ${count}`
          }
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowPerPage}
        />
      </Grid>
    </div>
  );
}

export default Employee;
