import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const IndividualItem = () => {
  const { itemCode } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        console.log('Fetching item details for item code:', itemCode);
        const response = await axios.get(`http://localhost:8070/Inventory/${itemCode}`); // Update the endpoint
        console.log('Response:', response.data);
        setItem(response.data.item);
      } catch (error) {
        setError('Error fetching item details. Please try again.');
        console.error('Profile Error:', error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItemDetails();
  }, [itemCode]);

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Item Details</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <div>
          <div style={{ marginBottom: '10px', fontSize: '18px' }}>
            <strong>Item Code:</strong> {item.itemCode}
          </div>
          <div style={{ marginBottom: '10px', fontSize: '18px' }}>
            <strong>Item Name:</strong> {item.itemName}
          </div>
          <div style={{ marginBottom: '10px', fontSize: '18px' }}>
            <strong>Amount:</strong> {item.amount}
          </div>
          <div style={{ marginBottom: '10px', fontSize: '18px' }}>
            <strong>Price Per Item:</strong> {item.pricePerItem}
          </div>
          <div style={{ marginBottom: '10px', fontSize: '18px' }}>
            <strong>Brand Name:</strong> {item.brandName}
          </div>
          <div style={{ marginBottom: '10px', fontSize: '18px' }}>
            <strong>Supplier Name:</strong> {item.supplierName}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualItem;
