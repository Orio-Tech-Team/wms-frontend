import { Input } from "@mantine/core";
import React from "react";

const CustomInputField = ({ placeholder, defaultValue }) => {
  return <Input placeholder={placeholder} defaultValue={defaultValue} />;
};

export default CustomInputField;
