import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Logo = () => {
    return (_jsx("div", { style: {
            display: "flex",
            marginRight: "auto",
            alignItems: "center",
            gap: "15px",
        }, children: _jsxs(Link, { to: "/", style: { display: "flex", gap: 5 }, children: [_jsx("img", { src: "openai.png", alt: "openai image", width: "30px", height: "30px", className: "image-inverted" }), _jsx(Typography, { sx: {
                        display: { lg: "block", md: "block", sm: "none", xs: "none" },
                        mr: "auto",
                        fontWeight: "800",
                        textShadow: "2px 2px 20px #000",
                    }, children: _jsx("span", { style: { fontSize: "24px" }, children: "Chat-Bot" }) })] }) }));
};
export default Logo;
