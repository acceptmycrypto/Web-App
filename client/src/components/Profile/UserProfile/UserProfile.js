import React, { Component } from "react";
import "./UserProfile.css";
import FeedFriends from "../../Feed/MatchedFriends";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import coinAddressValidator from "coin-address-validator";


class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      src: "./assets/images/user.png",
      crypto_view: "owned",
      user_info: [],
      user_crypto: [],
      add_address: false,
      qr: false,
      users_cryptos_id: null,
      current_crypto_name: null,

    }
    this.updateCryptoTable = this.updateCryptoTable.bind(this);
  }

  // updates state
  setCurrentState = (crypto_view, qr, add_address, users_cryptos_id, current_crypto_name) => {
    this.setState({ crypto_view, qr, add_address, users_cryptos_id, current_crypto_name });
  }


  // if status is show, all coins in wallet will be shown but if status is hide, all coins but the one clicked on will be hidden
  hideOrShowCoin = (status, parentDiv) => {
    // status can be either "show" or "hide"
    let surroundingDiv = document.querySelector(".cryptoWallet");
    let allChildren = surroundingDiv.children;

    if (status === "show") {
      // displays all the user's coins
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]
        element.style.display = "flex";
      }

      if (this.state.qr) { //if the QR is shown on the page
        this.hideOrShowAddress("hide"); // will hide the QR code and Wallet address when all the coins are shown
      }

    } else {
      // status is hide, all coins other than what user clicked on will be hidden
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]
        if (element != parentDiv) {
          element.style.display = "none";
        }
      }
    }
  }

  // if status is show, the QR code and Wallet Address will be shown, if status is hide, the QR code and Wallet Address will be removed from DOM
  hideOrShowAddress = (status, parentDiv, address) => {
    if (status === "show") {
      // the wallet address, QR code and delete button will be created and shown
      let surroundingDiv = document.querySelector(".cryptoWallet");

      let qr = document.createElement("img");
      qr.classList.add("qr");
      qr.src = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${address}`;

      let displayAddress = document.createElement("p");
      displayAddress.classList.add("address");
      displayAddress.innerHTML = address;
      surroundingDiv.append(qr, displayAddress);

      // let icon = document.createElement("i");
      // icon.classList.add("fas", "fa-times", "deleteIcon");
      // icon.addEventListener("click", this.hideQR);
      // icon.classList.add("deleteQR");
      // surroundingDiv.insertBefore(icon, parentDiv);

    } else {
      // status = "hide"

      console.log('hidden');
      let address = document.querySelector(".address");
      let qr = document.querySelector(".qr");
      // let deleteIcon = document.querySelector(".deleteIcon");

      // remove wallet address, QR code, and delete icon from DOM
      address.remove();
      qr.remove();
      // deleteIcon.remove();
    }
  }


  handleToggleChange = (event) => {
    let target = event.target.checked; // checkbox has property checked = true or checked = false;

    if (target) { // if checkbox is checked show interested coins
      this.setCurrentState("interested", false, false, null, null); // crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

      this.hideOrShowCoin("show");

    } else { // if checkbox is not checked show owned coins
      this.setCurrentState("owned", false, false, null, null); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

      this.hideOrShowCoin("show");
    }
  }

  handleQRChange = (event) => {
    if (this.state.qr) {
      // after click of coin, if in state qr = true then show all coins and set state
      this.hideOrShowCoin("show");

      this.setCurrentState(this.state.crypto_view, false, this.state.add_address, null, null); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

    } else {
      // after click of coin, if in state qr = false then change qr = true in state and hide all other coins and show the QR and wallet address of the coin that was clicked on
      let target = event.target; // coin that was clicked on
      let parentDiv = target.parentElement.parentElement;
      let address = target.getAttribute("data-address");

      console.log(parentDiv);

      this.hideOrShowCoin("hide", parentDiv);

      this.hideOrShowAddress("show", parentDiv, address);

      this.setCurrentState(this.state.crypto_view, true, this.state.add_address, null, null); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name
    }
  }

  handleAddressFormChange = (event) => {
    
    let target = event.target;
    let parentDiv = target.parentElement.parentElement;

    let users_cryptos_id = target.getAttribute("data-id");
    let current_crypto_name = target.getAttribute("data-name");


    if (this.state.add_address) {
      // when add wallet form is hidden then show all coins

      this.hideOrShowCoin("show");

      this.setCurrentState(this.state.crypto_view, this.state.qr, false, null, null); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

    } else {
      // when add wallet address form is shown then hide other coins

      this.hideOrShowCoin("hide", parentDiv);

      this.setCurrentState(this.state.crypto_view, this.state.qr, true, users_cryptos_id, current_crypto_name); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name
    }
  }

  updateCryptos = (event) => {
    event.preventDefault();

    let id = this.state.users_cryptos_id;
    let current_crypto_name = this.state.current_crypto_name.trim();
    let crypto_address = event.target.children[0].value;
    let validAddress = false;

    // coin-address-validator does not list Verge as a supported currency type to validate by currency name so will validate manually
    if (current_crypto_name === "Verge" && crypto_address.indexOf(" ") === -1 && crypto_address[0] === "D" && crypto_address.length === 34) {
      validAddress = true;

    } else if (crypto_address > 20) {
      // use coin-address-validator to validate the crypto address for the specific crypto selected
      validAddress = coinAddressValidator.validate(crypto_address, current_crypto_name)
    } else {
      validAddress = false;
    }

    if (validAddress) {

      this.updateCryptoTable(id, crypto_address).then(res => {
        // update users crypto wallet address in database

        let { user_info, user_crypto, crypto_view, add_address } = res;
        this.setState({ user_info, user_crypto, crypto_view, add_address });
        document.querySelector("#togBtn").checked = false;

        this.hideOrShowCoin("show");
      })

    } else {
      event.target.children[0].value = "Invalid Address";
    }

  }

  // update database with users new added wallet address
  async updateCryptoTable(id, crypto_address) {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, crypto_address })
    };

    const data = await fetch("http://localhost:3001/profile/addAddress?_method=PUT", settings)
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(e => {
        return e
      });

    const userProfileData = await fetch("http://localhost:3001/profile");
    const user_info = await userProfileData.json();

    const userCryptoData = await fetch("http://localhost:3001/profile/crypto");
    const user_crypto = await userCryptoData.json();
    const crypto_view = await "owned";
    const add_address = await false;

    return { user_info, user_crypto, crypto_view, add_address };

  }



  componentDidMount() {

    Promise.all([
      fetch("http://localhost:3001/profile"),
      fetch("http://localhost:3001/profile/crypto")
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([user_info, user_crypto]) => this.setState({
        user_info,
        user_crypto
      }));

  }


  render() {
    console.log(this.state);
    // console.log(this.props.location.pathname);
    // console.log(this.props.match.params); 

    return (
      <div className="userProfile text-center">
        {this.state.user_info.map((x) =>
          <div id="profile" data-id={x.id} className="p-3 pb-0 ml-3 d-flex flex-column">
            {(this.state.user_info.photo === undefined)
              ? <i className="fas fa-user-circle my-2 py-4 px-1 shaded"></i>
              : <img src={this.state.user_info.photo}></img>
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

          <label className="switch"><input type="checkbox" id="togBtn" onChange={this.handleToggleChange} /><div className="slider round"><span className="own">OWNED</span><span className="interest">INTERESTED</span></div></label>
          <div className="cryptoWallet">
            {(this.state.crypto_view === "interested")
              ? this.state.user_crypto.map((y) =>
                <div>
                  {
                    (y.crypto_address === null)
                      ? <div className="mx-1 my-2 cryptos">
                        {/* <p>{y.crypto_symbol}</p> */}
                        <a className="blueText cryptoText" href={y.crypto_link} target="_blank">{y.crypto_metadata_name}</a>
                        <br></br>
                        <img className="cryptoImage" data-name={y.crypto_metadata_name} src={y.crypto_logo} data-id={y.id} onClick={this.handleAddressFormChange}></img>
                      </div>
                      : null
                  }

                </div>

              )
              : this.state.user_crypto.map((y) =>
                <div>
                  {
                    (y.crypto_address !== null)
                      ? <div className="mx-1 my-2 cryptos">
                        <a className="blueText cryptoText" href={y.crypto_link} target="_blank">{y.crypto_metadata_name}</a>
                        <br></br>
                        <img className="cryptoImage" data-name={y.crypto_metadata_name} data-address={y.crypto_address} data-id={y.id} src={y.crypto_logo} onClick={this.handleQRChange}></img>
                      </div>
                      : null
                  }
                </div>
              )
            }
            {this.state.add_address &&
              <div className="addressForm d-flex flex-column">
                <form id="addAddressForm" onSubmit={this.updateCryptos}>
                  <input id="addressFormInput" type="text" name="crypto_address" placeholder="Enter address" />

                  <button className="addAddressButton btn btn-outline-primary btn-sm my-2">Add Address</button>
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
