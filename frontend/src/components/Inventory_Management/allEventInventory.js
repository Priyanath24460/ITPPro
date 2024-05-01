import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    const conditionColors = {
        'New': 'text-success',
        'Very Good': 'text-primary',
        'Good': 'text-info',
        'Fair': 'text-warning',
        'Poor': 'text-danger',
        'Not Working': 'text-muted'
    };

    return (
        <div className="container1">
            <h1 className="mb-4">Event  Item Catalog</h1>
            <div className="row align-items-center mb-3">
                <div className="col">
                    <input 
                        className="form-control mb-2" 
                        type="search" 
                        placeholder="Search by Item Name" 
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="col-auto">
                    <Link to="/eventinventory/add" className="btn btn-success">Add Item</Link>
                </div>
            </div>
            <div className="mb-3">
                <div className="row">
                    {['New', 'Very Good', 'Good', 'Fair', 'Poor', 'Not Working'].map(condition => (
                        <div key={condition} className="col-auto">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value={condition} 
                                    id={`condition${condition.replace(' ', '')}`} 
                                    onChange={handleConditionChange} 
                                />
                                <label className="form-check-label" htmlFor={`condition${condition.replace(' ', '')}`}>
                                    {condition}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <table className="table table-striped1">
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
                            <td className={conditionColors[item.condition]}>{item.condition}</td>
                            <td>
                                <Link to={`/eventinventory/${item.itemCode}`} className="btn btn-primary me-2">View</Link>
                                <Link to={`/eventinventory/update/${item.itemCode}`} className="btn btn-warning me-2">Edit</Link>
                                <button onClick={() => handleDelete(item.itemCode)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EventInventoryList;
