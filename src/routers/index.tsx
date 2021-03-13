import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import Dashboard from "../views/Dashboard";
import About from "../views/About";
import NotFound from "../views/NotFound";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";

const AppRouter = (): React.ReactElement => {
  const [token, setToken] = useState<string | null>(null);
  if (token) {
    return (
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </QueryParamProvider>
      </BrowserRouter>
    );
  } else {
    return <Login setToken={setToken} />;
  }
};

export { AppRouter };
