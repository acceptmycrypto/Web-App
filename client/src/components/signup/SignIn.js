import "./SignUp.css";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
// import { _login } from './AuthService';

class SignIn extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            SignUp: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let email = e.target.children[0].children[1].value;
        let password = e.target.children[1].children[1].value;

        console.log('The form was submitted with the following data:');
        console.log(this.state);


    return fetch("http://localhost:3001/signin", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
            
        })

        console.log('The form was submitted with the following data:');
        console.log(this.state);
       
    };
    


    render() {
        return (
            <div className="App">
            <div className="App__Aside"></div>
            <div className="App__Form">
            <div className="PageSwitcher">
                  <NavLink to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                  <NavLink exact to="/SignUp" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                </div>
  
                {/* <div className="FormTitle">
                    <NavLink to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/SignUp" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                </div> */}
            <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20"onSubmit={this.handleSubmit}>Sign In<link to="/feed/venues"/></button> <Link to="/" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>   
            </div>
          </div>
        );
    }
}

export default SignIn;