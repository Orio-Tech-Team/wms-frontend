import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import BreadcrumbComponent from "../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import styles from "./styles.module.css";
import usePorderData from "../../../hooks/usePorderData";
import { useEffect } from "react";
import ReactDataTable from "../../../components/ui/ReactDataTable/ReactDataTable";
import axiosFunction from "../../../functions/axios";
import { Loader } from "@mantine/core";
//

//
const Index = () => {
  const route = useRouter();
  const [PurchaseOrderData, setPurchaseOrderData] = usePorderData();
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //
  //
  const tableGenerator = () => {
    //
    const invoiceGenerator = (item) => {
      var dataToStore = {};
      PurchaseOrderData.map((each_item) => {
        if (item.id === each_item.id) {
          dataToStore = {
            po_id: each_item.id,
            vendor_name: each_item.vendor_name,
            address: each_item.address,
            city: each_item.city,
            ntn: each_item.ntn,
            strn: each_item.strn,
            advance_income: each_item.advance_income,
            payment_terms: each_item.payment_terms,
            po_date: each_item.createdAt,
            delivery_date: each_item.expected_date,
            order_type: each_item.order_type,
            delivery_location: each_item.delivery_location,
            po_type: each_item.vendor_classification,
            orders: each_item.dataToSend,
            subtotal: each_item.subtotal,
            total_discounted_price: each_item.total_discounted_price,
            total_tax: each_item.tax,
            grand_total: each_item.grand_total,
          };
          //
          localStorage.setItem("invoice_data", JSON.stringify(dataToStore));
          window.open(`${route.pathname}/add_purchase_order/invoice`, "_blank");
        }
      });
    };
    //
    const actionFunction = async (item) => {
      setIsLoading(true);
      var urlPath = "";
      if (item.order_status === "Pen") {
        urlPath = `/purchase_order/order_approved/${item.id}`;
      } else {
        invoiceGenerator(item);
      }
      await axiosFunction({
        method: "PUT",
        urlPath: urlPath,
      }).then(() => {
        setPurchaseOrderData([]);
      });
    };
    //
    const columnTemp = [
      {
        name: "#",
        cell: (e) => <>{e.key + 1}</>,
        grow: 0,
        center: true,
        width: "56px",
      },
      {
        name: "Order #",
        selector: (row) => row.id,
        grow: 0,
        sortable: true,
      },
      {
        name: "Vendor Name",
        selector: (row) => row.vendor_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "Order Type",
        selector: (row) => row.order_type,
        grow: 0,
        sortable: true,
        width: "126px",
        center: true,
      },
      {
        name: "Grand Total",
        selector: (row) => row.grand_total,
        grow: 0,
        sortable: true,
        width: "126px",
        center: true,
      },
      {
        name: "Expected Date",
        selector: (row) => row.expected_date.substring(0, 10),
        grow: 0,
        sortable: false,
        center: true,
        width: "156px",
      },
      {
        name: "Status",
        selector: (row) => row.order_status,
        grow: 0,
        center: true,
        sortable: false,
      },
      {
        name: "Action",
        cell: (e) => (
          <>
            <button
              onClick={() =>
                e.order_status === "Received"
                  ? invoiceGenerator(e)
                  : actionFunction(e)
              }
              className={styles.action_btn}
            >
              {e.order_status === "Pen" ? "Approve" : "Invoice"}
            </button>
          </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        center: true,
        grow: 0,
      },
    ];
    //
    const dataTemp = PurchaseOrderData.map((each_item, key) => {
      return {
        key: key,
        id: each_item.id,
        vendor_name: each_item.vendor_name,
        grand_total: each_item.grand_total,
        expected_date: each_item.expected_date,
        order_status: each_item.order_status,
        order_type: each_item.order_type,
      };
    });

    setColumns(columnTemp);
    setData(dataTemp);
  };
  //
  useEffect(() => {
    setIsLoading(true);
    tableGenerator();
    setIsLoading(false);
  }, [PurchaseOrderData]);
  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <BreadcrumbComponent router={route} />
          <h1>Purchase Order</h1>
          <p>Please see purchase order below from all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.table_head}>
            <div className={styles.table_head_left}>
              <h5>Purchase Order</h5>
              <h4>Here you can manage your all Purchase Order!</h4>
            </div>
            <Link href={"/dashboard/purchase_order/add_purchase_order/"}>
              <a>Add Purchase Order</a>
            </Link>
          </div>

          {isLoading ? (
            <Loader
              style={{ margin: "auto", padding: "10px 0px" }}
              color="dark"
              size="xl"
            />
          ) : (
            <>
              <ReactDataTable columns={columns} data={data} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Index;
