import React, { useState, useEffect } from 'react';
import './TotalCost.css';
import axios from 'axios';


function TotalCost() {
  const [item, setItem] = useState([
    {event_id: '', event_name: '', item: '', quantity: '', price: '', cost: 0 },
  ]);
  const [total_cost, setTotalCost] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get("http://localhost:8070/items")
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItem = [...item];
    newItem[index][name] = value;

    // Calculate cost based on quantity and price
    const quantity = parseFloat(newItem[index].quantity) || 0;
    const price = parseFloat(newItem[index].price) || 0;
    newItem[index].cost = quantity * price;

    setItem(newItem);
    updateTotalCost(newItem);
  };

  const handleAddItem = () => {
    setItem([...item, { id: item.length + 1,event_id: '', event_name: '', item: '', quantity: '', price: '', cost: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItem = [...item];
    newItem.splice(index, 1);
    setItem(newItem);
    updateTotalCost(newItem);
  };

  const updateTotalCost = (itemArray) => {
    let total = 0;
    itemArray.forEach((item) => {
      total += item.cost;
    });
    setTotalCost(total);
  };

  const handleSubmit = () => {
    const itemsWithTotalCost = item.map((item) => ({
      ...item,
      total_cost: item.quantity * item.price // Calculate total_cost based on quantity and price
    }));

    axios.post("http://localhost:8070/items/addn", itemsWithTotalCost)
      .then(response => {
        console.log(response.data); // Log the response data
        alert("Data added successfully..."); // Display a success message
        fetchEvents(); // Refresh the events after adding new ones
      })
      .catch(error => {
        console.error("Error adding data:", error); // Log the error
        alert("Error adding data: " + error.message); // Display an error message
      });
  };

  const handleViewItems = () => {
    // Navigate to the event page
    // Replace '/event' with the actual path to your event page
    window.location.href = '/allitems';
  };

  return (
    <div className="total-cost-containeryu">
      <h1>Add Item</h1>
      <table className="cost-tableyu">
        <thead>
          <tr>
            <th>EventId</th>
            <th>Event Name</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {item.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="event_id"
                  value={row.event_id}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="event_name"
                  value={row.event_name}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="item"
                  value={row.item}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="quantity"
                  value={row.quantity}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="price"
                  value={row.price}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Enter Price"
                />
              </td>
              <td>{row.cost}</td>
              <td>
                <button onClick={() => handleRemoveItem(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddItem}>Add Item</button>
      <div className="total">Total Cost: {total_cost}</div>
      <button onClick={handleSubmit}>Submit</button>

      <button onClick={handleViewItems}>View Items</button>
    </div>
  );
}

export default TotalCost;
