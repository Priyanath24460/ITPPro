const router = require("express").Router();
const Inventory = require("../Models/Inventory");


// Create a new inventory item
router.post("/add", (req, res) => {
    const { itemCode, itemName, amount, pricePerItem, brandName, supplierName, expireDate } = req.body;
    
    const newItem = new Inventory({
        itemCode,
        itemName,
        amount,
        pricePerItem,
        brandName,
        supplierName,
        expireDate // Include expireDate in the new item
    });

    newItem.save()
        .then(item => {
            res.json({ message: "Item added successfully", item });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to add item", message: err.message });
        });
});

// Get all inventory items
router.get("/", (req, res) => {
    Inventory.find()
        .then(inventory => {
            res.status(200).json({ inventory });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to fetch inventory", message: err.message });
        });
});

// Update an inventory item
router.put("/update/:itemCode", (req, res) => {
    const { itemCode } = req.params;
    const { itemName, amount, pricePerItem, brandName, supplierName, expireDate } = req.body;
    
    Inventory.findOneAndUpdate({ itemCode }, { itemName, amount, pricePerItem, brandName, supplierName, expireDate }, { new: true })
        .then(updatedItem => {
            if (!updatedItem) {
                return res.status(404).json({ error: "Item not found" });
            }
            res.json({ message: "Item updated successfully", item: updatedItem });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to update item", message: err.message });
        });
});



// Delete an inventory item
router.delete("/delete/:itemCode", (req, res) => {
    const { itemCode } = req.params;

    // Implement logic to delete the item with the specified itemCode from the database
    // Example:
    Inventory.findOneAndDelete({ itemCode })
        .then(deletedItem => {
            if (!deletedItem) {
                return res.status(404).json({ error: "Item not found" });
            }
            res.json({ message: "Item deleted successfully" });
        })
        .catch(err => {
            res.status(500).json({ error: "Failed to delete item", message: err.message });
        });
});

router.route("/:itemCode").get(async (req, res) => {
    const itemCode = req.params.itemCode;
    console.log("Fetching item with code:", itemCode); // Logging for debugging
    try {
      // Attempt to find the item in the inventory based on its item code
      const item = await Inventory.findOne({ itemCode: itemCode });
  
      if (!item) {
        // If the item is not found, log a message and return a 404 status with a corresponding JSON response
        console.log("Item not found");
        return res.status(404).json({ status: "Item not found" });
      }
  
      // If the item is found, log a message and return a 200 status with the item details as a JSON response
      console.log("Item found:", item);
      res.status(200).json({ status: "Item Fetched", item: item });
    } catch (error) {
      // If an error occurs during the process, log the error and return a 500 status with an error message
      console.error("Error fetching item:", error.message);
      res.status(500).json({ status: "Error with getting item", error: error.message });
    }
});

router.get('/searchByName', async (req, res) => {
    const { itemName } = req.query;

    try {
        // Perform a case-insensitive search for items by name
        const items = await Inventory.find({ itemName: { $regex: new RegExp(itemName, 'i') } });

        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found' });
        }

        res.json(items);
    } catch (error) {
        console.error("Error searching items:", error);
        res.status(500).json({ error: "Failed to search items", message: error.message });
    }
});



module.exports = router; // Export the router1 module


