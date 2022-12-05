import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "./RecordList.css";
export default function EditUser() {
   const params = useParams();
   const navigate = useNavigate();
  const [form, setForm] = useState({
    email: params.email,
    firstName: params.firstName,
    lastName: params.lastName,
    address: params.address,
    phoneNumber: params.phoneNumber,
    creditCard: params.creditCard,
    securityCode: params.securityCode,
    expDate: params.expDate,
  });
 

  useEffect(() => {
    async function fetchData() {
      const id = params._id.toString();
      const response = await fetch(`http://localhost:3001/users/${id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      console.log(record);
      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      phoneNumber: form.phoneNumber,
      creditCard: form.creditCard,
      securityCode: form.securityCode,
      expDate: form.expDate,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:3001/users/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div className="edit-container">
      <h3>Update Record ({params.id})</h3>
      <h3>{params.email}</h3>
      <form onSubmit={onSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={form.firstName}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={form.lastName}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={form.address}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            value={form.phoneNumber}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="creditCard">Credit Card: </label>
          <input
            type="text"
            className="form-control"
            id="creditCard"
            value={form.creditCard}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="securityCode">Security Code: </label>
          <input
            type="text"
            className="form-control"
            id="securityCode"
            value={form.securityCode}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expDate">Expiry Date: </label>
          <input
            type="date"
            className="form-control"
            id="expDate"
            value={form.expDate}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <br />

      {/*   <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="userOptions"
              id="positionUser"
              value="user"
              checked={form.level === "user"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionUser" className="form-check-label">
              User
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="userOptions"
              id="positionAdmin"
              value="admin"
              checked={form.level === "admin"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionAdmin" className="form-check-label">
              Admin
            </label>
          </div>
        </div> */}
        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}