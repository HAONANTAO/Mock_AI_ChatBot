import { render, screen } from "@testing-library/react";

import ChatItem from "../../../components/chat/ChatItem";
import { useAuth } from "../../../context/AuthContext";

import "@testing-library/jest-dom";

// 模拟 useAuth 钩子
jest.mock("../../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// 测试 ChatItem 组件
describe("ChatItem Component", () => {
  beforeEach(() => {
    // 设置模拟的 useAuth 返回值
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: "John Doe" },
    });
  });

  test("should render user's name as Avatar", () => {
    const { getByText } = render(
      <ChatItem content="Hello, world!" role="user" />,
    );
    expect(getByText("JD")).toBeInTheDocument(); // "JD" 是用户姓名的首字母
  });

  test("should render assistant avatar image", () => {
    const { getByAltText } = render(
      <ChatItem content="Hello, world!" role="assistant" />,
    );
    const avatarImage = getByAltText("openai");
    expect(avatarImage).toHaveAttribute("src", "openai.png");
  });

  test("should render code block correctly", () => {
    const message = "```js\nconst x = 10;\n```";
    render(<ChatItem content={message} role="user" />);

    // 检查是否渲染了 SyntaxHighlighter 组件
    const syntaxHighlighter = screen.getByText("const x = 10;");
    expect(syntaxHighlighter).toBeInTheDocument();
  });

  test("should render normal text message", () => {
    const message = "This is a regular message";
    render(<ChatItem content={message} role="assistant" />);

    const textMessage = screen.getByText(message);
    expect(textMessage).toBeInTheDocument();
  });

  test("should render multiple message blocks", () => {
    const message =
      "Hello world! ```js\nconsole.log('hello');\n``` Another message!";
    render(<ChatItem content={message} role="user" />);

    // 检查是否渲染了代码块和文本块
    const codeBlock = screen.getByText("console.log('hello');");
    const textBlock = screen.getByText("Hello world!");
    const anotherTextBlock = screen.getByText("Another message!");

    expect(codeBlock).toBeInTheDocument();
    expect(textBlock).toBeInTheDocument();
    expect(anotherTextBlock).toBeInTheDocument();
  });
});
