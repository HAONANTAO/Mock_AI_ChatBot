import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
function extractCodeFromString(message) {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
}
function isCodeBlock(str) {
    const trimmed = str.trim();
    if (trimmed.startsWith("```")) {
        // 去掉```代替为空格
        const lang = trimmed.split("\n")[0].replace("```", "").trim();
        if (lang) {
            return [true, lang];
        }
    }
    const codeChars = ["=", ";", "[", "]", "{", "}", "#", "//"];
    if (codeChars.some((char) => str.includes(char))) {
        const firstWord = str.trim().split(" ")[0];
        return [true, firstWord];
    }
    return [false, "text"];
}
const ChatItem = ({ content, role, }) => {
    const messageBlocks = extractCodeFromString(content);
    const auth = useAuth();
    return role == "assistant" ? (_jsxs(Box, { sx: {
            display: "flex",
            p: 2,
            bgcolor: "#004d5612",
            gap: 2,
            borderRadius: 2,
            my: 1,
        }, children: [_jsx(Avatar, { sx: { ml: "0" }, children: _jsx("img", { src: "openai.png", alt: "openai", width: "30px" }) }), _jsxs(Box, { children: [!messageBlocks && (_jsx(Typography, { sx: { fontSize: "20px" }, children: content })), messageBlocks &&
                        messageBlocks.length > 0 &&
                        messageBlocks.map((block, index) => {
                            const [isCode, lang] = isCodeBlock(block);
                            return isCode ? (_jsx(SyntaxHighlighter, { style: coldarkDark, language: lang, children: block }, index)) : (_jsx(Typography, { sx: { fontSize: "20px" }, children: block }, index));
                        })] })] })) : (_jsxs(Box, { sx: {
            display: "flex",
            p: 2,
            bgcolor: "#004d56",
            gap: 2,
            borderRadius: 2,
        }, children: [_jsxs(Avatar, { sx: { ml: "0", bgcolor: "black", color: "white" }, children: [auth?.user?.name[0], auth?.user?.name.split(" ")[1] && auth?.user?.name.split(" ")[1][0]] }), _jsxs(Box, { children: [!messageBlocks && (_jsx(Typography, { sx: { fontSize: "20px" }, children: content })), messageBlocks &&
                        messageBlocks.length > 0 &&
                        messageBlocks.map((block, index) => {
                            const [isCode, lang] = isCodeBlock(block);
                            return isCode ? (_jsx(SyntaxHighlighter, { style: coldarkDark, language: lang, children: block }, index)) : (_jsx(Typography, { sx: { fontSize: "20px" }, children: block }, index));
                        })] })] }));
};
export default ChatItem;
