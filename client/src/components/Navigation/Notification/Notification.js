import React from "react";
import { Link } from "react-router-dom";
import "./Notification.css";

const Notification = props => {
  return (
      <div className="box">
        <div className="notifications">
            <i className="fas fa-bell"></i>
            <span className="num">4</span>
            <ul>
                <li>
                    <span className='text'>Place Holder</span>
                </li>
            </ul>
        </div>
      </div>
  );
};

export default Notification;
