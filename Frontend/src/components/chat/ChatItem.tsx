import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// color
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// 定义 ChatItemProps 类型
type ChatItemProps = {
  content: string;
  role: "user" | "assistant";
};
// 从给出来的字符串中间拿到code代码部分
function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}
// 检查有没有特殊符号
function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

//
const ChatItem = ({ content, role }: ChatItemProps) => {
  const auth = useAuth();
  // 可能有也可能没有
  const messageBlocks = extractCodeFromString(content);
  return role === "assistant" ? (
    <>
      {/* 电脑的回复part */}
      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: "#004d5612",
          my: 2,
          gap: 2,
        }}>
        <Avatar sx={{ ml: 0 }}>
          <img src="openai.png" alt="openai png" width="30px" />
        </Avatar>

        {/* messages reply */}
        <Box>
          {/* 看有没有代码显示区别 */}
          {!messageBlocks && <Typography fontSize="20px">{content}</Typography>}
          {messageBlocks &&
            messageBlocks.length > 0 &&
            messageBlocks.map((block) => {
              return isCodeBlock(block) ? (
                <SyntaxHighlighter language="javascript" style={coldarkDark}>
                  {block} 
                </SyntaxHighlighter>
              ) : (
                <Typography fontSize="20px">{block}</Typography>
              );
            })}
        </Box>
      </Box>
    </>
  ) : (
    <>
      {/* 我的询问列表part */}
      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: "#004d56",

          gap: 2,
        }}>
        <Avatar sx={{ ml: 0, bgcolor: "black", color: "white" }}>
          {/* 名字首字母 */}
          {auth?.user?.name[0]}
          {/* 万一没有第二个last name  */}
          {auth?.user?.name?.split(" ")?.[1]?.[0] ?? ""}
        </Avatar>

        {/* messages reply */}
        <Box>
          <Typography fontSize="20px">{content}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ChatItem;
