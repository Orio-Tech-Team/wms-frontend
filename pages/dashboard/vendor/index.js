import React from "react";
import styles from "./vendor.module.css";
//
import BreadcrumbComponent from "../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import { useRouter } from "next/router";
import Link from "next/link";
import DataTable from "../../../components/ui/DataTable/DataTable";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import useVendorData from "../../../hooks/useVendorData";
//
const Index = () => {
  //
  const route = useRouter();
  const [data, setData] = useVendorData();
  //
  const column = [
    "ID",
    "Vendor Name",
    "Line of Business",
    "Drug License Number",
    "Contact Person",
    "Business Phone Number",
    "Email Address",
    "Payment Method",
    "Vendor Status",
    "Created At",
    "Updated At",
    "Actions",
  ];
  //
  const rowData = data.map((elem) => {
    return [
      elem.id,
      elem.vendor_name,
      elem.line_of_business,
      elem.drug_license_no,
      elem.contact_person,
      elem.business_phone_number,
      elem.email_address,
      elem.payment_method,
      elem.vendor_status ? "Active" : "In-Active",
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
  });

  //
  //

  //
  //
  const deleteHandler = async (id) => {
    //
    await axios
      .delete(process.env.NEXT_PUBLIC_THIS_URL + `/vendor/${id}`)
      .then(() => {
        setData([]);
      });
    //
  };
  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <BreadcrumbComponent router={route} />
          <h1>Vendor</h1>
          <p>Please see vendors below from all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.table_head}>
            <div className={styles.table_head_left}>
              <h5>Vendors</h5>
              <h4>Here you can manage your all Vendors!</h4>
            </div>
            <Link href={"/dashboard/vendor/add_vendor/"}>
              <a>Add Vendor</a>
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
