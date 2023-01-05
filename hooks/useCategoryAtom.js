import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { categoryAtom } from "../recoil/category";
import axiosFunction from "../functions/axios";

const useCategoryData = () => {
  const [data, setData] = useRecoilState(categoryAtom);

  //
  const dataFetcher = async () => {
    const response = await axiosFunction({
      urlPath: "/product/category/",
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

export default useCategoryData;
