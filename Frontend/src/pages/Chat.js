import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest, } from "../helpers/api-communicator";
import toast from "react-hot-toast";
const Chat = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    // ref located
    const inputRef = useRef(null);
    const [chatMessages, setChatMessages] = useState([]);
    const handlerSubmit = async () => {
        // test log
        console.log(inputRef.current?.value);
        // take the data first
        const content = inputRef.current?.value;
        // clear the input
        if (inputRef && inputRef.current) {
            inputRef.current.value = "";
        }
        const newMessage = { role: "user", content };
        // all data needed
        setChatMessages((prev) => [...prev, newMessage]);
        // send it to backend
        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats]);
    };
    // keyboard enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handlerSubmit();
        }
    };
    // 浏览器绘制前同步执行 before the browser render
    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            toast.loading("Loading the Chats", { id: "loadchats" });
            getUserChats()
                .then((data) => {
                setChatMessages([...data.chats]);
                toast.success("Successfully load the Chats", { id: "loadchats" });
            })
                .catch((error) => {
                console.log(error);
                toast.error("Loading Chats failed! ", { id: "loadchats" });
            });
        }
    }, [auth]);
    useEffect(() => {
        if (!auth?.user) {
            navigate("/login");
            return;
        }
    }, [auth, navigate]);
    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting Chats", { id: "deleteChats" });
            await deleteUserChats();
            setChatMessages([]);
            toast.success("Successfully delete  Chats", { id: "deleteChats" });
        }
        catch (error) {
            console.log(error);
            toast.error("Deleting Chats failed", { id: "deleteChats" });
        }
    };
    return (_jsx(_Fragment, { children: _jsxs(Box, { sx: {
                display: "flex",
                flex: "1",
                width: "100%",
                height: "100%",
                mt: "3",
                gap: "3",
            }, children: [_jsx(Box, { sx: {
                        display: { md: "flex", sm: "none", xs: "none" },
                        flex: 0.2,
                        flexDirection: "column",
                    }, children: _jsxs(Box, { sx: {
                            display: "flex",
                            width: "100%",
                            height: "60vh",
                            bgcolor: "rgb(17,29,39)",
                            borderRadius: 5,
                            flexDirection: "column",
                            mx: 3,
                        }, children: [_jsxs(Avatar, { sx: {
                                    mx: "auto",
                                    my: 2,
                                    bgcolor: "white",
                                    color: "black",
                                    fontWeight: 700,
                                }, children: [auth?.user?.name[0], auth?.user?.name?.split(" ")?.[1]?.[0] ?? ""] }), _jsx(Typography, { sx: { mx: "auto", fontFamily: "works sans" }, children: "You are Talking to a ChatBot" }), _jsx(Typography, { sx: { mx: "auto", fontFamily: "works sans", my: 4, p: 3 }, children: "You can ask some questions related to Knowledge,Business, Advices,Educations,etc. But avoid sharing the personal information!" }), _jsx(Button, { onClick: handleDeleteChats, sx: {
                                    width: "200px",
                                    my: "auto",
                                    color: "white",
                                    fontWeight: "700",
                                    borderRadius: 3,
                                    mx: "auto",
                                    bgcolor: red[300],
                                    ":hover": {
                                        bgcolor: red.A400,
                                    },
                                }, children: "Clear Conversation" })] }) }), _jsxs(Box, { sx: {
                        display: "flex",
                        flex: { md: 0.8, xs: 1, sm: 1 },
                        flexDirection: "column",
                        px: 3,
                        mx: 3,
                        my: 3,
                    }, children: [_jsx(Typography, { sx: {
                                textAlign: "center",
                                fontSize: "60px",
                                color: "white",
                                fontFamily: "works sans",
                                mx: "auto",
                                fontWeight: "600",
                            }, children: "Model- GPT 3.5 Turbo" }), _jsx(Box, { sx: {
                                width: "100%",
                                height: "60vh",
                                borderRadius: 3,
                                mx: "auto",
                                display: "flex",
                                flexDirection: "column",
                                //
                                overflow: "scroll",
                                overflowX: "hidden",
                                overflowY: "auto",
                                scrollBehavior: "smooth",
                            }, children: chatMessages.map((chat, index) => {
                                return (_jsx(ChatItem, { content: chat.content, role: chat.role }, index));
                            }) }), _jsxs("div", { style: {
                                width: "100%",
                                borderRadius: 8,
                                backgroundColor: "rgb(17,27,39)",
                                display: "flex",
                                margin: "auto",
                            }, children: [_jsx("input", { type: "text", onKeyDown: handleKeyDown, ref: inputRef, style: {
                                        width: "100%",
                                        backgroundColor: "transparent",
                                        padding: "30px",
                                        border: "none",
                                        outline: "none",
                                        color: "white",
                                        fontSize: "20px",
                                    } }), _jsx(IconButton, { sx: { ml: "auto", color: "white", mx: 1 }, onClick: handlerSubmit, children: _jsx(IoMdSend, {}) })] })] })] }) }));
};
export default Chat;
