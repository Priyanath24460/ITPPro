const express = require('express');
const router = express.Router();
const EventInventory = require('../../models/inventory_management_models/EventInventory');

// Create a new event inventory item
router.post('/add', (req, res) => {
    const { itemCode, itemName, amount, condition } = req.body;
    
    const newItem = new EventInventory({
        itemCode,
        itemName,
        amount,
        condition
    });

    newItem.save()
        .then(item => {
            res.json({ message: "Event inventory item added successfully", item });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to add event inventory item", message: err.message });
        });
});

// Get all event inventory items
router.get('/', (req, res) => {
    EventInventory.find()
        .then(items => {
            res.status(200).json({ eventInventory: items });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to fetch event inventory", message: err.message });
        });
});

// Update an event inventory item
router.put('/update/:itemCode', (req, res) => {
    const { itemCode } = req.params;
    const { itemName, amount, condition } = req.body;
    
    EventInventory.findOneAndUpdate({ itemCode }, { itemName, amount, condition }, { new: true })
        .then(updatedItem => {
            if (!updatedItem) {
                return res.status(404).json({ error: "Event inventory item not found" });
            }
            res.json({ message: "Event inventory item updated successfully", item: updatedItem });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to update event inventory item", message: err.message });
        });
});

// Delete an event inventory item
router.delete('/delete/:itemCode', (req, res) => {
    const { itemCode } = req.params;

    EventInventory.findOneAndDelete({ itemCode })
        .then(deletedItem => {
            if (!deletedItem) {
                return res.status(404).json({ error: "Event inventory item not found" });
            }
            res.json({ message: "Event inventory item deleted successfully" });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to delete event inventory item", message: err.message });
        });
});

// Fetch a specific event inventory item by itemCode
router.get('/:itemCode', async (req, res) => {
    const itemCode = req.params.itemCode;
    console.log("Fetching event inventory item with code:", itemCode); // Logging for debugging
    try {
        const item = await EventInventory.findOne({ itemCode: itemCode });
  
        if (!item) {
            console.log("Event inventory item not found");
            return res.status(404).json({ status: "Event inventory item not found" });
        }
  
        console.log("Event inventory item found:", item);
        res.status(200).json({ status: "Event inventory item fetched", item: item });
    } catch (error) {
        console.error("Error fetching event inventory item:", error.message);
        res.status(500).json({ status: "Error with getting event inventory item", error: error.message });
    }
});

module.exports = router;
