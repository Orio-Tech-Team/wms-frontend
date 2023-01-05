import React from "react";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import styles from "./styles.module.css";
//
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});
//

const ModalTable = ({
  deleteHandler,
  rowData,
  title,
  columns,
  rowOnclickFunction,
}) => {
  //
  const selectFunc = (selectedRows) => {
    selectedRows.data.map((elem) => {
      deleteHandler(rowData[elem.dataIndex][0]);
    });
  };

  const options = {
    onRowsDelete: selectFunc,
    isRowSelectable: () => false,

    onRowClick: (rowData, rowMeta) => rowOnclickFunction(rowData, rowMeta),
  };

  //
  return (
    <>
      <div className={styles.data_table}>
        <CacheProvider value={muiCache}>
          <MUIDataTable
            title={title}
            data={rowData}
            columns={columns}
            options={options}
          />
        </CacheProvider>
      </div>
    </>
  );
};

export default ModalTable;
