import React from "react";
import {
  render,
  fireEvent,
  //waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
//import Header from "./Header";

describe("Header", () => {
  it("Should log user out", () => {
    //const { getByTestId } = render(
    //<Router>
    //<Header />
    //</Router>
    //);
    //fireEvent.click(getByTestId("menuButton"));
    //expect(getByTestId("drawer")).toBeVisible();
  });
  it("should close drawer", async () => {
    //const { getByTestId, queryByTestId } = render(
    //<Router>
    //<Header removeToken={() => {}}}/>
    //</Router>
    //);
    //fireEvent.click(getByTestId("menuButton"));
    //expect(getByTestId("drawer")).toBeVisible();
    //fireEvent.click(getByTestId("closeButton"));
    //// Must wait for animation...
    //await waitForElementToBeRemoved(getByTestId("drawer"));
  });
});
