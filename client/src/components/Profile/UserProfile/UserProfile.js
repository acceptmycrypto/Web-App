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
      userCrypto: [],
      addAddress: false,
      qr: false
    }
  }

  handleChange = (event) => {
    let target = event.target.checked;

    if (target) {
      this.setState({
        cryptoView: "interested",
        qr: false,
        addAddress: false
      });
      let surroundingDiv = document.querySelector('.cryptoWallet');
      let allChildren = surroundingDiv.children;
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]
        // console.log(element);
        // if (element.tagName == "DIV") {
        element.style.display = "flex";
        // }
        // else {
        //   element.remove();
        // }
      }

      let address = document.getElementsByClassName('address');

      let qr = document.getElementsByClassName('qr');

      let deleteIcon = document.getElementsByClassName('deleteIcon');


      if (address[0] && qr[0] && deleteIcon[0] && address[0] != undefined && qr[0] != undefined && deleteIcon[0] != undefined) {
        address[0].remove();

        qr[0].remove();

        deleteIcon[0].remove();

      }


    } else {
      this.setState({
        cryptoView: "owned",
        qr: false,
        addAddress: false
      });
      let surroundingDiv = document.querySelector('.cryptoWallet');
      let allChildren = surroundingDiv.children;
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]
        console.log(element);
        // if (element.tagName == "DIV") {
        element.style.display = "flex";
        // }
        // else {
        // element.remove();
        // }
      }
    }


  }

  showQR = (event) => {
    if (!this.state.qr) {
      let target = event.target;
      let parentDiv = target.parentElement.parentElement;
      let address = target.getAttribute("data-address");
      let surroundingDiv = target.parentElement.parentElement.parentElement;

      let allChildren = surroundingDiv.children;
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]
        if (element != parentDiv) {
          element.style.display = "none";
        }
      }
      let remainingDiv = document.querySelector('.cryptoWallet');

      let qr = document.createElement("img");
      qr.classList.add('qr');
      qr.src = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${address}`;

      let displayAddress = document.createElement("p");
      displayAddress.classList.add('address');
      displayAddress.innerHTML = address;
      remainingDiv.append(qr, displayAddress);
      // remainingDiv.appendChild(displayAddress);



      let icon = document.createElement("i");
      icon.classList.add('fas', 'fa-times', 'deleteIcon');
      icon.addEventListener("click", this.hideQR);
      icon.classList.add('deleteQR');
      remainingDiv.insertBefore(icon, parentDiv);

      this.setState({
        qr: true
      })
    }

  }

  hideQR = (event) => {

    if (this.state.qr) {
      let target = event.target;
      let parentDiv = target.parentElement;

      let allChildren = parentDiv.children;
      console.log(allChildren);

      let address = document.getElementsByClassName('address');
      address[0].remove();


      let qr = document.getElementsByClassName('qr');
      qr[0].remove();


      let deleteIcon = document.getElementsByClassName('deleteIcon');
      deleteIcon[0].remove();


      //note: for loop stops at i = 5 and does not finish and remove the wallet address so have to manually remove with code above 
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]
        // console.log(element);
        // if (element.tagName == "DIV") {
        element.style.display = "flex";
        // }
        // else {
        // element.remove();
        // }
        this.setState({
          qr: false
        })
      }
    }


  }

  addQR = (event) => {
    let target = event.target;
    let parentDiv = target.parentElement.parentElement;
    let surroundingDiv = target.parentElement.parentElement.parentElement;
    let allChildren = surroundingDiv.children;
    let i, j, element;

    if (this.state.addAddress) {

      for (i = 0; i < allChildren.length; i++) {

        element = allChildren[i]
        element.style.display = "flex";
        // if (element != parentDiv) {
        //   element.style.display = "none";
        // }
      }
      this.setState({
        addAddress: false
      })

    } else {

      for (j = 0; j < allChildren.length; j++) {
        element = allChildren[j]

        if (element != parentDiv) {
          element.style.display = "none";
        }
      }

      this.setState({
        addAddress: true
      })

    }

  }



  componentDidMount() {

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
            {(this.state.userInfo.photo === undefined)
              ? <i className="fas fa-user-circle my-2 py-4 px-1 shaded"></i>
              : <img src={this.state.userInfo.photo}></img>
            }

            {/* <img id="responsive" data-id={x.id} clasName="my-2 justify-content-center" src={this.state.src} alt="" /> */}
            <h5 className="my-2 blueText">{x.username}</h5>
            <h5 className="my-2 capitalize blueText">{x.first_name}  {x.last_name}</h5>
            <h5 className="my-2 blueText"> <i className="fas fa-map-marker-alt mr-1"></i>  {x.user_location}</h5>
            <h5 className="my-2 blueText"> <i className="fas fa-envelope mr-1"></i> <a className="blueText" href={`mailto:${x.email}`}>{x.email}</a></h5>
            <h5 className="my-2 font-italic blueText">{x.bio}</h5>
          </div>
        )}

        <div id="cryptoPortfolio" className="p-1 m-3">
          <h5 id="cryptoHeader" className="blueText">CRYPTO PORTFOLIO</h5>

          <label className="switch"><input type="checkbox" id="togBtn" onChange={this.handleChange} /><div className="slider round"><span className="own">OWNED</span><span className="interest">INTERESTED</span></div></label>
          <div className="cryptoWallet">
            {(this.state.cryptoView === "interested")
              ? this.state.userCrypto.map((y) =>
                <div>
                  {
                    (y.crypto_address === null)
                      ? <div className="mx-1 my-2 cryptos">
                        {/* <p>{y.crypto_symbol}</p> */}
                        <a className="blueText cryptoText" href={y.crypto_link}>{y.crypto_metadata_name}</a>
                        <br></br>
                        <img className="cryptoImage" data-name={y.crypto_metadata_name} src={y.crypto_logo} onClick={this.addQR}></img>
                      </div>
                      : null
                  }

                </div>

              )
              : this.state.userCrypto.map((y) =>
                <div>
                  {
                    (y.crypto_address !== null)
                      ? <div className="mx-1 my-2 cryptos">
                        <a className="blueText cryptoText" href={y.crypto_link}>{y.crypto_metadata_name}</a>
                        <br></br>
                        <img className="cryptoImage" data-name={y.crypto_metadata_name} data-address={y.crypto_address} src={y.crypto_logo} onClick={this.showQR}></img>
                      </div>
                      : null
                  }
                </div>
              )
            }
            {this.state.addAddress &&
              <div className="addressForm d-flex flex-column">
                <form id="addAddressForm" onSubmit={this.updateCryptos}>
                  <input type="text" name="crypto_address" placeholder="enter your wallet address here" />

                  <button>Add Address</button>
                </form>
              </div>
            }
          </div>


        </div>

      </div>
    );
  }
}

export default UserProfile;