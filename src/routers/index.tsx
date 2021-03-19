import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import Dashboard from "../views/Dashboard";
import About from "../views/About";
import NotFound from "../views/NotFound";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";
import useToken from "../hooks/useToken";
import Forgot from "../components/Forgot";
import Signup from "../components/Signup";
import Settings from "../components/Settings";
import ResetPassword from "../components/ResetPassword";

function AppRouter() {
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

export { AppRouter };
