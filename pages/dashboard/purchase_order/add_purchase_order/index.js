"use client";
import { useState } from "react";
import styles from "./styles.module.css";
const UUID = require("uuid-int");
// imports
import { useRouter } from "next/router";
// hooks
import useProductData from "../../../../hooks/useProductData";
import useVendorData from "../../../../hooks/useVendorData";
import useProductVendorData from "../../../../hooks/useProductVendorData";
// components
import BreadcrumbComponent from "../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import InputTypeSearchDropDown from "../../../../components/ui/InputTypeSearchDropDrowm";
import MyModal from "../../../../components/ui/MyModal/index";
import ModalTable from "../../../../components/ui/ModalTable/ModalTable";
import InputTypeDate from "../../../../components/ui/InputTypeDate/InputTypeDate";
import { AiFillCheckCircle, AiOutlineDelete } from "react-icons/ai";
import { useEffect } from "react";
import { url } from "../../../../config";
import usePorderData from "../../../../hooks/usePorderData";

import CustomTable from "../../../../components/ui/CustomTable/CustomTable";
import { Modal, Notification, Select, Switch, TextInput } from "@mantine/core";
import { Table } from "@mantine/core";
import { useRecoilState } from "recoil";
import { invoiceAtom } from "../../../../recoil/invoice";
import axiosFunction from "../../../../functions/axios";
import { useDisclosure } from "@mantine/hooks";
// /

