import React from "react";
import "./PurchaseOrder.css";
import Select from "react-select";

const PurchaseOrder = props => {
  return (
    <div>
      <form onSubmit={props.SubmitPayment}>
        <div class="form-group">
        <label className="text-capitalize" htmlFor="select_crypto">Select the Cryptocurrency to pay with</label>
        <Select
        id="select_crypto"
        defaultValue={props.cryptos[1]}
        onChange={props.selectCrypto}
        options={props.cryptos}
      />
        </div>
        <div id="submit_payment">
        <button>Send Your Payment</button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseOrder;
