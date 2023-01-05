// import { FormControlLabel, Switch } from "@mui/material";
// import { useRouter } from "next/router";
// import React from "react";
// import { useState } from "react";
// import styles from "./styles.module.css";
// //
// import InputTypeText from "../../../../components/ui/InputTypeText/InputTypeText";
// import BreadcrumbComponent from "../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
// import ProductData from "../../../../components/Data/ProductValues/index";
// import InputTypeDropDown from "../../../../components/ui/InputTypeDropDown/InputTypeDropDown";
// import InputTypeNumber from "../../../../components/ui/InputTypeNumber/InputTypeNumber";
// import InputTypeDate from "../../../../components/ui/InputTypeDate/InputTypeDate";
// import ListViewBox from "../../../../components/ui/ListViewBox/index";
// import axios from "axios";
// import InputTypeTag from "../../../../components/ui/InputTypeTag/InputTypeTag";
// import RichText from "../../../../components/ui/RichText/RichText";
// import useProductData from "../../../../hooks/useProductData";
// import { url } from "../../../../config";
// import InputTypeImage from "../../../../components/ui/InputTypeImage";
// import { Radio } from "@mantine/core";
// //
// const Index = ({
//   product_data,
//   productVendor_selected_data,
//   productCategory_selected_data,
//   product_images_data,
//   product_tags_data,
//   vendor_data,
//   category_data,
//   manufacturer_data,
//   product_formula_data,
// }) => {
//   console.log(product_data);
//   //
//   const [discountType, setDiscountType] = useState("discount_price");
//   const [discountPercentage, setDiscountPercentage] = useState("");
//   //
//   const route = useRouter();
//   const [data, setData] = useProductData();
//   //
//   const PRODUCT_EMPTY_VAL = {
//     item_status: false,
//     product_name: "",
//     sku_description: "",
//     sku_department: ProductData.sku_department[0],
//     item_nature: ProductData.item_nature[0],
//     //
//     manufacturer_id: product_data[0].manufacturerId,
//     tax_code: ProductData.tax_code[0],
//     purchasing_unit: ProductData.purchasing_unit[0],
//     trade_price: "",
//     // discounts: "",
//     discounted_price: "",
//     maximum_retail_price: "",
//     sku_minimum_level: "",
//     sku_maximum_level: "",
//     sku_reorder_level: "",
//     sku_warehouse_lead_time: new Date(),
//     item_release_level: ProductData.item_release_level[0],
//     price_levels: ProductData.price_levels[0],
//     stock_nature: ProductData.stock_nature[0],
//     bar_code: "",
//     item_storage_location: ProductData.item_storage_location[0],
//     selling_discount: "",
//     item_tracking_level: ProductData.item_tracking_level[0],
//     product_lifecycle: "",
//     //
//     quantity: "",
//     //
//     prescription_required: false,
//     drap_id: "",
//     dosage_instruction: "",
//     side_effects: "",
//   };
//   //
//   const PRODUCT_INITIAL_VALUES = {
//     id: product_data[0].id,
//     item_status: product_data[0].item_status === 1 ? true : false,
//     product_name: product_data[0].product_name,
//     sku_description: product_data[0].sku_description,
//     sku_department: product_data[0].sku_department,
//     item_nature: product_data[0].item_nature,
//     manufacturer_id: "",
//     tax_code: product_data[0].tax_code,
//     trade_price: product_data[0].trade_price,
//     discounted_price: product_data[0].discounted_price,
//     maximum_retail_price: product_data[0].maximum_retail_price,
//     sku_minimum_level: product_data[0].sku_minimum_level,
//     sku_maximum_level: product_data[0].sku_maximum_level,
//     sku_reorder_level: product_data[0].sku_reorder_level,
//     sku_warehouse_lead_time: new Date(),
//     item_release_level: product_data[0].item_release_level,
//     price_levels: product_data[0].price_levels,
//     stock_nature: product_data[0].stock_nature,
//     bar_code: product_data[0].bar_code,
//     item_storage_location: product_data[0].item_storage_location,
//     selling_discount: product_data[0].selling_discount,
//     item_tracking_level: product_data[0].item_tracking_level,
//     product_lifecycle: product_data[0].product_lifecycle,
//     quantity: product_data[0].quantity,
//     prescription_required:
//       product_data[0].prescription_required === 1 ? true : false,
//     drap_id: product_data[0].drap_id,
//     dosage_instruction: "",
//     side_effects: product_data[0].side_effects,
//   };
//   console.log(PRODUCT_INITIAL_VALUES);
//   //
//   const [product, setProduct] = useState(PRODUCT_INITIAL_VALUES);
//   //
//   //
//   const [productConversion, setProductConversion] = useState([
//     {
//       selling_unit: "Carton",
//       item_conversion: 1,
//     },
//     {
//       selling_unit: "",
//       item_conversion: "1",
//     },
//     {
//       selling_unit: "",
//       item_conversion: "1",
//     },
//   ]);
//   //
//   const productConversionHandleInput = (index, name, value) => {
//     const temp = [...productConversion];
//     temp[index] = { ...temp[index], [name]: value };
//     setProductConversion(temp);
//   };
//   //
//   //
//   const [selectedVendor, setSelectedVendor] = useState({
//     selected: productVendor_selected_data.map((item) => {
//       return item.vendorId;
//     }),
//   });
//   const vendorSelector = (selected) => {
//     setSelectedVendor({ selected });
//   };
//   //
//   const vendor = [
//     {
//       label: "Vendor",
//       options: vendor_data.map((values) => {
//         return {
//           value: values.id,
//           label: values.vendor_name,
//           id: values.id,
//         };
//       }),
//     },
//   ];
//   //
//   const [selectedCategory, setSelectedCategory] = useState({
//     selected: productCategory_selected_data.map((item) => {
//       return item.categoryId;
//     }),
//   });
//   const categorySelector = (selected) => {
//     setSelectedCategory({ selected });
//   };
//   const category = [
//     {
//       label: "Category",
//       options: category_data.map((values) => {
//         return {
//           value: values.id,
//           label: values.category_name,
//           id: values.id,
//         };
//       }),
//     },
//   ];
//   //

