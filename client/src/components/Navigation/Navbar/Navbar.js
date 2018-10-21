import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => {
  return (
    <header className="Toolbar">
      <div className="nav-left">
        <Link to="/" className="Logo">
          AcceptMyCrypto
        </Link>
        <div className="Search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="Feed">
          <li>
            <Link to="/feed/venues">
              <i className="fas fa-dollar-sign" /> Matched Deals
            </Link>
          </li>
          <li>
            <Link to="/feed/friends">
              <i className="fas fa-user-friends" /> Matched Friends
            </Link>
          </li>
          <li>
            <Link to="/feed/transactions">
              <i className="fas fa-history" /> Transactions
            </Link>
          </li>
        </div>
      </div>
      <div className="Nav">
        <li>
          <Link to="/crypto">
            <i className="fas fa-users" /> Community
          </Link>
        </li>
        <li>
          <i className="fas fa-bell" /> Notification
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </div>
    </header>
  );
};

export default Navbar;
