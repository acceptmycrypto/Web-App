import React from "react";
import "./ShipOrder.css";

const ShipOrder = props => {
  return (
    <div>
      <form>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="fullname"
            placeholder="Enter Full Name"
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter Address"
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter Postal Code"
          />
        </div>

         <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter City"
          />
        </div>

        <select
          class="custom-select mr-sm-2"
          id="select-color"
        >
          <option selected>Select State</option>
          <option value="1">Blue</option>
          <option value="2">Red</option>
          <option value="3">White</option>
        </select>
      </form>
    </div>
  );
};

export default ShipOrder;
