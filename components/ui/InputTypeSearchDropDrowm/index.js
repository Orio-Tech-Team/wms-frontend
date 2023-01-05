import React from "react";
import { useState, Fragment } from "react";
//
import { Label } from "reactstrap";
import styles from "./style.module.css";
import { Select } from "@mantine/core";
import { useEffect } from "react";

const InputTypeSearchDropDown = ({
  comClass,
  options,
  text,
  onChange,
  name,
  value,
  required,
  placeholder,
  disabled,
  id,
  normal_dropdown,
}) => {
  //

  //
  const [state, setState] = useState(value);
  //
  useEffect(() => setState(value), [value]);
  //
  const [filterValues, setFilterValues] = useState([]);
  //
  useEffect(() => {
    setFilterValues(
      options.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      })
    );
  }, [options.length]);
  //
  const myFunction = (e) => {
    if (normal_dropdown) {
      setState(e);

      onChange(name, e);
    } else {
      setState(e);
      filterValues.map((item) => {
        if (item.value === e) {
          onChange(e, item.label);
        }
      });
    }
  };
  //
  return (
    <>
      <div className={`${comClass} ${styles.container}`}>
        <Label className="d-block">{text}</Label>

        <Select
          disabled={disabled}
          required={required ? true : false}
          value={state}
          onChange={(e) => myFunction(e)}
          placeholder={placeholder}
          searchable
          data={filterValues}
        />
      </div>
    </>
  );
};
export default InputTypeSearchDropDown;
