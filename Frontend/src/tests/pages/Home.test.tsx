// src/tests/pages/Home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home";
import { MemoryRouter } from "react-router-dom";

// Mock TypingAnimation component to avoid actual implementation
jest.mock("../../components/typer/TypingAnimation", () => () => (
  <div>typing...</div>
));

// Mock the useMediaQuery hook from MUI to simulate different screen sizes
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("Home Component", () => {
  it("renders TypingAnimation component", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText(/typing/i)).toBeInTheDocument();
  });

  it("renders robot and openai images", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const robotImage = screen.getByAltText(/robot/i);
    expect(robotImage).toBeInTheDocument();
    expect(robotImage).toHaveAttribute("src", "Robot2.png");

    const openAIImage = screen.getByAltText(/openai/i);
    expect(openAIImage).toBeInTheDocument();
    expect(openAIImage).toHaveAttribute("src", "openai.png");
  });

  it("renders chatbot image with correct styles", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const chatbotImage = screen.getByAltText(/chatbot/i);
    expect(chatbotImage).toBeInTheDocument();
    expect(chatbotImage).toHaveStyle("border-radius: 20px");
    expect(chatbotImage).toHaveStyle("box-shadow: -5px -5px  105px#64f3d5");
  });

  it("renders Footer component", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Built With love/i)).toBeInTheDocument();
  });

  it("correctly adjusts image size based on screen size", () => {
    // Mock the useMediaQuery hook to simulate small screen (max-width: 600px)
    const useMediaQuery = require("@mui/material").useMediaQuery;
    useMediaQuery.mockImplementation((query: string) => {
      if (query === "(max-width:600px)") {
        return true; // Simulate small screen
      }
      return false; // Default to large screen
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const chatbotImage = screen.getByAltText(/chatbot/i);
    expect(chatbotImage).toHaveStyle("width: 60%"); // Expected behavior on small screen
  });
});
