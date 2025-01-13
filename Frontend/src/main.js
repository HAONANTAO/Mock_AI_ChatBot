import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "./App.css";
// 基础url前缀
axios.defaults.baseURL = "http://localhost:3000/api/v1";
// 跨域携带凭证
axios.defaults.withCredentials = true;
const theme = createTheme({
    // text文本显示
    typography: {
        fontFamily: "Work Sans,serif",
        allVariants: { color: "white" },
    },
});
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(AuthProvider, { children: _jsx(BrowserRouter, { children: _jsxs(ThemeProvider, { theme: theme, children: [_jsx(Toaster, { position: "top-center" }), _jsx(App, {})] }) }) }) }));
