import axios from "axios";
import { url } from "../config";
import { getCookie } from "cookies-next";
//
const axiosFunction = async ({
  method = "GET",
  urlPath = "",
  data = {},
  params = {},
  token = "",
}) => {
  var config = {
    method: method,
    url: `${url}${urlPath}`,
    headers: {
      Authorization:
        token === "" ? `Bearer ${getCookie("token")}` : `Bearer ${token}`,
    },
    data: data,
  };
  if (method == "GET") {
    config["params"] = params;
  }

  const result = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      //   console.log(error);
      return error.response;
    });

  return result;
};

export default axiosFunction;
