import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postApi } from "../../Services/Axios";
import { Endpoint } from "../../Services/Endpoint";

import "./Register.css";

const RegistrationForm = () => {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    OrgId: 0,
    BranchCode: "",
    B2CCustomerId: "",
    B2CCustomerName: "",
    EmailId: "",
    Password: "",
    AddressLine1: "",
    AddressLine2: "",
    AddressLine3: "",
    MobileNo: "",
    CountryId: "",
    PostalCode: "",
    IsActive: true,
    IsApproved: true,
    CreatedBy: "",
    CreatedOn: new Date().toISOString(),
    ChangedBy: "",
    ChangedOn: new Date().toISOString(),
    FloorNo: "",
    UnitNo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    const response = await postApi(Endpoint.REGISTER, formData);
    console.log("responseresponse", response);
    if (response.Message == "Sucess") {
      Navigate("/");
    }
  };

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="BranchCode">Branch Code</label>
            <input
              type="text"
              id="BranchCode"
              name="BranchCode"
              value={formData.BranchCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="B2CCustomerId">B2C Customer ID</label>
            <input
              type="text"
              id="B2CCustomerId"
              name="B2CCustomerId"
              value={formData.B2CCustomerId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="B2CCustomerName">B2C Customer Name</label>
            <input
              type="text"
              id="B2CCustomerName"
              name="B2CCustomerName"
              value={formData.B2CCustomerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="EmailId">Email ID</label>
            <input
              type="email"
              id="EmailId"
              name="EmailId"
              value={formData.EmailId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="PostalCode">Postal Code</label>
            <input
              type="text"
              id="PostalCode"
              name="PostalCode"
              value={formData.PostalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="MobileNo">Mobile No</label>
            <input
              type="text"
              id="MobileNo"
              name="MobileNo"
              value={formData.MobileNo}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="AddressLine1">Address Line 1</label>
            <input
              type="text"
              id="AddressLine1"
              name="AddressLine1"
              value={formData.AddressLine1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="AddressLine2">Address Line 2</label>
            <input
              type="text"
              id="AddressLine2"
              name="AddressLine2"
              value={formData.AddressLine2}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="AddressLine3">Address Line 3</label>
            <input
              type="text"
              id="AddressLine3"
              name="AddressLine3"
              value={formData.AddressLine3}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="CountryId">Country ID</label>
            <input
              type="text"
              id="CountryId"
              name="CountryId"
              value={formData.CountryId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="FloorNo">Floor No</label>
            <input
              type="text"
              id="FloorNo"
              name="FloorNo"
              value={formData.FloorNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="UnitNo">Unit No</label>
            <input
              type="text"
              id="UnitNo"
              name="UnitNo"
              value={formData.UnitNo}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">Register</button>
        <div className="register-link">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
