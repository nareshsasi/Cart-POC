import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../src/Components/Pages/Register/Register.jsx";
import LoginForm from "./Components/Pages/Login/Login";
import Home from "./Components/Pages/Home/Home";
import CartSummary from "./Components/Pages/Cart/Cart";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartSummary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
