import axios from "axios";

// 用户登录的后端发请求的axios模块函数
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(
    "/user/login",
    { email, password },
    {
      withCredentials: true,
    },
  );

  if (res.status !== 200) {
    // if not ok
    throw new Error("Unable to login");
  }
  // ok
  const data = await res.data;
  return data;
};

//checkAuthStatus
export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

// sendChatRequest
export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });

  if (res.status !== 200) {
    throw new Error("Unable to send the chat");
  }
  const data = await res.data;
  console.log("data here:", data);
  return data;
};
