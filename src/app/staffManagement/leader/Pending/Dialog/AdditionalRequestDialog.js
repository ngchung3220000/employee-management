import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  TextField,
} from "@material-ui/core";
import { ADDITIONAL_REQUESTED_STATUS } from "app/staffManagement/constants/constants";
import { additionalRequest } from "app/staffManagement/redux/actions/EmployeeAction";

export default function AdditionalRequestDialog(props) {
  const { open, setDialogAdditionalRequest, reloadData, setReloadData } = props;
  const dispatch = useDispatch();
  const employeeReducer = useSelector((state) => state.employee.employee);
  const [statusLog, setStatusLog] = useState("");
  console.log(employeeReducer);

  const handleChangStatus = (e) => {
    setStatusLog(e.target.value);
  };

  const handleOnSubmit = () => {
    const data = {
      status: +ADDITIONAL_REQUESTED_STATUS,
      statusLog: statusLog,
    };

    dispatch(
      additionalRequest({
        id: employeeReducer.employeeInfo.employeeId,
        data: data,
      })
    );

    setReloadData(!reloadData);
    handleClose();
  };

  const handleClose = () => {
    setDialogAdditionalRequest(false);
    setStatusLog("");
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>
        <span>Yêu cầu bổ sung</span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={handleClose}
        >
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          multiline
          size="small"
          type="text"
          name="statusLog"
          label="Nội dung"
          variant="outlined"
          value={statusLog}
          onChange={handleChangStatus}
          error={!statusLog}
          helperText={statusLog ? "" : "Vui lòng nhập nội dung"}
        />
      </DialogContent>

      <DialogActions>
        <div className="flex flex-space-between flex-middle mt-10">
          <Button
            className="mr-12"
            variant="contained"
            color="default"
            onClick={handleClose}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            className="mr-12"
            color="primary"
            onClick={handleOnSubmit}
          >
            Xác nhận
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
