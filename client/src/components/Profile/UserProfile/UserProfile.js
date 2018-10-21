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

  handleChange = (event) => {
    let target = event.target.checked;

    if (target) {
      this.setState({
        crypto_view: "interested",
        qr: false,
        add_address: false,
        users_cryptos_id: null, 
        current_crypto_name: null
      });
      let surroundingDiv = document.querySelector(".cryptoWallet");
      let allChildren = surroundingDiv.children;
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]

        element.style.display = "flex";

      }

      let address = document.getElementsByClassName("address");

      let qr = document.getElementsByClassName("qr");

      let deleteIcon = document.getElementsByClassName("deleteIcon");


      if (address[0] && qr[0] && deleteIcon[0] && address[0] != undefined && qr[0] != undefined && deleteIcon[0] != undefined) {
        address[0].remove();
        qr[0].remove();
        deleteIcon[0].remove();
      }


    } else {
      this.setState({
        crypto_view: "owned",
        qr: false,
        add_address: false,
        users_cryptos_id: null, 
        current_crypto_name: null
      });
      let surroundingDiv = document.querySelector(".cryptoWallet");
      let allChildren = surroundingDiv.children;
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]
        console.log(element);

        element.style.display = "flex";
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
      let remainingDiv = document.querySelector(".cryptoWallet");

      let qr = document.createElement("img");
      qr.classList.add("qr");
      qr.src = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${address}`;

      let displayAddress = document.createElement("p");
      displayAddress.classList.add("address");
      displayAddress.innerHTML = address;
      remainingDiv.append(qr, displayAddress);
      // remainingDiv.appendChild(displayAddress);



      let icon = document.createElement("i");
      icon.classList.add("fas", "fa-times", "deleteIcon");
      icon.addEventListener("click", this.hideQR);
      icon.classList.add("deleteQR");
      remainingDiv.insertBefore(icon, parentDiv);

      this.setState({
        qr: true,
        users_cryptos_id: null, 
        current_crypto_name: null
      })
    }

  }

  hideQR = (event) => {

    if (this.state.qr) {
      let target = event.target;
      let parentDiv = target.parentElement;

      let allChildren = parentDiv.children;
      console.log(allChildren);

      let address = document.getElementsByClassName("address");
      address[0].remove();
      let qr = document.getElementsByClassName("qr");
      qr[0].remove();
      let deleteIcon = document.getElementsByClassName("deleteIcon");
      deleteIcon[0].remove();

      //note: for loop stops at i = 5 and does not finish and remove the wallet address so have to manually remove with code above 
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]
        element.style.display = "flex";

        this.setState({
          qr: false,
          users_cryptos_id: null, 
          current_crypto_name: null
        })
      }
    }


  }

  showAddressForm = (event) => {
    let target = event.target;
    let parentDiv = target.parentElement.parentElement;
    let surroundingDiv = target.parentElement.parentElement.parentElement;
    let allChildren = surroundingDiv.children;
    let i, j, element;
    let users_cryptos_id = target.getAttribute("data-id");
    let current_crypto_name = target.getAttribute("data-name");

    if (this.state.add_address) {

      for (i = 0; i < allChildren.length; i++) {

        element = allChildren[i]
        element.style.display = "flex";

      }
      this.setState({
        add_address: false,
        users_cryptos_id: null, 
        current_crypto_name: null
      })

    } else {

      for (j = 0; j < allChildren.length; j++) {
        element = allChildren[j]

        if (element != parentDiv) {
          element.style.display = "none";
        }
      }

      this.setState({
        add_address: true,
        users_cryptos_id: users_cryptos_id,
        current_crypto_name: current_crypto_name
      })

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
      validAddress = coinAddressValidator.validate(crypto_address, current_crypto_name)
    } else {
      validAddress = false;
    }

    // console.log(validAddress);

    if (validAddress) {
      // let {user_info, user_crypto, crypto_view} = this.updateCryptoTable(id, crypto_address).then((res)=)

      this.updateCryptoTable(id, crypto_address).then(res => {
        let { user_info, user_crypto, crypto_view, add_address } = res;
        this.setState({ user_info, user_crypto, crypto_view, add_address });
        document.querySelector("#togBtn").checked = false;
        let surroundingDiv = document.querySelector(".cryptoWallet");
        let allChildren = surroundingDiv.children;
        for (let i = 0; i < allChildren.length; i++) {
          let element = allChildren[i]
          console.log(element);

          element.style.display = "flex";
        }

      })
      // this.setState({user_info, user_crypto, crypto_view});




    } else {
      event.target.children[0].value = "Invalid Address";
    }

    // if (validAddress) {
    //   return fetch("http://localhost:3001/profile/addAddress?_method=PUT", {
    //     method: "POST",
    //     headers: {
    //       "Accept": "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ id, crypto_address })
    //   }).then(res => res.json()).then(insertedAddress => {
    //     // console.log(insertedAddress);

    //   })
    // } else {
    //   event.target.children[0].value = "Invalid Address";
    // }

  }

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

    // await console.log(user_info, user_crypto);
    // this.setState({user_info, user_crypto, crypto_view});
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

          <label className="switch"><input type="checkbox" id="togBtn" onChange={this.handleChange} /><div className="slider round"><span className="own">OWNED</span><span className="interest">INTERESTED</span></div></label>
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
                        <img className="cryptoImage" data-name={y.crypto_metadata_name} src={y.crypto_logo} data-id={y.id} onClick={this.showAddressForm}></img>
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
                        <img className="cryptoImage" data-name={y.crypto_metadata_name} data-address={y.crypto_address} data-id={y.id} src={y.crypto_logo} onClick={this.showQR}></img>
                      </div>
                      : null
                  }
                </div>
              )
            }
            {this.state.add_address &&
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
