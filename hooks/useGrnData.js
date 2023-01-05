import { useRecoilState } from "recoil";
import { useEffect } from "react";
import axiosFunction from "../functions/axios";
import { grnAtom } from "../recoil/grn.recoil";

const useGrnData = () => {
  const [data, setData] = useRecoilState(grnAtom);

  //
  const dataFetcher = async () => {
    const response = await axiosFunction({
      urlPath: "/grn/find_all/",
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

export default useGrnData;
