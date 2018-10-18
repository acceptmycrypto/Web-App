import React from "react";
import "./Checkout.css";

const Checkout = props => (
  <div>
    <h1>Scan QR code or copy/paste payment address into wallet</h1>
    <p>Please send {props.transactionInfo.amount} {props.paidIn} to the below address</p>
    <img src={props.transactionInfo.qrcode_url} alt="QR code"/>
    <p>AcceptMyCrpto Payment Address: {props.transactionInfo.address}</p>
    <p>If no payment received in {props.transactionInfo.timeout} seconds, the purchase order will be canceled.</p>
  </div>
);

export default Checkout;
