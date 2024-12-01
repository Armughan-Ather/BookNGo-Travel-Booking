import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminFlights.css';

export default function AdminFlights() {
  const [flights, setFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // To track if we are in edit mode
  const [editFlight, setEditFlight] = useState(null); // Store the selected flight for editing
  const [formData, setFormData] = useState({
    airlineId: '',
    departure: '',
    destination: '',
    origin: '',
    price: '',
    status: 'Scheduled',
    numSeats: '',
  });

  useEffect(() => {
    // Hardcoded flight entry for testing
    const hardcodedFlight = {
      id: 1,
      airlineId: 101,
      departure: '2024-12-15T10:00:00',
      destination: 'Los Angeles',
      origin: 'New York',
      price: 350,
      status: 'Scheduled',
      numSeats: 150,
    };

    // Setting the hardcoded flight entry in the state
    setFlights([hardcodedFlight]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFlight = () => {
    // Hardcoded API request simulation
    axios.post('/api/flights', formData)
      .then(() => {
        setShowModal(false);
        setFormData({
          airlineId: '',
          departure: '',
          destination: '',
          origin: '',
          price: '',
          status: 'Scheduled',
          numSeats: '',
        });
        return axios.get('/api/flights'); // Refresh flight list
      })
      .then(response => setFlights(response.data))
      .catch(error => console.error('Error adding flight:', error));
  };

  const handleEditClick = (flight) => {
    setIsEditing(true);
    setEditFlight(flight); // Store the selected flight to edit
    setFormData({
      airlineId: flight.airlineId,
      departure: flight.departure,
      destination: flight.destination,
      origin: flight.origin,
      price: flight.price,
      status: flight.status,
      numSeats: flight.numSeats,
    });
    setShowModal(true);
  };

  const handleUpdateFlight = () => {
    axios.put(`/api/flights/${editFlight.id}`, formData)
      .then(() => {
        setShowModal(false);
        setFormData({
          airlineId: '',
          departure: '',
          destination: '',
          origin: '',
          price: '',
          status: 'Scheduled',
          numSeats: '',
        });
        setIsEditing(false); // Reset the editing state
        return axios.get('/api/flights'); // Refresh flight list after update
      })
      .then(response => setFlights(response.data))
      .catch(error => console.error('Error updating flight:', error));
  };

  const handleDeleteFlight = (flightId) => {
    axios.delete(`/api/flights/${flightId}`)
      .then(() => {
        return axios.get('/api/flights'); // Refresh flight list after deletion
      })
      .then(response => setFlights(response.data))
      .catch(error => console.error('Error deleting flight:', error));
  };

  return (
    <div className="admin-flights-comp-container">
      <h1 className="admin-flights-comp-title">Manage Flights</h1>
      <button
        className="admin-flights-comp-add-btn"
        onClick={() => { setShowModal(true); setIsEditing(false); }}
      >
        Add New Flight
      </button>
      <table className="admin-flights-comp-table">
        <thead className="admin-flights-comp-thead">
          <tr>
            <th>ID</th>
            <th>Airline ID</th>
            <th>Departure</th>
            <th>Destination</th>
            <th>Origin</th>
            <th>Price</th>
            <th>Status</th>
            <th>Seats</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody className="admin-flights-comp-tbody">
          {flights.map(flight => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.airlineId}</td>
              <td>{flight.departure}</td>
              <td>{flight.destination}</td>
              <td>{flight.origin}</td>
              <td>{flight.price}</td>
              <td>{flight.status}</td>
              <td>{flight.numSeats}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEditClick(flight)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteFlight(flight.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="admin-flights-comp-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? 'Edit Flight' : 'Add New Flight'}</h5>
                <button onClick={() => setShowModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  name="airlineId"
                  placeholder="Airline ID"
                  value={formData.airlineId}
                  onChange={handleInputChange}
                />
                <input
                  type="datetime-local"
                  name="departure"
                  placeholder="Departure"
                  value={formData.departure}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="destination"
                  placeholder="Destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="origin"
                  placeholder="Origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="status"
                  placeholder="Status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="numSeats"
                  placeholder="Number of Seats"
                  value={formData.numSeats}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={isEditing ? handleUpdateFlight : handleAddFlight}
                >
                  {isEditing ? 'Update' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
