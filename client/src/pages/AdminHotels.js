import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminHotels.css';

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode
  const [editHotel, setEditHotel] = useState(null); // Store the selected hotel for editing
  const [formData, setFormData] = useState({
    name: '',
    standard: '',
    deluxe: '',
    location: '',
    pricePerNightStandard: '',
    pricePerNightDeluxe: '',
  });

  useEffect(() => {
    // Hardcoded hotel entry for testing
    const hardcodedHotel = {
      id: 1,
      name: 'Sample Hotel',
      standard: 10,
      deluxe: 5,
      location: 'New York',
      pricePerNightStandard: 100,
      pricePerNightDeluxe: 200,
    };
    setHotels([hardcodedHotel]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddHotel = () => {
    axios.post('/api/hotels', formData)
      .then(() => {
        setShowModal(false);
        setFormData({
          name: '',
          standard: '',
          deluxe: '',
          location: '',
          pricePerNightStandard: '',
          pricePerNightDeluxe: '',
        });
        return axios.get('/api/hotels'); // Refresh hotel list
      })
      .then(response => setHotels(response.data))
      .catch(error => console.error('Error adding hotel:', error));
  };

  const handleEditClick = (hotel) => {
    setIsEditing(true);
    setEditHotel(hotel); // Store the selected hotel to edit
    setFormData({
      name: hotel.name,
      standard: hotel.standard,
      deluxe: hotel.deluxe,
      location: hotel.location,
      pricePerNightStandard: hotel.pricePerNightStandard,
      pricePerNightDeluxe: hotel.pricePerNightDeluxe,
    });
    setShowModal(true);
  };

  const handleUpdateHotel = () => {
    axios.put(`/api/hotels/${editHotel.id}`, formData)
      .then(() => {
        setShowModal(false);
        setFormData({
          name: '',
          standard: '',
          deluxe: '',
          location: '',
          pricePerNightStandard: '',
          pricePerNightDeluxe: '',
        });
        setIsEditing(false); // Reset the editing state
        return axios.get('/api/hotels'); // Refresh hotel list after update
      })
      .then(response => setHotels(response.data))
      .catch(error => console.error('Error updating hotel:', error));
  };

  const handleDeleteHotel = (hotelId) => {
    axios.delete(`/api/hotels/${hotelId}`)
      .then(() => {
        return axios.get('/api/hotels'); // Refresh hotel list after deletion
      })
      .then(response => setHotels(response.data))
      .catch(error => console.error('Error deleting hotel:', error));
  };

  return (
    <div className="admin-hotels-comp-container">
      <h1 className="admin-hotels-comp-title">Manage Hotels</h1>
      <button
        className="admin-hotels-comp-add-btn"
        onClick={() => { setShowModal(true); setIsEditing(false); }}
      >
        Add New Hotel
      </button>
      <table className="admin-hotels-comp-table">
        <thead className="admin-hotels-comp-thead">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Standard Rooms</th>
            <th>Deluxe Rooms</th>
            <th>Location</th>
            <th>Price/Standard</th>
            <th>Price/Deluxe</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody className="admin-hotels-comp-tbody">
          {hotels.map(hotel => (
            <tr key={hotel.id}>
              <td>{hotel.id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.standard}</td>
              <td>{hotel.deluxe}</td>
              <td>{hotel.location}</td>
              <td>{hotel.pricePerNightStandard}</td>
              <td>{hotel.pricePerNightDeluxe}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEditClick(hotel)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteHotel(hotel.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="admin-hotels-comp-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? 'Edit Hotel' : 'Add New Hotel'}</h5>
                <button onClick={() => setShowModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  placeholder="Hotel Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="standard"
                  placeholder="Standard Rooms"
                  value={formData.standard}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="deluxe"
                  placeholder="Deluxe Rooms"
                  value={formData.deluxe}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="pricePerNightStandard"
                  placeholder="Price/Standard Room"
                  value={formData.pricePerNightStandard}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="pricePerNightDeluxe"
                  placeholder="Price/Deluxe Room"
                  value={formData.pricePerNightDeluxe}
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
                  onClick={isEditing ? handleUpdateHotel : handleAddHotel}
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
