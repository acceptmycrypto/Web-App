import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signup/SignIn";

import Profile from "./components/Profile/UserProfile";
import Crypto from "./components/Crypto";
import FeedVenues from "./components/Feed/Venues";
import FeedFriends from "./components/Feed/MatchedFriends";
import FeedTransactions from "./components/Feed/Transactions";
import Layout from "./components/Layout";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout />
            <Route exact path="/" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/profile" component={Profile} />
            <Route path="/crypto" component={Crypto} />
            <Route path="/feed/venues" component={FeedVenues} />
            <Route path="/feed/friends" component={FeedFriends} />
            <Route path="/feed/transactions" component={FeedTransactions} />
          <Layout />
        </div>
      </Router>
    );
  }
}

export default App;
