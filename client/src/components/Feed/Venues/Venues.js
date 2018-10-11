import React, { Component } from 'react';
import './Venues.css';

class Venues extends Component {
  constructor() {
    super();

    this.state = {
      deals: []
    };
  }

  componentDidMount() {
    return fetch('http://localhost:3001/api/deals')
      .then(res => res.json())
      .then(resultingJSON => {
        this.setState({ deals: resultingJSON });
      });
  }

  render() {
    console.log(this.state.deals);
    return (
      <div>
        <div className="row">
          {this.state.deals.map(deal => (
            <div key={deal.id} className="col-sm-4 deal">
              <a href="#">
                <div className="card">
                  <div className="card-body">
                    <img
                      className="card-img-top"
                      src={deal.deal_image}
                      alt="deal"
                    />
                    <h5 className="card-title">{deal.deal_name}</h5>
                    <p class="card-text">{deal.deal_description}</p>
                    <div>Pay in dollar: ${deal.pay_in_dollar}</div>
                    <div>Pay in crypto: ${deal.pay_in_crypto}</div>
                    <div>Offered by: {deal.venue_name}</div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Venues;
