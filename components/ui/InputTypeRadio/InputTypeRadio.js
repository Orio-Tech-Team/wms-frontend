//
import React from "react";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import styles from "./InputTypeRadio.module.css";
import { Label } from "reactstrap";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

//
const InputTypeRadio = ({ onChange, name, value, comClass, text, choices }) => {
  return (
    <>
      <div className={`${styles.container} ${comClass}`}>
        <FormControl>
          <Label for="form-2-first-name">{text}</Label>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={value}
            onChange={(e) => {
              onChange(name, e.target.value);
            }}
            name={name}
          >
            {choices.map((choice, key) => {
              return (
                <FormControlLabel
                  key={key}
                  value={choice}
                  control={<Radio />}
                  label={choice}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};

export default InputTypeRadio;
