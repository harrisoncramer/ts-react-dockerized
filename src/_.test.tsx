import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders the word 'Login'", () => {
  render(<App />);
  const loginPrompt = screen.getByText(/Login/);
  expect(loginPrompt).toBeInTheDocument();
});
