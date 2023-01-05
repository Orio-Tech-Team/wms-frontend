import { Select } from "@mantine/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Label, Input } from "reactstrap";
import styles from "./styles.module.css";
//
const InputTypeDropDown = ({
  hidden,
  comClass,
  options,
  text,
  onChange,
  value,
  name,
  required,
  fromDataBase = false,
  placeholder,
  disabled,
}) => {
  const [state, setState] = useState(value);
  useEffect(() => setState(value), [value]);
  //
  //
  const dropDownValues = fromDataBase
    ? options.map((item) => {
        return {
          label: item[0],
          value: item[1],
        };
      })
    : options.map((item) => {
        return {
          label: item,
          value: item,
        };
      });
  //
  // const dropDownValues = options.map((item) => {
  //   return {
  //     label: item,
  //     value: item,
  //   };
  // });
  //
  const myFunction = (e) => {
    fromDataBase
      ? dropDownValues.map((item) => {
          if (item.value === e) {
            setState(item.label);
            onChange(name, e);
          }
        })
      : onChange(name, e);
    // setState(e);
    // fromDataBase
    //   ? dropDownValues.map((item) => {
    //       if (item.value === e) {
    //         onChange(name, item.label);
    //       }
    //     })
    //   : onChange(name, e);
  };
  //
  return (
    <>
      <div
        className={`${comClass} ${styles.container}`}
        hidden={hidden ? true : false}
      >
        <Label className="d-block">{text}</Label>
        <Select
          disabled={disabled}
          required={required ? true : false}
          value={state}
          onChange={myFunction}
          placeholder={placeholder}
          searchable
          data={dropDownValues}
        />
        {/* <Input
          type="select"
          value={value}
          required={required ? true : false}
          onChange={(e) => {
            onChange(name, e.target.value);
          }}
        >
          <option data-hidden="true">{placeholder}</option>
          {options.map((menu, key) => {
            return (
              <option value={fromDataBase ? menu[1] : menu} key={key}>
                {menu}
              </option>
            );
          })}
        </Input> */}
      </div>
    </>
  );
};

export default InputTypeDropDown;
