import React, { useState } from "react";
import styles from "./add_vendor.module.css";
//Components
import InputTypeText from "../../../../components/ui/InputTypeText/InputTypeText";
import InputTypeDate from "../../../../components/ui/InputTypeDate/InputTypeDate";
import InputTypeNumber from "../../../../components/ui/InputTypeNumber/InputTypeNumber";
import InputTypeDropDown from "../../../../components/ui/InputTypeDropDown/InputTypeDropDown";
import InputTypeRadio from "../../../../components/ui/InputTypeRadio/InputTypeRadio";
import BreadcrumbComponent from "../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import DropDownData from "../../../../components/Data/VendorDropdownValues/index";
import ListViewBox from "../../../../components/ui/ListViewBox/index";
//

import { useRouter } from "next/router";
import axios from "axios";
import { FormControlLabel, Switch } from "@mui/material";
import useVendorData from "../../../../hooks/useVendorData";
import { url } from "../../../../config";
import axiosFunction from "../../../../functions/axios";
//
const Index = ({ data, vendor_tax_data }) => {
  const [vendorData, setVendorData] = useVendorData();
  //
  const [withHoldTaxGroup, setWithHoldTaxGroup] = useState(
    vendor_tax_data.filter((item) => item.type === "with_hold")
  );
  const [salesTaxGroup, setSalesTaxGroup] = useState(
    vendor_tax_data.filter((item) => item.type === "sales_group")
  );
  //
  const VENDOR_INITIAL_VAL = {
    vendor_status: false,
    vendor_name: "",
    procurement_category: "",
    vendor_classification: "",
    ntn: "",
    cnic: "",
    cnic_expiry_date: new Date(),
    line_of_business: "",
    tax_exemption_validity: new Date(),
    //
    with_hold_tax_group: "",
    with_hold_tax_percentage: "",
    sales_tax_group: "",
    sales_tax_percentage: "",
    //
    strn: "",
    drug_license_no: "",
    tax_status: "Un-Paid",
    drug_sales_license: "Yes",
    tax_exemption: "Yes",
    contact_person: "",
    poc_phone_number: "",
    poc_email: "",
    business_address: "",
    city: "",
    business_phone_number: "",
    email_address: "",
    payment_terms: "",
    payment_method: "",
    vendor_credit_limit: "",
    delivery_lead_time: "",
    bank_name: "",
    bank_branch_code: "",
    branch_city: "",
    account_ibn_number: "",
    vendor_wise_discount: "",
    stock_return_policy: "",
    advance_income_tax: "",
    gst: "",
    minimum_order_quantity: "",
  };
  //

  //
  const route = useRouter();
  //
  const manufacturer = [
    {
      label: "Manufacturers",
      options: data.map((values) => {
        return {
          value: values.id,
          label: values.manufacturer_name,
          id: values.id,
        };
      }),
    },
  ];

  //
  const [selectedValues, setSelectedValues] = useState({});

  const [vendor, setVendor] = useState(VENDOR_INITIAL_VAL);
  //
  //
  const listSelector = (selected) => {
    setSelectedValues({ selected });
  };
  //
  const inputHandler = (name, value) => {
    setVendor({ ...vendor, [name]: value });
  };
  //
  const submitHandler = async (e) => {
    vendor.sales_tax_percentage = vendor.sales_tax_group;
    e.preventDefault();
    const sendData = {
      ...vendor,
      manufacturer: selectedValues,
    };
    await axiosFunction({
      urlPath: "/vendor/add_vendor/",
      data: sendData,
      method: "POST",
    }).then(() => {
      setVendorData([]);
      route.push("/dashboard/vendor/");
      setVendor(VENDOR_INITIAL_VAL);
    });
  };
  //

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <BreadcrumbComponent router={route} />
          <h1>Add Vendor</h1>
          <p>Please see Add Vendor from below from all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <form action="" onSubmit={submitHandler} className={styles.form}>
            <div className={styles.form_head}>
              <h5>Add Vendor</h5>
              <h4>Here you can manage your all Add Vendor!</h4>
            </div>
            <div className={styles.formInner}>
              {/*  */}
              <div className={`${styles.category_div} `}>
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
                disabled={vendor.tax_exemption === "No"}
                name={"tax_exemption_validity"}
                value={vendor.tax_exemption_validity}
                onChange={inputHandler}
                text={"Tax Exemption Validity"}
                comClass={styles.w_50}
                required
              />
              {/*  */}
              <InputTypeDropDown
                name={"with_hold_tax_group"}
                value={vendor.with_hold_tax_group}
                onChange={inputHandler}
                text={"With hold Tax Group"}
                comClass={styles.w_50}
                options={withHoldTaxGroup.map((item) => item.tax_group)}
                required
              />
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
              {/*  */}
              {/* <InputTypeDropDown
                name={"sales_tax_group"}
                value={vendor.sales_tax_group}
                onChange={inputHandler}
                text={"Sales Tax Group"}
                comClass={styles.w_50}
                options={salesTaxGroup.map((item) => item.tax_group)}
                required
              />
              
              <InputTypeText
                comClass={styles.w_50}
                disabled
                value={vendor.sales_tax_group.substring(
                  0,
                  vendor.sales_tax_group.indexOf("%")
                )}
                name={"sales_tax_percentage"}
                text={"Sales Tax Percentage"}
              /> */}

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
              <InputTypeDropDown
                value={vendor.bank_name}
                name={"bank_name"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"Bank Name"}
                options={[
                  " Advans Micro Finance Bank Ltd",
                  " Al-Barka Bank",
                  "Allied Bank Limited",
                  "APNA Microfinance Bank",
                  "Askari Bank",
                  "Bank Alfalah Limited",
                  "Bank Al Habib Limited",
                  "BankIslami Pakistan Limited",
                  " Bank of Khyber",
                  " Bank of Punjab",
                  "Burj Bank",
                  "Citi Bank",
                  "Dubai Islamic Bank",
                  "Faysal Bank",
                  "First Women Bank",
                  "Habib Bank Limited",
                  "Habib Metropolitan Bank",
                  "FirstPay / HBL Microfinance Bank",
                  "JazzCash / Mobilink Microfinance Bank Ltd.",
                  " JS Bank",
                  "KASB Bank",
                  " MCB Bank Limited",
                  "MCB-Arif Habib Savings",
                  " MCB Islamic",
                  " Meezan Bank",
                  "National Bank of Pakistan (NBP)",
                  "NBP Fund Management Limited",
                  "  NIB Bank",
                  "  SAMBA Bank",
                  "Silk Bank",
                  "Sindh Bank",
                  "    Soneri Bank",
                  "Standard Chartered bank",
                  "  Summit Bank",
                  "  Easypaisa / Telenor MicroFinance Bank",
                  "   Upaisa / U Microfinance Bank Limited",
                  "United Bank Limited",
                  "Zarai Taraqiati Bank Limited (ZTBL)",
                  "PayMax",
                  "TAG",
                ]}
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
              <InputTypeText
                value={vendor.account_ibn_number}
                name={"account_ibn_number"}
                onChange={inputHandler}
                comClass={styles.w_50}
                text={"IBAN Number"}
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
                <button className={styles.submit_btn}>Add</button>
                <button className={styles.reset_btn}>Reset</button>
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
  const { token } = context.req.cookies;
  // const vendor_tax_data = await axiosFunction({
  //   urlPath: "/vendor/add_vendor/vendor_tax/",
  //   token: token
  // });
  const vendor_tax_response = await fetch(
    url + "/vendor/add_vendor/vendor_tax/"
  );
  const vendor_tax_data = await vendor_tax_response.json();
  //
  const res = await fetch(url + "/manufacturer/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return {
    props: {
      data,
      vendor_tax_data,
    }, // will be passed to the page component as props
  };
}
export default Index;
