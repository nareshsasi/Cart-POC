import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postApi } from "../../Services/Axios";
import { Endpoint } from "../../Services/Endpoint";
import "./Login.css";

const LoginForm = () => {
  const Navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    OrgId: 0,
    BranchCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postApi(Endpoint.LOGIN, formData);
    console.log("responseresponse", response);
    if (response.Message == "Sucess") {
      Navigate("/home");
    } else {
      setError(response.Message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Login Form</h2>
        <span className="errorStatus"> {error}</span>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="Username">Username:</label>
            <input
              type="text"
              id="Username"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="Password">Password:</label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="OrgId">Org ID:</label>
            <input
              type="number"
              id="OrgId"
              name="OrgId"
              value={formData.OrgId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="BranchCode">Branch Code:</label>
            <input
              type="text"
              id="BranchCode"
              name="BranchCode"
              value={formData.BranchCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-2">
            <button type="submit">Login</button>
          </div>

          <div className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
