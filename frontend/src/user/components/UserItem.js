import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar";
import "./UserItem.css";

function UserItem(props) {
  return (
    <li className="user-item">
      <div className="user-item__content">
        <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
        </div>
        <dev className = "user-item__info">
            <h2>
                {props.name}
            </h2>
            <h3> 
                {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'} 
            </h3>
        </dev>
      </div>
    </li>
  );
}

export default UserItem;