//   const [images, setImages] = React.useState([]);
//   const maxImages = 3;
//   const fetchedImages = product_images_data.map((item) => {
//     return `http://localhost:3001${item.image_url}`;
//   });
//   //
//   const [productTags, setProductTags] = useState(
//     product_tags_data?.map((item) => {
//       return item.tag_name;
//     })
//   );
//   //
//   const [productGenericFormula, setProductGenericFormula] = useState(
//     product_formula_data?.map((item) => {
//       return item.product_generic_formula;
//     })
//   );
//   //
//   const handleInput = (name, value) => {
//     if (discountType === "discount_percentage") {
//       setDiscountPercentage(value);
//     }
//     setProduct((pre) => {
//       return { ...pre, [name]: value };
//     });
//   };

//   //
//   // functions
//   const submitHandler = (e) => {
//     e.preventDefault();
//     const sendData = {
//       ...product,
//       vendor: selectedVendor,
//       category: selectedCategory,
//       productPictures: images,
//       productTags: productTags,
//       productGenericFormula: productGenericFormula,
//       productConversion: productConversion,
//       margin: +product.maximum_retail_price - +product.trade_price,
//     };
//     axios
//       .put(process.env.NEXT_PUBLIC_THIS_URL + "/product/update/", sendData)
//       .then(() => {
//         setData([]);
//         route.push("/dashboard/product/");
//         setProduct(PRODUCT_EMPTY_VAL);
//       })
//       .catch((err) => console.log(err));
//   };
//   //
//   const clearFunction = () => {};
//   //
//   return (
//     <>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <BreadcrumbComponent router={route} isUpdate={true} />
//           <h1>Update Product</h1>
//           <p>Please see Add Product from below from all connected channels</p>
//         </div>
//         <div className={styles.wrapper}>
//           <form action="" onSubmit={submitHandler} className={styles.form}>
//             <div className={styles.form_head}>
//               <h5>Add Product</h5>
//               <h4>Here you can manage your all Add Product!</h4>
//             </div>
//             <div className={styles.formInner}>
//               {/*  */}
//               <div className={styles.category_div}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       onChange={(evt) =>
//                         handleInput("item_status", evt.target.checked)
//                       }
//                       checked={product.item_status}
//                     />
//                   }
//                   label="Product Status"
//                 />
//               </div>
//               {/*  */}
//               {/*  */}

//               <InputTypeText
//                 comClass={styles.w_50}
//                 value={product.product_name}
//                 onChange={handleInput}
//                 name={"product_name"}
//                 text={"Product Name"}
//               />
//               {/*  */}
//               <InputTypeDropDown
//                 comClass={styles.w_50}
//                 value={product.sku_department}
//                 onChange={handleInput}
//                 name={"sku_department"}
//                 text={"SKU Department"}
//                 options={ProductData.sku_department}
//               />
//               {/*  */}
//               <InputTypeDropDown
//                 comClass={styles.w_50}
//                 value={product.item_nature}
//                 onChange={handleInput}
//                 name={"item_nature"}
//                 text={"Item Nature"}
//                 options={ProductData.item_nature}
//               />
//               {/*  */}
//               <InputTypeDropDown
//                 comClass={styles.w_50}
//                 value={product.tax_code}
//                 onChange={handleInput}
//                 name={"tax_code"}
//                 text={"Tax Code"}
//                 options={ProductData.tax_code}
//               />
//               {/*  */}
//               <InputTypeDropDown
//                 comClass={styles.w_50}
//                 value={product.purchasing_unit}
//                 onChange={handleInput}
//                 name={"purchasing_unit"}
//                 text={"Purchasing Unit"}
//                 options={ProductData.purchasing_unit}
//               />

