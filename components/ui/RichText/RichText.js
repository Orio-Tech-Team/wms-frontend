import dynamic from "next/dynamic";
import { Label } from "reactstrap";
import React from "react";
import styles from "./styles.module.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function RichText({
  comClass,
  text,
  onChange,
  value,
  name,
  required,
}) {
  //
  //
  const myFunction = (value) => {
    onChange(name, value);
  };
  return (
    <>
      <div className={`${comClass} ${styles.container}`}>
        <Label for="form-2-first-name">
          {text}
          {required ? <em>*</em> : ""}
        </Label>
        <ReactQuill value={value} onChange={myFunction} placeholder={text} />
      </div>
    </>
  );
}
