import React, { useEffect } from "react";
import { Router } from "./routers/Router";
import ReactGA from "react-ga";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";

import "./styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App(): React.ReactElement {
  useEffect(() => {
    // Use Google Analytics
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS as string);
      ReactGA.pageview("/");
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router />;
    </ApolloProvider>
  );
}

export default App;
