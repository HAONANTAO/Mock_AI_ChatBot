import { render, screen } from "@testing-library/react";
import CustomizedInput from "../../../components/shared/CustomizedInput";

describe("CustomizedInput Component", () => {
  it("applies border-radius style", () => {
    render(<CustomizedInput name="test" label="Test Input" type="text" />);

    const inputElement = screen.getByRole("textbox");

    // 检查 border-radius 是否是 inherit
    expect(inputElement).toHaveStyle("border-radius: inherit");
  });
});
