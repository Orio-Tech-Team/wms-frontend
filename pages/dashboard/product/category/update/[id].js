import { FormControlLabel, Switch } from "@mui/material";
import React from "react";
// import { useRef } from "react";
import InputTypeNumber from "../../../../../components/ui/InputTypeNumber/InputTypeNumber";
import InputTypeText from "../../../../../components/ui/InputTypeText/InputTypeText";
import styles from "./update.module.css";
import BreadcrumbComponent from "../../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import useCategoryData from "../../../../../hooks/useCategoryAtom";
//
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { url } from "../../../../../config";
import axiosFunction from "../../../../../functions/axios";
//
const CATEGORY_EMPTY_VAL = {
  category_name: "",
  category_description: "",
  category_status: false,
  category_sorting: "",
  category_image: "",
};
//
const Index = ({ data }) => {
  const [categoryReset, setCategoryReset] = useCategoryData();
  //
  const router = useRouter();
  //
  const CATEGORY_INITIAL_VAL = {
    id: data[0].id,
    category_name: data[0].category_name,
    category_description: data[0].category_description,
    category_status: data[0].category_status,
    category_sorting: data[0].category_sorting,
    category_image: data[0].category_image,
  };
  //
  //
  const [category, setCategory] = useState(CATEGORY_INITIAL_VAL);
  const handleInput = (name, value) => {
    setCategory({ ...category, [name]: value });
  };
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosFunction({
      urlPath: "/product/category/update/",
      data: category,
      method: "PUT",
    }).then(() => {
      setCategoryReset([]);
      router.push("/dashboard/product/category/");
      setCategory(CATEGORY_EMPTY_VAL);
    });
  };
  //
  const clearFunction = () => {
    setCategory(CATEGORY_EMPTY_VAL);
  };
  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <BreadcrumbComponent isUpdate={true} router={router} />
          <h1>Update Category</h1>
          <p>Please see Update Category form below all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h5>Update Category</h5>
            <h4>Here you can manage your all Update Category!</h4>
          </div>
          <form onSubmit={handleSubmit} action="" className={styles.form}>
            <InputTypeText
              name={"category_name"}
              value={category.category_name}
              onChange={handleInput}
              text={"Category Name"}
              comClass={styles.w_100}
              required
            />
            <InputTypeText
              name={"category_description"}
              value={category.category_description}
              onChange={handleInput}
              text={"Category Description"}
              comClass={styles.w_100}
              required
            />
            <div className={styles.category_div}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={(evt) =>
                      setCategory({
                        ...category,
                        ["category_status"]: evt.target.checked,
                      })
                    }
                    checked={category.category_status}
                  />
                }
                label="Category Status"
              />
            </div>
            <InputTypeNumber
              name={"category_sorting"}
              value={category.category_sorting}
              onChange={handleInput}
              text={"Sorting Number"}
              comClass={styles.w_100}
              required
            />
            <InputTypeText
              name={"category_image"}
              value={category.category_image}
              onChange={handleInput}
              text={"URL for image"}
              comClass={styles.w_100}
            />

            <div className={styles.form_btn_div}>
              <button type="submit">Update</button>
              <button onClick={clearFunction} type="button">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(url + `/product/category/update/${id}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Index;
