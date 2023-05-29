import { TablePagination } from "@material-ui/core";
import React from "react";

export default function Pagination(props) {
  const { totalEmployeeCount, page, rowPerPage, setPage, setRowPerPage } =
    props;

  const handleChangeRowPerPage = (e) => {
    setRowPerPage(e.target.value);
    setPage(0);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  return (
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
        `${from} - ${to}  ${"trong"}  ${count}`
      }
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowPerPage}
    />
  );
}
