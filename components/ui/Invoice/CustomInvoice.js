"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { invoiceAtom } from "../../../recoil/invoice";
import styles from "./styles.module.css";

const CustomInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({});
  useEffect(() => {
    const localInvoiceData = localStorage.getItem("invoice_data");
    setInvoiceData(JSON.parse(localInvoiceData));
  }, []);
  const [tradeTotal, setTradeTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  useEffect(() => {
    const trade_total = 0;
    const total_discount = 0;
    const total_tax = 0;
    invoiceData.orders?.map((item) => {
      trade_total += +item.trade_price;
      total_discount += (+item.trade_price * +item.trade_discount) / 100;
      total_tax += +item.taxed_price;
    });
    setTradeTotal(trade_total);
    setDiscountTotal(total_discount);
    setTotalTax(total_tax);
  }, [invoiceData]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.logo_wrapper}>
              <img src={"/logo/pharm_logo.png"} />
            </div>
            <div className={styles.logo_wrapper}>
              <img src={"/logo/invoice.png"} />
            </div>
          </div>
          <div className={styles.main}>
            <h1>Purchase Order</h1>
            <div className={styles.detail_wrapper}>
              <div className={styles.left_div}>
                <ul>
                  <li>
                    <span>Vendor: </span>
                    <span>{invoiceData.vendor_name}</span>
                  </li>
                  <li>
                    <span>Address: </span>
                    <span>{invoiceData.address}</span>
                  </li>
                  <li>
                    <span>City: </span>
                    <span>{invoiceData.city}</span>
                  </li>
                  <li>
                    <span>NTN: </span>
                    <span>{invoiceData.ntn}</span>
                  </li>
                  <li>
                    <span>STRN: </span>
                    <span>{invoiceData.strn}</span>
                  </li>
                  <li>
                    <span>Payment Terms: </span>
                    <span>{invoiceData.payment_terms}</span>
                  </li>
                </ul>
              </div>
              <div className={styles.right_div}>
                <ul>
                  <li>
                    <span>PO Number: </span>
                    <span>{invoiceData.po_id}</span>
                  </li>
                  <li>
                    <span>PO Date: </span>
                    <span>
                      {invoiceData.po_date?.toString().substring(0, 15)}
                    </span>
                  </li>
                  <li>
                    <span>Delivery Date: </span>
                    <span>
                      {invoiceData.delivery_date?.toString().substring(0, 15)}
                    </span>
                  </li>
                  <li>
                    <span>Delivery Location: </span>
                    <span>{invoiceData.delivery_location}</span>
                  </li>
                  <li>
                    <span>PO Type: </span>
                    <span>{invoiceData.order_type}</span>
                  </li>
                  <li>
                    <span>Sales Tax #: </span>
                    <span>32423423543534-9</span>
                  </li>
                  <li>
                    <span>NTN #: </span>
                    <span>XXXX</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.table_wrapper}>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Description</th>
                    <th>Manufacturer</th>
                    <th>Pack Size</th>
                    <th>UOM</th>
                    <th>Qty</th>
                    <th>T.P</th>
                    <th>Discount %</th>
                    <th>GST Value</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.orders?.map((eachItem, key) => {
                    return (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{eachItem.product_name}</td>
                        <td>{eachItem.manufacturer}</td>
                        <td>
                          {
                            eachItem.item_conversion[
                              eachItem.item_conversion.length - 1
                            ]
                          }
                        </td>
                        <td>{eachItem.uom}</td>
                        <td>{eachItem.required_quantity}</td>
                        <td>{eachItem.trade_price}</td>
                        <td>
                          {eachItem.trade_discount != ""
                            ? eachItem.trade_discount + "%"
                            : "-"}
                        </td>
                        <td>
                          {eachItem.taxed_price != ""
                            ? eachItem.taxed_price
                            : "-"}
                        </td>
                        <td>
                          {eachItem.trade_price -
                            (+eachItem.trade_price * +eachItem.trade_discount) /
                              100 +
                            eachItem.taxed_price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={styles.total_wrapper}>
                <div className={styles.total_row}>
                  <div className={styles.left_div} />
                  <div className={styles.right_div}>
                    <span>Total Amount</span>
                    <span>{Number(invoiceData.subtotal).toFixed(2)}</span>
                  </div>
                </div>
                <div className={styles.total_row}>
                  <div className={styles.left_div} />
                  <div className={styles.right_div}>
                    <span>Total Discount</span>
                    <span>{Number(discountTotal).toFixed(2)}</span>
                  </div>
                </div>
                <div className={styles.total_row}>
                  <div className={styles.left_div} />
                  <div className={styles.right_div}>
                    <span>Sales Tax</span>
                    <span>{Number(totalTax).toFixed(2)}</span>
                  </div>
                </div>
                <div className={styles.total_row}>
                  <div className={styles.left_div} />
                  <div className={styles.right_div}>
                    <span>Advance Income Tax</span>
                    <span>
                      {Number(invoiceData.advance_income).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className={styles.total_row}>
                  <div className={styles.left_div} />
                  <div className={styles.right_div}>
                    <span>Net Amount</span>
                    <span>{Number(invoiceData.grand_total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              {invoiceData.order_type === "Advance" && (
                <div style={{ marginTop: "10px", fontSize: ".8rem" }}>
                  <strong>
                    &quot;This is an Advance Payment Purchase Order where the
                    payment has been made in advance&quot;
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.logo_wrapper}>
              <img src={"/logo/pharm_logo.png"} />
            </div>
            <div className={styles.logo_wrapper}>
              <img src={"/logo/invoice.png"} />
            </div>
          </div>
          <div className={styles.main}>
            <h1>Purchase Order</h1>
            <div className={styles.detail_wrapper}>
              <div className={styles.left_div}>
                <ul>
                  <li>
                    <span>Vendor: </span>
                    <span>{invoiceData.vendor_name}</span>
                  </li>
                  <li>
                    <span>Address: </span>
                    <span>{invoiceData.address}</span>
                  </li>
                  <li>
                    <span>City: </span>
                    <span>{invoiceData.city}</span>
                  </li>
                  <li>
                    <span>NTN: </span>
                    <span>{invoiceData.ntn}</span>
                  </li>
                  <li>
                    <span>STRN: </span>
                    <span>{invoiceData.strn}</span>
                  </li>
                  <li>
                    <span>Payment Terms: </span>
                    <span>{invoiceData.payment_terms}</span>
                  </li>
                </ul>
              </div>
              <div className={styles.right_div}>
                <ul>
                  <li>
                    <span>PO Number: </span>
                    <span>108890</span>
                  </li>
                  <li>
                    <span>PO Date: </span>
                    <span>
                      {invoiceData.po_date?.toString().substring(0, 15)}
                    </span>
                  </li>
                  <li>
                    <span>Delivery Date: </span>
                    <span>
                      {invoiceData.delivery_date?.toString().substring(0, 15)}
                    </span>
                  </li>
                  <li>
                    <span>Delivery Location: </span>
                    <span>{invoiceData.delivery_location}</span>
                  </li>
                  <li>
                    <span>PO Type: </span>
                    <span>{invoiceData.po_type}</span>
                  </li>
                  <li>
                    <span>Sales Tax #: </span>
                    <span>32423423543534-9</span>
                  </li>
                  <li>
                    <span>NTN #: </span>
                    <span>XXXX</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.terms_and_condition_wrapper}>
              <div className={styles.header}>Terms & Conditions</div>
              <div className={styles.body}>
                <ol>
                  <li>
                    Vendor’s acknowledgment of this PO or commencement of
                    performance hereunder shall constitute Vendor acceptance of
                    all terms & conditions herein.
                  </li>
                  <li>
                    Payment will be made through crossed Cheque as per agreed
                    payment terms.
                  </li>
                  <li>
                    Vendor will be responsible to deliver the goods to the Meri
                    Pharmacy warehouse at their own cost
                  </li>
                  <li>
                    Vendor will pack and label the Goods in a manner suitable
                    for transit and storage at no cost to Meri Pharmacy.
                  </li>
                  <li>
                    Temperature controlled goods shall be ensured by the vendor
                    to maintain cool chain till delivery at Meri Pharmacy.
                  </li>
                  <li>
                    The vendor will be responsible for any damages/Shortages
                    caused to the goods during transit and Meri Pharmacy will
                    not be responsible for such damages/shortages.
                  </li>
                  <li>
                    All the supplies which are applicable for Shelf Life shall
                    be received not less than 85% at the time of delivery.
                  </li>
                  <li>
                    In case of Medicines, Health & OTC products, vendor must
                    furnish a warranty invoice.
                  </li>
                  <li>
                    The Seller shall comply with all applicable standards,
                    regulations & other legal requirements concerning the
                    manufacture, packing, and delivery of the goods.
                  </li>
                  <li>
                    The invoice and Delivery Challan must have a reference of
                    the Purchase Order issued in this respect.
                  </li>
                  <li>
                    Time is the essence with respect to delivery of the Goods.
                    Goods must be delivered by the applicable delivery date.
                    Vendor must immediately notify Meri Pharmacy if Vendor is
                    likely to be unable to meet a Delivery Date. At any point
                    prior to the Delivery Date, Meri Pharmacy may, upon notice
                    to Vendor, cancel or change a Purchase order, or any portion
                    thereof, for any reason, including, without limitation, for
                    the convenience of Meri Pharmacy or due to failure of vendor
                    to comply with this Purchase Order, unless otherwise noted.
                  </li>
                  <li>
                    Deliveries are accepted only between 09:00 a.m. to 04:00
                    p.m. (Mon to Sat)
                  </li>
                  <li>
                    The validity of the special rates or discounts shall be for
                    the period mutually agreed and as per quotation and it can
                    be renewed after the said period.
                  </li>
                  <li>
                    Supplier must provide STRN & NTN for sales tax invoices.
                  </li>
                  <li>Batch & expiry must be mentioned on DC/Invoice.</li>
                  <li>
                    Withholding tax will be deducted as per law from all
                    supplies made to Meri Pharmacy or it will not be deducted if
                    vendor provided valid tax exemption Certificate with the
                    invoice.
                  </li>
                  <li>
                    Meri Pharmacy will notify the vendor for the stock reaching
                    the expiry date in writing at least 3months (90days) before
                    the expiry date. Upon receipt of such intimation, the vendor
                    shall return the stock from Meri Pharmacy location and
                    provide credit note of same value.
                  </li>
                </ol>
              </div>
              <div className={styles.footer}>
                <strong>
                  Meri Pharmacy - A Project of Marie Stopes Society
                </strong>
              </div>
            </div>
            <div className={styles.contact}>
              <div>
                <span>
                  <strong>Tel: </strong>
                </span>
                <span>(92) 0300-0446767</span>
              </div>
              <div>
                <span>
                  <strong>Website: </strong>
                </span>
                <span>
                  www.mariestopespk.org <strong>&</strong>{" "}
                </span>
                <span>www.maripharpharmacy.pk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomInvoice;
