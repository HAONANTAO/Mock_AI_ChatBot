import { jsx as _jsx } from "react/jsx-runtime";
import "../../App.css";
import { Link } from "react-router-dom";
const NavigationLink = (props) => {
    return (_jsx(Link, { className: "navlink", onClick: props.onClick, to: props.to, style: { background: props.bg, color: props.textColor }, children: props.text }));
};
export default NavigationLink;
