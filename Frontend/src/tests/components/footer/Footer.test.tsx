import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../../../components/footer/Footer";

describe("Footer Component", () => {
  // 测试 Footer 组件是否正常渲染
  test("renders Footer component", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    // 检查是否存在特定的文本内容
    const footerText = screen.getByText(/Built With love by/i);
    expect(footerText).toBeInTheDocument();

    // 检查是否存在 Link 元素
    const linkElement = screen.getByRole("link", { name: /Aaron TAO/i });
    expect(linkElement).toBeInTheDocument();
  });

  // 测试 Footer 组件中的 Link 元素是否链接到正确的 URL
  test("Link in Footer should navigate to correct URL", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    // 获取 Link 元素
    const linkElement = screen.getByRole("link", { name: /Aaron TAO/i });

    // 检查 Link 元素的 href 属性是否正确
    expect(linkElement.getAttribute("href")).toBe(
      "https://github.com/HAONANTAO",
    );
  });
});
