import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";

import axiosWithAuth from "../utils/axios-auth";

function FriendsList(props) {
  const { history } = props;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/friends")
      .then(({ data }) => setFriends(data))
      .catch(err => console.dir(err));
  }, []);

  if (!friends.length) return <div>Loading...</div>;

  return (
    <div className="friends-list">
      <header>
        <Button color="primary" onClick={() => history.push("/friends/add")}>
          Add Friend
        </Button>
        <h2>Friends</h2>
      </header>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {friends.map(friend => (
            <tr key={friend.id}>
              <td>{friend.name}</td>
              <td>{friend.age}</td>
              <td>{friend.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FriendsList;
