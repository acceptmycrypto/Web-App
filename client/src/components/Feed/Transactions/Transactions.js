import React, { Component } from "react";
import "./Transactions.css";
import CryptoRankings from "../../CryptosRanking";
import FeedCard from "../FeedCard";

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
      <div className="transactions-content">
        <CryptoRankings />
        <FeedCard transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default Transactions;
