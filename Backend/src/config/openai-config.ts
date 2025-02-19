import { Configuration } from "openai";

// export const configOpenAI = () => {
//   // closeAI连接，可通过更改env变量，成为OPENAI正常连接
//   const apiKey = process.env.OPENAI_GUONEI_KEY;
//   const URL = process.env.OPENAI_GUONEI_BASE_URL;
//   const config = new Configuration({
//     apiKey,
//     basePath: URL,
//   });
//   return config;
// };

export const configOpenAI = () => {
  return new Configuration({
    apiKey: process.env.OPEN_AI_SECRET, // 直接使用 API Key
  });
};
