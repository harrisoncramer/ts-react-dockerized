import React from "react";

import useToken from "../hooks/useToken";

// Import private and public routers based on token status.
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

export function Router() {
  const { token, setToken, removeToken } = useToken();

  if (!token) {
    return <PublicRouter setToken={setToken} />;
  } else {
    return <PrivateRouter removeToken={removeToken} />;
  }
}
