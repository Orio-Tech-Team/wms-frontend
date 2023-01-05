import { atom } from "recoil";
//
export const vendorData = atom({
  key: "vendor_data",
  default: [],
  //   effects_UNSTABLE: [
  //     ({ setSelf }) => {
  //       fetch("http://localhost:3001/dashboard/vendor/").then((res) => {
  //         res.json().then((vendorData) => setSelf(vendorData));
  //       });
  //     },
  //   ],
});
