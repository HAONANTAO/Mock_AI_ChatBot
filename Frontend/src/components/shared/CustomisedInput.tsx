import { TextField } from "@mui/material";
import React from "react";
import "./input.css";
type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomisedInput = (props: Props) => {
  return (
    <>
      {/* 输入框 */}
      <TextField
        margin="normal"
        name={props.name}
        label={props.label}
        type={props.type}
        slotProps={{
          inputLabel: {
            style: { color: "white" },
          },
          input: {
            style: {
              width: "400px",
              borderRadius: 10,
              fontSize: 20,
              color: "white",
            },
          },
        }}></TextField>
    </>
  );
};

export default CustomisedInput;
