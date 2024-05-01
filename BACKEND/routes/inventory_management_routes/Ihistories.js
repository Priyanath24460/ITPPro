// routes/history.js

const router = require("express").Router();
const History = require("../../models/inventory_management_models/Ihistory");

// Get all history entries
router.get("/", async (req, res) => {
    try {
        const history = await History.find();
        res.status(200).json({ history });
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ error: "Failed to fetch history", message: error.message });
    }
});

// Add a new history entry
router.post("/add", async (req, res) => {
    try {
        const { itemCode, operation, count, pricePerItem, updateDate } = req.body;

        // Create a new history entry
        const newHistoryEntry = new History({
            itemCode,
            operation,
            count,
            pricePerItem,
            updateDate: updateDate || new Date() // Use current date if updateDate is not provided
        });

        // Save the new history entry
        await newHistoryEntry.save();

        res.status(201).json({ message: "History entry added successfully", historyEntry: newHistoryEntry });
    } catch (error) {
        console.error("Error adding history entry:", error);
        res.status(500).json({ error: "Failed to add history entry", message: error.message });
    }
});

// Delete a history entry by item code
router.delete("/delete/:itemCode", async (req, res) => {
    try {
        const { itemCode } = req.params;

        // Find and delete the history entry by item code
        const deletedEntry = await History.findOneAndDelete({ itemCode });

        if (!deletedEntry) {
            return res.status(404).json({ error: "History entry not found" });
        }

        res.status(200).json({ message: "History entry deleted successfully", deletedEntry });
    } catch (error) {
        console.error("Error deleting history entry:", error);
        res.status(500).json({ error: "Failed to delete history entry", message: error.message });
    }
});

module.exports = router;
