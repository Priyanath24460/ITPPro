import React, { useState, useEffect } from 'react';
import './Alliteam.css'; // Import the CSS file
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument'; // Import your PDFDocument component


function Allitems() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventCosts, setEventCosts] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get(`http://localhost:8070/items/allitems`).then(response => {
      setItems(response.data);
      const eventCostsTemp = response.data.reduce((accumulator, item) => {
        if (!accumulator[item.event_id]) {
          accumulator[item.event_id] = 0;
        }
        accumulator[item.event_id] += parseFloat(item.cost);
        return accumulator;
      }, {});
      setEventCosts(eventCostsTemp);
    }).catch(error => {
      console.error("Error fetching items:", error);
    });
  };

  // Function to handle deleting an item
  const handleDeleteItem = (event_id) => {
    axios.delete(`http://localhost:8070/items/delete/${event_id}`)
      .then(response => {
        console.log("Item deleted:", event_id);
        fetchItems();
      })
      .catch(error => {
        console.error("Error deleting item:", error);
      });
  };

  // Function to handle searching for items by event name
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      const filteredItems = items.filter((item) => {
        return item.event_name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      const totalCost = filteredItems.reduce((acc, item) => acc + parseFloat(item.cost), 0);
      setEventCosts({ [event.target.value]: totalCost });
    } else {
      fetchItems();
      setEventCosts({});
    }
  };

  // Function to filter items by event name
  const filteredItems = items.filter((item) => {
    return item.event_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="total-cost-containeryum">
      <h1>Event Item</h1>
      <input type="text" placeholder="Search by event name" onChange={handleSearch} />
      <table className="cost-tableyum">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Items</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index}>
              <td>{item.event_id}</td>
              <td>{item.event_name}</td>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td><td>{item.cost}</td>
              <td>
                <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total Cost by Event Name:</h2>
      <ul>
        {Object.keys(eventCosts).map((eventName, index) => (
          <li key={index}>{eventName}: {eventCosts[eventName].toFixed(2)}</li>
        ))}
      </ul>
      <PDFDownloadLink document={<PDFDocument items={filteredItems} eventCosts={eventCosts} />} fileName="event_items.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
}

export default Allitems;
