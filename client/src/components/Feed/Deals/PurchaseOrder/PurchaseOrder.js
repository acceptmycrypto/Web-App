import React from "react";
import "./PurchaseOrder.css";
import Select from "react-select";

const PurchaseOrder = props => {
  return (
    <div>
      <form>
        <div class="form-group">
        <label className="text-capitalize" for="select_crypto">Select the Cryptocurrency to pay with</label>
        <Select
        id="select_crypto"
        defaultValue={props.cryptos[1]}
        onChange={props.selectCrypto}
        options={props.cryptos}
      />
        </div>
      </form>
    </div>
  );
};

export default PurchaseOrder;
