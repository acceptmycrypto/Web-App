import React, { Component } from "react";
import "./UserProfile.css";

class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      src : "./assets/images/user.png"
    }
  }


  render() {
    console.log(this.state);
    return (
      <div className="MatchedFriends">
          <div id="profile" className="container-fluid d-inline-block p-4 pb-0 ml-3 d-flex flex-column">
            <img id="responsive"clasName ="my-2 justify-content-center" src={this.state.src} alt=""/>
            <h5 className="my-2">Name</h5>
            <p className="my-2" id="name"></p>
            <h5 className="my-2">Email</h5>
            <p className="my-2" id="email"></p>
            <h5 className="my-2">Location</h5>
            <p className="my-2" id="location"></p>
            <h5 className="my-2">Birthday</h5>
            <p className="mt-2" id="birthday"></p>
          </div>

        </div>
        );
      }
    }
    
  export default UserProfile;