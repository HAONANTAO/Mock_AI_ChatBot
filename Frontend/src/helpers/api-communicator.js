import axios from "axios";
// loginUser
export const loginUser = async (email, password) => {
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
// signup User
export const signupUser = async (name, email, password) => {
  const res = await axios.post(
    "/user/signup",
    { name, email, password },
    {
      withCredentials: true,
    },
  );
  if (res.status !== 201) {
    // if not ok
    throw new Error("Unable to signup");
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
export const sendChatRequest = async (message) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send the chat");
  }
  const data = await res.data;
  console.log("data here:", data);
  return data;
};
// getUserChats
export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to get the user chat");
  }
  const data = await res.data;
  return data;
};
// deleteUserChats
export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete the user chat");
  }
  const data = await res.data;
  return data;
};
// logoutUser
export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout the user ");
  }
  const data = await res.data;
  return data;
};
