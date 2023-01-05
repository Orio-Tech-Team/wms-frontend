import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { manufacturerAtom } from "../recoil/manufacturer";
import axiosFunction from "../functions/axios";

const useManufacturerData = () => {
  const [data, setData] = useRecoilState(manufacturerAtom);
  //
  const dataFetcher = async () => {
    const response = await axiosFunction({ urlPath: "/manufacturer/" });
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

export default useManufacturerData;
