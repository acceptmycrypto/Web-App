import React, { Component } from "react";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";

import SignUp from "./components/Home/SignUp";
import SignIn from "./components/Home/SignIn";

import Profile from "./components/Profile/UserProfile";
import Crypto from "./components/Crypto";
import FeedDeals from "./components/Feed/Deals";
import DealItem from "./components/Feed/Deals/DealItem";
import FeedFriends from "./components/Feed/MatchedFriends";
import FeedTransactions from "./components/Feed/Transactions";
import Layout from "./components/Layout";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Switch>
        <div>
          <Layout />
            <Route exact path="/" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/profile" component={Profile} />
            <Route path="/crypto" component={Crypto} />

            <Route exact path="/feed/deals" component={FeedDeals} />
            <Route path='/feed/deals/:deal_name' component={DealItem}/>

            <Route path="/feed/friends" component={FeedFriends} />
            <Route path="/feed/transactions" component={FeedTransactions} />
          <Layout />
        </div>
      </Switch>
    );
  }
}

export default App;
