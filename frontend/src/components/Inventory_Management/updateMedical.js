import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateItem = () => {
  const { itemCode } = useParams();

  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    amount: "",
    pricePerItem: "",
    brandName: "",
    supplierName: "",
  });

  const [countToAdd, setCountToAdd] = useState(0);
  const [operation, setOperation] = useState("add"); // default to add
  const [supplierList] = useState([
    "MedSupp Enterprises",
   
  ]);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(`http://localhost:8070/inventory/${itemCode}`);
        const itemData = response.data.item;
        setFormData({
          itemCode: itemData.itemCode,
          itemName: itemData.itemName,
          amount: itemData.amount,
          pricePerItem: itemData.pricePerItem,
          brandName: itemData.brandName,
          supplierName: itemData.supplierName,
        });
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    }

    fetchItem();
  }, [itemCode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !formData.itemName ||
      formData.amount === "" ||
      !formData.pricePerItem ||
      !formData.brandName ||
      !formData.supplierName
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Calculate updated amount based on operation
      let updatedAmount = parseInt(formData.amount);
      if (operation === "add") {
        updatedAmount += countToAdd;
      } else {
        updatedAmount -= countToAdd;
      }

      // Ensure amount is not negative
      updatedAmount = Math.max(updatedAmount, 0);

      const updatedFormData = { ...formData, amount: updatedAmount };

      // Update the item
      await axios.put(`http://localhost:8070/Inventory/update/${itemCode}`, updatedFormData);
      alert("Item Updated Successfully!");

      // Add history entry
      const historyData = {
        itemCode: formData.itemCode,
        operation,
        count: Math.abs(countToAdd),
        pricePerItem: formData.pricePerItem, // Include pricePerItem from the form
        updateDate: new Date().toISOString() // Use current date as update date
      };

      await axios.post("http://localhost:8070/history/add", historyData);

      // Check if operation is "remove" and updated amount is 0
      if (operation === "remove" && updatedAmount === 0) {
        sendEmail("trendssmart3@gmail.com", itemCode);
      }
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  const sendEmail = async (recipientEmail, itemCode) => {
    try {
      await axios.post("http://localhost:8070/send-email", { recipientEmail, itemCode });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">Update Item</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Item Code:</label>
                  <input type="text" name="itemCode" value={formData.itemCode} readOnly className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Item Name:</label>
                  <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} className="form-control" />
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col">
                    <label className="form-label">Current Amount:</label>
                    <input type="number" name="amount" value={formData.amount} readOnly className="form-control" />
                  </div>
                  <div className="col">
                    <label className="form-label">Adjust Amount:</label>
                    <div className="input-group">
                      <input 
                        type="number" 
                        value={Math.abs(countToAdd)} 
                        onChange={(e) => setCountToAdd(parseInt(e.target.value))} 
                        className="form-control" 
                      />
                      <span className="input-group-text">
                        <div className="form-check form-check-inline ms-2">
                          <input 
                            type="radio" 
                            name="operation" 
                            id="add" 
                            value="add" 
                            checked={operation === "add"} 
                            onChange={() => setOperation("add")} 
                            className="form-check-input" 
                          />
                          <label htmlFor="add" className="form-check-label">Add</label>
                        </div>
                        <div className="form-check form-check-inline ms-2">
                          <input 
                            type="radio" 
                            name="operation" 
                            id="remove" 
                            value="remove" 
                            checked={operation === "remove"} 
                            onChange={() => setOperation("remove")} 
                            className="form-check-input" 
                          />
                          <label htmlFor="remove" className="form-check-label">Remove</label>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Price Per Item:</label>
                  <input type="number" name="pricePerItem" value={formData.pricePerItem} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Brand Name:</label>
                  <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Supplier Name:</label>
                  <select className="form-control" name="supplierName" value={formData.supplierName} onChange={handleChange}>
                    <option value="">Select Supplier</option>
                    {supplierList.map((supplier, index) => (
                      <option key={index} value={supplier}>{supplier}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Item</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
