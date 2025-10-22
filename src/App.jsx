import "./App.css";
import Header from "./components/Header";
import PropertiesList from "./components/PropertiesList";
import SingleProperty from "./components/SingleProperty";
import UsersList from "./components/UsersList";
import SingleUser from "./components/SingleUser";
import { Routes, Route } from "react-router";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/1");
        setSelectedUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Header selectedUser={selectedUser} />
      <Routes>
        <Route path="/" element={<PropertiesList />} />
        <Route
          path="/properties/:id"
          element={<SingleProperty selectedUser={selectedUser} />}
        />
        <Route path="/users" element={<UsersList />} />
        <Route
          path="/users/:id"
          element={<SingleUser setSelectedUser={setSelectedUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
