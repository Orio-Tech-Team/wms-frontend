import { Loader } from "@mantine/core";
import React from "react";
import styles from "./styles.module.css";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <Loader color="dark" size="xl" variant="bars" />
    </div>
  );
};

export default Spinner;
