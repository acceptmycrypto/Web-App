import React, { Component } from "react";
import "./Transactions.css";
import CryptoRankings from "../../CryptosRanking";

class Transactions extends Component {
  constructor() {
    super();

    this.state = {
      transactions: []
    };
  }

  async componentDidMount() {
    //es6 Promise syntax
    //fetch transactions info
    const data = await fetch(
      "http://localhost:3001/api/transactions/community/payment_received"
    );
    const transactions = await data.json(); //convert to JSON format

    this.setState({ transactions });
  }

  render() {
    return (
      //map through the transactions array and render each transaction's info to the page
      <div className="transactions-content">
        <CryptoRankings />

        <div className="right">
          {this.state.transactions.map((transaction, i) => (
            <div key={i} className="transaction-card">
              <div className="card-content">
                <div className="user-info">
                  <div className="user-icon-background">
                    <i class="user-icon fas fa-user-circle" />
                  </div>
                  <div className="user-name">{transaction.username}</div>
                </div>
                <div className="user-transaction-info">
                  <div>
                    Purchased {transaction.deal_name} for {transaction.amount}{" "}
                    {transaction.crypto_symbol} from {transaction.venue_name}
                  </div>
                  <div className="timestamp"><small>{transaction.date_purchased}</small></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Transactions;
