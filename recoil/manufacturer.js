import { atom } from "recoil";
//
export const manufacturerAtom = atom({
  key: "manufacturer_data",
  default: [],
  //   effects_UNSTABLE: [
  //     ({ setSelf }) => {
  //       fetch("http://localhost:3001/dashboard/manufacturer/").then((res) => {
  //         res.json().then((manufacturerData) => setSelf(manufacturerData));
  //       });
  //     },
  //   ],
});
