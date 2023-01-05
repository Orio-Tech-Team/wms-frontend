import React from "react";
import { InputGroupText, Label, FormGroup } from "reactstrap";
import styles from "./styles.module.css";
import { DatePicker } from "@mantine/dates";
//
import { FaRegCalendarAlt } from "react-icons/fa";
//

const InputTypeDate = ({ name, comClass, text, value, onChange, disabled }) => {
  const handleChange = (e) => {
    onChange(name, e);
  };
  return (
    <FormGroup className={`${comClass} ${styles.container}`}>
      <Label for="form-2-first-name">{text}</Label>
      <div className={`d-flex ${styles.wrapper}`}>
        <InputGroupText>
          <FaRegCalendarAlt />
        </InputGroupText>
        <DatePicker
          placeholder="Pick Date"
          value={value}
          onChange={(date) => handleChange(date)}
          disabled={disabled}
        />
      </div>
    </FormGroup>
  );
};

export default InputTypeDate;
