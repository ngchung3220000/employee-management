import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
} from "@material-ui/core";
import ApproveDialog from "./Dialog/ApproveDialog";
import RejectDialog from "./Dialog/RejectDialog";
import AdditionalRequestDialog from "./Dialog/AdditionalRequestDialog";
import RegistForm from "app/employeeManagement/components/RegistForm/RegistForm";

export default function PendingDialog(props) {
  const { open, setDialogSubmit, reloadData, setReloadData } = props;
  const formEmployee = useSelector((state) => state.employee.formEmployee);
  const employee = useSelector((state) => state.employee.employee);
  const [dialogApprove, setDialogApprove] = useState(false);
  const [dialogAdditionalRequest, setDialogAdditionalRequest] = useState(false);
  const [dialogReject, setDialogReject] = useState(false);

  const handleCloseDialog = () => {
    setDialogSubmit(false);
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleCloseDialog}>
      <DialogTitle style={{ paddingBottom: "10px" }}>
        <span style={{ color: "#1d6d1e" }}>Thông tin nhân viên</span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={handleCloseDialog}
        >
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>

      <div>
        <RegistForm formEmployee={formEmployee} employee={employee} />
      </div>

      <DialogActions style={{ justifyContent: "center" }}>
        <div className="flex flex-space-between flex-middle mt-10">
          <Button
            variant="contained"
            className="mr-12"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => setDialogReject(true)}
          >
            Từ chối
          </Button>

          <Button
            variant="contained"
            className="mr-12"
            color="secondary"
            onClick={() => setDialogAdditionalRequest(true)}
          >
            Yêu cầu bổ sung
          </Button>

          <Button
            variant="contained"
            className="mr-12"
            color="default"
            onClick={handleCloseDialog}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            className="mr-12"
            color="primary"
            onClick={() => setDialogApprove(true)}
          >
            Phê duyệt
          </Button>
        </div>
      </DialogActions>
      {dialogApprove && (
        <ApproveDialog
          dialogApprove={dialogApprove}
          setDialogApprove={setDialogApprove}
          reloadData={reloadData}
          setReloadData={setReloadData}
        />
      )}
      {dialogAdditionalRequest && (
        <AdditionalRequestDialog
          dialogAdditionalRequest={dialogAdditionalRequest}
          setDialogAdditionalRequest={setDialogAdditionalRequest}
          reloadData={reloadData}
          setReloadData={setReloadData}
        />
      )}
      {dialogReject && (
        <RejectDialog
          dialogReject={dialogReject}
          setDialogReject={setDialogReject}
          reloadData={reloadData}
          setReloadData={setReloadData}
        />
      )}
    </Dialog>
  );
}
