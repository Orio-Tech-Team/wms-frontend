"use client";
import React from "react";
import styles from "./styles.module.css";
import DataTable from "react-data-table-component";
import {
  Button,
  Input,
  Loader,
  Select,
  Switch,
  TextInput,
} from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";
//
const FilterComponent = ({
  selectedRows,
  filterText,
  onFilter,
  onClear,
  title,
}) => (
  <div style={{ display: "flex", gap: "5px" }}>
    <Input
      icon={<AiOutlineSearch />}
      type="text"
      placeholder={`Search ${title ? title : ""}`}
      value={filterText}
      onChange={onFilter}
    />
  </div>
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
        // overflow: "hidden",
      },
      ">input": {
        width: "100%",
        padding: "2px",
        fontSize: "12px",
      },
      ">div": {
        display: "flex",
      },
    },
  },
};
//
const CustomTable = ({ data, title, dataCollector }) => {
  //
  const [orderData, setOrderData] = React.useState([]);
  const [selectedData, setSelectedData] = React.useState([]);
  const [itemConversionData, setItemConversionData] = React.useState([]);
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data

    setSelectedData(selectedRows);

    // setSelectedRows(selectedRowsProp);
  };
  // async function fetcher() {
  //   return await axiosFunction({
  //     urlPath: "/product/product_conversion/",
  //     method: "POST",
  //     data: { ids: productIds },
  //   });
  // }
  // React.useEffect(async ()=>{
  //   const item_conversion_response = await fetcher();
  //   setItemConversionData(item_conversion_response.data);
  // },[])
  const inputHandler = (row, name, value) => {
    var temp = [...orderData];
    temp[row.index] = {
      ...row,

      [name]: value,
    };
    var tempData = temp.filter((each_item) => {
      return each_item != undefined;
    });
    setOrderData([...tempData]);
  };
  const columns = [
    {
      name: "Product #",
      selector: (row) => row.id,
      grow: 0,
      center: true,
      width: "120px",
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      grow: 0,
      sortable: true,
      width: "150px",
    },
    {
      name: "Sales Tax Percentage",
      selector: (row) => row.sales_tax_percentage,
      width: "150px",
    },
    {
      name: "Required Quantity",
      cell: (e) => (
        <>
          <TextInput
            defaultValue={0}
            size="xs"
            key={e.id}
            onChange={(event) => {
              inputHandler(e, "required_quantity", event.target.value);
            }}
          />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      center: true,
      width: "150px",
      grow: 0,
    },
    {
      name: "UOM",
      cell: (e) => (
        <>
          <Select
            size="xs"
            key={e.id}
            placeholder="Pick one"
            data={["Box", "Carton", "Pieces"]}
            onChange={(event) => {
              inputHandler(e.index, "unit_of_measurement", event);
            }}
          />
        </>
      ),
      // ignoreRowClick: true,
      // allowOverflow: true,
      // center: true,
      width: "150px",
      grow: 0,
    },
    {
      name: "Trade Price",
      cell: (e) => (
        <>
          <TextInput
            size="xs"
            key={e.id}
            onChange={(event) => {
              inputHandler(e.index, "trade_price", event.target.value);
            }}
          />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      center: true,
      width: "150px",
      grow: 0,
    },
    {
      name: "Trade Discount",
      cell: (e) => (
        <>
          <TextInput
            size="xs"
            key={e.id}
            onChange={(event) => {
              inputHandler(e.index, "trade_discount", event.target.value);
            }}
          />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      center: true,
      width: "150px",
      grow: 0,
    },
    {
      name: "FOC",
      cell: (e) => (
        <>
          <Switch
            size="xs"
            onChange={(event) => {
              inputHandler(e.index, "foc", event.target.checked);
            }}
          />
        </>
      ),
      style: { display: "flex", alignItems: "center" },
      ignoreRowClick: true,
      allowOverflow: true,
      center: true,
      width: "80px",
      grow: 0,
    },
  ];
  const [pending, setPending] = React.useState(true);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [filteredItems, setFilteredItems] = React.useState([]);
  React.useEffect(() => {
    setFilteredItems(
      data.filter((item) => {
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
    );
  }, [data, filterText]);
  React.useEffect(() => {
    setOrderData([]);
  }, [data]);
  //
  // const [selectedRows, setSelectedRows] = React.useState([]);

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
        selectedRows={selectedData}
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
  const orderFunction = () => {
    var temp = [];
    selectedData.map((each_selected) => {
      orderData.map((each_item) => {
        if (each_selected.index === each_item.index) {
          temp.push(each_item);
        }
      });
    });
    if (selectedData.length === 0) {
      alert("Please Select At least one Product!");
      return "";
    }
    if (temp.length === 0) {
      alert("Please Insert Required Quantity!");
      return "";
    }
    //
    dataCollector(temp);
    //     if(orderData)
    // dataCollector();
  };
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
          selectableRows
          onSelectedRowsChange={handleChange}
        />
        <Button onClick={() => orderFunction()}>Add To Cart</Button>
      </div>
    </>
  );
};
//
export default CustomTable;
