import React, { Component } from "react";
import { _loadDealItem } from "../../../../services/DealServices";
import "./DealItem.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import StepZilla from "react-stepzilla";
import CustomizeOrder from "../CustomizeOrder";
import ShipOrder from "../ShipOrder";
import PurchaseOrder from "../PurchaseOrder";
import Select from 'react-select';

class DealItem extends Component {
  constructor() {
    super();

    this.state = {
      dealItem: null,
      acceptedCryptos: null
    };
  }

  //load deal item
  componentDidMount() {
    //return the param value
    const { deal_name } = this.props.match.params;


    return _loadDealItem(deal_name).then(dealItem => {
      let venue_name = dealItem[0].venue_name;
      let acceptedCryptos = dealItem[1][venue_name];

      console.log(dealItem);
      this.setState({
        dealItem: dealItem[0],
        acceptedCryptos
      });
    });
  }

  render() {

    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ];
    
    const steps = [
      { name: "Customizing", component: <CustomizeOrder /> },
      { name: "Shipping", component: <ShipOrder /> },
      { name: "Payment", component: <PurchaseOrder cryptos={this.state.acceptedCryptos}/> }
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
          <div className="deal-header" />

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
