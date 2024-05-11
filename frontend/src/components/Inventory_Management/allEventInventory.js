import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ViewEventInventoryList.css'; // Importing external CSS file

function EventInventoryList() {
    const [eventInventory, setEventInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedConditions, setSelectedConditions] = useState([]);

    useEffect(() => {
        const fetchEventInventory = async () => {
            try {
                const response = await fetch('http://localhost:8070/eventinventory/');
                if (!response.ok) {
                    throw new Error('Failed to fetch event inventory');
                }
                const data = await response.json();
                setEventInventory(data.eventInventory);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchEventInventory();
    }, []);

    const handleDelete = async (itemCode) => {
        try {
            await fetch(`http://localhost:8070/eventinventory/delete/${itemCode}`, {
                method: 'DELETE',
            });
            setEventInventory(prevItems => prevItems.filter(item => item.itemCode !== itemCode));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleConditionChange = (event) => {
        const { value, checked } = event.target;
        setSelectedConditions(prevConditions => checked ? [...prevConditions, value] : prevConditions.filter(condition => condition !== value));
    };

    const filteredItems = eventInventory.filter((item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedConditions.length === 0 || selectedConditions.includes(item.condition))
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="containercham">
            <h1>Event Item Catalog</h1>
            <div className="search-containercham">
                <input 
                    className="search-inputcham" 
                    type="search" 
                    placeholder="Search by Item Name" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <Link to="/eventinventory/add" className="add-item-buttoncham">Add Item</Link>
            </div>
            <div className="filter-containercham">
                {['New', 'Very Good', 'Good', 'Fair', 'Poor', 'Not Working'].map(condition => (
                    <div key={condition} className="condition-checkboxcham">
                        <input 
                            type="checkbox" 
                            value={condition} 
                            id={`condition${condition.replace(' ', '')}`} 
                            onChange={handleConditionChange} 
                        />
                        <label htmlFor={`condition${condition.replace(' ', '')}`}>{condition}</label>
                    </div>
                ))}
            </div>
            <table className="item-tablecham">
                <thead>
                    <tr>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Amount</th>
                        <th>Condition</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <tr key={item._id}>
                            <td>{item.itemCode}</td>
                            <td>{item.itemName}</td>
                            <td>{item.amount}</td>
                            <td className={`condition-${item.condition.toLowerCase().replace(' ', '-')}`}>{item.condition}</td>
                            <td>
                                <Link to={`/eventinventory/${item.itemCode}`} className="action-buttoncham view-buttoncham">View</Link>
                                <Link to={`/eventinventory/update/${item.itemCode}`} className="action-buttoncham edit-buttoncham">Edit</Link>
                                <button onClick={() => handleDelete(item.itemCode)} className="action-buttoncham delete-buttoncham">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EventInventoryList;
