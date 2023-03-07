import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#4d4d4d",
  },
  "& label": {
    color: "#515151",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#747474",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#444444",
  },
  "& .MuiInput-underline:hover": {
    borderBottomColor: "#444444",
  },
  "& .MuiInput-underline": {
    color: "#000000",
  },
});
