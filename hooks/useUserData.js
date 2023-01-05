import { useRecoilState } from "recoil";
import { useEffect } from "react";
import axiosFunction from "../functions/axios";
import { usersAtom } from "../recoil/users";

const useUserData = () => {
  const [data, setData] = useRecoilState(usersAtom);

  //
  const dataFetcher = async () => {
    const response = await axiosFunction({ urlPath: "/getUsers/" });
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

export default useUserData;
