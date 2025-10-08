import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SingleUser.css";

function SingleUser({ setSelectedUser }) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((response) => {
        const userData = response.data.user;
        setUser(userData);
        setSelectedUser(userData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load user");
        setLoading(false);
      });
  }, [id, setSelectedUser]);

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="single-user">
      <div className="user-info">
        <p className="single-user-name">
          {user.first_name} {user.surname}
        </p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone_number}</p>
      </div>
      <img
        src={user.avatar}
        alt={`${user.first_name}'s avatar`}
        className="single-user-avatar"
      />
    </div>
  );
}

export default SingleUser;
