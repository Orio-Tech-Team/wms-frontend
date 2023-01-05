import { Typography } from "@mui/material";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
//
import styles from "./styles.module.css";
//
const convertBreadcrumb = (string) => {
  return string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
    .replace("_", " ")
    .replace("_", " ")
    .replace("_", " ")
    .replace("_", " ");
};
//
const BreadcrumbComponent = ({ router, isUpdate }) => {
  //
  // const pathName = router.pathname.split("/");
  const [bread, setBread] = useState([]);
  //
  useEffect(() => {
    const linkPath = router.asPath.split("/");
    linkPath.shift();
    //
    if (isUpdate) linkPath.pop();
    //
    const pathArray = linkPath.map((path, i) => {
      return {
        breadcrumb: path,
        href: "/" + linkPath.slice(0, i + 1).join("/"),
      };
    });
    setBread(pathArray);
    //
  }, [router]);
  //
  return (
    <>
      <div className={styles.container}>
        <Breadcrumbs aria-label="breadcrumb">
          {bread.map((link, key) => {
            //
            if (link === bread[bread.length - 1])
              return (
                <Typography color="text.primary" key={key}>
                  {convertBreadcrumb(link.breadcrumb)}
                </Typography>
              );
            //
            return (
              <Link
                underline="hover"
                color="inherit"
                key={key}
                href={link.href}
              >
                <a>{convertBreadcrumb(link.breadcrumb)}</a>
              </Link>
            );
          })}

          {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
        </Breadcrumbs>
      </div>
    </>
  );
};

export default BreadcrumbComponent;
