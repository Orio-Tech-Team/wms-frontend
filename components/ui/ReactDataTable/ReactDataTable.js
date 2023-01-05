"use client";
import React from "react";
import styles from "./ReactDataTable.module.css";
import DataTable from "react-data-table-component";
import { Button, Input, Loader } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";
//
const FilterComponent = ({ filterText, onFilter, onClear, title }) => (
  <>
    <Input
      icon={<AiOutlineSearch />}
      type="text"
      placeholder={`Search ${title ? title : ""}`}
      value={filterText}
      onChange={onFilter}
    />
  </>
);
//
const customStyles = {
  table: {
    style: {
      width: "100%",
    },
  },
  header: {
    style: {
      minHeight: "56px",
    },
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: "lightGray",
    },
  },
  headCells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "lightGray",
      },
    },
  },
  row: {
    style: {
      borderRightStyle: "solid",
      borderRightWidth: "1px",
      borderRightColor: "red",
    },
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "lightGray",
        // width: "10px",
        overflow: "hidden",
      },
      ">input": {
        width: "100%",
        padding: "2px",
        fontSize: "12px",
      },
    },
  },
};
//
const ReactDataTable = ({ columns, data, title }) => {
  //
  const [pending, setPending] = React.useState(true);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [filteredItems, setFilteredItems] = React.useState([]);
  React.useEffect(() => {
    setFilteredItems(
      data
        .filter((item) => {
          var filterFlag = false;
          Object.keys(item).every((each_key) => {
            if (
              item[each_key] &&
              item[each_key]
                ?.toString()
                .toLowerCase()
                .includes(filterText.toLowerCase())
            ) {
              filterFlag = true;
              return false;
            }
            return true;
          });
          setPending(false);
          return filterFlag;
        })
        .reverse()
    );
  }, [data, filterText]);
  //
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        title={title}
        onFilter={(e) => {
          setFilterText(e.target.value);
        }}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  //

  //
  return (
    <>
      <div className={styles.container}>
        <DataTable
          title={title}
          columns={columns}
          data={filteredItems}
          dense
          highlightOnHover
          pointerOnHover
          customStyles={customStyles}
          // progressPending={pending}
          // progressComponent={
          //   !isEmpty ? (
          //     <Loader
          //       style={{ margin: "auto", padding: "10px 0px" }}
          //       color="dark"
          //       size="xl"
          //     />
          //   ) : (
          //     ""
          //   )
          // }
          // expandableRows
          // expandableRowsComponent={(e) => (
          //   <button onClick={() => console.log(e)222}>Hello</button>
          // )}
          direction="auto"
          // fixedHeader
          // fixedHeaderScrollHeight="300px"
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          responsive
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          subHeaderAlign="right"
          subHeaderWrap
        />
      </div>
    </>
  );
};
//
export default ReactDataTable;
