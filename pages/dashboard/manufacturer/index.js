import React, { useState } from "react";
import styles from "./manufacturer.module.css";
//
import BreadcrumbComponent from "../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import { useRouter } from "next/router";
import Link from "next/link";
import DataTable from "../../../components/ui/DataTable/DataTable";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import useManufacturerData from "../../../hooks/useManufacturerData";
import axiosFunction from "../../../functions/axios";

//
//
const Index = () => {
  //
  const [data, setData] = useManufacturerData();
  //
  const route = useRouter();
  //
  const column = [
    "ID",
    "Manufacturer Name",
    "Line of Business",
    "Manufacturer Status",
    "Created At",
    "Updated At",
    "Actions",
  ];
  //
  const rowData = data
    .map((elem) => {
      return [
        elem.id,
        elem.manufacturer_name,
        elem.line_of_business,
        elem.manufacturer_status ? "Active" : "In-Active",
        elem.createdAt.toString().substring(0, 10),
        elem.updatedAt.toString().substring(0, 10),
        <button
          key={elem.id}
          className={styles.editBtn}
          onClick={() => {
            route.push(`${route.route}/update/${elem.id}`);
          }}
        >
          <AiFillEdit />
        </button>,
      ];
    })
    .reverse();

  //
  //

  //
  //
  const deleteHandler = async (id) => {
    //
    const response = await axiosFunction({
      urlPath: `/manufacturer/${id}`,
      method: "DELETE",
    });
    //
    setData([]);
    //
  };
  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <BreadcrumbComponent router={route} />
          <h1>Manufacturer</h1>
          <p>Please see manufacturer below from all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.table_head}>
            <div className={styles.table_head_left}>
              <h5>Manufacturer</h5>
              <h4>Here you can manage your all Manufacturer!</h4>
            </div>
            <Link href={"/dashboard/manufacturer/add_manufacturer/"}>
              <a>Add Manufacturer</a>
            </Link>
          </div>
          <DataTable
            deleteHandler={deleteHandler}
            rowData={rowData}
            columns={column}
          />
        </div>
      </div>
    </>
  );
};
//

//
export default Index;
