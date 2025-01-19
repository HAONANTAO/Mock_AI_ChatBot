import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("renders with the correct label", () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveTextContent("Click Me");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    const button = screen.getByTestId("custom-button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
