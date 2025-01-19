# 				***The MockAI_Chat-Bot***
https://mock-ai-chat-bot.vercel.app/

![Chatbot Demo](ChatBot_Demo.gif)

# **Table Of Content**:

-- [**Description**](#**Description**)

-- [**Version**](#**Version**)

-- [**Prerequisites**](#**Prerequisites**)

-- [**Quick Start**](#**Quick_Start**)

-- [**Features**](#**Features**)

-- [**Core Functionality**](#**Core_Functionality**)

-- [**Advanced Features**](#**Advanced_Features**)

-- [**Project Architecture**](#**Project_Architecture**)

-- [**Tech Stack**](#**Tech_Stack**)

-- [**API Documentation**](#**API_Documentation**)

-- [**Demo**](#**Demo**)

-- [**Resources**](#**Resources**)

-- [**Roadmap**](#**Roadmap**)

-- [**Contact Information**](#**Contact_Information**)

-- [**License**](#**License**)

# **Description**

The Mock ChatBot is an intelligent chatbot application leveraging OpenAI's API to mimic the capabilities of GPT 3.5 Turbo. It offers users a personalized chatting experience, complete with user registration (signup), login, and logout functionalities. Whether you're looking for quick answers, detailed explanations, or just some friendly chatter, this custom chatbot has you covered.

# **Version**：

**Version 1.0:** Initial release, with basic chat functionality, user authentication flow for signup and login established.
**Version 1.1:** An upgraded version that introduced further optimizations to the chat experience, potentially enhancing response speed and accuracy.

**Version 1.2:** Make some improvement on the UI design and animation things, make the display more vivid.

**Version 1.3: **more features comming......

# **Prerequisites**：

- **Node.js**: You'll need Node.js installed. The project is developed and tested on Node.js versions `v18.0.0` and above. Fetch the latest stable release from the [official Node.js website](https://nodejs.org/).
- **Package Managers**: The project relies on either npm (comes pre-installed with Node.js) or yarn. If you opt for yarn, you can install it globally using `npm install -g yarn`. These managers are crucial for installing project dependencies.
- **OpenAI API Key**: Given that the application leverages the OpenAI API, you must obtain an API key from the [OpenAI platform](https://platform.openai.com/). After getting it, use the `dotenv` package to set it as an environment variable in your local development setup.
- **Database**: A MongoDB database is essential for the backend operations. You can install the MongoDB Community Edition locally by following the official documentation. Ensure it's running, as the `mongoose` library in the backend depends on it to store and retrieve data.
- **Backend Dependencies**: Navigate to the project root and execute `npm install`. This will install backend packages like `axios` for HTTP requests, `bcrypt` for password hashing, and `express` for server creation, as detailed in the `package.json`'s `dependencies` and `devDependencies` sections.
- **Frontend Dependencies**: For the frontend part, also run `npm install` in the relevant directory. Key packages such as `react` for building UIs, `react-dom` for DOM rendering, and UI libraries like `@mui/material` are needed, with their correct versions specified in the `package.json` to ensure compatibility.

# **Quick_Start**：

### **Clone the Repository**

- Open your terminal and navigate to the directory where you want to store the project. Then run the following Git command:

  ```
  git clone https://github.com/HAONANTAO/GameHub.git
  cd Mock_AI_ChatBot
  ```



### Install Dependencies

- For both the front-end and back-end, run `npm i` in the root project directory. This will install all the packages listed in the `dependencies` and `devDependencies` sections of the `package.json` files for both parts of the application.
- The back-end uses packages like `axios`, `bcrypt`, and `express` for handling HTTP requests, user authentication, and server setup respectively. The front-end depends on libraries such as `react`, `@mui/material` for building the user interface.

```
npm install
```



### Running the Code

- Start the Backend first then running the Frontend.

  ```
  npm run dev
  ```

  

# **Features**：

1. User Management

   - **Signup**: Creating an account is a breeze. Users simply input their name, email, and password. The system then securely hashes the password using `bcrypt` with a cost factor of 10, storing it in the database. Once registered, users receive a confirmation message along with details of their new account.
   - **Login**: Existing users can log in with their email and password. The application checks if the user exists in the database and then verifies the password using `bcrypt`'s `compare` function. Upon successful login, a token is generated and set as an HTTP-only cookie, which helps in maintaining the user's session across different requests.
   - **Logout**: When it's time to end the session, users can log out. The system clears the relevant authentication cookie, ensuring that the user's session is terminated, and their account remains secure.
   - **Verification**: User verification is seamless. By validating the user ID from the JWT token against the database, the application ensures that the user making requests has proper authorization. This helps in protecting user-specific data and actions.
   - **User Retrieval**: Admins or relevant endpoints can fetch a list of all users. The `getAllUser` function queries the database for all user records, providing an overview of the user base when needed.

   

2. Chat Functionality

   - **Sending Chats**: Users can send messages through the chat interface. These messages are then incorporated into the chat history, which is stored per user in the database. The chat history is structured to include both user messages and the subsequent responses from the GPT API.
   - **Receiving GPT Responses**: Once a user message is sent, the application interacts with the OpenAI API (specifically the `gpt-3.5-turbo` model). It sends the chat history, including the latest user message, and retrieves an intelligent response. This response is then added to the user's chat history in the database and presented back to the user.
   - **Chat History Management**: Users have control over their chat history. They can choose to delete their entire chat history. When this action is triggered, the application clears the relevant chat records from the user's data in the database, maintaining user privacy.
     

# **Core_Functionality**：

1. User Authentication Workflow

   - **Secure Signup**: At the heart of the application is a robust user signup process. When a user submits their name, email, and password, the system uses `bcrypt` to hash the password. This hashed password is then stored in the database alongside the user's other details. This ensures that user passwords are never stored in plain text, safeguarding against potential data breaches.
   - **Reliable Login**: For login, the system first locates the user by their email in the database. It then uses `bcrypt`'s `compare` function to verify the entered password against the stored hashed version. If the comparison is successful, a JWT token is generated. This token is crucial as it authenticates the user across different requests, allowing access to protected routes.
   - **Cookie - Based Session Management**: Once logged in, an HTTP - only cookie is set with the JWT token. This cookie serves as the cornerstone of the user's session. It adheres to strict security policies, like having a specific domain and path, and being marked as `httpOnly` to prevent cross - site scripting (XSS) attacks from stealing the token.
   - **Logout and Cleanup**: When a user logs out, the system clears the authentication cookie. This simple yet vital step effectively ends the user's session, ensuring that any unauthorized access attempts using the previous session's credentials are thwarted.

   

2. Chatbot Integration with User Data

   - **Chat History Building**: As users send messages, the application builds a personalized chat history for each user. This chat history is stored in the database, with each entry marked with the role (either "user" or the role of the chatbot response). The chat history is used not only to display past conversations but also to provide context to the GPT API for more accurate responses.
   - **GPT API Interaction**: The core functionality lies in the seamless integration with the OpenAI `gpt-3.5-turbo` model. User messages from the chat history are packaged and sent to the API. The API's response is then parsed and integrated back into the user's chat history. This back - and - forth interaction creates an intelligent chat experience, mimicking a real - time conversation with an expert.
   - **Data Integrity in Chat Operations**: Throughout the chat process, data integrity is maintained. When deleting chat history, for example, the system ensures that all related records are completely removed from the database, protecting user privacy and optimizing data storage.
     

# **Advanced_Features**：

more features are comming......

(animations,images......)


# **Project_Architecture**：



#### Backend

The backend of the application is structured around a Node.js server, leveraging its powerful asynchronous capabilities to handle concurrent operations smoothly.

- **Layered Structure**:

  - **Middleware Layer**: Express.js forms the core of this layer. It acts as a middleware framework, intercepting incoming HTTP requests. Middlewares like `cors` are used first to handle cross-origin requests, allowing seamless communication from different front-end domains. `cookie-parser` and `express-validator` also operate here. The former manages cookies, crucial for maintaining user sessions, while the latter validates incoming data, ensuring only legitimate data progresses further into the application. `morgan` logs every incoming request, providing valuable debugging information.

  - **Business Logic Layer**: This is where the application's core functionality is coded. Written in TypeScript, it benefits from type checking to keep the codebase robust. For user management, functions related to user signup, login, and logout are implemented. Here, `bcrypt` is integrated to hash passwords during signup and verify them at login. `jsonwebtoken (JWT)` is used to generate authentication tokens, which are then passed to the client via cookies. When it comes to chat functionality, the logic to interact with the OpenAI API using `axios` is housed here. It constructs requests with the appropriate chat history, retrieved from the database, and processes the responses.

  - **Data Access Layer**: Mongoose serves as the bridge to the MongoDB database. It provides an object - model mapping, allowing developers to define data models in a more JavaScript - friendly way. User data, including names, emails, and hashed passwords, as well as chat records, are stored in MongoDB collections. The flexible document model of MongoDB means that the chat records, which can have variable structures, can be easily stored and retrieved without complex schema migrations. `dotenv` is used to manage sensitive data, like API keys, ensuring that the database connection and external API calls are secure.

    

- **API Endpoints**: Express.js is used to define RESTful API endpoints. These endpoints act as the interface between the front-end and the backend. For example, there are endpoints for user authentication such as `/signup`, `/login`, and `/logout`. The chat functionality has endpoints like `/sendChat` to receive user messages and `/getChats` to retrieve chat history. Each endpoint is designed to accept requests in a specific format, perform the necessary business logic, and return appropriate responses, often in JSON format.

  

#### Frontend

The frontend architecture is centered around React, enabling a component - based approach to building user interfaces.



- Component Hierarchy:
  - **Top - Level Components**: React Router DOM defines the overall routing structure. It maps different URLs to specific components, creating a seamless navigation experience. For instance, there could be a `/login` route that renders the login component, and a `/chat` route for the chat interface component. These top - level components manage the overall layout and flow of the application.
  - **Reusable UI Components**: Libraries like `@mui/material` provide a rich set of pre - built components. These are integrated into the application's component tree. For example, buttons, text fields, and cards from `@mui/material` are used across multiple pages. Custom components are also created, following the React paradigm, where each component encapsulates its own state and logic. `@emotion/react` and `@emotion/styled` are used to style these components, enabling in - line CSS - in - JS styling for dynamic and scoped styling.
  - **State - Managed Components**: Redux, along with React Redux, comes into play for components that need to manage complex states. The global user login state, which determines whether a user is authenticated or not, is stored in the Redux store. When a user logs in, the relevant action is dispatched, updating the state across all components that rely on it. Similarly, the chat message state, which holds the conversation history, can be managed centrally, ensuring consistency across different chat - related components.
- **Build and Tooling**: Vite is the build tool of choice. It speeds up the development process with its fast cold start. During development, it uses ES module features to optimize the loading of JavaScript modules. For production builds, it compresses and minifies the code, resulting in highly optimized bundles. Eslint, along with TypeScript, enforces coding standards. Eslint catches common syntax and style issues, while TypeScript adds type - safety, making the code more maintainable, especially as the project grows. Tools like `React Icons` and `React Syntax Highlighter` are used as utility components, enhancing the visual and interactive aspects of the application.
  

# **Tech_Stack**：

- **Backend**

  - **Node.js**: Serves as the runtime environment for the backend server. Its asynchronous, non-blocking I/O capabilities enable it to handle a large number of concurrent requests efficiently, providing a stable foundation for the entire application.
  - **Express.js**: A minimalist and flexible web application framework built on Node.js. It manages routing and integrates middlewares, making it straightforward to construct RESTful APIs. This simplifies the data exchange between the front-end and the back-end.
  - **TypeScript**: Adds a static type system to JavaScript. It enhances code readability, maintainability, and scalability. When writing complex business logic in the backend, it catches type-related errors early, thus improving code quality.
  - **MongoDB**: A popular NoSQL database. With its flexible document model, it's well-suited for storing semi-structured data such as user data and chat records in this project. There's no need to pre-define rigid database schemas.
  - **mongoose**: Bridges the gap between Node.js and MongoDB, offering a concise set of APIs to interact with the MongoDB database. It simplifies operations like defining data models and performing CRUD (Create, Read, Update, Delete) operations.
  - **bcrypt**: Specializes in password security. It uses powerful hashing algorithms to encrypt user passwords, ensuring the security of password storage and verification during user registration and login, effectively fending off password cracking attacks.
  - **jsonwebtoken (JWT)**: Implements a stateless authentication mechanism. It generates tokens containing user identity information. After a successful user login, these tokens maintain the session, enabling quick authentication when users access protected routes.
  - **axios**: An HTTP client library based on Promises. It's used in the backend to send HTTP requests to external APIs, like the OpenAI API, and handle the response data, facilitating the integration of third-party services.
  - **dotenv**: Helps manage environment variables in the project. By separating sensitive information, such as the OpenAI API key, from the code, it boosts security and flexibility during deployment across different environments.
  - **cors**: Deals with Cross-Origin Resource Sharing. It permits requests from different domains in the front-end to access the backend services, ensuring seamless data interaction in a front-end/back-end separated development model.
  - **cookie-parser**: Facilitates the parsing, setting, and management of HTTP cookies in the backend. In scenarios like user login and logout, it precisely manipulates cookie data related to the user session.
  - **express-validator**: Provides input validation functionality for the Express framework. When receiving data from the front-end, such as user registration or login form data, it checks the legality of the data, preventing illegal data from entering the backend business logic.
  - **morgan**: An HTTP request logging middleware. It records detailed information about requests, including access time, request method, and response status code. This is useful for development debugging and later operation and maintenance monitoring.

  

- **Frontend**

  - **React**: A JavaScript library for building user interfaces. Through the component-based development model, it breaks down the UI into reusable and maintainable components, enabling efficient development of interactive front-end pages.
  - **React Router DOM**: Enables routing functionality within React applications. It creates navigation logic between different pages in a single-page application, allowing users to switch between various feature pages without a full-page refresh.
  - **Vite**: A new-generation front-end build tool. Compared to traditional build tools, it has an extremely fast cold start speed. It leverages the native features of ES modules to optimize the development experience and can generate highly optimized production build packages.
  - **@emotion/react & @emotion/styled**: Part of the Emotion CSS-in-JS library. They allow developers to write CSS styles within JavaScript code, making it easy to achieve dynamic style generation and component-level style isolation, streamlining style management.
  - **@mui/material**: Offers a rich library of Material Design-style UI components. It speeds up front-end interface design, ensures that the interface is aesthetically pleasing and compliant with modern design standards, and reduces the effort of repeatedly developing UI components.
  - **Redux & React Redux**: Used for front-end state management. When dealing with complex application states, such as the global user login state and chat message state, they update the state in a centralized and predictable manner, facilitating smoother data transfer and synchronization between components.
  - **React Icons**: A library that aggregates a vast amount of icon resources. Developers can import various icons as needed to quickly embellish the front-end interface, enhancing the visual appeal and user-friendliness.
  - **React Syntax Highlighter**: Specifically designed to highlight code snippets on the front-end page. When chat responses contain code content, it presents a clear and beautiful code display for the user.
  - **React Type Animation**: Helps create cool text animation effects, adding an interesting touch to front-end interactions, for example, on welcome pages or in prompt messages.
  - **TypeScript**: Also applied in the front-end, it strengthens the quality of JavaScript code. When writing component logic and handling event callbacks, it uses type checking to avoid potential errors.
  - **eslint**: A JavaScript code linting tool. With relevant plugins and configurations, it automatically detects syntax errors and style issues in the code, ensuring that the front-end code adheres to a unified coding standard.



# **API_Documentation**：

## Introduction

This API documentation outlines the endpoints available for the application, which consists of user management and chat functionality. The API is built using Express.js, and it uses JSON for data exchange.



## Base URL

All API endpoints are prefixed with `/api/v1`.



## User Routes

### `GET /user/`

- **Description**: Retrieves a list of all users. This endpoint is likely intended for administrative purposes to view the user base.

- **Request**: No parameters are required.

- Response:

  - **Success (HTTP 200)**: Returns a JSON object with the structure `{"message": "OK", "users": [user1, user2,...]}` where each `user` object contains details such as name, email, etc.

  - **Failure (HTTP 400)**: In case of an error, returns `{"message": "error! not ok!", "cause": "error message"}` where the `error message` details the issue, e.g., a database connection error.

    

### `POST /user/signup`

- **Description**: Allows new users to create an account. The user must provide their name, email, and password in the request body.

- Request:

  - Body:
    - `name` (string): The user's full name.
    - `email` (string): A valid email address.
    - `password` (string): The user's chosen password.

- Response:

  - **Success (HTTP 201)**: Returns `{"message": "user [name], [email] sign up successfully!", "name": "user name", "email": "user email"}`

  - **Failure (HTTP 400)**: If there's an issue during signup, like an invalid email format or a database error, returns `{"message": "error! signup not work!", "cause": "error message"}`

    

### `POST /user/login`

- **Description**: Enables existing users to log into their accounts. Users need to send their email and password in the request body.

- Request:

  - Body:
    - `email` (string): The user's registered email address.
    - `password` (string): Their password.

- Response:

  - **Success (HTTP 200)**: Returns `{"message": "user [name], [email] log in successfully!", "name": "user name", "email": "user email"}`

  - **Failure (HTTP 201)**: If the user is not registered, returns `"user not registered,please check again "`. If the password is incorrect, returns `{"message": "Incorrect password"}`

  - **Other Failures (HTTP 404)**: For general errors, returns `{"message": "error! signup not work!", "cause": "error message"}`

    

### `GET /user/auth-status`

- **Description**: Verifies the authentication status of the currently logged-in user. This requires a valid authentication token.
- **Request**: The user must have a valid JWT token. The token is typically sent via an HTTP - only cookie.
- Response:
  - **Success (HTTP 200)**: Returns `{"message": "OK", "name": "user name", "email": "user email"}` if the user is authenticated.
  - **Failure (HTTP 401)**: If the token is invalid or the user cannot be found, returns `{"message": "Unauthorized", "cause": "error message"}`

### `GET /user/logout`

- **Description**: Logs out the currently logged-in user by clearing the authentication cookie.

- **Request**: Requires a valid JWT token (sent via cookie).

- Response:

  - **Success (HTTP 200)**: Returns `{"message": "OK", "name": "user name", "email": "user email"}`
  - **Failure (HTTP 401)**: If there's an issue with the token or user verification, returns `{"message": "Unauthorized", "cause": "error message"}`

  

## Chat Routes

### `POST /chat/new`

**Description**: Sends a new chat message from the user and retrieves a response from the GPT API. The message should be included in the request body.

- Request:

  - Body:
    - `message` (string): The chat message the user wants to send.

- Response:

  - **Success (HTTP 200)**: Returns `{"chats": [chat1, chat2,...]}` where each `chat` object represents a message in the chat history, including user messages and GPT responses.
  - **Failure (HTTP 500)**: If there's an issue while interacting with the GPT API, returns `{"message": "Something wrong while the GPT chat api"}`

  

### `GET /chat/all-chats`

- **Description**: Fetches all the chat history for the currently logged-in user.

- **Request**: Requires a valid JWT token (sent via cookie).

- Response:

  - **Success (HTTP 200)**: Returns `{"message": "OK", "chats": [chat1, chat2,...]}` showing the chat history.
  - **Failure (HTTP 401)**: If the token is invalid or the user cannot be found, returns `{"message": "Unauthorized", "cause": "error message"}`

  

### `DELETE /chat/delete`

- **Description**: Deletes all the chat history for the currently logged-in user.
- **Request**: Requires a valid JWT token (sent via cookie).
- Response:
  - **Success (HTTP 200)**: Returns `{"message": "OK"}`
  - **Failure (HTTP 401)**: If the token is invalid or the user cannot be found, returns `{"message": "Unauthorized", "cause": "error message"}`



<img src="ScreenShot3.png"/>

# **Demo**：

<img src="ScreenShot1.png"/>

<img src="ScreenShot2.png"/>

# **Resources**：

- **Core Chatbot Repository**: Check out the [core chatbot code](https://github.com/Nikhilthadani/MERN-AI-ChatBot) on GitHub.
- **Core Video Tutorial**: Watch this [in-depth video](https://www.youtube.com/watch?v=wrHTcjSZQ1Y&t=60s) to get a better understanding of the core chatbot implementation.
- **Simple Chatbot Repository**: The source code of the [simple chatbot](https://github.com/bradtraversy/chatgpt-chatbot) is available here.
- **Matched Video Tutorial**: Follow this [video](https://www.youtube.com/watch?v=1YU83Lw58eo&list=PLC20u92Q90A5DbsbyBoaWnj-6nzYMnyx8&index=16) for more details on the simple chatbot.
- **OpenAI Official Website**: Visit the [OpenAI official website](https://platform.openai.com/apps) to access official OpenAI services and information.
- **CloseAI (Domestic)**: For domestic access, refer to the [CloseAI China platform](https://platform.closeai-asia.com/developer/api/).
- **Video on Domestic API Access**: Learn about accessing OpenAI API within China through this [video](https://www.youtube.com/watch?v=IzBGRH-6p7U&list=PLC20u92Q90A5DbsbyBoaWnj-6nzYMnyx8&index=17).
- **Verifying API Key with NextChat**: To verify the usability of your OpenAI API Key in China, go to [NextChat](https://app.nextchat.dev/#/). Enter the API key obtained from the OpenAI official website, and you can check its practicality in the domestic environment.
- **Connecting Domestic and Overseas OpenAI**: For detailed documentation on how to link domestic and overseas OpenAI services, please refer to [this document](OPENAI.md)

# **Roadmap**：

## Short-Term (Next 1 - 2 Weeks)

### Feature Enhancements

- User Interface Refinement

  - Improve the overall look and feel of the signup and login pages. Conduct user testing to gather feedback on the current layout, color scheme, and ease of use. Based on the results, implement changes to enhance visual appeal and streamline the user experience, such as simplifying form fields or adding more intuitive error messages.
  - Optimize the chat interface for mobile devices. Ensure that all chat functionality, including sending messages, viewing responses, and managing chat history, is fully accessible and responsive on smartphones and tablets.

- Error Handling

  - Implement more detailed error messages across the application. Instead of generic error responses, provide users with clear explanations about what went wrong when they encounter issues during signup, login, or chat operations. This will reduce user frustration and improve the self-help capabilities of the users.
  - Log errors more comprehensively in the backend. Currently, basic error logging exists, but expand it to include more context, like the full stack trace, the user ID (if available), and the sequence of API calls that preceded the error. This will significantly speed up the debugging process for developers.

  

### Integration Improvements

- OpenAI API
  - Explore additional parameters and features offered by the GPT API. For instance, experiment with different temperature settings to fine-tune the creativity and precision of the chatbot responses. This could lead to more personalized and engaging conversations with users.
  - Set up a caching mechanism for frequently asked questions. By caching common GPT responses, we can reduce API calls, lower costs, and improve response times for users.



## Medium-Term (Next 3 - 4 Weeks)

### New Features

- Social Sharing
  - Add the ability for users to share interesting chat conversations on social media platforms. This would require integrating with popular social media APIs, like Facebook, Twitter, or LinkedIn, and generating shareable links or pre-filled posts that showcase the chat exchange.
  - Implement a sharing counter or analytics to track how often chats are being shared, which can help gauge user engagement and the popularity of different topics.
- Multi-Language Support
  - Incorporate language detection libraries to automatically identify the language of user messages. Based on the detected language, either respond in the same language or offer users the option to translate the chatbot's response into their preferred language.
  - Translate key parts of the user interface, such as buttons, menus, and error messages, to make the application more accessible to a global audience.

### Performance Optimization

- Database Optimization

  - Analyze the MongoDB queries related to chat history and user data. Identify slow queries and optimize them, perhaps by adding proper indexes to frequently accessed fields. This will lead to faster data retrieval and storage, especially as the user base grows.
  - Consider implementing a data archiving strategy for old chat history. Instead of keeping all chat records indefinitely, archive infrequently accessed data to reduce the overall database size and improve query performance.

  

## Long-Term (Over 4 Weeks)

### Advanced Functionality

- Custom Chatbot Personas
  - Develop a feature that allows users to select from different chatbot personas. For example, a user could choose a technical expert persona for in-depth tech support, or a friendly conversationalist persona for casual chats. Each persona would have its own set of predefined responses and interaction styles.
  - Implement a user feedback system for the personas, so that users can rate and suggest improvements for each character, enabling continuous refinement.
- Advanced Security Enhancements
  - Integrate multi-factor authentication options, such as SMS verification or biometric authentication (if supported by the platform). This will add an extra layer of security to user accounts, protecting sensitive user data.
  - Conduct regular security audits of the entire application stack, including the codebase, dependencies, and infrastructure. Hire external security experts to perform penetration testing and suggest security best practices.

### Scalability

- Cloud Migration
  - Evaluate migrating the application to a cloud-based infrastructure, such as Amazon Web Services (AWS), Google Cloud Platform (GCP), or Microsoft Azure. Cloud providers offer scalable resources that can handle increased traffic, storage, and computing requirements as the user base expands.
  - Set up auto-scaling groups in the cloud to automatically adjust the number of servers based on real-time traffic patterns. This will ensure optimal performance during peak usage times without over-provisioning resources.

# **Contact Information**：

Aaron(HAONAN) TAO

email:873190199@qq.com

github:https://github.com/HAONANTAO

linkin:https://www.linkedin.com/in/haonan-tao-aaron

# **License**：

This project is licensed under the MIT License, which is detailed as follows:

## MIT License Text

Permission is hereby freely granted to any individual or entity that obtains a copy of this software, along with its associated documentation files (collectively referred to as the "Software"). Recipients have unrestricted rights to engage with the Software. This includes, but is not limited to, the rights to use, duplicate, adapt, merge, publish, disseminate, sublicense, and even sell copies of the Software. Moreover, those who receive the Software are also permitted to carry out the same actions, subject to the conditions below.

It is mandatory that the above-mentioned copyright notice and this permission notice be incorporated into all copies, or any substantial segments, of the Software.

The Software is offered on an "as is" basis. There are no warranties of any kind, whether expressed or implied. This encompasses, but is not restricted to, warranties regarding merchantability, suitability for a specific purpose, and non-infringement. Under no circumstances shall the authors or copyright holders be held accountable for any claims, damages, or other liabilities. These could arise from actions related to contracts, torts, or other legal causes, and be directly or indirectly connected to the Software, or any activities performed using it.

By opting for the MIT license, our intention is to foster an open, collaborative development ecosystem. Developers are at liberty to fork the project, enhance it, and integrate it into their own undertakings, provided that they preserve the relevant copyright notices. This license is favored for its straightforwardness and permissive nature, which spurs a diverse array of contributions from the open-source community. Whether you're an independent coder eager to experiment with the code, or a large enterprise looking to build upon our groundwork, the MIT license endows you with the necessary freedom.


