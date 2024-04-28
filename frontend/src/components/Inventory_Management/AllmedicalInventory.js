import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './RetrieveItems.css'; // Import CSS file for additional styling

const RetrieveItems = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const componentRef = useRef();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://localhost:8070/inventory");
            setItems(response.data.inventory);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleDelete = async (itemCode) => {
        try {
            await axios.delete(`http://localhost:8070/inventory/delete/${itemCode}`);
            fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const calculateItemValue = (amount, pricePerItem) => {
        return amount * pricePerItem;
    };

    const totalInventoryValue = items.reduce((acc, item) => {
        return acc + calculateItemValue(item.amount, item.pricePerItem);
    }, 0);

    const totalItemCount = items.length;

    const inStockItems = items.filter((item) => item.amount > 0);
    const outOfStockItems = items.filter((item) => item.amount === 0);

    const filteredItems = filterType === "inStock" ? inStockItems : filterType === "outOfStock" ? outOfStockItems : items.filter((item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePrint = () => {
        const doc = new jsPDF();

        // Set title
        doc.setFontSize(20);
        doc.text("Medical Item Catalog", 10, 10);

        // Add table headers
        const headers = ["Item Code", "Item Name", "Amount", "Price Per Item", "Total Amount", "Brand Name", "Supplier Name", "Status"];
        const rows = filteredItems.map(item => [
            item.itemCode,
            item.itemName,
            item.amount,
            item.pricePerItem,
            calculateItemValue(item.amount, item.pricePerItem),
            item.brandName,
            item.supplierName,
            item.amount === 0 ? "Out of Stock" : "In Stock"
        ]);
        doc.autoTable({
            startY: 20,
            head: [headers],
            body: rows,
        });

        // Draw a rectangle for better readability
        const rectWidth = 130;
        const rectHeight = 65;
        const xStart = 10;
        const yStart = doc.autoTable.previous.finalY + 10;
        doc.setFillColor(240, 240, 240);
        doc.rect(xStart, yStart, rectWidth, rectHeight, "F");

        // Add total values and counts inside the rectangle
        doc.setFontSize(12); // Set font size
        doc.setFont("helvetica", "bold"); // Set font and style
        doc.text(`Total Inventory Value:RS. ${totalInventoryValue.toFixed(2)}`, xStart + 5, yStart + 20);
        doc.text(`Total Items: ${totalItemCount}`, xStart + 5, yStart + 32);
        doc.text(`In Stock: ${inStockItems.length}`, xStart + 5, yStart + 44);
        doc.text(`Out of Stock: ${outOfStockItems.length}`, xStart + 5, yStart + 56);

        // Save the PDF
        doc.save("inventory.pdf");
    };

    return (
        <div className="container">
            <h1 className="mb-4">Medical Item Catalog</h1>
            <div className="total-info mb-3">
                <span className="badge bg-primary me-2">Total Inventory Value: {totalInventoryValue.toFixed(2)}</span>
                <span className="badge bg-success me-2">Total Items: {totalItemCount}</span>
                <span className="badge bg-info me-2">In Stock: {inStockItems.length}</span>
                <span className="badge bg-danger">Out of Stock: {outOfStockItems.length}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <Link to="/inventory/add" className="btn btn-success">Add Item</Link>
                </div>
                <div className="btn-group">
                    <button className={`btn btn-${filterType === "all" ? "primary" : "secondary"}`} onClick={() => setFilterType("all")}>All</button>
                    <button className={`btn btn-${filterType === "inStock" ? "primary" : "secondary"}`} onClick={() => setFilterType("inStock")}>In Stock</button>
                    <button className={`btn btn-${filterType === "outOfStock" ? "primary" : "secondary"}`} onClick={() => setFilterType("outOfStock")}>Out of Stock</button>
                </div>
                <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Search by Item Name" 
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <button className="btn btn-primary" onClick={handlePrint}>Print Inventory</button>
            </div>
            <div ref={componentRef} className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>Amount</th>
                            <th>Price Per Item</th>
                            <th>Total Value</th>
                            <th>Brand Name</th>
                            <th>Supplier Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.itemCode}</td>
                                <td>{item.itemName}</td>
                                <td>{item.amount}</td>
                                <td>{item.pricePerItem}</td>
                                <td>{calculateItemValue(item.amount, item.pricePerItem)}</td>
                                <td>{item.brandName}</td>
                                <td>{item.supplierName}</td>
                                <td>
                                    {item.amount === 0 ? (
                                        <span className="badge bg-danger">Out of Stock</span>
                                    ) : (
                                        <span className="badge bg-success">In Stock</span>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/inventory/${item.itemCode}`} className="btn btn-primary me-1">View</Link>
                                    <Link to={`/inventory/update/${item.itemCode}`} className="btn btn-warning me-1">Edit</Link>
                                    <button onClick={() => handleDelete(item.itemCode)} className="btn btn-danger me-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RetrieveItems;
