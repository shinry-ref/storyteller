import App from "../App";
import { render, screen } from "@testing-library/react";

describe("名刺カードのテスト", () => {
  it("名前が表示されていること", () => {
    render(<App />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});