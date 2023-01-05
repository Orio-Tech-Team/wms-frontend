import React from "react";
import styles from "./DataTable.module.css";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
//
import { AiFillDelete } from "react-icons/ai";
//
//
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});
//

const DataTable = ({
  deleteHandler,
  rowData,
  title,
  columns,
  CustomOptions,
}) => {
  //
  //
  const selectFunc = (selectedRows) => {
    selectedRows.data.map((elem) => {
      deleteHandler(rowData[elem.dataIndex][0]);
    });
  };

  const options = {
    onRowsDelete: deleteHandler ? selectFunc : "",
    draggableColumns: { enable: false },
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 50, 100],
    ...CustomOptions,
  };

  //
  return (
    <>
      <div className={styles.data_table}>
        <MUIDataTable
          title={title}
          data={rowData}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default DataTable;
