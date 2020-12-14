import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders the word 'red'", () => {
  render(<App />);
  const linkElement = screen.getByText(/red/i);
  expect(linkElement).toBeInTheDocument();
});
