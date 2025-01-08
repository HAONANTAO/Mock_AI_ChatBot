import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";

// 定义 ChatItemProps 类型
type ChatItemProps = {
  content: string;
  role: "user" | "assistant";
};

const ChatItem = ({ content, role }: ChatItemProps) => {
  const auth = useAuth();
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
          <Typography fontSize="20px">{content}</Typography>
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
