import React, { Component } from 'react';
import Modal from '../../UI/Modal/Modal'
import Checkout from '../../Checkout/Checkout'
import CryptoRankings from '../../CryptosRanking';
import './Deals.css';

class Deals extends Component {
  constructor() {
    super();

    this.state = {
      deals: [],
      cryptosAccepted: null,
      transactionInfo: null,
      paidIn: "",
      purchasing: false
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
    console.log(cryptocurrencies);
    return cryptocurrencies
    //return two arrays. First array is the crypto full name. Second array is the crypto symbol
  }

  createPaymentHandler = event => {
    event.preventDefault();
    //info needed to insert into user_purchases table
    //deal_id, crypto_name, amount, and user_id

    let selectEle = event.target.children[2];
    let crypto_name = selectEle.options[selectEle.selectedIndex].value;
    let deal_id = event.target.children[3].getAttribute('data-dealid');
    let user_id = '4' //hardcoded user_id for now. Need to grab user_id dynamically
    let amount = event.target.children[3].getAttribute('data-amount');

    return fetch('http://localhost:3001/checkout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ crypto_name, deal_id, user_id, amount })
    })
      .then(res => res.json())
      .then(transactionInfo => {
        this.setState(
          { transactionInfo,
            paidIn: crypto_name,
            purchasing: true
          });
        console.log(this.state.transactionInfo);
      });
  };

  closePaymentHander = () => {
    this.setState({purchasing: false})
  }

  render() {
    return (
      <div>
        <Modal showModal={this.state.purchasing} closeModal={this.closePaymentHander}>
          {this.state.purchasing ? <Checkout transactionInfo={this.state.transactionInfo} paidIn={this.state.paidIn}/>: null}
        </Modal>
        <div className="venues-content">
          <CryptoRankings />
          <div id="right" className="row column">
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
                      <div>Accepted: {this.showAcceptedCryptos(deal.venue_name)[0].join(', ')}</div>
                      <form onSubmit={this.createPaymentHandler}>
                        <label htmlFor="crypto_payment">Select Your crypto payment</label> <br/>
                        <select id="selectCrypto">
                          {this.showAcceptedCryptos(deal.venue_name)[1].map(crypto => {
                            return <option key={crypto} className="crypto_payment" value={crypto}>{crypto}</option>
                          })}
                        </select>
                        <button data-dealid={deal.id} data-amount={deal.pay_in_crypto} className="btn btn-primary btn-sm">Pay With My Crypto</button>
                      </form>
                    </div>
                  </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Deals;
