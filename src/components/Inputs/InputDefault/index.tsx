import React from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import "../../../config/style/index.css";

interface InputDefaultProps {
  type: string;
  name: Name;
  label: string;
  value: string;
  helpertext?: string;
  handleChange: (value: string, key: Name) => void;
}

export type Name = "name" | "email" | "password" | "repassword";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiInput-underline": {
    color: "#3d3d3d",
  },
  "&. MuiFormHelperText-root": {
    color: "#454545",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  color: "black",
});

function InputDefault({
  type,
  name,
  label,
  value,
  helpertext,
  handleChange,
}: InputDefaultProps) {
  return (
    <CssTextField
      focused
      name={name}
      label={label}
      variant="standard"
      type={type}
      value={value}
      helperText={helpertext}
      onChange={(ev) => handleChange(ev.target.value, name)}
    />
  );
}

export default InputDefault;
