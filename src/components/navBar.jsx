import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
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
      {!user && (
        <React.Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        </React.Fragment>
      )}
      {user && (
        <React.Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              {user.name}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              logout
            </NavLink>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavBar;
