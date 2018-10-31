import React, { Component } from "react";
import { _loadDealItem } from "../../../../services/DealServices";
import "./DealItem.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import StepZilla from "react-stepzilla";
import CustomizeOrder from "../CustomizeOrder";
import ShipOrder from "../ShipOrder";
import PurchaseOrder from "../PurchaseOrder";

class DealItem extends Component {
  constructor() {
    super();

    this.state = {
      dealItem: null,
      acceptedCryptos: null,
      selectedOption: {value: "BTC", label: "Bitcoin (BTC)", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"}
    };
  }

  //load deal item
  componentDidMount() {
    //return the param value
    const { deal_name } = this.props.match.params;

    return _loadDealItem(deal_name).then(dealItem => {
      let venue_name = dealItem[0].venue_name;
      let acceptedCryptos = dealItem[1];

      this.setState({
        dealItem: dealItem[0],
        acceptedCryptos
      });
    });
  }

  handleSelectedCrypto = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  cryptoOptions() {
    let options = [];
    this.state.acceptedCryptos.map(crypto => {

      let optionObj = {};
      optionObj.value = crypto.crypto_symbol;
      optionObj.label = crypto.crypto_name + " " + "(" + crypto.crypto_symbol + ")";
      optionObj.logo = crypto.crypto_logo;
      options.push(optionObj);
    })

    return options
  }

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100)
  }

  render() {

    const steps = [
      { name: "Customizing", component: <CustomizeOrder /> },
      { name: "Shipping", component: <ShipOrder /> },
      { name: "Payment", component: <PurchaseOrder
                                      cryptos={this.state.dealItem && this.cryptoOptions()}
                                      cryptoSelected={this.state.selectedOption}
                                      selectCrypto={this.handleSelectedCrypto}/> }
    ];

    return (
      <div>
        {/* {this.state.dealItem.map(item => (
        <ul key={item.id}>
          <li>{item.deal_name}</li>
          <li>{item.deal_description}</li>
          <li>{item.deal_image}</li>
          <li>{item.pay_in_dollar}</li>
          <li>{item.pay_in_crypto}</li>
          <li>{item.venue_name}</li>
          <li>{item.venue_link}</li>
        </ul>
       ))} */}
        <div className="deal-container">
          <div className="deal-header">
            <div className="deal-item-header">
            <div className="deal-item-name">
              <strong>{this.state.dealItem && this.state.dealItem.deal_name}</strong> <br/>
              <small> Offered By: {this.state.dealItem && this.state.dealItem.venue_name}</small>
            </div>

            <div className="deal-item-cost">
              <strong>Pay in Crypto:  ${this.state.dealItem && this.state.dealItem.pay_in_crypto}</strong>  <small className="deal-item-discount">
              {this.state.dealItem && this.convertToPercentage(this.state.dealItem.pay_in_dollar, this.state.dealItem.pay_in_crypto)}% OFF</small> <br/>
              <small>Pay in Dollar:  ${this.state.dealItem && this.state.dealItem.pay_in_dollar} <br/></small>
            </div>

            </div>
            <div className="deal-item-summary">
              <div className="customize-item-summary">
                Customize
              </div>

              <div className="customize-item-shipping">
                Shipping
              </div>

              <div className="customize-item-payment">
                Payment
              </div>
            </div>
          </div>

          <div className="deal-main-info">
            <div className="deal-images-container">
              <Carousel
                className="react-carousel"
                width={"55%"}
                showStatus={false}
              >
                {this.state.dealItem &&
                  this.state.dealItem.deal_image.map(img => (
                    <div className="deal-item-image">
                      <img src={img} />
                    </div>
                  ))}
              </Carousel>
            </div>

            <div className="deal-checkout-container">
              <div className="step-progress">
                <StepZilla steps={steps}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DealItem;
