import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import history from "../history";

import Dashboard from "../views/Dashboard";
import About from "../views/About";
import NotFound from "../views/NotFound";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppRouter = (): React.ReactElement => (
  <Router history={history}>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Header />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </QueryParamProvider>
  </Router>
);

export { AppRouter };
