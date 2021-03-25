import React from "react";
import { Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { Route, Redirect, BrowserRouter } from "react-router-dom";

import Dashboard from "../views/Dashboard";
import About from "../views/About/About";
import NotFound from "../views/NotFound/NotFound";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Settings from "../components/Settings/Settings";
//import  from "../components/"

export interface PrivateRouterProps {
  removeToken: () => void;
}

const PrivateRouter = ({
  removeToken,
}: PrivateRouterProps): React.ReactElement => (
  <BrowserRouter>
    <Route exact path="/signup">
      <Redirect to="/" />
    </Route>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Header removeToken={removeToken} />
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </QueryParamProvider>
  </BrowserRouter>
);

export default PrivateRouter;
