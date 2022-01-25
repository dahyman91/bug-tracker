import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({
  columns,
  rows,
  checkboxSelection,
  width,
  pageSize = 10,
  rowsPerPageOptions = [10],
}) {
  return (
    <div style={{ margin: "auto", height: 300, width: width }}>
      <div style={{ display: "flex", height: "50%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={rowsPerPageOptions}
            checkboxSelection={checkboxSelection}
            autoHeight
          />
        </div>
      </div>
    </div>
  );
}
