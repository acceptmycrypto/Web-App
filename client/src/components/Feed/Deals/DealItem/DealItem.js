import React, { Component } from "react";
import "./DealItem.css";

class DealItem extends Component {
  constructor() {
    super();

    this.state = {
      dealItem: []
    };
  }

  async componentDidMount () {
    //return the param value
    const { deal_name } = this.props.match.params;

    const dealItemArr = await fetch(`http://localhost:3001/api/deals/${deal_name}`);
    const dealItem = await dealItemArr.json();

    this.setState({ dealItem });
    console.log("My Item: ", dealItem);
  }

  render() {
    return (
      <div>
       {this.state.dealItem.map(item => (
        <ul key={item.id}>
          <li>{item.deal_name}</li>
          <li>{item.deal_description}</li>
          <li>{item.deal_image}</li>
          <li>{item.pay_in_dollar}</li>
          <li>{item.pay_in_crypto}</li>
          <li>{item.venue_name}</li>
          <li>{item.venue_link}</li>
        </ul>
       ))}
      </div>
    );
  }
}

export default DealItem;
