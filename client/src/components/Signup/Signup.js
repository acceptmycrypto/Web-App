// import React from "react";
import "./SignUp.css";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';


class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            userName: '',
            email: '',
            password: '',
            phoneNum: '',
            location: '',
            birthday: '',
            cryptoProfile: '',
            hasAgreed: false
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

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
            <div className="App">
            <div className="App__Aside"></div>
            <div className="App__Form">
              <div className="PageSwitcher">
                  <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                  <NavLink to="/SignUp" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                </div>
  
                <div className="FormTitle">
                    <NavLink to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/SignUp" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                </div>
            </div>
            

        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">User Name</label>
                <input type="userName" id="userName" className="FormField__Input" placeholder="Enter your desired User Name" name="User name" value={this.state.userName} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="phoneNum">Phone Number</label>
                <input type="text" id="phoneNum" className="FormField__Input" placeholder="Enter your Phone Number" name="phoneNum" value={this.state.phoneNum} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Location</label>
                <input type="text" id="location" className="FormField__Input" placeholder="Enter your address" name="location" value={this.state.location} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="birthday">Birthday</label>
                <input type="text" id="birthday" className="FormField__Input" placeholder="Enter your date of birth" name="birthday" value={this.state.birthday} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="cryptoProfile">Crypto Profile</label>
                <input type="text" id="cryptoProfile" className="FormField__Input" placeholder="Your Crypto Profile" name="email" value={this.state.cryptoProfile} onChange={this.handleChange} />
              </div>
              
              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                    <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> I agree all statements in <a href="#" className="FormField__TermsLink">terms of service</a>
                </label>
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
              </div>
            </form>
          </div>
          </div>
         
        );
    }
   
}

// class SignIn extends Component {
//     constructor() {
//         super();

//         this.state = {
//             email: '',
//             password: '',
//             SignUp: false
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(e) {
//         let target = e.target;
//         let value = target.type === 'checkbox' ? target.checked : target.value;
//         let name = target.name;

//         this.setState({
//           [name]: value
//         });
//     }

//     handleSubmit(e) {
//         e.preventDefault();

//         console.log('The form was submitted with the following data:');
//         console.log(this.state);
//     }

//     hideSignUpForm = (event) => {
//         event.preventDefault();
//         this.setState({SignUp:false})
//       };

//     render() {
//         return (
//         <div className="FormCenter">
//             <form onSubmit={this.handleSubmit} className="FormFields">
//             <div className="FormField">
//                 <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
//                 <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
//               </div>

//               <div className="FormField">
//                 <label className="FormField__Label" htmlFor="password">Password</label>
//                 <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
//               </div>

//               <div className="FormField">
//                   <button className="FormField__Button mr-20">Sign In</button> <Link to="/" className="FormField__Link">Create an account</Link>
//               </div>
//             </form>
//           </div>
//         );
//     }
// }


export default SignUp;