//               {/*  */}
//               <InputTypeNumber
//                 comClass={styles.w_50}
//                 value={product.trade_price}
//                 onChange={handleInput}
//                 name={"trade_price"}
//                 text={"Trade Price"}
//               />
//               {/*  */}
//               <InputTypeNumber
//                 comClass={styles.w_100}
//                 value={product.maximum_retail_price}
//                 onChange={handleInput}
//                 name={"maximum_retail_price"}
//                 text={"Maximum Retail Price"}
//               />
//               {/*  */}
//               <div className={styles.discount_wrapper}>
//                 <div className={styles.discount_radio}>
//                   <Radio.Group
//                     value={discountType}
//                     onChange={(e) => setDiscountType(e)}
//                     label="Select Discount Type"
//                     withAsterisk
//                   >
//                     <Radio value="discount_price" label="Discounted Price" />
//                     <Radio
//                       value="discount_percentage"
//                       label="Discount Percentage"
//                     />
//                   </Radio.Group>
//                 </div>
//                 {discountType === "discount_price" ? (
//                   <InputTypeNumber
//                     comClass={styles.w_100}
//                     value={product.discounted_price}
//                     onChange={handleInput}
//                     name={"discounted_price"}
//                     text={
//                       "Discounted Price " +
//                       ((+product.discounted_price -
//                         +product.maximum_retail_price) /
//                         +product.maximum_retail_price) *
//                         100 +
//                       "%"
//                     }
//                   />
//                 ) : (
//                   <InputTypeNumber
//                     comClass={styles.w_100}
//                     value={product.discounted_price}
//                     onChange={handleInput}
//                     name={"discounted_price"}
//                     text={"Discount Percentage %"}
//                   />
//                 )}
//               </div>

