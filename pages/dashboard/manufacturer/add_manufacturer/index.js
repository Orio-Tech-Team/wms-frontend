import React from "react";
import styles from "./add_manufacturer.module.css";
//
import BreadcrumbComponent from "../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import { useRouter } from "next/router";
import { Form } from "reactstrap";
import InputTypeDropDown from "../../../../components/ui/InputTypeDropDown/InputTypeDropDown";
import InputTypeText from "../../../../components/ui/InputTypeText/InputTypeText";
import { useState } from "react";
import ManufacturerData from "../../../../components/Data/ManufacturerValues/index";
import axios from "axios";
import { FormControlLabel, Switch } from "@mui/material";
import useManufacturerData from "../../../../hooks/useManufacturerData";
import axiosFunction from "../../../../functions/axios";
//
const MANUFACTURER_INITIAL_VAL = {
  manufacturer_name: "",
  manufacturer_status: false,
  line_of_business: ManufacturerData.line_of_business[0],
};
//
const Index = () => {
  //
  const [data, setData] = useManufacturerData();
  //
  const router = useRouter();
  const [manufacturer, setManufacturer] = useState(MANUFACTURER_INITIAL_VAL);
  //
  //   functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    const res = await axiosFunction({
      urlPath: "/manufacturer/add_manufacturer",
      method: "post",
      data: manufacturer,
    });
    //
    router.push("/dashboard/manufacturer/");
    setManufacturer(MANUFACTURER_INITIAL_VAL);
    setData([]);
  };
  //
  const clearFunction = () => {
    setManufacturer(MANUFACTURER_INITIAL_VAL);
  };
  //
  const handleInput = (name, value) => {
    setManufacturer({ ...manufacturer, [name]: value });
  };
  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <BreadcrumbComponent router={router} />
          <h1>Add Manufacturer</h1>
          <p>Please see Add Manufacturer form below all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h5>Add Manufacturer</h5>
            <h4>Here you can manage your all Add Manufacturer!</h4>
          </div>
          <Form onSubmit={handleSubmit} className={styles.form}>
            {/*  */}
            <div className={styles.category_div}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={(evt) =>
                      handleInput("manufacturer_status", evt.target.checked)
                    }
                    checked={manufacturer.manufacturer_status}
                  />
                }
                label="Manufacturer Status"
              />
            </div>
            {/*  */}
            <InputTypeText
              name={"manufacturer_name"}
              value={manufacturer.manufacturer_name}
              className={styles.w_100}
              text={"Manufacturer Name"}
              onChange={handleInput}
              required
            />
            {/*  */}
            <InputTypeDropDown
              name={"line_of_business"}
              value={manufacturer.line_of_business}
              className={styles.w_100}
              text={"Line of Business"}
              onChange={handleInput}
              options={ManufacturerData.line_of_business}
              required
            />
            {/*  */}
            <div className={styles.form_btn_div}>
              <button type="submit">Add</button>
              <button onClick={clearFunction} type="button">
                Clear
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Index;
