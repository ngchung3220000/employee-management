import React, { useState } from "react";
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
import RefuseDialog from "./Dialog/RefuseDialog";
import AdditionalRequestDialog from "./Dialog/AdditionalRequestDialog";

export default function PendingDialog(props) {
  const { open, setDialogSubmit, reloadData, setReloadData } = props;

  const [dialogApprove, setDialogApprove] = useState(false);
  const [dialogAdditionalRequest, setDialogAdditionalRequest] = useState(false);
  const [dialogRefuse, setDialogRefuse] = useState(false);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={() => setDialogSubmit(false)}
    >
      <DialogTitle style={{ paddingBottom: "10px" }}>
        <span style={{ color: "#1d6d1e" }}>Thông tin nhân viên</span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={() => {}}
        >
          <Icon color="error">close</Icon>
        </IconButton>
      </DialogTitle>

      <DialogContent>Hồ sơ nhân viên</DialogContent>

      <DialogActions>
        <div className="flex flex-space-between flex-middle mt-10">
          <Button
            variant="contained"
            className="mr-12"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => setDialogRefuse(true)}
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
            onClick={() => {}}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            className="mr-12"
            color="primary"
            onClick={() => setDialogApprove(false)}
          >
            Phê duyệt
          </Button>
        </div>
      </DialogActions>

      {dialogApprove && <ApproveDialog />}

      {dialogAdditionalRequest && (
        <AdditionalRequestDialog
          open={dialogAdditionalRequest}
          setDialogAdditionalRequest={setDialogAdditionalRequest}
          reloadData={reloadData}
          setReloadData={setReloadData}
        />
      )}

      {dialogRefuse && <RefuseDialog />}
    </Dialog>
  );
}
