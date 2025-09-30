import "./App.css";
import Header from "./components/Header";
import PropertiesList from "./components/PropertiesList";
import SingleProperty from "./components/SingleProperty";
import UsersList from "./components/UsersList";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<SingleProperty />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </div>
  );
}

export default App;
