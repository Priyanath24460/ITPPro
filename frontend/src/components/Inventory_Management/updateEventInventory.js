import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./updateItemch.css"; // Import the external CSS file

const UpdateEventItem = () => {
  const { itemCode } = useParams();

  const [formData, setFormData] = useState({
    itemName: "",
    amount: "",
    condition: ""
  });

  const [adjustmentAmount, setAdjustmentAmount] = useState(0);
  const [adjustmentOperation, setAdjustmentOperation] = useState("add");

  useEffect(() => {
    async function fetchEventItem() {
      try {
        const response = await axios.get(`http://localhost:8070/eventinventory/${itemCode}`);
        const itemData = response.data.item;
        setFormData({
          itemName: itemData.itemName,
          amount: itemData.amount,
          condition: itemData.condition
        });
      } catch (error) {
        console.error("Error fetching event inventory item:", error);
      }
    }

    fetchEventItem();
  }, [itemCode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the amount based on the adjustment
      const updatedAmount = adjustmentOperation === "add" ? parseInt(formData.amount) + adjustmentAmount : parseInt(formData.amount) - adjustmentAmount;
      
      // Ensure amount is not negative
      if (updatedAmount < 0) {
        alert("Cannot remove more items than available");
        return;
      }

      // Make the API call to update the item with the new amount
      await axios.put(`http://localhost:8070/eventinventory/update/${itemCode}`, { ...formData, amount: updatedAmount });
      
      // Show success message
      alert("Event Inventory Item Updated Successfully!");
      window.location.href = '/eventinventory';

    } catch (error) {
      console.error("Error updating event inventory item:", error);
      alert("Error updating event inventory item. Please try again.");
    }
  };

  return (
    <div className="containerch mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8"> 
          <div className="cardch">
            <div className="card-headerch bg-primary text-white">Update Event Inventory Item</div>
            <div className="card-bodych">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Item Name:</label>
                  <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount:</label>
                  <input type="number" name="amount" value={formData.amount} readOnly className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Adjust Amount:</label>
                  <div className="input-group">
                    <input 
                      type="number" 
                      value={adjustmentAmount} 
                      onChange={(e) => setAdjustmentAmount(parseInt(e.target.value))} 
                      className="form-control" 
                    />
                    <span className="input-group-text">
                      <div className="form-check form-check-inline ms-2">
                        <input 
                          type="radio" 
                          name="adjustmentOperation" 
                          id="add" 
                          value="add" 
                          checked={adjustmentOperation === "add"} 
                          onChange={() => setAdjustmentOperation("add")} 
                          className="form-check-input" 
                        />
                        <label htmlFor="add" className="form-check-label">Add</label>
                      </div>
                      <div className="form-check form-check-inline ms-2">
                        <input 
                          type="radio" 
                          name="adjustmentOperation" 
                          id="remove" 
                          value="remove" 
                          checked={adjustmentOperation === "remove"} 
                          onChange={() => setAdjustmentOperation("remove")} 
                          className="form-check-input" 
                        />
                        <label htmlFor="remove" className="form-check-label">Remove</label>
                      </div>
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Condition:</label><br />
                  <select name="condition" value={formData.condition} onChange={handleChange} className="form-control">
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                    <option value="Not Working">For Parts or Not Working</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Event Inventory Item</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventItem;
