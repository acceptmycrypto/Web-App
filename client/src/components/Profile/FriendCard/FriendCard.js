import React from "react";
import "./FriendCard.css";

const FriendCard = props => {
    return (
        <div className="matchedFriends p-1 text-center w-100">
            <h5 id="friendHeader" className="blueText header font-15">FRIENDS</h5>
            <div className="d-flex flex-row justify-content-around">
              {props.friends_array.map((friend, i) =>
                <div className="mx-1 my-2 d-flex flex-column m-3" key={"friend" + i}>
                      {(friend.photo.indexOf("fa-user") !== -1)
                          ? <i className={'fas my-2 p-2 user-icon-shaded-small ' + friend.photo}></i>
                          : <img src={friend.photo}></img>
                      }
                      <p>{friend.username}</p>
                 </div>
              )}
            </div>
        </div>
    );
}


export default FriendCard;