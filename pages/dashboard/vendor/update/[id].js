import { useRouter } from "next/router";
import React, { useState } from "react";
import { Form } from "reactstrap";
import BreadcrumbComponent from "../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import InputTypeDropDown from "../../../../components/ui/InputTypeDropDown/InputTypeDropDown";
import InputTypeText from "../../../../components/ui/InputTypeText/InputTypeText";
import styles from "./update.module.css";
import DropDownData from "../../../../components/Data/VendorDropdownValues/index";
import ListViewBox from "../../../../components/ui/ListViewBox/index";
import axios from "axios";
import InputTypeNumber from "../../../../components/ui/InputTypeNumber/InputTypeNumber";
import InputTypeDate from "../../../../components/ui/InputTypeDate/InputTypeDate";
import InputTypeRadio from "../../../../components/ui/InputTypeRadio/InputTypeRadio";
import { FormControlLabel, Switch } from "@mui/material";
import useVendorData from "../../../../hooks/useVendorData";
import { url } from "../../../../config";
import axiosFunction from "../../../../functions/axios";
//
//

//
const Index = ({
  data,
  manufacturer_data,
  selected_manufacturer,
  vendor_tax_data,
}) => {
  //
  const [vendorData, setVendorData] = useVendorData();
  //
  const [withHoldTaxGroup, setWithHoldTaxGroup] = useState(
    vendor_tax_data.filter((item) => item.type === "with_hold")
  );
  const [salesTaxGroup, setSalesTaxGroup] = useState(
    vendor_tax_data.filter((item) => item.type === "sales_group")
  );
  //
  const VENDOR_EMPTY_VAL = {
    vendor_status: false,
    vendor_name: "",
    procurement_category: DropDownData.procurement_category[0],
    vendor_classification: DropDownData.vendor_classification[0],
    ntn: "",
    cnic: "",
    cnic_expiry_date: new Date(),
    line_of_business: DropDownData.line_of_business[0],
    tax_exemption_validity: new Date(),
    with_hold_tax_group: "",
    strn: "",
    drug_license_no: "",
    tax_status: "Un-Paid",
    drug_sales_license: "Yes",
    tax_exemption: "Yes",
    contact_person: "",
    poc_phone_number: "",
    poc_email: "",
    business_address: "",
    city: DropDownData.city[0],
    business_phone_number: "",
    email_address: "",
    payment_terms: DropDownData.payment_terms[0],
    payment_method: DropDownData.method_of_payment[0],
    vendor_credit_limit: "",
    delivery_lead_time: "",
    bank_name: "",
    bank_branch_code: "",
    branch_city: DropDownData.city[0],
    account_ibn_number: "",
    vendor_wise_discount: "",
    stock_return_policy: DropDownData.stock_return_policy[0],
    advance_income_tax: "",
    gst: "",
    minimum_order_quantity: "",
    //
    with_hold_tax_group: withHoldTaxGroup.map((item) => item.tax_group)[0],
    with_hold_tax_percentage: withHoldTaxGroup.map(
      (item) => item.percentage
    )[0],
    sales_tax_group: salesTaxGroup.map((item) => item.tax_group)[0],
    sales_tax_percentage: withHoldTaxGroup.map((item) => item.percentage)[0],
    //
  };
  //
  const VENDOR_INITIAL_VAL = {
    id: data[0].id,
    vendor_status: data[0].vendor_status,
    vendor_name: data[0].vendor_name,
    procurement_category: data[0].procurement_category,
    vendor_classification: data[0].vendor_classification,
    ntn: data[0].ntn,
    cnic: data[0].cnic,
    cnic_expiry_date: new Date(),
    line_of_business: data[0].line_of_business,
    tax_exemption_validity: data[0].tax_exemption_validity,
    with_hold_tax_group: data[0].with_hold_tax_group,
    strn: data[0].strn,
    drug_license_no: data[0].drug_license_no,
    tax_status: data[0].tax_status,
    drug_sales_license: data[0].drug_sales_license,
    tax_exemption: data[0].tax_exemption,
    contact_person: data[0].contact_person,
    poc_phone_number: data[0].poc_phone_number,
    poc_email: data[0].poc_email,
    business_address: data[0].business_address,
    city: data[0].city,
    business_phone_number: data[0].business_phone_number,
    email_address: data[0].email_address,
    payment_terms: data[0].payment_terms,
    payment_method: data[0].payment_method,
    vendor_credit_limit: data[0].vendor_credit_limit,
    delivery_lead_time: data[0].delivery_lead_time,
    bank_name: data[0].bank_name,
    bank_branch_code: data[0].bank_branch_code,
    branch_city: data[0].branch_city,
    account_ibn_number: data[0].account_ibn_number,
    vendor_wise_discount: data[0].vendor_wise_discount,
    stock_return_policy: data[0].stock_return_policy,
    advance_income_tax: data[0].advance_income_tax,
    gst: data[0].gst,
    minimum_order_quantity: data[0].minimum_order_quantity,
    with_hold_tax_group: data[0].with_hold_tax_group,
    with_hold_tax_percentage: data[0].with_hold_tax_percentage,
    sales_tax_group: data[0].sales_tax_group,
    sales_tax_percentage: data[0].sales_tax_percentage,
  };
  //
  const route = useRouter();
  const [vendor, setVendor] = useState(VENDOR_INITIAL_VAL);
  //
  const manufacturer = [
    {
      label: "Manufacturers",
      options: manufacturer_data.map((values) => {
        return {
          value: values.id,
          label: values.manufacturer_name,
          id: values.id,
        };
      }),
    },
  ];

  //
  const [selectedValues, setSelectedValues] = useState({
    selected: selected_manufacturer.map((elem) => {
      return elem.manufacturerId;
    }),
  });
  const listSelector = (selected) => {
    setSelectedValues({ selected });
  };
  //
  // functions
  const submitHandler = async (e) => {
    e.preventDefault();
    const sendData = {
      ...vendor,
      manufacturer: selectedValues,
    };
    await axiosFunction({
      urlPath: "/vendor/update/",
      data: sendData,
      method: "PUT",
    }).then(() => {
      setVendorData([]);
      route.push("/dashboard/vendor/");
      setVendor(VENDOR_EMPTY_VAL);
    });
  };
  //
  const clearFunction = () => {
    setVendor(VENDOR_EMPTY_VAL);
  };
  //
  const inputHandler = (name, value) => {
    setVendor({ ...vendor, [name]: value });
  };
  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <BreadcrumbComponent isUpdate={true} router={route} />
          <h1>Update Vendor</h1>
          <p>Please see Update Vendor from below from all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <form action="" onSubmit={submitHandler} className={styles.form}>
            <div className={styles.form_head}>
              <h5>Update Vendor</h5>
              <h4>Here you can manage your all Update Vendor!</h4>
            </div>
            <div className={styles.formInner}>
              {/*  */}
              <div className={`${styles.category_div}`}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(evt) =>
                        inputHandler("vendor_status", evt.target.checked)
                      }
                      checked={vendor.vendor_status}
                    />
                  }
                  label="Vendor Status"
                />
              </div>
              {/*  */}
              <InputTypeText
                name={"vendor_name"}
                value={vendor.vendor_name}
                onChange={inputHandler}
                text={"Vendor Name"}
                comClass={styles.w_50}
                required
              />
              {/*  */}
              <InputTypeDropDown
                name={"procurement_category"}
                value={vendor.procurement_category}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Procurement Category"}
                options={DropDownData.procurement_category}
                required
              />
              {/*  */}
              {/*  */}
              <ListViewBox
                selectedValues={selectedValues}
                listSelector={listSelector}
                options={manufacturer}
                text={"Manufacturers"}
                comClass={styles.list_box}
              />
              {/*  */}
              <InputTypeDropDown
                name={"vendor_classification"}
                value={vendor.vendor_classification}
                onChange={inputHandler}
                comClass={styles.w_100}
                text={"Vendor Classification"}
                options={DropDownData.vendor_classification}
                required
              />
              {/*  */}
              <InputTypeNumber
                name={"ntn"}
                value={vendor.ntn}
                onChange={inputHandler}
                comClass={styles.w_33}
                text={"NTN"}
                required
              />
              {/*  */}
              <InputTypeNumber
                name={"cnic"}
                value={vendor.cnic}
                onChange={inputHandler}
                comClass={styles.w_33}
                text={"CNIC"}
                required
              />
              {/*  */}
              <InputTypeDate
                name={"cnic_expiry_date"}
                value={vendor.cnic_expiry_date}
                onChange={inputHandler}
                comClass={styles.w_33}
                text={"CNIC Expiry Date"}
                required
              />
              {/*  */}
              <InputTypeDropDown
                name={"line_of_business"}
                value={vendor.line_of_business}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Line of Business"}
                options={DropDownData.line_of_business}
                required
              />
              {/*  */}
              <InputTypeDate
                name={"tax_exemption_validity"}
                value={vendor.tax_exemption_validity}
                onChange={inputHandler}
                text={"Tax Exemption Validity"}
                comClass={styles.w_50}
                required
              />
              {/*  */}
              <InputTypeDropDown
                name={"with_hold_tax_percentage"}
                value={vendor.with_hold_tax_percentage}
                onChange={inputHandler}
                text={"With Hold Tax Percentage"}
                comClass={styles.w_50}
                options={withHoldTaxGroup
                  .map((item) => item.percentage)
                  .filter((item) => item !== null)}
              />
              <InputTypeDropDown
                name={"with_hold_tax_group"}
                value={vendor.with_hold_tax_group}
                onChange={inputHandler}
                text={"With hold Tax Group"}
                comClass={styles.w_50}
                options={withHoldTaxGroup.map((item) => item.tax_group)}
                required
              />
              {/*  */}
              <InputTypeDropDown
                name={"sales_tax_percentage"}
                value={vendor.sales_tax_percentage}
                onChange={inputHandler}
                text={"Sales Tax Percentage"}
                comClass={styles.w_50}
                options={salesTaxGroup
                  .map((item) => item.percentage)
                  .filter((item) => item !== null)}
              />
              <InputTypeDropDown
                name={"sales_tax_group"}
                value={vendor.sales_tax_group}
                onChange={inputHandler}
                text={"Sales Tax Group"}
                comClass={styles.w_50}
                options={salesTaxGroup.map((item) => item.tax_group)}
                required
              />
              {/*  */}
              {/*  */}
              <InputTypeText
                name={"with_hold_tax_group"}
                value={vendor.with_hold_tax_group}
                onChange={inputHandler}
                text={"With hold Tax Group"}
                comClass={styles.w_100}
                required
              />
              {/*  */}
              <InputTypeNumber
                name={"strn"}
                value={vendor.strn}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"STRN"}
                required
              />
              {/*  */}
              <InputTypeNumber
                name={"drug_license_no"}
                value={vendor.drug_license_no}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Drug License No."}
                required
              />
              {/*  */}
              <InputTypeRadio
                comClass={styles.w_33}
                name={"tax_status"}
                value={vendor.tax_status}
                onChange={inputHandler}
                text={"Tax Status"}
                choices={["Filer", "Non-Filer"]}
                required
              />
              {/*  */}
              <InputTypeRadio
                comClass={styles.w_33}
                name={"drug_sales_license"}
                value={vendor.drug_sales_license}
                onChange={inputHandler}
                text={"Drug Sale License"}
                choices={["Yes", "No"]}
                required
              />
              {/*  */}
              <InputTypeRadio
                comClass={styles.w_33}
                name={"tax_exemption"}
                value={vendor.tax_exemption}
                onChange={inputHandler}
                text={"Tax Exemption"}
                choices={["Yes", "No"]}
                required
              />
              {/*  */}
              <InputTypeText
                name={"contact_person"}
                value={vendor.contact_person}
                onChange={inputHandler}
                comClass={styles.w_33}
                text={"Contact Person"}
                required
              />
              {/*  */}
              <InputTypeNumber
                name={"poc_phone_number"}
                value={vendor.poc_phone_number}
                onChange={inputHandler}
                comClass={styles.w_33}
                text={"POC Phone Number"}
                required
              />
              {/*  */}
              <InputTypeText
                name={"poc_email"}
                value={vendor.poc_email}
                onChange={inputHandler}
                comClass={styles.w_33}
                text={"POC Email Address"}
                required
              />
              {/*  */}
              <InputTypeText
                name={"business_address"}
                value={vendor.business_address}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Business Address"}
                required
              />
              {/*  */}
              <InputTypeDropDown
                name={"city"}
                value={vendor.city}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"City"}
                options={DropDownData.city}
                required
              />
              {/*  */}
              <InputTypeNumber
                value={vendor.business_phone_number}
                name={"business_phone_number"}
                onChange={inputHandler}
                comClass={styles.w_100}
                text={"Business Phone Number"}
                required
              />
              {/*  */}
              <InputTypeText
                value={vendor.email_address}
                name={"email_address"}
                onChange={inputHandler}
                comClass={styles.w_100}
                text={"Email Address"}
                required
              />
              {/*  */}

              {/*  */}
              <InputTypeDropDown
                name={"payment_terms"}
                value={vendor.payment_terms}
                comClass={styles.w_50}
                onChange={inputHandler}
                text={"Payment Terms"}
                options={DropDownData.payment_terms}
                required
              />
              {/*  */}
              <InputTypeDropDown
                comClass={styles.w_50}
                value={vendor.payment_method}
                name={"payment_method"}
                onChange={inputHandler}
                text={"Payment Method"}
                options={DropDownData.method_of_payment}
                required
              />
              {/*  */}
              <InputTypeNumber
                value={vendor.vendor_credit_limit}
                name={"vendor_credit_limit"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Vendor Credit Limit"}
                required
              />
              {/*  */}
              <InputTypeText
                value={vendor.delivery_lead_time}
                name={"delivery_lead_time"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Delivery Lead Time"}
                required
              />

              {/*  */}
              <InputTypeText
                value={vendor.bank_name}
                name={"bank_name"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Bank Name"}
                required
              />
              {/*  */}
              <InputTypeText
                value={vendor.bank_branch_code}
                name={"bank_branch_code"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Branch Code"}
                required
              />
              {/*  */}
              <InputTypeDropDown
                name={"branch_city"}
                value={vendor.branch_city}
                onChange={inputHandler}
                comClass={styles.w_100}
                text={"Branch City"}
                options={DropDownData.city}
                required
              />
              {/*  */}
              <InputTypeNumber
                value={vendor.account_ibn_number}
                name={"account_ibn_number"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Account Number / IBAN Number"}
                required
              />
              {/*  */}
              {/* <InputTypeNumber
                value={vendor.vendor_wise_discount}
                name={"vendor_wise_discount"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Vendor Wise Discount"}
                required
              /> */}
              {/*  */}
              <InputTypeDropDown
                value={vendor.stock_return_policy}
                name={"stock_return_policy"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Stock Return Policy"}
                options={DropDownData.stock_return_policy}
                required
              />
              {/*  */}
              {/* <InputTypeNumber
                value={vendor.advance_income_tax}
                name={"advance_income_tax"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Advance Income Tax"}
                required
              /> */}
              {/*  */}
              {/* <InputTypeNumber
                value={vendor.gst}
                name={"gst"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"GST"}
                required
              /> */}
              {/*  */}
              {/* <InputTypeNumber
                value={vendor.minimum_order_quantity}
                name={"minimum_order_quantity"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Minimum Order Quantity"}
                required
              /> */}

              {/*  */}
              <div className={styles.form_btn_div}>
                <button className={styles.submit_btn}>Update</button>
                <button onClick={clearFunction} className={styles.reset_btn}>
                  Clear
                </button>
              </div>
              {/*  */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.id;
  //
  const vendor_tax = await fetch(url + "/vendor/add_vendor/vendor_tax/");
  const vendor_tax_data = await vendor_tax.json();
  //
  const manufacturer_result = await fetch(url + "/manufacturer/");
  const manufacturer_data = await manufacturer_result.json();
  //
  const selected_manufacturer_result = await fetch(
    url + `/vendor/vendor_manufacturer/${id}`
  );
  const selected_manufacturer = await selected_manufacturer_result.json();
  //
  const res = await fetch(url + `/vendor/update/${id}`);
  const data = await res.json();
  return {
    props: { data, manufacturer_data, selected_manufacturer, vendor_tax_data },
  };
}

export default Index;
