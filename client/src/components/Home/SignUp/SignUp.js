// import React from "react";
import "./SignUp.css";
import React, { Component } from "react";
import {BrowserRouter as Redirect, Router, Route, Link, NavLink} from "react-router-dom";
import Select from "react-select";
import { _signUp } from "../../../services/AuthService";

const options = [
  { value: "Bitcoin", label: "Bitcoin (BTC)" },
  { value: "Bitcoin Cash", label: "Bitcoin Cash (BCH)" },
  { value: "Litecoin", label: "Litecoin (LTC)" },
  { value: "Ethereum", label: "Ethereum (ETH)" },
  { value: "Ethereum Classic", label: "Ethereum Classic (ETC)" },
  { value: "Litecoin", label: "Litecoin (LTC)" },
  { value: "Dogecoin", label: "Dogecoin (LTC)" },
  { value: "Dash", label: "Dash" },
  { value: "Monero", label: "Monero (XMR)" },
  { value: "Verge", label: "Verge (XVG)" },
  { value: "Ripple", label: "Ripple (XRP)" }
];

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      password: "",
      cryptoProfile: [],
      hasAgreed: false,
      redirect: false
      // name: '',
       // phoneNum: '',
      // location: '',
      // birthday: '',
    };
    // setRedirect = () => {
    //   this.setState({
    //     redirect: true
    //   })
    // }
    // renderRedirect = () => {
    //   if (this.state.redirect) {
    //     return <Redirect to='/feed/venues'>
    //   }
    // }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //this function handles the change of crypto option user selects everytime
  //selectedOptions is an array of object
  //we need to map through the array and get the value of each object
  handleDropdownChange = selectedOptions => {
    let SelectedCryptos = [];
    selectedOptions.map(crypto => {
      SelectedCryptos.push(crypto.value);
    })
    this.setState({
      cryptoProfile: SelectedCryptos //this is what we get [Bitcoin, Litecoin, ...] as user select the option
    });

  };

  //function to handle when user clicks submit button to register
  handleSubmit(e) {
    e.preventDefault();
    
    let username = e.target.children[0].children[1].value;
    let email = e.target.children[1].children[1].value;
    let password = e.target.children[2].children[1].value;
    let cryptoProfile = this.state.cryptoProfile;

    //we add validation on the front end so that user has to enter in the required field before clicking submit
    //TODO
    if (!username || !email || !password) {
      alert("Please enter in the required field!");
    } else {
      return _signUp(username, email, password, cryptoProfile).then(res => {
        console.log(username, email, password, cryptoProfile);
        // console.log("after user has signed up: ", res.message);
      });
    }
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    console.log(name);
  }
  state = {
    selectedOptions: null
  };

  render() {
    const { selectedOptions } = this.state;
    return (
      <div className="App">
        <div className="App__Aside" />
        <div className="App__Form">
          <div className="PageSwitcher">
            <NavLink
              exact
              to="/"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/SignUp"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              Sign Up
            </NavLink>
          </div>
          <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="username">
                  User Name
                </label>
                <input
                  type="username"
                  id="username"
                  className="FormField__Input"
                  placeholder="Enter your desired User Name"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">
                  E-Mail Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="FormField__Input"
                  placeholder="Enter your email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="FormField__Input"
                  placeholder="Enter your password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              {/* <div className="FormField">
                <label className="FormField__Label" htmlFor="phoneNum">Phone Number</label>
                <input type="text" id="phoneNum" className="FormField__Input" placeholder="Enter your Phone Number" name="phoneNum" value={this.state.phoneNum} onChange={this.handleChange} />
              </div> */}
              {/* <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Location</label>
                <input type="text" id="location" className="FormField__Input" placeholder="Enter your address" name="location" value={this.state.location} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="birthday">Birthday</label>
                <input type="text" id="birthday" className="FormField__Input" placeholder="Enter your date of birth" name="birthday" value={this.state.birthday} onChange={this.handleChange} />
              </div> */}
              <div className="FormField">
                <label className="FormField__Label" htmlFor="cryptoProfile">
                  Your Cryptocurrency Portfolio
                </label>
                {/* <input type="text" id="cryptoProfile" className="FormField__Input" placeholder="Your Crypto Profile" name="email" value={this.state.cryptoProfile} onChange={this.handleChange} /> */}
                <Select
                  value={selectedOptions}
                  onChange={this.handleDropdownChange}
                  options={options}
                  isMulti={true}
                  autoBlur={false}
                />
              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                  <input
                    className="FormField__Checkbox"
                    type="checkbox"
                    name="hasAgreed"
                    value={this.state.hasAgreed}
                    onChange={this.handleChange}
                  />{" "}
                  I agree all statements in{" "}
                  <a href="#" className="FormField__TermsLink">
                    terms of service
                  </a>
                </label>
              </div>

              <div className="FormField">
                {/* {this.renderRedirect()} */}
                <button
                  className="FormField__Button mr-20"
                  onSubmit={this.handleSubmit}
                >
                  Sign Up
                </button>{" "}
                <Link to="/" className="FormField__Link">
                  I'm already member
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
