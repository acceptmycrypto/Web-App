import React from 'react';
import './style.css';


class Dropdown extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};

showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  render() {
    return (
        <div  className="dropdown" style = {{background:"red",width:"200px"}} >
         <div className="button" onClick={this.showDropdownMenu}> Cryptos of Interest </div>

          { this.state.displayMenu ? (
          <ul>
         <li><a className="active" href="#Create Page">Bitcoin (BTC)</a></li>
         <li><a href="#Manage Pages">Bitcoin Cash</a></li>
         <li><a href="#Create Ads">LiteCoin (LTC)</a></li>
         <li><a href="#Manage Ads">DogeCoin</a></li>
         <li><a href="#Activity Logs">XRP</a></li>
         <li><a href="#Setting">Etherium (ETH)</a></li>
         <li><a href="#Log Out">DASH</a></li>
          </ul>
        ):
        (
          null
        )
        }

       </div>

    );
  }
}

export default Dropdown;