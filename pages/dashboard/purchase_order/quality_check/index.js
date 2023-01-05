// css-import
import styles from "./style.module.css";
//
import React from "react";
import { useRouter } from "next/router";
import { Button, Loader } from "@mantine/core";
//
// Components
import BreadcrumbComponent from "../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import ReactDataTable from "../../../../components/ui/ReactDataTable/ReactDataTable";
import axiosFunction from "../../../../functions/axios";
import useGrnData from "../../../../hooks/useGrnData";
//
const Index = () => {
  //
  const route = useRouter();
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonDisabler, setButtonDisabler] = React.useState(false);
  const [grnData, setGrnData] = useGrnData([]);
  //
  //
  const actionHandler = async (row, status) => {
    setButtonDisabler(true);
    var url = "/grn/quality_checker/";

    if (!status) {
      url = "/grn/quality_reject/";
    }
    //
    const response = await axiosFunction({
      method: "POST",
      data: {
        id: row.id,
        received_quantity: row.received_quantity,
        required_quantity: row.required_quantity,
        product_id: row.product_id,
        po_id: row.po_id,
        foc: row.foc === "Yes",
      },
      urlPath: url,
    });
    //
    setGrnData([]);
    setButtonDisabler(false);
  };
  //
  const tableGenerator = () => {
    const columnsTemp = [
      {
        name: "#",
        cell: (row) => {
          return <>{row.key + 1}</>;
        },
        grow: 0,
        center: true,
        width: "95px",
      },
      {
        name: "Purchase Order ID",
        selector: (row) => row.po_id,
        grow: 0,
        center: true,
        width: "105px",
      },
      {
        name: "Product ID",
        selector: (row) => row.product_id,
        grow: 0,
        center: true,
        width: "105px",
      },
      {
        name: "Product Name",
        selector: (row) => row.product_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "Required Quantity",
        selector: (row) => row.required_quantity,
        grow: 0,
        center: true,
        width: "145px",
      },
      {
        name: "Received Quantity",
        selector: (row) => row.received_quantity,
        grow: 0,
        center: true,
        width: "145px",
      },
      {
        name: "FOC",
        selector: (row) => row.foc,
        grow: 0,
        center: true,
      },
      {
        cell: (row) => (
          <>
            <Button
              disabled={buttonDisabler}
              radius={"xs"}
              compact
              onClick={() => actionHandler(row, true)}
            >
              Approve
            </Button>
          </>
        ),
        grow: 0,
        button: true,
        center: true,
        width: "100px",
      },
      {
        cell: (row) => (
          <>
            <Button
              disabled={buttonDisabler}
              radius={"xs"}
              color={"red"}
              compact
              onClick={() => actionHandler(row, false)}
            >
              Reject
            </Button>
          </>
        ),
        grow: 0,
        button: true,
        center: true,
        width: "100px",
      },
    ];
    //
    const dataTemp = [];
    grnData.forEach((each_po_master, key) => {
      if (!each_po_master.qc_check && each_po_master.grn_status != "D") {
        dataTemp.push({
          id: each_po_master.id,
          key: key,
          po_id: each_po_master.po_id,
          product_id: each_po_master.product_id,
          product_name: each_po_master.product_name,
          required_quantity: each_po_master.required_quantity,
          received_quantity: each_po_master.received_quantity,
          foc: each_po_master.foc ? "Yes" : "No",
        });
      }
    });
    //
    setData(dataTemp);
    setColumns(columnsTemp);
  };
  //
  React.useEffect(() => {
    setIsLoading(true);
    tableGenerator();
    setIsLoading(false);
  }, [grnData, buttonDisabler]);
  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <BreadcrumbComponent router={route} />
          <h1>Quality Check</h1>
          <p>Please see Quality Check from below from all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          {isLoading ? (
            <Loader color="dark" size="xl" />
          ) : (
            <ReactDataTable columns={columns} data={data} title={""} />
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
