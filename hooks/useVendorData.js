import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { vendorData } from "../recoil/vendor";
import axiosFunction from "../functions/axios";

const useVendorData = () => {
  const [data, setData] = useRecoilState(vendorData);

  //
  const dataFetcher = async () => {
    const response = await axiosFunction({ urlPath: "/vendor/" });
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

export default useVendorData;
