import React from "react";
// styles
import styles from "./styles.module.css";
// components
import BreadcrumbComponent from "../../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import { useRouter } from "next/router";
import { Checkbox, Input, Switch } from "@mantine/core";
//
const AddUser = () => {
  const route = useRouter();
  return (
    <>
      <div className={styles.navbar_bg} />
      <div className={styles.container}>
        <div className={styles.breadcrumb_div}>
          <BreadcrumbComponent router={route} />
          <h1>Add User</h1>
          <p>Please see Add User from below from all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.add_user_div}>
            <form>
              <div className={styles.input_wrapper}>
                <Switch
                  label="User Status"
                  description="Setting user active or in-active"
                  size="md"
                  color="indigo"
                />
              </div>
              <div className={styles.input_wrapper}>
                <label>User ID</label>
                <Input placeholder="Enter User ID" />
              </div>
              <div className={styles.input_wrapper}>
                <label>Password</label>
                <Input type={"password"} placeholder="Enter Password" />
              </div>
              <div className={styles.input_wrapper}>
                <label>Email</label>
                <Input placeholder="Enter Email" />
              </div>
              <div className={styles.input_wrapper}>
                <label>User Name</label>
                <Input placeholder="Enter User Name" />
              </div>
              <div className={styles.input_wrapper}>
                <label>Phone Number</label>
                <Input placeholder="Enter Phone Number" />
              </div>
              <div className={styles.input_wrapper}>
                <label>Location Code</label>
                <Input placeholder="Enter Location Code" />
              </div>
            </form>
          </div>
          <div className={styles.add_user_rights_div}>
            <div className={styles.check_box_div}>
              <Checkbox label="Dashboard" size="md" />
            </div>
            {/*  */}
            <div className={styles.check_box_div}>
              <Checkbox label="Products" size="md" />
              <div className={styles.checkbox_sub_div}>
                <Checkbox label="Categories" size="md" />
                <Checkbox label="Add Products" size="md" />
                <Checkbox label="Show Products" size="md" />
              </div>
            </div>
            {/*  */}
            <div className={styles.check_box_div}>
              <Checkbox label="Vendors" size="md" />
              <div className={styles.checkbox_sub_div}>
                <Checkbox label="Add Vendors" size="md" />
                <Checkbox label="Show Vendors" size="md" />
              </div>
            </div>
            {/*  */}
            <div className={styles.check_box_div}>
              <Checkbox label="Manufacturers" size="md" />
              <div className={styles.checkbox_sub_div}>
                <Checkbox label="Add Manufacturers" size="md" />
                <Checkbox label="Show Manufacturers" size="md" />
              </div>
            </div>
            {/*  */}
            <div className={styles.check_box_div}>
              <Checkbox label="Purchase Order" size="md" />
              <div className={styles.checkbox_sub_div}>
                <Checkbox label="Show Purchase Order" size="md" />
              </div>
            </div>
            {/*  */}
            <div className={styles.check_box_div}>
              <Checkbox label="Settings" size="md" />
              <div className={styles.checkbox_sub_div}>
                <Checkbox label="Users List" size="md" />
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
