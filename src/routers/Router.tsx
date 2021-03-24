import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import Dashboard from "../views/Dashboard";
import About from "../views/About/About";
import NotFound from "../views/NotFound/NotFound";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../components/Login/Login";
import useToken from "../hooks/useToken";
import Forgot from "../components/Forgot/Forgot";
import Signup from "../components/Signup/Signup";
import Settings from "../components/Settings/Settings";
import ResetPassword from "../components/ResetPassword/ResetPassword";

export function Router() {
  const { token, setToken, removeToken } = useToken();

  if (!token) {
    // Public
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login setToken={setToken} />
          </Route>
        </Switch>
        <Switch>
          <Route path="/signup">
            <Signup setToken={setToken} />
          </Route>
        </Switch>
        <Switch>
          <Route path="/forgot">
            <Forgot />
          </Route>
        </Switch>
        <Switch>
          <Route path="/user/forgot-password/:token">
            <ResetPassword />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  } else {
    // Private
    return (
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
  }
}
