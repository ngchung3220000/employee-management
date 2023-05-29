import { ConfirmationDialog } from "egret";
import React from "react";
import { useDispatch } from "react-redux";

export default function DialogDelete(props) {
  const { dialogDelete, handleDelete, setDialogDelete } = props;

  return (
    <div>
      <ConfirmationDialog
        title={"Xác nhận xóa"}
        open={dialogDelete}
        onConfirmDialogClose={() => setDialogDelete(false)}
        onYesClick={handleDelete}
        text={"Bạn có chắc chắn muốn xóa không?"}
        Yes={"Xóa"}
        No={"Hủy"}
      />
    </div>
  );
}
