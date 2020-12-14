import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextBox from "./index";

describe("TextBox", () => {
  it("should render TextBox", () => {
    const { getByTestId } = render(
      <TextBox callBack={() => {}} placeholder="placeholder" />
    );
    expect(getByTestId("textbox"));
  });
  it("should display value on press key", () => {
    const { getByTestId } = render(
      <TextBox callBack={() => {}} placeholder="placeholder" />
    );
    const element = getByTestId("textbox") as HTMLInputElement;
    fireEvent.change(element, { target: { value: "b" } });
    expect(element.value).toBe("b");
  });
  it("should run callback on enter", () => {
    const fn = jest.fn();
    const { getByTestId } = render(
      <TextBox callBack={fn} placeholder="placeholder" />
    );
    const element = getByTestId("textbox") as HTMLInputElement;
    fireEvent.change(element, { target: { value: "o" } });
    fireEvent.change(element, { target: { value: "ok" } });
    expect(element.value).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(0);
    const form = getByTestId("form");
    fireEvent.submit(form);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
