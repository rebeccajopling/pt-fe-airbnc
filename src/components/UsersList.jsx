import React, { useEffect, useState } from "react";
import BackButton from "./BackButton";
import axios from "axios";

function UsersList() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users`)
      .then((response) => {
        const usersList = response.data.users.map(
          ({ user_id, first_name, surname, is_host, avatar }) => ({
            user_id,
            first_name,
            surname,
            is_host,
            avatar,
          })
        );
        setAllUsers(usersList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Something went wrong while fetching users.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="users-list">
      <BackButton />
      <ul>
        {allUsers.map((user) => {
          let hostLabel = "";
          if (user.is_host) {
            hostLabel = " (Host)";
          }

          return (
            <li key={user.user_id}>
              <p>
                {user.first_name} {user.surname}
                {hostLabel}
              </p>
              <img
                src={user.avatar}
                alt={`${user.first_name}'s avatar`}
                className="user-avatar"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UsersList;
