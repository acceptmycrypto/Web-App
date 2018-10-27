import React from 'react';
import './Notification.css';


class Notification extends React.Component {
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
        <div  className="dropdown_notif">
	        
            <i className="fas fa-bell button" onClick={this.showDropdownMenu}></i>
            <span className="num_notif">4</span>
          
          { this.state.displayMenu ? (
          <ul className="ul_notif">
            <li><a className="active_notif" href="/notifications">Notification Placeholder</a></li>
            <li><a className="all_notif" href="/">All Notifications</a></li>
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

export default Notification;