//               {/*  */}
//               <InputTypeNumber
//                 comClass={styles.w_100}
//                 value={+product.maximum_retail_price - +product.trade_price}
//                 text={"Margins"}
//                 disabled
//               />
//               <InputTypeText
//                 comClass={styles.w_100}
//                 value={""}
//                 text={"Purchasing Price"}
//                 disabled
//               />
//               {/*  */}
//               <InputTypeText
//                 comClass={styles.w_50}
//                 value={product.sku_minimum_level}
//                 onChange={handleInput}
//                 name={"sku_minimum_level"}
//                 text={"SKU Minimum Level"}
//               />
//               {/*  */}
//               <InputTypeText
//                 comClass={styles.w_50}
//                 value={product.sku_maximum_level}
//                 onChange={handleInput}
//                 name={"sku_maximum_level"}
//                 text={"SKU Maximum Level"}
//               />
//               {/*  */}
//               <InputTypeText
//                 comClass={styles.w_100}
//                 value={product.sku_reorder_level}
//                 onChange={handleInput}
//                 name={"sku_reorder_level"}
//                 text={"SKU Reorder Level"}
//               />
//               {/*  */}
//               <InputTypeDate
//                 comClass={styles.w_50}
//                 value={product.sku_warehouse_lead_time}
//                 onChange={handleInput}
//                 name={"sku_warehouse_lead_time"}
//                 text={"SKU Warehouse Lead Time"}
//               />
//               {/*  */}
//               <InputTypeDropDown
//                 comClass={styles.w_50}
//                 value={product.item_release_level}
//                 onChange={handleInput}
//                 name={"item_release_level"}
//                 text={"Item Release Level"}
//                 options={ProductData.item_release_level}
//               />
//               {/*  */}
//               <InputTypeDropDown
//                 comClass={styles.w_50}
//                 value={product.price_levels}
//                 onChange={handleInput}
//                 name={"price_levels"}
//                 text={"Price Levels"}
//                 options={ProductData.price_levels}
//               />
//               {/*  */}
//               <InputTypeDropDown
//                 comClass={styles.w_50}
//                 value={product.stock_nature}
//                 onChange={handleInput}
//                 name={"stock_nature"}
//                 text={"Stock Nature"}
//                 options={ProductData.stock_nature}
//               />
//               {/*  */}
//               <InputTypeText
//                 comClass={styles.w_100}
//                 value={product.bar_code}
//                 onChange={handleInput}
//                 name={"bar_code"}
//                 text={"Bar Code"}
//               />
//               <InputTypeText
//                 comClass={styles.w_50}
//                 value={product.drap_id}
//                 onChange={handleInput}
//                 name={"drap_id"}
//                 text={"Drap ID"}
//               />
//               <InputTypeText
//                 comClass={styles.w_50}
//                 value={product.dosage_instruction}
//                 onChange={handleInput}
//                 name={"dosage_instruction"}
//                 text={"Dosage Instruction"}
//               />
//               <InputTypeText
//                 comClass={styles.w_100}
//                 value={product.side_effects}
//                 onChange={handleInput}
//                 name={"side_effects"}
//                 text={"Side Effects"}
//               />
//               {/*  */}
//               <div className={styles.category_div}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       onChange={(evt) =>
//                         handleInput("prescription_required", evt.target.checked)
//                       }
//                       checked={product.prescription_required}
//                     />
//                   }
//                   label="Prescription Required"
//                 />
//               </div>
//               {/*  */}
//               <InputTypeDropDown
//                 comClass={styles.w_50}
//                 value={product.item_storage_location}
//                 onChange={handleInput}
//                 name={"item_storage_location"}
//                 text={"Item Storage Location"}
//                 options={ProductData.item_storage_location}
//               />
//               {/*  */}
//               <InputTypeDropDown
//                 comClass={styles.w_50}
//                 value={product.item_tracking_level}
//                 onChange={handleInput}
//                 name={"item_tracking_level"}
//                 text={"Item Tracking Level"}
//                 options={ProductData.item_tracking_level}
//               />
//               {/*  */}
//               <div className={styles.item_conversion_wrapper}>
//                 <label>Item Conversion</label>
//                 <InputTypeDropDown
//                   comClass={styles.w_50}
//                   value={productConversion[0].selling_unit}
//                   onChange={(name, value) =>
//                     productConversionHandleInput(0, name, value)
//                   }
//                   name={"selling_unit"}
//                   text={"Selling Unit"}
//                   options={ProductData.selling_unit[0]}
//                   disabled
//                 />
//                 {/*  */}
//                 <InputTypeText
//                   comClass={styles.w_50}
//                   value={productConversion[0].item_conversion}
//                   onChange={(name, value) =>
//                     productConversionHandleInput(0, name, value)
//                   }
//                   name={"item_conversion"}
//                   text={"Item Conversion"}
//                   disabled
//                 />
//                 {/*  */}
//                 <InputTypeDropDown
//                   comClass={styles.w_50}
//                   value={productConversion[1].selling_unit}
//                   onChange={(name, value) =>
//                     productConversionHandleInput(1, name, value)
//                   }
//                   name={"selling_unit"}
//                   text={"Selling Unit"}
//                   options={ProductData.selling_unit[1]}
//                   // disabled
//                 />
//                 {/*  */}
//                 <InputTypeText
//                   comClass={styles.w_50}
//                   value={productConversion[1].item_conversion}
//                   onChange={(name, value) =>
//                     productConversionHandleInput(1, name, value)
//                   }
//                   name={"item_conversion"}
//                   text={"Item Conversion"}
//                 />
//                 {/*  */}
//                 <div
//                   style={{
//                     width: "100%",
//                     display:
//                       productConversion[1].selling_unit === "Box"
//                         ? "flex"
//                         : "none",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <InputTypeDropDown
//                     comClass={styles.w_50}
//                     value={productConversion[2].selling_unit}
//                     onChange={(name, value) =>
//                       productConversionHandleInput(2, name, value)
//                     }
//                     name={"selling_unit"}
//                     text={"Selling Unit"}
//                     options={ProductData.selling_unit[2]}
//                   />
//                   {/*  */}
//                   <InputTypeText
//                     comClass={styles.w_50}
//                     value={productConversion[2].item_conversion}
//                     onChange={(name, value) =>
//                       productConversionHandleInput(2, name, value)
//                     }
//                     name={"item_conversion"}
//                     text={"Item Conversion"}
//                   />
//                 </div>
//                 {/*  */}
//               </div>
//               {/*  */}
//               <InputTypeText
//                 comClass={styles.w_100}
//                 value={product.selling_discount}
//                 onChange={handleInput}
//                 name={"selling_discount"}
//                 text={"Selling Discount"}
//               />

