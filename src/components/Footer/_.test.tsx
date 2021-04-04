import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("should have footer text", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("Copyright TK"));
  });
});
