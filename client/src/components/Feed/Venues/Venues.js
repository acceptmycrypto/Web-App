import React, { Component } from 'react';
import './Venues.css';

class Venues extends Component {
  constructor() {
    super();

    this.state = {
      deals: [],
      cryptosAccepted: null
    };
  }

  //Another way to fetch api with promise using es6 syntax so we can call multiple api routes
  async componentDidMount() {
    const dealsList = await fetch("http://localhost:3001/api/deals");
    const deals = await dealsList.json();

    const venuesList = await fetch("http://localhost:3001/api/venues_cryptos");
    const cryptosAccepted = await venuesList.json();
    this.setState({deals, cryptosAccepted});
  }

  showAcceptedCryptos = (venue) => {
    let cryptocurrencies;
    for (let venueKey in this.state.cryptosAccepted) {
      if (venue === venueKey) {
        cryptocurrencies = this.state.cryptosAccepted[venueKey]
      }
    }
    return cryptocurrencies.join(', ');
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.state.deals.map(deal => (
            <div key={deal.id} className="col-sm-4 deal">
              <a href="#">
                <div className="card">
                  <div className="card-body">
                    <img
                      className="card-img-top"
                      src={deal.deal_image}
                      alt="deal"
                    />
                    <h5 className="card-title">{deal.deal_name}</h5>
                    <p class="card-text">{deal.deal_description}</p>
                    <div>Pay in dollar: ${deal.pay_in_dollar}</div>
                    <div>Pay in crypto: ${deal.pay_in_crypto}</div>
                    <div>Offered by: {deal.venue_name}</div>
                    <div>Accepted: {this.showAcceptedCryptos(deal.venue_name)}</div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Venues;
