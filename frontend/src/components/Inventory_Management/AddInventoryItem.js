import React, { useState } from "react";
import axios from "axios";

export default function AddItem() {
    const [itemCode, setItemCode] = useState("");
    const [itemName, setItemName] = useState("");
    const [amount, setAmount] = useState("");
    const [pricePerItem, setPricePerItem] = useState("");
    const [brandName, setBrandName] = useState("");
    const [supplierName, setSupplierName] = useState("");

    function sendData(e) {
        e.preventDefault();
        const newItem = {
            itemCode,
            itemName,
            amount,
            pricePerItem,
            brandName,
            supplierName
        };

        axios.post("http://localhost:8070/Inventory/add", newItem)
            .then(() => {
                alert("Item added successfully");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="itemCode">Item Code</label>
                    <input type="text" className="form-control" id="itemCode" placeholder="Enter item code" 
                        value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="itemName">Item Name</label>
                    <input type="text" className="form-control" id="itemName" placeholder="Enter item name" 
                        value={itemName} onChange={(e) => setItemName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" className="form-control" id="amount" placeholder="Enter amount" 
                        value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="pricePerItem">Price Per Item</label>
                    <input type="text" className="form-control" id="pricePerItem" placeholder="Enter price per item"
                        value={pricePerItem} onChange={(e) => setPricePerItem(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="brandName">Brand Name</label>
                    <input type="text" className="form-control" id="brandName" placeholder="Enter brand name"
                        value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="supplierName">Supplier Name</label>
                    <input type="text" className="form-control" id="supplierName" placeholder="Enter supplier name"
                        value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
