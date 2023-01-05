import axios from "axios";
import { atom, selector } from "recoil";
//
export const productAtom = atom({
  key: "product_data",
  default: [],
  // effects_UNSTABLE: [
  //   // we cannot use async in these functions. So we have used then.
  //   ({ setSelf }) => {
  //     fetch("http://localhost:3001/dashboard/product/").then((res) => {
  //       res.json().then((productData) => setSelf(productData));
  //     });
  //   },
  // ],
});

// export const productDetailsState = selector({
//   key: "productDetails",
//   get: ({ get }) => {
//     const fetchedData = get(productAtom);
//     if (fetchedData.length > 0) return fetchedData;

//     // .then((res) => console.log("hello"))
//   },
//   set: async ({ set }) => {
//     set(
//       productAtom,
//       defaultValue > 0
//         ? await axios
//             .get("http://localhost:3001/dashboard/product/")
//             .then((res) => res.json())
//         : defaultValue
//     );
//   },
// });
