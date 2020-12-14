import React, { useState } from "react";
import { Drawer, IconButton } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import Menu from "@material-ui/icons/Menu";

import Links from "./links";

import "./style.scss";

const Header = function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleGoHome = () => {
    //history.push("/");
  };

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <header className="header shadow">
      <nav>
        <IconButton
          data-testid="menuButton"
          onClick={handleDrawerToggle}
          className="menuButton pointer"
        >
          <Menu />
        </IconButton>
        <h1 onClick={handleGoHome} className="mainTitle pointer">
          {process.env.REACT_APP_APP_NAME}
        </h1>
        <Drawer
          className="drawer"
          data-testid="drawer"
          anchor={"left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <IconButton
            data-testid="closeButton"
            className="close"
            onClick={handleDrawerToggle}
          >
            <Close />
          </IconButton>
          <Links
            setMobileOpen={setMobileOpen}
            links={[
              { label: "Dashboard", link: "/" },
              { label: "About", link: "/about" },
            ]}
          />
        </Drawer>
      </nav>
    </header>
  );
};

export default Header;
