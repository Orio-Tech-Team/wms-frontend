import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
// Components
import Navbar from "../ui/Navbar/Navbar";
import Sidebar from "../ui/Sidebar/Sidebar";
//
const Layout = ({ children }) => {
  // States
  const [sidebarActive, setSidebarActive] = useState(true);
  //
  const myFunction = () => {
    setSidebarActive((pre) => {
      localStorage.setItem("sidebar_active", !pre);
      return !pre;
    });
  };
  //
  useEffect(() => {
    const active = localStorage.getItem("sidebar_active");
    setSidebarActive(
      active == undefined || active == null ? false : active === "true"
    );
  }, []);
  //
  return (
    <>
      <div className={styles.container}>
        <Sidebar func={myFunction} val={sidebarActive} />
        <div className={styles.wrapper}>
          <Navbar val={sidebarActive} func={myFunction} />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
