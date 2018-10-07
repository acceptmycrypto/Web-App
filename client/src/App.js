import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Crypto from './components/Crypto';
import FeedVenues from './components/Feed/Venues';
import FeedFriends from './components/Feed/Friends';
import FeedTransactions from './components/Feed/Transactions';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Signup</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/crypto">Crypto</Link>
            </li>
            <li>
              <Link to="/feed/venues">Feed > Venues</Link>
            </li>
            <li>
              <Link to="/feed/friends">Feed > Friends</Link>
            </li>
            <li>
              <Link to="/feed/transactions">Feed > Transactions</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/crypto" component={Crypto} />
          <Route path="/feed/venues" component={FeedVenues} />
          <Route path="/feed/friends" component={FeedFriends} />
          <Route path="/feed/transactions" component={FeedTransactions} />
        </div>
      </Router>
    );
  }
}

export default App;
