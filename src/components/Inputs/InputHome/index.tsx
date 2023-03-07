import React from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";
import "../../../config/style/index.css";

interface InputProps {
  type: string;
  name: inputRecado;
  label: string;
  value: string;
  handleChange: (value: string, key: inputRecado) => void;
}

export type inputRecado = "Name" | "Detail";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& label": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "black",
  },
  "& .MuiInput-underline": {
    color: "#000000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui fieldset": {
      borderColor: "black",
    },
  },
});

function InputHome({ name, type, label, value, handleChange }: InputProps) {
  return (
    <CssTextField
      focused
      name={name}
      label={label}
      variant="standard"
      type={type}
      value={value}
      sx={{ width: "85%", padding: "0px", height: { xs: "50px", md: "4rem" } }}
      onChange={(ev) => handleChange(ev.target.value, name)}
      className="input"
    />
  );
}

export default InputHome;
