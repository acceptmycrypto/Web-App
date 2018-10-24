import React from "react";
import "./ProfileCard.css";

const ProfileCard = props => {
    return (
        <div>
            {props.user_info.map((x) =>
                <div id="profile" data-id={x.id} className="p-3 pb-0 ml-3 d-flex flex-column">
                    {(props.user_info.photo === undefined)
                        ? <i className="fas fa-user-circle my-2 py-4 px-1 shaded"></i>
                        : <img src={props.user_info.photo}></img>
                    }

                    {/* <img id="responsive" data-id={x.id} clasName="my-2 justify-content-center" src={this.state.src} alt="" /> */}
                    <h5 className="my-2 blueText">{x.username}</h5>
                    <h5 className="my-2 capitalize blueText">{x.first_name}  {x.last_name}</h5>
                    <h5 className="my-2 blueText"> <i className="fas fa-map-marker-alt mr-1"></i>  {x.user_location}</h5>
                    <h5 className="my-2 blueText"> <i className="fas fa-envelope mr-1"></i> <a className="blueText" href={`mailto:${x.email}`}>{x.email}</a></h5>
                    <h5 className="my-2 font-italic blueText">{x.bio}</h5>
                </div>
            )}
        </div>
    );
}


export default ProfileCard;