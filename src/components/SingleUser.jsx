import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SingleUser.css";
import "../PropertyList.css";

function SingleUser({ setSelectedUser }) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [userProperties, setUserProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [errorProperties, setErrorProperties] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((response) => {
        const userData = response.data.user;
        setUser(userData);
        setSelectedUser(userData);
        setLoadingUser(false);

        return axios.get("/api/properties");
      })
      .then((response) => {
        const allProperties = response.data.properties;
        const hostedProperties = allProperties.filter(
          (property) => property.host_id === Number(id)
        );
        setUserProperties(hostedProperties);
        setLoadingProperties(false);
      })
      .catch(() => {
        setErrorUser("Failed to load user");
        setLoadingUser(false);
        setErrorProperties("Failed to load properties");
        setLoadingProperties(false);
      });
  }, [id, setSelectedUser]);

  if (loadingUser || loadingProperties) return <div>Loading...</div>;
  if (errorUser || errorProperties)
    return <div>{errorUser || errorProperties}</div>;

  return (
    <div className="single-user">
      <div className="single-user-info-box">
        <div className="user-info">
          <h2>
            {user.first_name} {user.surname}
          </h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone_number}</p>
        </div>
        <img
          src={user.avatar}
          alt={`${user.first_name}'s avatar`}
          className="single-user-avatar"
        />
      </div>

      <div className="user-properties-section">
        <h3>{user.first_name}'s Properties:</h3>
        <div className="property-list">
          <ul>
            {userProperties.map((property) => (
              <li key={property.property_id}>
                <img src={property.image_url} alt={property.name} />
                <p className="property-name">{property.name}</p>
                <p>
                  {property.location} &nbsp;&middot;&nbsp; £
                  {property.price_per_night} per night
                </p>
                <a
                  href={`/properties/${property.property_id}`}
                  className="property-view"
                >
                  View Property
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
