import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string): [boolean, string] {
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
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}>
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {/* 渲染 */}
        {messageBlocks &&
          messageBlocks.length > 0 &&
          messageBlocks.map((block, index) => {
            const [isCode, lang] = isCodeBlock(block);

            return isCode ? (
              <SyntaxHighlighter
                style={coldarkDark}
                language={lang}
                key={index}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "20px" }}>
                {block}
              </Typography>
            );
          })}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {/* 渲染 */}
        {messageBlocks &&
          messageBlocks.length > 0 &&
          messageBlocks.map((block, index) => {
            const [isCode, lang] = isCodeBlock(block);

            return isCode ? (
              <SyntaxHighlighter
                style={coldarkDark}
                language={lang}
                key={index}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "20px" }}>
                {block}
              </Typography>
            );
          })}
      </Box>
    </Box>
  );
};

export default ChatItem;
