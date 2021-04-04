import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./index";
import { QueryParamProvider } from "use-query-params";
import { ApolloProvider } from "@apollo/client";
import client from "../../graphql/client";

describe("Dashboard", () => {
  it("should render the Dashboard view", () => {
    render(
      <ApolloProvider client={client}>
        <QueryParamProvider>
          <Dashboard />
        </QueryParamProvider>
      </ApolloProvider>
    );
  });
});
