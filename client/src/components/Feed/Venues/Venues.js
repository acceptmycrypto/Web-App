import React, { Component } from 'react';
import Modal from '../../UI/Modal/Modal'
import Checkout from '../../Checkout/Checkout'
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
    return cryptocurrencies
  }

  createPayment = event => {
    event.preventDefault();
    let selectEle = event.target.children[2];
    let crypto_name = selectEle.options[selectEle.selectedIndex].value;
    
    console.log(crypto_name);
    //need to make a post call

    return fetch('http://localhost:3001/checkout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ crypto_name })
    })
  };

  render() {
    return (
      <div>
        <Modal >
          <Checkout />
        </Modal>
        <div className="row">
          {this.state.deals.map(deal => (
            <div key={deal.id} className="col-sm-4 deal">

                <div className="card">
                  <div className="card-body">
                    <img
                      className="card-img-top"
                      src={deal.deal_image}
                      alt="deal"
                    />
                    <h5 className="card-title">{deal.deal_name}</h5>
                    <p className="card-text">{deal.deal_description}</p>
                    <div>Pay in dollar: ${deal.pay_in_dollar}</div>
                    <div>Pay in crypto: ${deal.pay_in_crypto}</div>
                    <div>Offered by: {deal.venue_name}</div>
                    <div>Accepted: {this.showAcceptedCryptos(deal.venue_name).join(', ')}</div>
                    <form onSubmit={this.createPayment}>
                      <label htmlFor="crypto_payment">Select Your crypto payment</label> <br/>
                      <select id="selectCrypto">
                        {this.showAcceptedCryptos(deal.venue_name).map(crypto => {
                          return <option key={crypto} className="crypto_payment" value={crypto}>{crypto}</option>
                        })}
                      </select>
                      <button className="btn btn-primary btn-sm">Pay With My Crypto</button>
                    </form>
                  </div>
                </div>

            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Venues;
