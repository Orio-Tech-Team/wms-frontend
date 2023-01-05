import { FormControlLabel, Switch } from "@mui/material";
import React from "react";
// import { useRef } from "react";
import InputTypeNumber from "../../../../../components/ui/InputTypeNumber/InputTypeNumber";
import InputTypeText from "../../../../../components/ui/InputTypeText/InputTypeText";
import InputTypeDropDown from "../../../../../components/ui/InputTypeDropDown/InputTypeDropDown";
import styles from "./add_category.module.css";
//
// import { BsUpload } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Form, Input, Label } from "reactstrap";
import BreadcrumbComponent from "../../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import useCategoryData from "../../../../../hooks/useCategoryAtom";
import { url } from "../../../../../config";
import axiosFunction from "../../../../../functions/axios";
//
const CATEGORY_INITIAL_VAL = {
  category_level: "Parent Level",
  category_name: "",
  comment: "",
  category_description: "",
  category_status: false,
  category_sorting: "",
  category_image: "",
};

//
const Index = ({ data }) => {
  console.log(process.env.NEXT_PUBLIC_THIS_URL);
  //
  // const hiddenFileInput = useRef(null);
  // const handleHiddenFileInput = (e) => {
  //   hiddenFileInput.current.click();
  // };
  //
  const [categoryReset, setCategoryReset] = useCategoryData();
  //
  const router = useRouter();
  const [category, setCategory] = useState(CATEGORY_INITIAL_VAL);

  //
  const handleInput = (name, value) => {
    setCategory({ ...category, [name]: value });
  };
  //

  //
  const PARENT_VALUES = data.filter((values) => {
    return values.category_level === "Parent Level";
  });
  //
  const [parentCategory, setParentCategory] = useState(
    PARENT_VALUES[0]?.category_name
  );
  //
  var parentValues = {
    ...category,
    id: PARENT_VALUES.filter((val) => {
      return val.category_name === parentCategory;
    })[0]?.id,
  };
  //

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parentValues.id != null) {
      await axiosFunction({
        method: "POST",
        data: parentValues,
        urlPath: "/product/category/add_category",
      }).then((res) => {
        setCategoryReset([]);
        router.push("/dashboard/product/category/");
        setCategory(CATEGORY_INITIAL_VAL);
      });
      return "";
    }
    await axiosFunction({
      method: "POST",
      data: category,
      urlPath: "/product/category/add_category",
    }).then((res) => {
      setCategoryReset([]);
      router.push("/dashboard/product/category/");
      setCategory(CATEGORY_INITIAL_VAL);
    });
  };

  const clearFunction = () => {
    setCategory(CATEGORY_INITIAL_VAL);
    setParentCategory("");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <BreadcrumbComponent router={router} />
          <h1>Add Category</h1>
          <p>Please see Add Category form below all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h5>Add Category</h5>
            <h4>Here you can manage your all Add Category!</h4>
          </div>
          <Form onSubmit={handleSubmit} className={styles.form}>
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
              {category.category_status ? (
                <InputTypeText
                  name={"comment"}
                  value={category.comment}
                  onChange={handleInput}
                  text={"Comment"}
                  comClass={styles.w_100}
                />
              ) : (
                ""
              )}
            </div>
            <InputTypeDropDown
              name={"category_level"}
              value={category.category_level}
              onChange={handleInput}
              options={["Parent Level", "Sub Level"]}
              text={"Category Level"}
              comClass={styles.w_100}
              required
            />
            {/*  */}
            <div
              hidden={category.category_level != "Sub Level"}
              className={styles.w_100}
            >
              <Label className="d-block">Parent Category</Label>
              <Input
                type="select"
                value={parentCategory}
                label={"Parent Category"}
                onChange={(e) => {
                  setParentCategory(e.target.value);
                }}
                required={category.category_level === "Sub Level"}
              >
                {PARENT_VALUES.length > 0
                  ? PARENT_VALUES.map((val, key) => {
                      return (
                        <option value={val.category_name} key={key}>
                          {val.category_name}
                        </option>
                      );
                    })
                  : ""}
              </Input>
            </div>

            {/*  */}
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
            />

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

            {/* <div className={styles.image_input_div}>
              Upload Category Image
              <button onClick={handleHiddenFileInput} type="button">
                <BsUpload />
              </button>
              <input type="file" hidden ref={hiddenFileInput} />
            </div> */}
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

export async function getServerSideProps(context) {
  const res = await fetch(`${url}/product/category/`);
  const data = await res.json();
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Index;
