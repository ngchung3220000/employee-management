import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { REJECT_STATUS } from "app/employeeManagement/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { leaderActionRequest } from "app/employeeManagement/redux/actions/EmployeeAction";

export default function RejectDialog(props) {
  const { dialogReject, setDialogReject, reloadData, setReloadData } = props;
  const dispatch = useDispatch();
  const formEmployee = useSelector((state) => state.employee.formEmployee);

  const [rejectedReason, setRejectReason] = useState("");
  const [rejectionDate, setRejectionDate] = useState(null);

  const handleChangRejectedReason = (e) => {
    setRejectReason(e.target.value);
  };

  const handleDateChange = (date) => {
    setRejectionDate(date);
  };

  const handleOnSubmit = () => {
    const data = {
      status: REJECT_STATUS,
      rejectedReason: rejectedReason,
    };
    dispatch(leaderActionRequest({ id: formEmployee.employeeId, data: data }));

    setReloadData(!reloadData);
    handleClose();
  };

  const handleClose = () => {
    setDialogReject(false);
    setRejectReason("");
    setRejectionDate(null);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={dialogReject} onClose={handleClose}>
      <DialogTitle>
        <span>Từ chối</span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={handleClose}
        >
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                inputVariant="outlined"
                className="w-100"
                size="small"
                disableToolbar
                format="dd/MM/yyyy"
                label="Ngày từ chối"
                name="rejectionDate"
                value={rejectionDate}
                onChange={(e) => handleDateChange(e)}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              size="small"
              type="text"
              name="rejectedReason"
              label="Nội dung"
              variant="outlined"
              value={rejectedReason}
              onChange={handleChangRejectedReason}
              error={!rejectedReason}
              helperText={rejectedReason ? "" : "Vui lòng nhập nội dung"}
            />
          </Grid>
        </Grid>
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
