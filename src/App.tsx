import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const GET_BOOKINGS = gql`
      query GetBookings($date: String, $status: String) {
        bookings(date: $date, status: $status) {
          id
          guestName
          phone
          arrivalTime
          tableSize
          status
        }
      }
    `;

const CREATE_BOOKING = gql`
      mutation CreateBooking(
        $guestName: String!
        $phone: String!
        $arrivalTime: String!
        $tableSize: Int!
      ) {
        createBooking(
          guestName: $guestName
          phone: $phone
          arrivalTime: $arrivalTime
          tableSize: $tableSize
        ) {
          id
          guestName
          status
        }
      }
    `;

const UPDATE_BOOKING = gql`
      mutation UpdateBooking(
        $id: ID!
        $guestName: String
        $phone: String
        $arrivalTime: String
        $tableSize: Int
        $status: String
      ) {
        updateBooking(
          id: $id
          guestName: $guestName
          phone: $phone
          arrivalTime: $arrivalTime
          tableSize: $tableSize
          status: $status
        ) {
          id
          guestName
          phone
          arrivalTime
          tableSize
          status
        }
      }
    `;

const CANCEL_BOOKING = gql`
      mutation CancelBooking($id: ID!) {
        cancelBooking(id: $id) {
          id
          status
        }
      }
    `;

const COMPLETE_BOOKING = gql`
      mutation CompleteBooking($id: ID!) {
        completeBooking(id: $id) {
          id
          status
        }
      }
    `;

function GuestBooking() {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    arrivalTime: '',
    tableSize: 2,
  });
  const [phoneError, setPhoneError] = useState('');

  const [createBooking] = useMutation(CREATE_BOOKING);

  const validatePhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      setPhoneError('Please enter a valid Chinese phone number');
      return;
    }
    setPhoneError('');

    try {
      await createBooking({ variables: formData });
      setFormData({
        guestName: '',
        phone: '',
        arrivalTime: '',
        tableSize: 2,
      });
      alert('Booking created successfully!');
    } catch (error) {
      console.error('Error creating booking:', error);
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
              setPhoneError('');
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

        <button type="submit">Book Table</button>
      </form>
    </div>
  );
}

function AdminDashboard() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [updateForm, setUpdateForm] = useState({
    guestName: '',
    phone: '',
    arrivalTime: '',
    tableSize: 2,
    status: 'Pending',
  });

  const { loading, error, data, refetch } = useQuery(GET_BOOKINGS, {
    variables: { date: filterDate, status: filterStatus },
  });

  const [updateBooking] = useMutation(UPDATE_BOOKING);
  const [cancelBooking] = useMutation(CANCEL_BOOKING);
  const [completeBooking] = useMutation(COMPLETE_BOOKING);

  const handleUpdate = async (e) => {
    e.preventDefault();
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
    if (status === 'Cancelled') {
      await cancelBooking({ variables: { id } });
    } else if (status === 'Completed') {
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
              <td>
                <button onClick={() => setSelectedBooking(booking)}>
                  Edit
                </button>
                {booking.status !== 'Cancelled' && (
                  <button
                    onClick={() => handleStatusChange(booking.id, 'Cancelled')}
                  >
                    Cancel
                  </button>
                )}
                {booking.status !== 'Completed' && (
                  <button
                    onClick={() => handleStatusChange(booking.id, 'Completed')}
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
                    setUpdateForm({ ...updateForm, arrivalTime: e.target.value })
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
              <button type="submit">Update</button>
              <button type="button" onClick={() => setSelectedBooking(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
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
}

export default App;
