import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => {
  return (
    <header className="Toolbar">
      <div>Logo</div>
      <div>Search</div>
      <div className="Nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/crypto">Crypto</Link>
          </li>
          <li>
            <Link to="/feed/venues">Feed > Venues</Link>
          </li>
          <li>
            <Link to="/feed/friends">Feed > Friends</Link>
          </li>
          <li>
            <Link to="/feed/transactions">Feed > Transactions</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
