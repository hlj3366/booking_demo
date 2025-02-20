import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKINGS, CREATE_BOOKING } from "./GraphQL";

export default () => {
  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    arrivalTime: "",
    tableSize: 2,
  });
  const [phoneError, setPhoneError] = useState("");

  const [createBooking] = useMutation(CREATE_BOOKING);

  const validatePhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      setPhoneError("Please enter a valid Chinese phone number");
      return;
    }
    setPhoneError("");

    try {
      await createBooking({ variables: formData });
      setFormData({
        guestName: "",
        phone: "",
        arrivalTime: "",
        tableSize: 2,
      });
      alert("Booking created successfully!");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="container">
      <h1>Guest Booking</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="guestName">Guest Name</label>
          <input
            id="guestName"
            type="text"
            placeholder="Enter your name"
            value={formData.guestName}
            onChange={(e) =>
              setFormData({ ...formData, guestName: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              setPhoneError("");
            }}
            pattern="1[3-9]\d{9}"
            required
          />
          {phoneError && <span className="error-message">{phoneError}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="arrivalTime">Arrival Time</label>
          <input
            id="arrivalTime"
            type="datetime-local"
            value={formData.arrivalTime}
            onChange={(e) =>
              setFormData({ ...formData, arrivalTime: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tableSize">Table Size</label>
          <select
            id="tableSize"
            value={formData.tableSize}
            onChange={(e) =>
              setFormData({ ...formData, tableSize: parseInt(e.target.value) })
            }
          >
            <option value={2}>2 people</option>
            <option value={4}>4 people</option>
            <option value={6}>6 people</option>
            <option value={8}>8 people</option>
          </select>
        </div>

        <div style={{ textAlign: "center" }}>
          <button type="submit" style={{ width: "200px" }}>
            Book Table
          </button>
        </div>
      </form>
    </div>
  );
};
