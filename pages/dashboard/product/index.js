import React from "react";
import styles from "./product.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
//
import BreadcrumbComponent from "../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import DataTable from "../../../components/ui/DataTable/DataTable";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
//
import useProductData from "../../../hooks/useProductData";
import ReactDataTable from "../../../components/ui/ReactDataTable/ReactDataTable";
import { Loader } from "@mantine/core";
//
const Index = () => {
  //
  // const [ProductData, setProductData] = useProductData();
  const [productData, setProductData] = useProductData();
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //
  const route = useRouter();
  //
  const tableGenerator = () => {
    const columnTemp = [
      {
        name: "#",
        cell: (e) => <>{e.key + 1}</>,
        grow: 0,
        center: true,
        width: "56px",
      },
      {
        name: "Product Name",
        selector: (row) => row.product_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "Manufacturer Name",
        selector: (row) => row.manufacturer_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "Purchasing Unit",
        selector: (row) => row.purchasing_unit,
        grow: 0,
        width: "106px",
        center: true,
      },
      {
        name: "Trade Price",
        selector: (row) => row.trade_price,
        grow: 0,
        width: "96px",
        center: true,
      },
      {
        name: "Discounted Price",
        selector: (row) => row.discounted_price,
        grow: 0,
        width: "96px",
        center: true,
      },
      {
        name: "MRP",
        selector: (row) => row.maximum_retail_price,
        grow: 0,
        width: "80px",
        center: true,
      },
      {
        name: "Stock Nature",
        selector: (row) => row.stock_nature,
        grow: 0,
        width: "96px",
        center: true,
      },
      {
        name: "Quantity",
        selector: (row) => row.quantity,
        grow: 0,
        width: "86px",
        center: true,
      },
      {
        name: "Product Status",
        selector: (row) => row.item_status,
        grow: 0,
        width: "126px",
        center: true,
      },
      {
        name: "Action",
        cell: (e) => (
          <>
            <button
              key={e.id}
              className={styles.editBtn}
              onClick={() => {
                route.push(`${route.route}/update/${e.id}`);
              }}
            >
              <AiFillEdit />
            </button>
          </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        center: true,
        width: "80px",
        grow: 0,
      },
    ];
    //
    const dataTemp = productData.map((elem, key) => {
      return {
        key: key,
        id: elem.id,
        product_name: elem.product_name,
        manufacturer_name: elem.manufacturer_name,
        purchasing_unit: elem.purchasing_unit,
        trade_price: elem.trade_price,
        discounted_price: elem.discounted_price,
        maximum_retail_price: elem.maximum_retail_price,
        stock_nature: elem.stock_nature,
        quantity: elem.quantity,
        item_status: elem.item_status ? "Active" : "In-Active",
      };
    });
    //
    setColumns(columnTemp);
    setData(dataTemp);
  };
  //
  React.useEffect(() => {
    tableGenerator();
    setIsLoading(false);
  }, [productData]);
  //

  //
  const deleteHandler = async (id) => {
    //
    await axios
      .delete(process.env.NEXT_PUBLIC_THIS_URL + `/product/${id}`)
      .then(() => {
        setProductData([]);
      });
    //
  };
  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <BreadcrumbComponent router={route} />
          <h1>Products</h1>
          <p>Please see products below from all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.table_head}>
            <div className={styles.table_head_left}>
              <h5>Products</h5>
              <h4>Here you can manage your all Products!</h4>
            </div>
            <Link href={"/dashboard/product/add_product"}>
              <a>Add Products</a>
            </Link>
          </div>
          {isLoading ? (
            <Loader
              style={{ margin: "auto", padding: "10px 0px" }}
              color="dark"
              size="xl"
            />
          ) : (
            <ReactDataTable columns={columns} data={data} />
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
