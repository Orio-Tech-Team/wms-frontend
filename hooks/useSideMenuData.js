import { useRecoilState } from "recoil";
import { useEffect } from "react";
import axiosFunction from "../functions/axios";
import { sideMenuAtom } from "../recoil/sidemenu";
import { getCookie } from "cookies-next";
//
const useSideMenuData = () => {
  const [data, setData] = useRecoilState(sideMenuAtom);
  //
  //
  const dataRefiner = (data) => {
    var temp = [];
    data.forEach((option, key) => {
      if (option.masterId == null) {
        temp[option.id] = {
          id: option.id,
          icon: "",
          text: option.name,
          link: option.name === "Dashboard" ? option.url_path : "",
          home: option.name === "Dashboard",
          sub: [],
        };
      } else {
        temp[option.masterId]?.sub.push({
          subtext: option.name,
          link: option.url_path,
        });
      }
    });
    temp.shift();
    setData(temp);
    // setData
  };
  //
  const dataFetcher = async () => {
    const userId = getCookie("user_id");
    const response = await axiosFunction({
      urlPath: `/get_menu/${userId}`,
      //   params: { userId },
    });
    dataRefiner(response.data);
  };

  //
  useEffect(() => {
    if (data.length === 0) {
      dataFetcher();
    }
  }, [data.length]);

  return [data, setData];
};

export default useSideMenuData;
