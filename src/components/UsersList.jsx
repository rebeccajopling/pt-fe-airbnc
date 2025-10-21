import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import "../UsersList.css";

function UsersList() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await axios.get(`/api/users`);
        const usersList = usersResponse.data.users.map(
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
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Something went wrong while fetching users.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ul className="users-list">
        {allUsers.map((user) => {
          let hostLabel = "";
          if (user.is_host) {
            hostLabel = " (Host)";
          }

          return (
            <li key={user.user_id}>
              <Link to={`/users/${user.user_id}`}>
                <img
                  src={user.avatar}
                  alt={`${user.first_name}'s avatar`}
                  className="user-avatar"
                />
                <p>
                  {user.first_name} {user.surname}
                  {hostLabel}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UsersList;
