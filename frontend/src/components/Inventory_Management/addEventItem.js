import React, { useState } from 'react';
import './AddItemForm.css'; // Import CSS for styling

function AddItemForm() {
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [amount, setAmount] = useState(0);
    const [condition, setCondition] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8070/eventinventory/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itemCode,
                    itemName,
                    amount,
                    condition
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add item');
            }

            const data = await response.json();
            alert('Item added successfully:\n' + JSON.stringify(data.item));
            window.location.href = '/eventinventory';

            // Clear form fields after successful submission
            setItemCode('');
            setItemName('');
            setAmount(0);
            setCondition('');
        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to add item:\n' + error.message);
        }
    };

    return (
        <div className="addItemFormContainer">
            <h3 className="addItemFormTitle">Add Event Inventory Item</h3>
            <form onSubmit={handleSubmit} className="addItemForm">
                <div className="formGroup">
                    <label htmlFor="itemCode">Item Code:</label>
                    <input type="text" id="itemCode" value={itemCode} onChange={(e) => setItemCode(e.target.value)} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="itemName">Item Name:</label>
                    <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="condition">Condition:</label>
                    <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} required>
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                        <option value="Not Working">Not Working</option>
                    </select>
                </div>

                <button type="submit" className="addItemButton">Add Item</button>
            </form>
        </div>
    );
}

export default AddItemForm;
