import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Modal from '../../UI/Modal/Modal'
import Checkout from '../../Checkout/Checkout'
import CryptoRankings from '../../CryptosRanking';
import { _loadDeals } from "../../../services/DealServices";
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
  componentDidMount() {
    return _loadDeals()
      .then(result => this.setState({
        deals: result.deals,
        cryptosAccepted: result.cryptosAccepted
      }))
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

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100)
  }

  render() {
    return (
      <div>
        <Modal showModal={this.state.purchasing} closeModal={this.closePaymentHander}>
          {this.state.purchasing ? <Checkout transactionInfo={this.state.transactionInfo} paidIn={this.state.paidIn}/>: null}
        </Modal>
        <div className="venues-content">
          <CryptoRankings />

          <div id="right" className="grid">
            {this.state.deals.map(deal => (
              <div key={deal.id} className="deal">
                <Link to={`/feed/deals/${deal.deal_name}`} style={{ textDecoration: 'none', color: "black" }} >


                    <div className="deal-info">
                      <img className="deal-image" src={deal.deal_image} alt="deal"/>
                      <div className="mt-1">{deal.deal_name}</div>
                      <small className="deal-description">{deal.deal_description}</small>
                      <div><small>Offered by: {deal.venue_name}</small></div>
                    </div>

                    <div className="deal-price">
                      <div className="price-differ">
                        <div>
                          <div className="purchase-method">Dollar</div>
                          <strike>${deal.pay_in_dollar}</strike>
                        </div>
                        <div>
                          <div className="purchase-method">Cryptocurrency</div>
                          <strong className="pay_in_crypto">${deal.pay_in_crypto}
                          <small className="discount">{this.convertToPercentage(deal.pay_in_dollar, deal.pay_in_crypto)}% OFF</small>
                          </strong>
                        </div>
                      </div>
                    </div>

                      {/* <h5 className="card-title">{deal.deal_name}</h5>
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
                      </form> */}

                </Link>
              </div>

            ))}
          </div>

        </div>
      </div>
    );
  }
}

export default Deals;
