import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";
import { leaderActionRequest } from "app/employeeManagement/redux/actions/EmployeeAction";
import { APPROVE_STATUS } from "app/employeeManagement/constants/constants";

export default function ApproveDialog(props) {
  const { dialogApprove, setDialogApprove, reloadData, setReloadData } = props;
  const dispatch = useDispatch();
  const formEmployee = useSelector((state) => state.employee.formEmployee);
  const [appointmentDate, setAppointmentDate] = useState(null);

  const handleDateChange = (date) => {
    setAppointmentDate(date);
  };

  const handleOnSubmit = () => {
    const data = {
      status: APPROVE_STATUS,
    };
    dispatch(leaderActionRequest({ id: formEmployee?.employeeId, data: data }));

    setReloadData(!reloadData);
    handleClose();
  };

  const handleClose = () => {
    setDialogApprove(false);
    setAppointmentDate(null);
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={dialogApprove} onClose={handleClose}>
      <DialogTitle>
        <span>Phê duyệt</span>
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
                label="Ngày hẹn"
                name="appointmentDate"
                value={appointmentDate}
                onChange={(e) => handleDateChange(e)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Đã đủ điều kiện phê duyệt"
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
