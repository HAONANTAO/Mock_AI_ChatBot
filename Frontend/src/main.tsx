import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "./App.css";
// 基础url前缀
axios.defaults.baseURL = "http://mock-ai-chat-bot.vercel.app/api/v1";
// 跨域携带凭证
axios.defaults.withCredentials = true;

const theme = createTheme({
  // text文本显示
  typography: {
    fontFamily: "Work Sans,serif",
    allVariants: { color: "white" },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-center" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
