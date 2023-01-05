import React, { useState } from "react";
import { Input, Label } from "reactstrap";
//
//
const InputTypeNumber = ({
  comClass,
  text,
  onChange,
  value,
  name,
  required,
  disabled,
}) => {
  // States
  const [isNumber, setIsNumber] = useState(true);
  //
  // Functions
  const validate = (eventValue) => {
    if (eventValue !== "") {
      if (
        eventValue[eventValue.length - 1] === "-" ||
        eventValue[eventValue.length - 1] === "+"
      ) {
        onChange(name, eventValue);
        setIsNumber(true);
        return "";
      }
      if (!eventValue.match(/^\d+/)) {
        setIsNumber(false);
        return "";
      }
      if (!eventValue[eventValue.length - 1].match(/^\d+/)) {
        setIsNumber(false);
        return "";
      }
    }
    onChange(name, eventValue);
    setIsNumber(true);
  };
  //
  return (
    <div className={comClass}>
      <Label for="form-2-first-name">
        {text}
        {required ? <em>*</em> : ""}
      </Label>
      <Input
        disabled={disabled ? true : false}
        valid={isNumber && value != "" && !disabled ? true : false}
        onChange={(e) => validate(e.target.value)}
        value={value}
        id="form-2-first-name"
        placeholder={isNumber ? text : "This Field Accept Numbers Only!"}
        required={required ? true : false}
      />
    </div>
  );
};

export default InputTypeNumber;
