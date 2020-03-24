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

  const deleteFriend = id => {
    axiosWithAuth()
      .delete(`/api/friends/${id}`)
      .then(({ data }) => {
        setFriends(data);
      })
      .catch(err => console.dir(err));
  };

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
              <td>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => deleteFriend(friend.id)}
                >
                  delete
                </Button>
                <Button
                  size="sm"
                  onClick={() =>
                    history.push(`/friends/edit/${friend.id}`, friend)
                  }
                >
                  edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FriendsList;
