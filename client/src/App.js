import React, { Component } from "react";
import { BrowserRouter as Switch, Route, Link, Redirect } from "react-router-dom";

import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signup/SignIn";

import Profile from "./components/Profile/UserProfile";
import Friend from "./components/Profile/FriendProfile";
import Settings from "./components/UserSettings/Settings"
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
            <Route exact path="/profile" component={Profile} />

            <Route path="/profile/:id" component={ (props) => < Friend {...props}/>} />

            {/* Redirects to profile page when id matches user id, hard coded user id 1 for now */}
            <Redirect from='profile/1' to='/profile' />
            <Route path ="/settings" component={Settings} />
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
