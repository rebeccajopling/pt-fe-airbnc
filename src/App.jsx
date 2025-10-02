import "./App.css";
import Header from "./components/Header";
import PropertiesList from "./components/PropertiesList";
import SingleProperty from "./components/SingleProperty";
import UsersList from "./components/UsersList";
import SingleUser from "./components/SingleUser";
import { Routes, Route } from "react-router";
import React, { useState } from "react";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <Header selectedUser={selectedUser} />
      <Routes>
        <Route path="/" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<SingleProperty />} />
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
