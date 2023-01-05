import React, { useState } from "react";
import styles from "./Navbar.module.css";

// Icons
import * as Bi from "react-icons/bi";
import NavbarUserBox from "../NavbarIUserBox/index";
import NavbarDots from "../NavbarDots/index";
//
const Navbar = (props) => {
  //
  //
  return (
    <>
      <div
        className={
          props.val ? `${styles.container} ${styles.active}` : styles.container
        }
      >
        <div className={styles.wrapper}>
          <div className={styles.section1}>
            <button
              onClick={() => {
                props.func();
              }}
              className={styles.toggler_btn}
            >
              <Bi.BiMenu />
            </button>
            <div className={styles.vr}></div>
            <button className={styles.search_btn}>
              <Bi.BiSearch />
            </button>
          </div>
          <div className={styles.section2}>
            <NavbarDots />
            <NavbarUserBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
