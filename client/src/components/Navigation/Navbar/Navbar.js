import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      photo: ""
    }

  }

  componentDidMount() {

    return fetch(`http://localhost:3001/navbar/photo`)
      .then((res) => res.json())
      .then(photo => this.setState({
        photo: photo[0].photo
      }));
  }
  render() {
    console.log(this.state);
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
              <Link to="/feed/deals">
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
            <Link to="/profile">
              <div class="dropdown show m-0 p-0">
                <a class="dropdown-toggle picture-toggle m-0 p-0"  id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className={'fas mt-1 pt-1 px-2 user-icon-navbar ' + this.state.photo}></i>
                </a>

                <div class="dropdown-menu m-0" aria-labelledby="dropdownMenuLink">
                  <Link class="dropdown-item" to="/profile">Profile</Link>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </div>
            </Link>
          </li>
        </div>
      </header>
    );
  }
};

export default Navbar;


