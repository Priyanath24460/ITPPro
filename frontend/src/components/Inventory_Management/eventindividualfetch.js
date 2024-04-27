import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventIndividual = () => {
  const { itemCode } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        console.log('Fetching event inventory item details for item code:', itemCode);
        const response = await axios.get(`http://localhost:8070/eventinventory/${itemCode}`); // Update the endpoint
        console.log('Response:', response.data);
        setItem(response.data.item);
      } catch (error) {
        setError('Error fetching event inventory item details. Please try again.');
        console.error('Event Inventory Error:', error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItemDetails();
  }, [itemCode]);

  return (
    <div className="container">
      <h1 className="mb-4">Event Inventory Item Details</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div>
          <div className="mb-3">
            <strong>Item Code:</strong> {item.itemCode}
          </div>
          <div className="mb-3">
            <strong>Item Name:</strong> {item.itemName}
          </div>
          <div className="mb-3">
            <strong>Amount:</strong> {item.amount}
          </div>
          <div className="mb-3">
            <strong>Condition:</strong> {item.condition}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventIndividual;
