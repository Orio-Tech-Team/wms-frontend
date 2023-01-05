import React from "react";
import Link from "next/link";
import styles from "../styles/index.module.css";

const Index = () => {
  return (
    <>
      <div className={styles.container}>
        <Link href={"/login"}>Login</Link>
      </div>
    </>
  );
};

export default Index;
