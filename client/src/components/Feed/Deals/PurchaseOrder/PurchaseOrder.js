import React from "react";
import "./PurchaseOrder.css";

const PurchaseOrder = props => {
  return (
      <div>
         {/* <form onSubmit={this.createPaymentHandler}>
          <label htmlFor="crypto_payment">Select Your crypto payment</label> <br/>
          <select id="selectCrypto">
            {this.showAcceptedCryptos(deal.venue_name)[1].map(crypto => {
              return <option key={crypto} className="crypto_payment" value={crypto}>{crypto}</option>
            })}
          </select>
          <button data-dealid={deal.id} data-amount={deal.pay_in_crypto} className="btn btn-primary btn-sm">Pay With My Crypto</button>
        </form> */}
        testing checkout page
       {console.log(props.cryptos)}
      </div>
  );
}


export default PurchaseOrder;