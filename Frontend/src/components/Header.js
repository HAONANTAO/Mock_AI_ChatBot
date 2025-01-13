import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { useAuth } from "../context/AuthContext";
const Header = () => {
    const auth = useAuth();
    return (_jsx(_Fragment, { children: _jsx(AppBar, { sx: { bgcolor: "transparent", position: "static", boxShadow: "none" }, children: _jsxs(Toolbar, { sx: { display: "flex" }, children: [_jsx(Logo, {}), _jsx("div", { children: auth?.isLoggedIn ? (_jsxs(_Fragment, { children: [_jsx(NavigationLink, { bg: "#59f6f3", to: "/chat", text: "GO-TO-Chat", textColor: "black" }), _jsx(NavigationLink, { bg: "#51538f", to: "/", text: "Logout", textColor: "white", onClick: auth.logout })] })) : (_jsxs(_Fragment, { children: [_jsx(NavigationLink, { bg: "#00fffc", to: "/login", text: "Login", textColor: "black" }), _jsx(NavigationLink, { bg: "#51538f", to: "/signup", text: "Signup", textColor: "white" })] })) })] }) }) }));
};
export default Header;
