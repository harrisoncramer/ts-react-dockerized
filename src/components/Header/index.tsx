import React from "react";
import { useHistory } from "react-router";
import { LOGOUT_MUTATION } from "../../graphql/queries";
import { useMutation } from "@apollo/client";

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
    await logout();
    removeToken();
  };

  return (
    <header className="header shadow">
      <h1 onClick={handleGoHome} className="mainTitle pointer">
        {process.env.REACT_APP_APP_NAME}
      </h1>
      <h3 onClick={handleLogout}>
        <p>Logout</p>
      </h3>
    </header>
  );
};

export default Header;
