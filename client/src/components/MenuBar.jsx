import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menubar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} icon="user" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} icon="sign-out" />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
        icon="home"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
          icon="sign-in"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
          icon="signup"
        />
      </Menu.Menu>
    </Menu>
  );

  return menubar;
};

export default MenuBar;
