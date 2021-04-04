import React from "react";
import { render } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  it("should render the About view", () => {
    const { getByText } = render(<About />);
    expect(getByText("This is the about page!"));
  });
});
