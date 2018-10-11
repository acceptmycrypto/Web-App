import React, { Component } from 'react';
import './Venues.css';

class Venues extends Component {
  constructor() {
    super();

    this.state = {
      deals: []
    };
  }

  componentDidMount() {
    return fetch('http://localhost:3001/api/deals')
      .then(res => res.json())
      .then(resultingJSON => {
        this.setState({ deals: resultingJSON });
      });
  }

  render() {
    console.log(this.state.deals);
    return (
      <div>
        {this.state.deals.map(deal => (
          <div key={deal.id} className="deal">
            <div>{deal.deal_name}</div>
            <div>{deal.deal_description}</div>
            <img src={deal.deal_image} alt="deal"/>
            <div>Pay in dollar: ${deal.pay_in_dollar}</div>
            <div>Pay in crypto: ${deal.pay_in_crypto}</div>
            <div>Offered by: {deal.venue_name}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Venues;