var forInsertion = [];
//
const ProductOrder = ({ product_vendor_data, location }) => {
  //
  const [orderDisabler, setOrderDisabler] = useState(false);
  const [opened, { close, open }] = useDisclosure(false);
  const [po_id, set_po_id] = useState(0);
  const [data, setData] = usePorderData();
  const [invoiceData, setInvoiceData] = useRecoilState(invoiceAtom);
  //
  //
  const generator = UUID(0);
  const index = 1;
  const [modalActive, setModalActive] = useState(false);
  //
  const route = useRouter();
  //
  const [productVendor, setProductVendor] = useProductVendorData();

  const [productData, setProductData] = useProductData();
  //

  //
  const [vendorData, setVendorData] = useVendorData();
  //

  const vendorDropDownData = vendorData.map((elem) => {
    return { name: elem.vendor_name, id: elem.id };
  });

  //
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [selectedVendorName, setSelectedVendorName] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedVendor, setSelectedVendor] = useState([]);
  //
  //
  const [vendorTax, setVendorTax] = useState("");
  useEffect(() => {
    vendorData?.forEach((item) => {
      item.id === selectedVendorId ? setSelectedVendor([item]) : "";
    });
  }, [selectedVendorId]);

  //
  const [isVendorEmpty, setIsVendorEmpty] = useState(false);
  useEffect(
    () => setIsVendorEmpty(selectedVendorId === ""),
    [selectedVendorId]
  );
  //
  const vendorSelectFunction = (name, value) => {
    setSelectedVendorId(name);
    setSelectedVendorName(value);
  };
  const productSelectFunction = (name, value) => {
    setSelectedProductId(name);
    setSelectedProductName(value);
  };
  //
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [selectedLocationID, setSelectedLocationID] = useState("");
  //
  const locationSelectFunction = (name, value) => {
    setSelectedLocationID(name);
    setSelectedLocationName(value);
  };
  //
  const [productOrder, setProductOrder] = useState({
    expected_date: new Date(),
    order_type: "",
  });
  const inputHandler = (name, value) => {
    setProductOrder((pre) => {
      return { ...pre, [name]: value };
    });
  };
  //

  const filteredProductId = productVendor.filter((item) => {
    return item.vendorId === selectedVendorId;
  });
  //
  //
  const filter = productData.filter((item, key) => {
    const [ids] = filteredProductId.filter((filter) => {
      if (item.id == filter.productId) {
        return item;
      }
    });

    return ids;
  });
  //

  //
  const tableData = filter.map((each_item, key) => {
    return {
      index: key,
      id: each_item.id,
      product_name: each_item.product_name,
      sales_tax_percentage: each_item.sales_tax_percentage,
      manufacturer_name: each_item.manufacturer_name,
      vendor_name: selectedVendor,
      item_conversion: each_item.item_conversion,
    };
  });

  //
  const productDropDownData = filter.map((productData) => {
    return {
      name: productData.product_name,
      id: productData.id,
    };
  });

  //
  const locationDropDownData = location.map((elem) => {
    return {
      name: elem.loc_name,
      id: elem.id,
    };
  });
  //
  const column = ["Product Name", "Quantity", "Product Vendor"];

  const [destructuredData] = product_vendor_data;

  const rowData = destructuredData.map((elem) => [
    elem.product_name,
    elem.quantity,
    elem.vendor_name,
    elem.productId,
    elem.vendorId,
  ]);
  //
  //
  const rowOnclickFunction = (myRowData, rowMeta) => {
    setSelectedProductName(myRowData[0]);
    setSelectedVendorName(myRowData[2]);
    setSelectedProductId(rowData[rowMeta.dataIndex][3]);
    setSelectedVendorId(rowData[rowMeta.dataIndex][4]);
    setProductOrder((pre) => {
      return { ...pre, quantity: rowData[rowMeta.dataIndex][1] };
    });
    setModalActive(false);
  };
  //
  const [order, setOrder] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [subtotalDiscount, setSubtotalDiscount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  //
  useEffect(() => {
    var total = 0;
    var totalDiscount = 0;
    var tax = 0;
    order.map((item) => {
      total += +item.total;
      totalDiscount += +item.discount;
      tax += +item.taxed_price;
    });
    setSubtotal(total);
    setSubtotalDiscount(totalDiscount);
    setTotalTax(tax);
  }, [order]);
  //

  const conversionFetcher = async () => {
    const conversionResponse = await axiosFunction({
      urlPath: "/product/product_conversion/",
    });
    return conversionResponse.data;
  };
  const dataCollector = async (fetchedData) => {
    const conversion = await conversionFetcher();
    var conversionTemp = [];
    fetchedData.map((each_item) => {
      conversion.map((each_conversion) => {
        if (each_conversion.product_id === each_item.id) {
          conversionTemp.push(each_conversion);
        }
      });
    });
    fetchedData.map((item) => {
      const uuid = generator.uuid();
      const sendData = {
        id: uuid,
        product_name: item.product_name,
        item_conversion: conversionTemp,
        manufacturer: item.manufacturer_name,
        vendor_name: selectedVendorName,
        product_id: item.id,
        required_quantity: item.required_quantity,
        trade_price: item.trade_price,
        trade_percentage: item.trade_percentage,
        unit_of_measurement: item.unit_of_measurement,
        sales_tax_percentage: item.sales_tax_percentage,
        foc: item.foc,
        total: +item.required_quantity * +item.trade_price,
        discount:
          (+item.required_quantity *
            +item.trade_price *
            item.trade_percentage) /
          100,
        taxed_price:
          (+item.required_quantity *
            +item.trade_price *
            item.sales_tax_percentage) /
          100,
      };
      //
      let isExist = false;
      const newOrder = order.map((eachItem) => {
        if (
          sendData.product_id === eachItem.product_id &&
          sendData.foc === eachItem.foc
        ) {
          eachItem.required_quantity =
            +eachItem.required_quantity + +sendData.required_quantity;
          eachItem.total = +eachItem.required_quantity * +eachItem.trade_price;
          isExist = true;
        }

        return eachItem;
      });
      //
      if (isExist) {
        setOrder(newOrder);
      } else {
        setOrder((pre) => [...pre, sendData]);
      }
      //
      setSelectedProductName("");
      setSelectedProductId("");
      //
      setProductOrder((pre) => {
        return { ...pre, quantity: "", expected_date: new Date() };
      });
    });
    //
    console.log(order);
  };
  //

  //
  const deleteFunction = (_id) => {
    setOrder(
      order.filter((item) => {
        return item.id != _id;
      })
    );
  };
  //
  //
  const clearFunction = (e) => {
    e.preventDefault();
    setOrder([]);
    setSelectedProductName("");
    setSelectedVendorName("");
    setSelectedProductId("");
    setSelectedVendorId("");
    setVendorTax("");
    setProductOrder((pre) => {
      return { ...pre, quantity: "", expected_date: new Date() };
    });
  };
  //

  //

  const orderFunction = async (e) => {
    e.preventDefault();
    if (
      selectedVendorId === "" ||
      productOrder.expected_date === "" ||
      selectedLocationID === ""
    ) {
      alert("Delivery location and vendor cannot be empty!");
      return "";
    }
    const [destructuredVendorData] = selectedVendor;

    const dataToStore = {
      vendor_id: selectedVendorId,
      vendor_name: selectedVendorName,
      address: destructuredVendorData.business_address,
      city: destructuredVendorData.city,
      ntn: destructuredVendorData.ntn,
      advance_income:
        destructuredVendorData.tax_status === "Filer" ? "0.25" : "0.5",
      strn: destructuredVendorData.strn,
      payment_terms: destructuredVendorData.payment_terms,
      po_date: new Date(),
      delivery_date: productOrder.expected_date,
      order_type: productOrder.order_type,
      delivery_location: selectedLocationName,
      po_type: destructuredVendorData.vendor_classification,
      orders: order,
      subtotal: subtotal,
      total_discounted_price: subtotalDiscount,
      total_tax: totalTax,
      grand_total: subtotal + totalTax - subtotalDiscount,
    };

    const po_id_response = await axiosFunction({
      data: dataToStore,
      method: "POST",
      urlPath: "/product_order/add_product_order/",
    });
    set_po_id(po_id_response.data.po_id);
    setData([]);
    setOrderDisabler(true);

    setTimeout(() => {
      route.push("/dashboard/purchase_order/");
    }, 3000);
  };
  //
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Modal
            style={{ marginTop: "100px" }}
            opened={opened}
            onClose={close}
            size="auto"
            title="Modal size auto"
          >
            <p>{`${po_id} Order Received!`}</p>
          </Modal>
          <BreadcrumbComponent router={route} />
          <h1>New Purchase Order</h1>
          <p>
            Please see Add Purchase Order from below from all connected channels
          </p>
        </div>
        <div className={styles.wrapper}>
          <form className={styles.form}>
            <div className={styles.form_head}>
              <h5>Add Purchase Order</h5>
              <h4>Here you can manage your all Add Purchase Order!</h4>
            </div>
            <div className={styles.formInner}>
              <div className={styles.btn_wrapper}>
                <button
                  type="button"
                  className={styles.clearBtn}
                  hidden={selectedVendorId === ""}
                  onClick={clearFunction}
                >
                  Clear
                </button>
                {/*  */}
                <button
                  disabled={!isVendorEmpty}
                  className={styles.add_btn}
                  onClick={() => {
                    setModalActive(true);
                  }}
                  type={"button"}
                >
                  Search Product
                </button>
              </div>
              <InputTypeSearchDropDown
                comClass={styles.w_50}
                options={vendorDropDownData}
                value={selectedVendorId}
                onChange={vendorSelectFunction}
                text={"Vendor"}
                placeholder={"Select Vendor"}
                disabled={!isVendorEmpty}
                required
              />

              <InputTypeDate
                comClass={styles.w_50}
                value={productOrder.expected_date}
                onChange={inputHandler}
                name={"expected_date"}
                text={"Expected Delivery Date"}
                required
              />
              {/*  */}
              <InputTypeSearchDropDown
                comClass={styles.w_50}
                options={locationDropDownData}
                value={selectedLocationID}
                onChange={locationSelectFunction}
                placeholder={"Select Delivery Location"}
                text={"Select Delivery Location"}
                required
              />
              {/*  */}
              <InputTypeSearchDropDown
                comClass={styles.w_50}
                options={[
                  {
                    name: "Normal",
                    id: "Normal",
                  },
                  {
                    name: "Advance",
                    id: "Advance",
                  },
                ]}
                name={"order_type"}
                value={productOrder.order_type}
                onChange={inputHandler}
                placeholder={"Select Order Type"}
                text={"Select Order Type"}
                normal_dropdown={true}
                required
              />
              {/*  */}

              <div
                style={{
                  display: selectedVendorId === "" ? "none" : "block",
                  width: "100%",
                }}
                // className={styles.custom_dataTable}
              >
                <CustomTable
                  data={tableData}
                  title={"Products"}
                  dataCollector={dataCollector}
                />
              </div>

              <button hidden type="submit">
                Check
              </button>

              <MyModal
                modalActive={modalActive}
                setModalActive={setModalActive}
                headerText={"Products"}
              >
                <ModalTable
                  rowData={rowData}
                  columns={column}
                  rowOnclickFunction={rowOnclickFunction}
                />
              </MyModal>
            </div>
            <div className={styles.order_wrapper}>
              <h1>Order Cart</h1>

              <div className={styles.table_wrapper}>
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>ProductID</th>
                      <th>Product Name</th>
                      <th>Vendor Name</th>
                      <th>Sales Tax Percentage</th>
                      <th>Quantity</th>
                      <th>Pack Size</th>
                      <th>UOM</th>
                      <th>Trade Price</th>
                      <th>Trade Discount %</th>

                      <th>FOC</th>
                      <th>Total Price</th>
                      <th>Total Discount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.length > 0 ? (
                      <>
                        {order.map((item, key) => {
                          return (
                            <tr id={item.id} key={key}>
                              <td>{index++}</td>
                              <td>{item.product_id}</td>
                              <td>{item.product_name}</td>
                              <td>{item.vendor_name}</td>
                              <td>{`${item.sales_tax_percentage}%`}</td>
                              <td>{item.required_quantity}</td>
                              <td>
                                {
                                  item.item_conversion[
                                    item.item_conversion.length - 1
                                  ]
                                }
                              </td>
                              <td>{item.unit_of_measurement}</td>
                              <td>{item.trade_price}</td>
                              <td>{`${item.trade_percentage}%`}</td>
                              <td>{item.foc ? "Yes" : "No"}</td>
                              <td>{item.total}</td>
                              <td>{item.discount}</td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => deleteFunction(item.id)}
                                >
                                  <AiOutlineDelete />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className={styles.empty_table}>
                          <p>Order list is empty!</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <div className={styles.total_div}>
                <div className={styles.subtotal_div}>
                  <span>Subtotal:</span>
                  <span>{subtotal}</span>
                </div>
                <div className={styles.subtotal_div}>
                  <span>Total Discounted Price:</span>
                  <span>{subtotalDiscount}</span>
                </div>
                <div className={styles.subtotal_div}>
                  <span>Tax:</span>
                  <span>{totalTax}</span>
                </div>
                <div className={styles.subtotal_div}>
                  <span>Grand Total:</span>
                  <span>{subtotal + totalTax - subtotalDiscount}</span>
                </div>
              </div>
              <div className={styles.button_wrapper}>
                {/*  */}
                <button
                  onClick={orderFunction}
                  type="button"
                  className={styles.order_btn}
                  disabled={orderDisabler}
                >
                  Order
                </button>
                <Notification
                  className={styles.notification}
                  style={{ display: po_id === 0 ? "none" : "flex" }}
                  icon={<AiFillCheckCircle size={18} />}
                  color="teal"
                  // disallowClose
                  onClose={(e) => {
                    e.target.parentElement.parentElement.style.display = "none";
                  }}
                  title="Purchase order Successfully created"
                >
                  ID: {po_id}
                </Notification>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
//
export async function getServerSideProps(context) {
  const { account_number } = context.req.cookies;
  const res = await fetch(url + `/vendor/product_vendor/`);
  const product_vendor_data = await res.json();
  //
  const response = await fetch(url + `/get_location/${account_number}`);
  const location = await response.json();
  //
  return {
    props: { product_vendor_data, location },
  };
  //
}
//
export default ProductOrder;
