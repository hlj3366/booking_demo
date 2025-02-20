import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_BOOKINGS,
  UPDATE_BOOKING,
  CANCEL_BOOKING,
  COMPLETE_BOOKING,
} from "./GraphQL";

export default () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [updateForm, setUpdateForm] = useState({
    guestName: "",
    phone: "",
    arrivalTime: "",
    tableSize: 2,
    status: "Pending",
  });

  const { loading, error, data, refetch } = useQuery(GET_BOOKINGS, {
    variables: { date: filterDate, status: filterStatus },
  });

  const [updateBooking] = useMutation(UPDATE_BOOKING);
  const [cancelBooking] = useMutation(CANCEL_BOOKING);
  const [completeBooking] = useMutation(COMPLETE_BOOKING);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("updateForm", updateForm);
    await updateBooking({
      variables: {
        id: selectedBooking.id,
        ...updateForm,
      },
    });
    setSelectedBooking(null);
    refetch();
  };

  const handleStatusChange = async (id, status) => {
    if (status === "Cancelled") {
      await cancelBooking({ variables: { id } });
    } else if (status === "Completed") {
      await completeBooking({ variables: { id } });
    }
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="filters">
        <label>
          Filter by Date:
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
        <label>
          Filter by Status:
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
      </div>

      <h2>Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Phone</th>
            <th>Arrival Time</th>
            <th>Table Size</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.guestName}</td>
              <td>{booking.phone}</td>
              <td>{new Date(booking.arrivalTime).toLocaleString()}</td>
              <td>{booking.tableSize}</td>
              <td>
                <span className={`status ${booking.status}`}>
                  {booking.status}
                </span>
              </td>
              <td className="operation">
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setUpdateForm(booking);
                  }}
                >
                  Edit
                </button>
                {booking.status !== "Cancelled" && (
                  <button
                    onClick={() => handleStatusChange(booking.id, "Cancelled")}
                  >
                    Cancel
                  </button>
                )}
                {booking.status !== "Completed" && (
                  <button
                    onClick={() => handleStatusChange(booking.id, "Completed")}
                  >
                    Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBooking && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Booking</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Guest Name</label>
                <input
                  type="text"
                  value={updateForm.guestName || selectedBooking.guestName}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, guestName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={updateForm.phone || selectedBooking.phone}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, phone: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Arrival Time</label>
                <input
                  type="datetime-local"
                  value={updateForm.arrivalTime || selectedBooking.arrivalTime}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      arrivalTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Table Size</label>
                <select
                  value={updateForm.tableSize || selectedBooking.tableSize}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      tableSize: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                  <option value={8}>8</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={updateForm.status || selectedBooking.status}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, status: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="operation">
                <button type="button" onClick={() => setSelectedBooking(null)}>
                  Cancel
                </button>
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
