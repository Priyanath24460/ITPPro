import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./viewmedicalItemsc.css"; 

const RetrieveItems = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [selectedItem, setSelectedItem] = useState(null);
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
        const startX = 10;
        const startY = 10;
        const margin = 10;
        const columnWidth = (doc.internal.pageSize.width - 2 * margin) / 10;
        const columns = ["Item Code", "Item Name", "Amount", "Price Per Item", "Total Value", "Brand Name", "Supplier Name", "Item Date", "Status"];
        const rows = filteredItems.map(item => [
            item.itemCode,
            item.itemName,
            item.amount,
            item.pricePerItem,
            calculateItemValue(item.amount, item.pricePerItem),
            item.brandName,
            item.supplierName,
            formatDate(item.itemDate),
            item.amount === 0 ? "Out of Stock" : "In Stock"
        ]);
        doc.autoTable({
            startY,
            head: [columns],
            body: rows,
            startY: startY + 10
        });
        doc.save("inventory.pdf");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="containercha">
            <h1>Medical Item Catalog</h1>
            <div className="summarycha">
                <span className="total-valuecha">Total Inventory Value: {totalInventoryValue.toFixed(2)}</span>
                <span className="total-itemscha">Total Items: {totalItemCount}</span>
                <span className="in-stockcha">In Stock: {inStockItems.length}</span>
                <span className="out-of-stockcha">Out of Stock: {outOfStockItems.length}</span>
            </div>
            <div className="actionscha">
                <div>
                    <Link to="/inventory/add">Add Item</Link>
                </div>
                <div className="filter-buttonscha">
                    <button className={filterType === "all" ? 'active' : ''} onClick={() => setFilterType("all")}>All</button>
                    <button className={filterType === "inStock" ? 'active' : ''} onClick={() => setFilterType("inStock")}>In Stock</button>
                    <button className={filterType === "outOfStock" ? 'active' : ''} onClick={() => setFilterType("outOfStock")}>Out of Stock</button>
                </div>
                <form>
                    <input
                        type="search"
                        placeholder="Search by Item Name"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button type="submit">Search</button>
                </form>
                <button onClick={handlePrint}>Print Inventory</button>
                
            </div>
            <div ref={componentRef}>
                <table className="tablecha">
                    <thead>
                        <tr>
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>Amount</th>
                            <th>Price Per Item</th>
                            <th>Total Value</th>
                            <th>Brand Name</th>
                            <th>Supplier Name</th>
                            <th>Item Date</th>
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
                                <td>{formatDate(item.itemDate)}</td>
                                <td>
                                    {item.amount === 0 ? (
                                        <span className="out-of-stock-labelcha">Out of Stock</span>
                                    ) : (
                                        <span className="in-stock-labelcha">In Stock</span>
                                    )}
                                </td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                                 <Link to={`/inventory/${item.itemCode}`} onClick={() => setSelectedItem(item)} style={{ backgroundColor: '#007bff', color: '#fff', padding: '5px', borderRadius: '5px', textDecoration: 'none', marginRight: '5px' }}>View</Link>
                                <Link to={`/inventory/update/${item.itemCode}`} style={{ backgroundColor: '#ffc107', color: '#000', padding: '5px', borderRadius: '5px', textDecoration: 'none', marginRight: '5px' }}>Edit</Link>
                                <button onClick={() => handleDelete(item.itemCode)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px', borderRadius: '5px', border: 'none' }}>Delete</button>
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
