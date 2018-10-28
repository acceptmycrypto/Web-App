import React, { Component } from "react";
import { _loadDealItem } from "../../../../services/DealServices";
import "./DealItem.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import StepZilla from "react-stepzilla";
import CustomizeOrder from "../CustomizeOrder";
import ShipOrder from "../ShipOrder";
import PurchaseOrder from "../PurchaseOrder";
import { debug } from "util";

class DealItem extends Component {
  constructor() {
    super();

    this.state = {
      dealItem: [],
      acceptedCryptos: []
    };
  }

  //load deal item
  componentDidMount() {
    //return the param value
    const { deal_name } = this.props.match.params;

    return _loadDealItem(deal_name).then(dealItem => {
      debugger
      this.setState({
        dealItem: dealItem[0],
        acceptedCryptos: dealItem[1]
      })

    });
  }

  render() {
    const steps = [
      { name: "Customizing", component: <CustomizeOrder /> },
      { name: "Shipping", component: <ShipOrder /> },
      { name: "Payment", component: <PurchaseOrder /> }
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
        {this.state.dealItem.map(item => (
          <div className="deal-container">
            <div key={item.id} className="deal-header" />

            <div className="deal-main-info">
              <div className="deal-images-container">
                <Carousel
                  className="react-carousel"
                  width={"55%"}
                  showStatus={false}
                >
                  {this.state.dealItem[0].deal_image.map(img => (
                    <div className="deal-item-image">
                      <img src={img} />
                    </div>
                  ))}
                </Carousel>
              </div>

              <div className="deal-checkout-container">

                <div className="step-progress">
                  <StepZilla steps={steps} />
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default DealItem;
