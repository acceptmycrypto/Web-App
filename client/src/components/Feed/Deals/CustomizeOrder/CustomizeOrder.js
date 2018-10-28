import React from "react";
import "./CustomizeOrder.css";

const CustomizeOrder = props => {
  return (
    <div>
      <form class="form-group">
        <select
          class="custom-select my-2 mr-sm-2"
          id="select-size"
        >
          <option selected>Select Size</option>
          <option value="1">Small</option>
          <option value="2">Medium</option>
          <option value="3">Large</option>
        </select>

        <select
          class="custom-select my-3 mr-sm-2"
          id="select-color"
        >
          <option selected>Select Color</option>
          <option value="1">Blue</option>
          <option value="2">Red</option>
          <option value="3">White</option>
        </select>
      </form>
    </div>
  );
};

export default CustomizeOrder;
