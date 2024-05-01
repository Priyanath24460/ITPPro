import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function AddItem() {
    const [itemCode, setItemCode] = useState("");
    const [itemName, setItemName] = useState("");
    const [amount, setAmount] = useState("");
    const [pricePerItem, setPricePerItem] = useState("");
    const [brandName, setBrandName] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [itemDate, setItemDate] = useState(""); // New state for itemDate
    const [supplierList] = useState([
        "MedSupp Enterprises"
        
    ]); 

    const validateItemCode = (value) => {
        const regex = /^\d{4}[a-zA-Z]{2}$/; // Regex pattern: 4 digits followed by 2 letters
        return regex.test(value);
    };

    const validateItemName = (value) => {
        const regex = /^[^\d]+$/; // Regex pattern: doesn't contain numbers
        return regex.test(value);
    };

    const validateNumberInput = (value) => {
        const regex = /^\d*\.?\d*$/; // Regex pattern: allow digits and optional decimal point
        return regex.test(value);
    };

    const sendData = (e) => {
        e.preventDefault();

        if (!validateItemCode(itemCode)) {
            alert("Item code must consist of 4 digits followed by 2 letters.");
            return;
        }

        if (!validateItemName(itemName)) {
            alert("Item name cannot contain numbers.");
            return;
        }

        if (!validateNumberInput(amount)) {
            alert("Amount must be a valid number.");
            return;
        }

        if (!validateNumberInput(pricePerItem)) {
            alert("Price per item must be a valid number.");
            return;
        }

        const newItem = {
            itemCode,
            itemName,
            amount,
            pricePerItem,
            brandName,
            supplierName,
            itemDate 
        };

        axios.post("http://localhost:8070/Inventory/add", newItem)
            .then(() => {
                alert("Item added successfully");
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className="addItemFormContainer">
            <form onSubmit={sendData} className="addItemForm">
                <h5 className="addItemFormTitle">Add Item</h5>
                <div className="formGroup">
                    <label htmlFor="itemCode">Item Code</label>
                    <input type="text" className="form-control" id="itemCode" placeholder="Enter item code" 
                        value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
                </div>
                <div className="formGroup">
                    <label htmlFor="itemName">Item Name</label>
                    <input type="text" className="form-control" id="itemName" placeholder="Enter item name" 
                        value={itemName} onChange={(e) => setItemName(e.target.value)} />
                </div>
                <div className="formGroup">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" className="form-control" id="amount" placeholder="Enter amount" 
                        value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="formGroup">
                    <label htmlFor="pricePerItem">Price Per Item</label>
                    <input type="text" className="form-control" id="pricePerItem" placeholder="Enter price per item"
                        value={pricePerItem} onChange={(e) => setPricePerItem(e.target.value)} />
                </div>
                <div className="formGroup">
                    <label htmlFor="brandName">Brand Name</label>
                    <input type="text" className="form-control" id="brandName" placeholder="Enter brand name"
                        value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                </div>
                <div className="formGroup">
                    <label htmlFor="supplierName">Supplier Name</label>
                    <select className="form-control" id="supplierName" value={supplierName} onChange={(e) => setSupplierName(e.target.value)}>
                        <option value="">Select Supplier</option>
                        {supplierList.map((supplier, index) => (
                            <option key={index} value={supplier}>{supplier}</option>
                        ))}
                    </select>
                </div>
                <div className="formGroup">
                    <label htmlFor="itemDate">Item Date</label>
                    <input type="date" className="form-control" id="itemDate" 
                        value={itemDate} onChange={(e) => setItemDate(e.target.value)} />
                </div>
                <button type="submit" className="addItemButton">Submit</button>
            </form>
        </div>
    );
}
