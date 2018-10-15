import React, { Component } from "react";
import "./UserProfile.css";
import FeedFriends from '../../Feed/MatchedFriends';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';


class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      src: "./assets/images/user.png",
      cryptoView: "owned",
      userInfo: [],
      userCrypto: []
    }
  }

  componentWillMount() {

    Promise.all([
      fetch('http://localhost:3001/profile'),
      fetch('http://localhost:3001/profile/crypto')
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
        userInfo: data1,
        userCrypto: data2
      }));

  }




  render() {
    console.log(this.state);
    // console.log(this.props.location.pathname);
    // console.log(this.props.match.params); 

    return (
      <div className="userProfile text-center">
        {this.state.userInfo.map((x) =>
          <div id="profile" data-id={x.id} className="p-3 pb-0 ml-3 d-flex flex-column">
            <i class="fas fa-user-circle my-2 py-4 px-1 shaded"></i>
            {/* <img id="responsive" data-id={x.id} clasName="my-2 justify-content-center" src={this.state.src} alt="" /> */}
            <h5 className="my-2">{x.username}</h5>
            <h5 className="my-2 capitalize">{x.first_name}  {x.last_name}</h5>
            <h5 className="my-2"> <i class="fas fa-map-marker-alt mr-1"></i>  {x.user_location}</h5>
            <h5 className="my-2"> <i class="fas fa-envelope mr-1"></i> <a href={`mailto:${x.email}`}>{x.email}</a></h5>
            <h5 className="my-2 font-italic">{x.bio}</h5>
          </div>
        )}

        <div id="cryptoPortfolio" className="p-1 m-3">
          <h5 id="cryptoHeader">Crypto Portfolio</h5>
          <div className="portfolioSwitch d-flex justify-content-center mb-1">
            <div  id ="owned" className="portfolioActive py-1 px-2">Owned</div>
            <div  id="interested"className="portfolioItem py-1 px-2">Interested</div>
          </div>
          <div className="d-flex flex-row flex-wrap justify-content-center">
            {(this.state.cryptoView === "interested")
              ? this.state.userCrypto.map((y) =>
                <div className="d-flex flex-column">
                  {
                    (y.crypto_address === null)
                      ? <div className="mx-1 my-2">
                        {/* <p>{y.crypto_symbol}</p> */}
                        <a href={y.crypto_link}>{y.crypto_metadata_name}</a>
                        <br></br>
                        <img src={y.crypto_logo}></img>
                      </div>
                      : ""
                  }
                </div>
              )
              : this.state.userCrypto.map((y) =>
                <div>
                  {
                    (y.crypto_address !== null)
                      ? <div className="mx-1 my-2">
                        {/* <p>{y.crypto_symbol}</p> */}
                        <a href={y.crypto_link}>{y.crypto_metadata_name}</a>
                        <br></br>
                        <img src={y.crypto_logo}></img>
                        {/* <img src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${y.crypto_address}`}></img> */}
                      </div>
                      : ""
                  }
                </div>
              )
            }
          </div>
          

        </div>

      </div>
    );
  }
}

export default UserProfile;