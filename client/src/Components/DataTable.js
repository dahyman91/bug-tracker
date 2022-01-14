import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ columns, rows, checkboxSelection, width }) {
  return (
    <div style={{ margin: "auto", height: 400, width: width }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            checkboxSelection={checkboxSelection}
            autoHeight
          />
        </div>
      </div>
    </div>
  );
}
