// import { TextField } from "@mui/material";
import React from "react";
import { Input, Label } from "reactstrap";

const InputTypeText = ({
  comClass,
  text,
  onChange,
  value,
  name,
  required,
  disabled,
}) => {
  return (
    <>
      <div className={comClass}>
        <Label for="form-2-first-name">
          {text}
          {required ? <em>*</em> : ""}
        </Label>
        <Input
          disabled={disabled ? true : false}
          valid={value === "" ? false : true}
          onChange={(e) => onChange(name, e.target.value)}
          value={value}
          placeholder={text}
          required={required ? true : false}
        />
      </div>
    </>
  );
};

export default InputTypeText;
