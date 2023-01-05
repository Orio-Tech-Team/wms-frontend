import React from "react";
import styles from "./styles.module.css";
//
import { MdClose } from "react-icons/md";
import { useState } from "react";
//
const Index = ({ children, headerText, modalActive, setModalActive }) => {
  //

  //
  return (
    <div
      className={
        modalActive ? `${styles.container} ${styles.active}` : styles.container
      }
    >
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <h1>{headerText}</h1>
          <button type="button">
            <MdClose
              onClick={() => {
                setModalActive(false);
              }}
            />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Index;
