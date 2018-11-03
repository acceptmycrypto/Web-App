import React, { Component } from "react";
import "./MatchedFriends.css";
import CryptoRankings from "../../CryptosRanking";
import FeedCard from "../FeedCard";
import Layout from "../../Layout";

class MatchedFriends extends Component {
  constructor() {
    super();

    this.state = {
      friends_transactions: []
    };
  }

  async componentDidMount() {

    const data = await fetch("http://localhost:3001/matchedFriends/feed");
    const friends_transactions = await data.json(); //convert to JSON format

    this.setState({ friends_transactions });
  }

  render() {
    return (
      <div>
        <Layout/>
        <div className="transactions-content">
          <CryptoRankings />
          <div className="w-50">
            <FeedCard transactions={this.state.friends_transactions}/>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchedFriends;