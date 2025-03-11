/*
 * @Date: 2025-01-20 15:07:56
 * @LastEditors: 陶浩南 14639548+haonantao-aaron@user.noreply.gitee.com
 * @LastEditTime: 2025-03-11 17:09:39
 * @FilePath: /Mock_AI_ChatBot/Frontend/src/components/chat/ChatItem.tsx
 */
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
// 渲染消息块
function renderMessageBlocks(blocks: string[]) {
  return blocks.map((block, index) => {
    const [isCode, lang] = isCodeBlock(block);
    return isCode ? (
      <SyntaxHighlighter style={coldarkDark} language={lang} key={index}>
        {block}
      </SyntaxHighlighter>
    ) : (
      <Typography key={index} sx={{ fontSize: "20px" }}>
        {block}
      </Typography>
    );
  });
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

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: role === "assistant" ? "#004d5612" : "#004d56",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}>
      <Avatar
        sx={{
          ml: "0",
          bgcolor: role === "assistant" ? "transparent" : "black",
          color: "white",
        }}>
        {role === "assistant" ? (
          <img
            src="openai.png"
            alt="openai"
            width={"30px"}
            style={{
              filter: "contrast(1.5) brightness(1.1)", // 提高对比度，稍微增加亮度
            }}
          />
        ) : auth?.user?.name ? (
          auth.user.name
            .split(" ")
            .map((word) => word[0]) // 取每个单词的首字母
            .join("")
            .toUpperCase() // 变大写
        ) : (
          "?"
        )}
      </Avatar>
      <Box>
        {messageBlocks ? (
          renderMessageBlocks(messageBlocks)
        ) : (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
      </Box>
    </Box>
  );
};
export default ChatItem;
