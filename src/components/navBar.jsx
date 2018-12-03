import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item disabled">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/movies">
          Movies
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/customers">
          Customers
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/rentals">
          Rentals
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
