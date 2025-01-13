import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import TypingAnimation from "../components/typer/TypingAnimation";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Footer from "../components/footer/Footer";
const Home = () => {
    const theme = useTheme();
    // the window view less than medium?
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
    return (_jsx(_Fragment, { children: _jsxs(Box, { width: "100%", height: "100%", flex: "flex", mx: "auto", children: [_jsxs(Box, { sx: {
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "center",
                        mx: "auto",
                        mt: "3",
                    }, children: [_jsx(Box, { children: _jsx(TypingAnimation, {}) }), _jsxs(Box, { sx: {
                                width: "100%",
                                display: "flex",
                                flexDirection: { md: "row", xs: "column", sm: "column" },
                                gap: 5,
                                my: 10,
                            }, children: [_jsx("img", { src: "Robot2.png", alt: "robot", style: { width: "200px", margin: "auto", height: "200px" } }), _jsx("img", { className: "image-inverted rotate", src: "openai.png", alt: "openai", style: { width: "200px", margin: "auto" } })] }), _jsx(Box, { sx: { display: "flex", width: "100%", mx: "auto" }, children: _jsx("img", { src: "chat.png", alt: "chatbot", style: {
                                    display: "flex",
                                    width: isBelowMd ? "80%" : "60%",
                                    margin: "auto",
                                    borderRadius: 20,
                                    // 105是radius
                                    boxShadow: "-5px -5px  105px#64f3d5",
                                    marginTop: 20,
                                    marginBottom: 20,
                                } }) })] }), _jsx(Footer, {})] }) }));
};
export default Home;
