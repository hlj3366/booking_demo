import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GuestBooking from "./GuestBooking";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

export default () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Guest Booking</Link>
          </li>
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<GuestBooking />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
