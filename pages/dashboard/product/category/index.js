import React, { useEffect } from "react";
import styles from "./category.module.css";
//
import BreadcrumbComponent from "../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import DataTable from "../../../../components/ui/DataTable/DataTable";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import useCategoryData from "../../../../hooks/useCategoryAtom";
import { Loader } from "@mantine/core";
import ReactDataTable from "../../../../components/ui/ReactDataTable/ReactDataTable";
//
const Index = () => {
  const route = useRouter();
  const [categoryData, setCategoryData] = useCategoryData();
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const tableGenerator = () => {
    const columnsTemp = [
      {
        name: "#",
        cell: (e) => <>{e.key + 1}</>,
        grow: 0,
        center: true,
        width: "56px",
        sortable: true,
      },
      {
        name: "ID",
        selector: (row) => row.id,
        grow: 0,
        center: true,
        width: "66px",
        sortable: true,
      },
      {
        name: "Category Name",
        selector: (row) => row.category_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "Description",
        selector: (row) => row.category_description,
        grow: 2,
      },
      {
        name: "Status",
        selector: (row) => row.category_status,
        grow: 0,
        center: true,
        width: "136px",
      },
      {
        name: "Level",
        selector: (row) => row.category_level,
        grow: 0,
        center: true,
        width: "136px",
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
    const dataTemp = categoryData.map((eachItem, key) => {
      return {
        key: key,
        id: eachItem.id,
        category_name: eachItem.category_name,
        category_description: eachItem.category_description,
        category_sorting: eachItem.category_sorting,
        category_status: eachItem.category_status ? "Active" : "In-Active",
        category_level: eachItem.category_level,
      };
    });
    //
    setData(dataTemp);
    setColumns(columnsTemp);
  };
  //
  React.useEffect(() => {
    tableGenerator();
    setIsLoading(false);
  }, [categoryData]);

  //

  //
  const deleteHandler = async (id) => {
    //
    await axios
      .delete(process.env.NEXT_PUBLIC_THIS_URL + `/product/category/${id}`)
      .then(() => {
        setData([]);
      });
    //
  };
  //

  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <BreadcrumbComponent router={route} />
          <h1>Category</h1>
          <p>Please see categories below from all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.table_head}>
            <div className={styles.table_head_left}>
              <h5>Category</h5>
              <h4>Here you can manage your all Category!</h4>
            </div>
            <Link href={"/dashboard/product/category/add_category"}>
              <a>Add Category</a>
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
