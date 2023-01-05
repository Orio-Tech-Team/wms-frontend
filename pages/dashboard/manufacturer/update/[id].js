import { useRouter } from "next/router";
import React, { useState } from "react";
import { Form } from "reactstrap";
import BreadcrumbComponent from "../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import InputTypeDropDown from "../../../../components/ui/InputTypeDropDown/InputTypeDropDown";
import InputTypeText from "../../../../components/ui/InputTypeText/InputTypeText";
import styles from "./update.module.css";
import ManufacturerData from "../../../../components/Data/ManufacturerValues/index";
import axios from "axios";
import { FormControlLabel, Switch } from "@mui/material";
import useManufacturerData from "../../../../hooks/useManufacturerData";
import { url } from "../../../../config";
import axiosFunction from "../../../../functions/axios";
//
//
const MANUFACTURER_EMPTY_VAL = {
  manufacturer_name: "",
  manufacturer_status: false,
  line_of_business: ManufacturerData.line_of_business[0],
};
//
const Index = ({ data, token }) => {
  //
  const [manufacturerData, setManufacturerData] = useManufacturerData();
  //
  const MANUFACTURER_INITIAL_VAL = {
    id: data[0].id,
    manufacturer_name: data[0].manufacturer_name,
    manufacturer_status: data[0].manufacturer_status,
    line_of_business: data[0].line_of_business,
  };
  //
  const router = useRouter();
  const [manufacturer, setManufacturer] = useState(MANUFACTURER_INITIAL_VAL);
  //
  // functions
  //
  const clearFunction = () => {
    setManufacturer(MANUFACTURER_EMPTY_VAL);
  };
  //
  const handleInput = (name, value) => {
    setManufacturer({ ...manufacturer, [name]: value });
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .put(
          process.env.NEXT_PUBLIC_THIS_URL + "/manufacturer/update/",
          manufacturer
        )
        .then(() => {
          setManufacturerData([]);
          router.push("/dashboard/manufacturer/");
          setManufacturer(MANUFACTURER_EMPTY_VAL);
        });
    } catch (err) {
      console.log(err);
    }
  };
  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <BreadcrumbComponent isUpdate={true} router={router} />
          <h1>Update Manufacturer</h1>
          <p>
            Please see Update Manufacturer form below all connected channels
          </p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h5>Update Manufacturer</h5>
            <h4>Here you can manage your all Update Manufacturer!</h4>
          </div>
          <Form onSubmit={handleSubmit} className={styles.form}>
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
              <button type="submit">Update</button>
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

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const id = context.params.id;

  const res = await axiosFunction({
    urlPath: `/manufacturer/update/${id}`,
    method: "GET",
    token: token,
  });
  return {
    props: { data: res.data, token },
  };
}

export default Index;
