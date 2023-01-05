import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.css";
//components
import BreadcrumbComponent from "../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import DataTable from "../../../../components/ui/DataTable/DataTable";
import useUserData from "../../../../hooks/useUserData";
import Link from "next/link";
//icons
import { AiFillEdit } from "react-icons/ai";
import { Loader } from "@mantine/core";
import ReactDataTable from "../../../../components/ui/ReactDataTable/ReactDataTable";
//
const Index = () => {
  const route = useRouter();
  const [userData, setUserData] = useUserData();
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  //
  const tableGenerator = () => {
    const columnsTemp = [
      {
        name: "ID",
        selector: (row) => row.id,
        grow: 0,
        center: true,
        width: "45px",
      },
      {
        name: "User Name",
        selector: (row) => row.user_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "User ID",
        selector: (row) => row.user_id,
        grow: 0,
        center: true,
        width: "150px",
      },
      {
        name: "Account Number",
        selector: (row) => row.account_number,
        grow: 0,
        center: true,
        width: "150px",
      },
      {
        name: "Email",
        selector: (row) => row.email,
        grow: 0,
        center: true,
        width: "250px",
      },
      {
        name: "Phone Number",
        selector: (row) => row.phone_number,
        grow: 0,
        center: true,
        width: "150px",
      },
      {
        name: "Status",
        selector: (row) => row.user_status,
        grow: 0,
        width: "72px",
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
    const dataTemp = userData.map((each_item) => {
      return {
        id: each_item.id,
        user_name: each_item.user_name,
        user_id: each_item.user_id,
        account_number: each_item.account_number,
        email: each_item.email,
        phone_number: each_item.phone_number,
        user_status: each_item.user_status,
      };
    });
    setColumns(columnsTemp);
    setData(dataTemp);
  };
  //
  React.useEffect(() => {
    setIsLoading(true);
    tableGenerator();
    setIsLoading(false);
  }, [userData]);
  //
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BreadcrumbComponent router={route} />
        <h1>Users</h1>
        <p>Please see users below from all connected channels</p>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.table_head}>
          <div className={styles.table_head_left}>
            <h5>Users</h5>
            <h4>Here you can manage your all Users!</h4>
          </div>
          <Link href={"/dashboard/settings/users/add_user/"}>
            <a>Add User</a>
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
  );
};

export default Index;
