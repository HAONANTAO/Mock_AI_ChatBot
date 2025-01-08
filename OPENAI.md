# OPENAI CONNECTION GUIDE

## Introduction

The OpenAI API unlocks the door to powerful artificial intelligence capabilities for developers. Whether it's building intelligent chatbots, assisting in content creation, or performing complex text analysis tasks, the API Key is the crucial "key" to unlocking these functions. However, due to differences in network environments and policies, there are varying procedures and precautions when connecting to the OpenAI API Key domestically and overseas. This article will elaborate on these details for you.



## What is OPENAI?

OpenAI is an American artificial intelligence research organization founded in December 2015 and headquartered in San Francisco, California. It was initially a non-profit organization dedicated to the development of artificial general intelligence (AGI)1. In 2019, it transitioned to a limited for-profit model1. 



## How to use the OPENAI API?

### Outside the China-mainland（国外）

You can Check the Api use documentaion, there are few examples in it -- [quickstart](#https://platform.openai.com/docs/quickstart)

1.Go the [OPENAI website](https://platform.openai.com/apps)and get the account, then get the api-secret-key, and organization key

```javascript
OPEN_AI_SECRET_KEY= "xxx"
OPENAI_ORGANIZATION_ID="xxx"
```

2.Install the package (openai,dotenv)

```
npm install openai dotenv
```

3.I will list the **example in nodejs**

**Offical code :**

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);
```



*After my own experiments, the following code can be used normally, and the official website code may have an error when running*

**MyCode:**

../config/openai-config.js

```javascript
import { Configuration } from "openai";

export const configOpenAI = () => {
  const apiKey = process.env.OPEN_AI_SECRET_KEY;
  const organization = process.env.OPENAI_ORGANIZATION_ID;
  const config = new Configuration({
    apiKey,
    organization,//optional
  });
  return config;
};

```

main file:

```javascript
import { configOpenAI } from "../config/openai-config.js"; // front file 
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

const config = configOpenAI();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",// can change to different models
      messages:  messages: [
        {
          role: "user",
          content: "talk about The Great Wall in 20 words",
        },
      ],//in this format
    });
    const content = chatResponse.data.choices[0].message.content;
    console.log(content);
```



### Inside the China-mainland（国内）

简单的来说，你可以直接去国内第三方平台找代理

我找的是[CloseAI](#https://platform.closeai-asia.com/developer/api/)进行api key 和base URL的获取来访问。



第一步：安装openai 包和dotenv包

```
npm install openai dotenv
```

第二步：直接拿到CloseAI里面的api key和base URL

<a href="https://petknowledge.com">     <img src="./CLOSEAI.png" alt="CLOSEAI"> </a>

api key自己点击秘钥创建

base URL="https://api.openai-proxy.org/v1"

**切记记得充值！！**



第三步：代码里面直接进行访问

```javascript
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

```

```javascript
import { configOpenAI } from "../config/openai-config.js"; // front file
import { OpenAIApi, ChatCompletionRequestMessage } from "openai"; 

const config = configOpenAI();
    const openai = new OpenAIApi(config);

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",// can change to different models
     messages: [
        {
          role: "user",
          content: "talk about The Great Wall in 20 words",
        },
      ],//in this format
    const content = chatResponse.data.choices[0].message.content;
    console.log(content);
```

[源代码SourceCode](#https://github.com/HAONANTAO/OPENAI-China)



### Display Result:

<a href="https://petknowledge.com">     <img src="./Result.png" alt="Result">