import React from "react";

import UsersItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";

import "./UsersList.css";

function UsersList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found!</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UsersItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
}

export default UsersList;
