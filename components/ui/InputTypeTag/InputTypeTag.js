// import { TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Input, Label } from "reactstrap";
import Spinner from "../Loader/Spinner";
import styles from "./styles.module.css";

const InputTypeTag = ({
  comClass,
  text,
  setFunction,
  //   onChange,
  preValues,
  //   name,
  required,
}) => {
  //
  const [disabler, setDisabler] = useState(false);
  const [tag, setTag] = useState(preValues?.length > 0 ? [] : preValues || []);
  const [value, setValue] = useState();

  //
  useEffect(() => {
    tag.length > 2 ? setDisabler(true) : setDisabler(false);
  }, [tag.length]);
  //
  const tagSetter = (e) => {
    if (e.keyCode != 13) return;
    e.preventDefault();
    setTag((pre) => [...pre, value]);
    setFunction((pre) => [...pre, value]);
    setValue("");
  };
  //
  const deleteHandler = (index) => {
    const updatedTag = tag;
    updatedTag.splice(index, 1);
    setTag((current) => [...updatedTag]);
    setFunction((current) => [...updatedTag]);
  };
  //
  return (
    <>
      <div className={comClass}>
        <Label for="form-2-first-name">
          {text}
          {required ? <em>*</em> : ""}
        </Label>
        <div className={styles.input_div}>
          <div className={styles.tag_wrapper}>
            {tag.length > 0
              ? tag.map((elem, index) => {
                  return (
                    <div key={index} className={styles.tag_div}>
                      <p>{elem}</p>
                      <button
                        type="button"
                        onClick={() => deleteHandler(index)}
                      >
                        X
                      </button>
                    </div>
                  );
                })
              : ""}
          </div>
          <Input
            disabled={disabler ? true : false}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder={text}
            required={required ? true : false}
            onKeyDown={(e) => tagSetter(e)}
          />
        </div>
      </div>
    </>
  );
};

export default InputTypeTag;
