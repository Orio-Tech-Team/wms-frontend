import { useRouter } from "next/router";
import React from "react";
import BreadcrumbComponent from "../../../../components/ui/BreadcrumbComponent/BreadcrumbComponent";
import styles from "./styles.module.css";
//
import ReactDataTable from "../../../../components/ui/ReactDataTable/ReactDataTable";
import {
  Input,
  Button,
  Alert,
  Loader,
  Progress,
  Notification,
} from "@mantine/core";
import { BsTruck } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import usePorderData from "../../../../hooks/usePorderData";
import { numberValidatorFunction } from "../../../../functions/sharedFunctions";
import axiosFunction from "../../../../functions/axios";
import useGrnData from "../../../../hooks/useGrnData";
//
let grnDataTemp = [];
//
const Index = () => {
  //
  const [percentOrderCompleted, setPercentOrderCompleted] = React.useState(0);
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const route = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [grnData, setGrnData] = React.useState([]);
  const [idToSearch, setIdToSearch] = React.useState("");
  const [SearchedPurchaseOrderData, setSearchedPurchaseOrderData] =
    React.useState({});
  const [isCompleted, setIsCompleted] = React.useState(false);
  //
  const [PurchaseOrderData, setPurchaseOrderData] = usePorderData([]);
  const [GrnRecoilData, setGrnRecoilData] = useGrnData([]);
  // functions
  //
  //
  const tableInputHandler = (name, value, data) => {
    var flag = false;
    grnDataTemp = [...grnData];
    //
    if (name === "received_quantity") {
      if (+data.required_quantity - +value < 0) {
        flag = true;
      }
    }
    if (!flag) {
      grnDataTemp[data.key] = {
        ...grnDataTemp[data.key],
        [name]: value,
      };
      setGrnData(grnDataTemp);
      if (name === "received_quantity") {
        const totalRequiredQuantity = grnDataTemp.reduce(
          (partialSum, eachNumber) => partialSum + eachNumber.required_quantity,
          0
        );
        const totalReceivedQuantity = grnDataTemp.reduce(
          (partialSum, eachNumber) =>
            partialSum + +eachNumber.received_quantity,
          0
        );
        setPercentOrderCompleted(
          (+totalReceivedQuantity / +totalRequiredQuantity) * 100
        );
      }
      //
    } else {
      alert("Received Quantity cannot be greater then required quantity!");
    }
    //
  };
  //
  const tableNumberValidator = (name, value, data) => {
    var validationRegex = /^[0-9]\d*(\.\d*)?$/;

    if (value.match(validationRegex) || value === "") {
      tableInputHandler(name, value, data);
    }
  };
  //
  React.useEffect(() => {
    const columnsTemp = [
      {
        name: "#",
        cell: (e) => <>{e.key + 1}</>,
        grow: 0,
        center: true,
        width: "45px",
      },
      {
        name: "Product #",
        selector: (row) => row.product_id,
        grow: 0,
        center: true,
      },
      {
        name: "Product Name",
        selector: (row) => row.product_name,
        grow: 2,
        sortable: true,
      },
      {
        name: "Required Quantity",
        selector: (row) => row.required_quantity,
        grow: 0,
        center: true,
      },
      {
        name: "Received Quantity",
        cell: (e) => (
          <input
            name="received_quantity"
            value={grnData[e.key].received_quantity}
            onChange={(event) =>
              tableNumberValidator(event.target.name, event.target.value, e)
            }
            type="text"
          />
        ),
        grow: 1,
        center: true,
      },
      {
        name: "Maximum Retail Price",
        cell: (e) => (
          <input
            name="maximum_retail_price"
            value={grnData[e.key].maximum_retail_price}
            onChange={(event) =>
              tableNumberValidator(event.target.name, event.target.value, e)
            }
            type="text"
          />
        ),
        grow: 1,
        center: true,
      },
      {
        name: "Trade Price",
        cell: (e) => (
          <input
            name="trade_price"
            value={grnData[e.key].trade_price}
            onChange={(event) =>
              tableNumberValidator(event.target.name, event.target.value, e)
            }
            type="text"
          />
        ),
        grow: 1,
        center: true,
      },
      {
        name: "Discounted Percentage",
        cell: (e) => (
          <input
            name="discounted_percentage"
            value={grnData[e.key].discounted_percentage}
            onChange={(event) =>
              tableInputHandler(event.target.name, event.target.value, e)
            }
            type="text"
          />
        ),
        grow: 1,
        center: true,
      },
      {
        name: "Batch No.",
        cell: (e) => (
          <input
            name="batch_no"
            value={grnData[e.key].batch_no}
            onChange={(event) =>
              tableInputHandler(event.target.name, event.target.value, e)
            }
            type="text"
          />
        ),
        grow: 1,
        center: true,
      },
      {
        name: "Batch Expiry",
        cell: (e) => (
          <input
            type={"date"}
            name="batch_expiry"
            value={grnData[e.key].batch_expiry}
            onChange={(event) =>
              tableInputHandler(event.target.name, event.target.value, e)
            }
            // type="text"
          />
        ),
        grow: 1,
        center: true,
      },
      {
        name: "Comments",
        cell: (row) => (
          <input
            name="comments"
            value={grnData[row.key].comments}
            onChange={(event) =>
              tableInputHandler(event.target.name, event.target.value, row)
            }
            type="text"
          />
        ),
        grow: 1,
        center: true,
      },
      {
        name: "FOC",
        selector: (row) => row.foc,
        grow: 0,
        center: true,
      },
    ];
    setColumns(columnsTemp);
  }, [grnData]);
  //
  const tableDataGenerator = (po_data) => {
    //'

    const dataTemp = po_data.map((each_item, key) => {
      if (each_item.isReceived) {
        return {};
      }
      console.log(each_item);
      if (each_item.grn_status === undefined) {
        return {
          key: key,
          product_id: each_item.product_id,
          product_name: each_item.product_name,
          required_quantity: each_item.required_quantity,
          received_quantity: each_item.required_quantity,
          maximum_retail_price: 0,
          trade_price: each_item.trade_price,
          discounted_percentage: each_item.trade_discount,
          batch_no: "",
          batch_expiry: new Date(),
          foc: each_item.foc ? "Yes" : "No",
          comments: "",
        };
      }
      return {
        key: key,
        product_id: each_item.product_id,
        product_name: each_item.product_name,
        required_quantity: each_item.remaining_quantity,
        received_quantity: each_item.remaining_quantity,
        maximum_retail_price: each_item.maximum_retail_price,
        trade_price: each_item.trade_price,
        discounted_percentage: each_item.discounted_percentage,
        batch_no: each_item.batch_no,
        batch_expiry: each_item.batch_expiry,
        foc: each_item.foc ? "Yes" : "No",
        comments: each_item.comments,
      };
    });

    setGrnData(dataTemp);
    setData(dataTemp);
    //
  };
  //
  // React.useEffect(() => {
  //   setIsLoading(true);
  //   tableDataGenerator();
  //   setIsLoading(false);
  // }, [GrnRecoilData]);
  //
  const purchaseOrderSearchFunction = () => {
    tableDataGenerator([]);
    setColumns([]);
    setData([]);
    setGrnData([]);
    //
    setIsLoading(true);
    var flag = false;
    var isApproved = false;
    var isInGrn = false;
    //
    var purchaseOrderTemp = [];
    var grnTemp = [];
    // var po_data_temp = {};
    //
    for (var i = 0; i < PurchaseOrderData.length; i++) {
      if (+PurchaseOrderData[i].id === +idToSearch) {
        setSearchedPurchaseOrderData(PurchaseOrderData[i]);
        if (
          PurchaseOrderData[i].order_status === "App" ||
          PurchaseOrderData[i].order_status === "PRec"
        ) {
          purchaseOrderTemp = [...PurchaseOrderData[i].dataToSend];
          isApproved = true;
          flag = true;
        }
      }
    }
    if (isApproved) {
      for (var i = 0; i < GrnRecoilData.length; i++) {
        if (+GrnRecoilData[i].po_id === +idToSearch) {
          isInGrn = true;
          if (GrnRecoilData[i].is_updatable) {
            grnTemp.push(GrnRecoilData[i]);
            flag = true;
          }
        }
      }
    }
    //
    if (isInGrn && grnTemp.length === 0) {
      setIsCompleted(true);
    }
    //
    if (isInGrn) {
      tableDataGenerator(grnTemp);
    } else {
      tableDataGenerator(purchaseOrderTemp);
    }

    //
    if (!flag) {
      alert("NOT FOUND");
    }
    setIsLoading(false);
  };
  //
  const [notificationClass, setNotificationClass] = React.useState({
    color: "green",
    title: "Success",
    description: "GRN Created/Updated Successfully!",
    class: `${styles.notification} `,
  });
  //
  const submitFunction = async () => {
    //
    var flag = false;
    grnData.map((each_item) => {
      if (
        each_item.received_quantity === "" ||
        each_item.maximum_retail_price === "" ||
        each_item.trade_price === ""
      ) {
        setNotificationClass({
          color: "red",
          title: "Error",
          description: "Please fills mandatory fields!",
          class: `${styles.notification} ${styles.active}`,
        });
        flag = true;
        return "";
      }
    });
    if (flag) {
      return "";
    }
    //
    const sendData = {
      po_id: SearchedPurchaseOrderData.id,
      percentOrderCompleted: percentOrderCompleted,
      grnData: grnData,
    };

    await axiosFunction({
      urlPath: "/grn/create/",
      method: "POST",
      data: sendData,
    });
    //
    setNotificationClass({
      color: "green",
      title: "Success",
      description: "GRN Created/Updated Successfully!",
      class: `${styles.notification} ${styles.active}`,
    });

    setGrnRecoilData([]);
  };
  React.useEffect(() => {
    setTimeout(() => {
      setNotificationClass({
        color: "green",
        title: "Success",
        description: "GRN Created/Updated Successfully!",
        class: `${styles.notification} `,
      });

      setGrnRecoilData([]);
      setPercentOrderCompleted(0);
    }, 4000);
  }, [notificationClass.class]);
  //
  return (
    <>
      <Notification
        className={notificationClass.class}
        color={notificationClass.color}
        title={notificationClass.title}
      >
        {notificationClass.description}
      </Notification>

      <div className={styles.container}>
        <div className={styles.header}>
          <BreadcrumbComponent router={route} />
          <h1>Create GRN</h1>
          <p>Please see Create GRN from below from all connected channels</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.grn_search_div}>
            <label htmlFor="grn_po_search_input">
              <b>Enter Purchase Order ID To Search</b>
            </label>
            <div>
              <Input
                id="grn_po_search_input"
                icon={<BsTruck />}
                value={idToSearch}
                onChange={(e) =>
                  numberValidatorFunction(e.target.value, setIdToSearch)
                }
                placeholder="Enter Purchase Order ID to search"
              />
              <Button
                onClick={purchaseOrderSearchFunction}
                color="yellow"
                radius="sm"
              >
                Search
              </Button>
            </div>
          </div>
          <div
            style={{ display: SearchedPurchaseOrderData.id ? "flex" : "none" }}
            className={styles.alert_div}
          >
            <Alert
              icon={
                <FiAlertCircle
                  style={{
                    scale: "1.5",
                  }}
                />
              }
              title=""
              color={
                SearchedPurchaseOrderData.order_status === "App" || isCompleted
                  ? "green"
                  : "red"
              }
            >
              <p>
                {isCompleted ? (
                  <i>
                    Purchase Order {SearchedPurchaseOrderData.id} is Completed!
                  </i>
                ) : (
                  <i>
                    Purchase Order {SearchedPurchaseOrderData.id} is
                    {" " + SearchedPurchaseOrderData.order_status}.
                  </i>
                )}
              </p>
            </Alert>
          </div>
          {isLoading ? (
            <Loader color="dark" size="xl" />
          ) : (
            <div className={styles.table_wrapper}>
              <Progress
                style={{ marginTop: grnData.length === 0 ? "10px" : "0px" }}
                value={percentOrderCompleted}
                label={`${percentOrderCompleted}%`}
                size="xl"
                radius="xl"
              />
              <ReactDataTable
                columns={columns}
                data={data}
                title={"Purchase Order"}
              />
              <Button onClick={submitFunction} color="indigo" size="md">
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
//
export default Index;
