import React from "react";
import "./FeedCard.css";

const FeedCard = props => {
  return (
    <div className="right">
      {props.transactions.map((transaction, i) => (
        <div key={i} className="feed-card">
          <div className="card-content">
            <div className="user-info">
              <div className="user-icon-background">
                <i class="user-icon fas fa-user-circle" />
              </div>
              <div className="user-name">{transaction.username}</div>
            </div>
            <div className="user-transaction-info">
              <div>
                Purchased {transaction.deal_name} for {transaction.amount}{" "}
                {transaction.crypto_symbol} from {transaction.venue_name}
              </div>
              <div className="timestamp">
                <small>{transaction.date_purchased}</small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedCard;
