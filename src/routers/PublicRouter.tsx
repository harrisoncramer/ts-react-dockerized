import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../components/Login/Login";
import Forgot from "../components/Forgot/Forgot";
import Signup from "../components/Signup/Signup";
import ResetPassword from "../components/ResetPassword/ResetPassword";

export interface PublicRouterProps {
  setToken: (token: string) => void;
}

const PublicRouter = ({ setToken }: PublicRouterProps): React.ReactElement => (
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

export default PublicRouter;
