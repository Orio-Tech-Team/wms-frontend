import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { productVendorAtom } from "../recoil/productVendor";
import axiosFunction from "../functions/axios";

const useProductVendorData = () => {
  const [data, setData] = useRecoilState(productVendorAtom);

  //
  const dataFetcher = async () => {
    const response = await axiosFunction({
      urlPath: "/product/product_vendor/",
    });
    setData(response.data);
  };
  //
  useEffect(() => {
    if (data.length === 0) {
      dataFetcher();
    }
  }, [data.length]);

  return [data, setData];
};

export default useProductVendorData;
