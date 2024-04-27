const router = require("express").Router();
const Inventory = require("../../models/inventory_management_models/Inventory");

// Create a new inventory item
router.post("/add", (req, res) => {
    const { itemCode, itemName, amount, pricePerItem, brandName, supplierName } = req.body;
    
    const newItem = new Inventory({
        itemCode,
        itemName,
        amount,
        pricePerItem,
        brandName,
        supplierName
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
    const { itemName, amount, pricePerItem, brandName, supplierName } = req.body;
    
    Inventory.findOneAndUpdate({ itemCode }, { itemName, amount, pricePerItem, brandName, supplierName }, { new: true })
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
        const item = await Inventory.findOne({ itemCode: itemCode });
  
        if (!item) {
            console.log("Item not found");
            return res.status(404).json({ status: "Item not found" });
        }
  
        console.log("Item found:", item);
        res.status(200).json({ status: "Item Fetched", item: item });
    } catch (error) {
        console.error("Error fetching item:", error.message);
        res.status(500).json({ status: "Error with getting item", error: error.message });
    }
});


module.exports = router;
