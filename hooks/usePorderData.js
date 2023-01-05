import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { poDetailAtom } from "../recoil/po_order";
import axiosFunction from "../functions/axios";

const usePorderData = () => {
  const [data, setData] = useRecoilState(poDetailAtom);
  //
  const dataFetcher = async () => {
    var dataToSend = [];
    const response = await axiosFunction({ urlPath: "/product_order/" });
    const madeData = response.data.order_response.map((each_item) => {
      dataToSend = [];
      response.data.order_detail_response.map((each_detail) => {
        if (each_item.id === each_detail.po_id) {
          dataToSend.push(each_detail);
        }
      });
      return {
        ...each_item,
        dataToSend,
      };
    });
    setData(madeData);
  };
  //
  useEffect(() => {
    if (data.length === 0) {
      dataFetcher();
    }
  }, [data.length]);

  return [data, setData];
};

export default usePorderData;
