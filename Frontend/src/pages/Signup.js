import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import CustomisedInput from "../components/shared/CustomizedInput";
import { BiLogInCircle } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const navigator = useNavigate();
    const auth = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 把表单内的数据装进 FormData 对象，准备传输
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            toast.loading("Signing up ~", { id: "signup" });
            await auth?.signup(name, email, password);
            toast.success("Signed up Successfully!", { id: "signup" });
        }
        catch (error) {
            console.log(error);
            toast.error("Signed up Failed!", { id: "signup" });
        }
    };
    useEffect(() => {
        if (auth?.user) {
            navigator("/chat");
            return;
        }
    }, [auth]);
    return (_jsx(_Fragment, { children: _jsxs(Box, { width: "100%", height: "100%", display: "flex", flex: "1", children: [_jsx(Box, { padding: 8, mt: 8, display: { md: "flex", sm: "none", xs: "none" }, children: _jsx("img", { src: "airobot.png", alt: "Robot", style: { width: "400px" } }) }), _jsx(Box, { display: "flex", flex: { xs: 1, md: 0.5 }, justifyContent: "center", alignContent: "center", padding: 2, ml: "auto", mt: 10, children: _jsx("form", { onSubmit: handleSubmit, action: "", style: {
                            margin: "auto",
                            padding: "30px",
                            boxShadow: "10px 10px 20px #000",
                            borderRadius: "10px",
                            border: "none ",
                        }, children: _jsxs(Box, { sx: {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                height: "300px",
                            }, children: [_jsx(Typography, { variant: "h3", textAlign: "center", padding: "2", fontWeight: "800", children: "Sign-Up" }), _jsx(CustomisedInput, { type: "text", name: "name", label: "Name" }), _jsx(CustomisedInput, { type: "email", name: "email", label: "Email" }), _jsx(CustomisedInput, { type: "password", name: "password", label: "Password" }), _jsx(Button, { type: "submit", sx: {
                                        px: 2,
                                        py: 1,
                                        mt: 2,
                                        width: "400px",
                                        borderRadius: 2,
                                        bgcolor: "white",
                                        color: "black",
                                        // hover效果
                                        ":hover": {
                                            bgcolor: "#00fffc",
                                            color: "blue",
                                        },
                                    }, endIcon: _jsx(BiLogInCircle, {}), children: "Sign-Up" })] }) }) })] }) }));
};
export default Signup;
