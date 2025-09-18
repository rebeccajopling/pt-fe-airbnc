import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PropertiesList from "./components/PropertiesList";
import SingleProperty from "./components/SingleProperty";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Routes>
        <Route path="/" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<SingleProperty />} />
      </Routes>
    </div>
  );
}

export default App;
