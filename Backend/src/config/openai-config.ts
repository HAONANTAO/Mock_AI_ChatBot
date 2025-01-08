import { Configuration } from "openai";

export const configOpenAI = () => {
  const apiKey = process.env.OPENAI_GUONEI_KEY;
  const organization = process.env.OPENAI_ORGANIZATION_ID;
  const URL = process.env.OPENAI_GUONEI_BASE_URL;
  const config = new Configuration({
    apiKey,
    organization,
    basePath: URL,
  });
  return config;
};
