import React from "react";
import { useHistory } from "react-router";
import { LOGOUT_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import client from "../../graphql/client";

import "./style.scss";

type HeaderProps = {
  removeToken: () => void;
};
const Header = function Header({ removeToken }: HeaderProps) {
  const history = useHistory();
  const [logout] = useMutation(LOGOUT_MUTATION);

  const handleGoHome = () => {
    history.push("/");
  };

  const handleLogout = async () => {
    // Make Logout Query to backend
    try {
      await client.cache.reset();
      await logout();
      removeToken();
    } catch (err) {
      console.log("Could not log out...");
    }
  };

  return (
    <header className="header shadow">
      <h1 onClick={handleGoHome} className="mainTitle pointer">
        {process.env.REACT_APP_APP_NAME}
      </h1>
      <h3 onClick={handleLogout} className="pointer logout">
        Logout
      </h3>
    </header>
  );
};

export default Header;
