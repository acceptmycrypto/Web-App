import React from "react";
import "./Checkout.css";

const Checkout = props => (
  <div>

    <p>Scan QR code or copy/paste payment address into wallet</p>
    <p>Please send <strong>{props.showTransaction.amount} {props.showPaidIn}</strong> to the below address</p>

    <div className="send-payment">
      <div>
        <img src={props.showTransaction.qrcode_url} alt="QR code"/>
      </div>

      <div>
        <p>AcceptMyCrpto Payment Address:</p>
        <p>{props.showTransaction.address}</p>
        <p>If no payment received in {props.showTransaction.timeout} seconds, the purchase order will be canceled.</p>
      </div>
    </div>

  </div>
);

export default Checkout;
