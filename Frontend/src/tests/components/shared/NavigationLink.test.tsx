// src/tests/components/NavigationLink.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavigationLink from "../../../components/shared/NavigationLink";

// 创建一个包裹 Router 的 Wrapper 组件，因为 Link 需要 React Router 支持
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe("NavigationLink Component", () => {
  it("renders with correct text and styles", () => {
    render(
      <NavigationLink to="/home" bg="blue" text="Go Home" textColor="white" />,
      { wrapper: Wrapper },
    );

    // 检查文本是否正确
    const linkElement = screen.getByText(/Go Home/i);
    expect(linkElement).toBeInTheDocument();

    // 检查样式是否正确
    expect(linkElement).toHaveStyle("background: blue");
    expect(linkElement).toHaveStyle("color: white");
  });

  it("calls onClick handler when clicked", async () => {
    const onClickMock = jest.fn();

    render(
      <NavigationLink
        to="/home"
        bg="blue"
        text="Go Home"
        textColor="white"
        onClick={onClickMock}
      />,
      { wrapper: Wrapper },
    );

    // 获取 Link 元素并模拟点击
    const linkElement = screen.getByText(/Go Home/i);
    fireEvent.click(linkElement);

    // 检查 onClick 是否被调用
    expect(onClickMock).toHaveBeenCalled();
  });

  it("navigates to the correct URL", () => {
    render(
      <NavigationLink to="/home" bg="blue" text="Go Home" textColor="white" />,
      { wrapper: Wrapper },
    );

    // 获取 Link 元素
    const linkElement = screen.getByText(/Go Home/i);

    // 检查链接的 href 是否正确
    expect(linkElement).toHaveAttribute("href", "/home");
  });
});
