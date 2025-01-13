import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { TextField } from "@mui/material";
import "../../App.css";
const CustomizedInput = (props) => {
    return (_jsx(_Fragment, { children: _jsx(TextField, { margin: "normal", name: props.name, label: props.label, type: props.type, slotProps: {
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
            } }) }));
};
export default CustomizedInput;
