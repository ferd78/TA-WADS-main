import "./App.css";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Register from "./pages/Register";
import Reset from "./pages/Reset";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} exact />
        <Route path="/todo" element={<Todo />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
}

export default App;