//               {/*  */}
//               <InputTypeText
//                 comClass={styles.w_100}
//                 value={product.product_lifecycle}
//                 onChange={handleInput}
//                 name={"product_lifecycle"}
//                 text={"Product Lifecycle"}
//               />
//               {/*  */}
//               <InputTypeDropDown
//                 name={"manufacturer_id"}
//                 value={product.manufacturer_id}
//                 onChange={handleInput}
//                 options={manufacturer_data.map((item) => [
//                   item.manufacturer_name,
//                   item.id,
//                 ])}
//                 text={"Manufacturers"}
//                 comClass={styles.w_100}
//                 fromDataBase={true}
//               />
//               {/*  */}
//               {/*  */}
//               <ListViewBox
//                 selectedValues={selectedCategory}
//                 listSelector={categorySelector}
//                 options={category}
//                 text={"Categories"}
//                 comClass={styles.list_box}
//               />
//               {/*  */}
//               {/*  */}
//               <ListViewBox
//                 selectedValues={selectedVendor}
//                 listSelector={vendorSelector}
//                 options={vendor}
//                 text={"Vendors"}
//                 comClass={styles.list_box}
//               />
//               {/*  */}
//               <InputTypeTag
//                 text={"Product Tags (Press Enter after every tag)"}
//                 comClass={styles.w_100}
//                 setFunction={setProductTags}
//                 preValues={productTags}
//                 // onChange={productImagesInput}
//                 // value={productPictures.img1}
//                 // name={"img1"}
//               />
//               {/*  */}
//               <InputTypeTag
//                 text={"Product Generic Formula (Press Enter after every tag)"}
//                 comClass={styles.w_100}
//                 setFunction={setProductGenericFormula}
//                 // onChange={productImagesInput}
//                 preValues={productGenericFormula}
//                 // name={"img1"}
//               />
//               {/*  */}
//               <InputTypeNumber
//                 text={"Quantity"}
//                 comClass={styles.w_100}
//                 onChange={handleInput}
//                 value={product.quantity}
//                 name={"quantity"}
//               />

//               {/*  */}
//               {/*  */}
//               <InputTypeImage
//                 text={"Product Images URLs"}
//                 comClass={styles.w_100}
//                 images={images}
//                 setImages={setImages}
//                 maxImages={maxImages}
//                 fetchedImages={fetchedImages}
//               />
//               {/*  */}
//               <RichText
//                 name={"sku_description"}
//                 comClass={styles.w_100}
//                 onChange={handleInput}
//                 value={product.sku_description}
//                 text={"SKU Description"}
//               />
//               {/*  */}
//               <div className={styles.form_btn_div}>
//                 <button className={styles.submit_btn}>Add</button>
//                 <button
//                   type="button"
//                   onClick={clearFunction}
//                   className={styles.reset_btn}
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };
// //
// export async function getServerSideProps(context) {
//   const id = context.params.id;
//   //
//   const product_response = await fetch(url + `/product/update/${id}`);
//   const product_data = await product_response.json();
//   //
//   const productVendor_selected_response = await fetch(
//     url + `/product/product_vendor/${id}`
//   );
//   const productVendor_selected_data =
//     await productVendor_selected_response.json();
//   //
//   //
//   const productCategory_selected_response = await fetch(
//     url + `/product/product_category/${id}`
//   );
//   const productCategory_selected_data =
//     await productCategory_selected_response.json();
//   //
//   //
//   const product_images_response = await fetch(
//     url + `/product/product_images/${id}`
//   );
//   const product_images_data = await product_images_response.json();
//   //
//   //
//   const product_tags_response = await fetch(
//     url + `/product/product_tags/${id}`
//   );
//   const product_tags_data = await product_tags_response.json();
//   //
//   const product_formula_response = await fetch(
//     url + `/product/product_generic_formula/${id}`
//   );
//   const product_formula_data = await product_formula_response.json();
//   //
//   const vendor_res = await fetch(url + "/vendor/");
//   const vendor_data = await vendor_res.json();
//   //
//   const category_res = await fetch(url + "/product/category/");
//   const category_data = await category_res.json();
//   //
//   const manufacturer_res = await fetch(url + "/manufacturer/");
//   const manufacturer_data = await manufacturer_res.json();
//   //
//   return {
//     props: {
//       product_data,
//       productVendor_selected_data,
//       productCategory_selected_data,
//       product_images_data,
//       product_tags_data,
//       product_formula_data,
//       vendor_data,
//       category_data,
//       manufacturer_data,
//     },
//   };
// }
// //
// export default Index;

//
//
import React from "react";

const Index = () => {
  return <div>Index</div>;
};

export default Index;
