import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Footer = () => {
    return (_jsx("footer", { children: _jsx("div", { style: {
                width: "100%",
                minHeight: "20vh",
                maxHeight: "30vh",
                marginTop: 60,
            }, children: _jsxs("p", { style: { fontSize: "30px", textAlign: "center", padding: "20px" }, children: ["Built With love by", _jsx("span", { children: _jsx(Link, { style: { color: "white" }, className: "nav-link", to: "https://github.com/HAONANTAO", children: "Aaron TAO" }) }), _jsx("img", { src: "Robot3.png" })] }) }) }));
};
export default Footer;
