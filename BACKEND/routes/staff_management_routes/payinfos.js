const router = require("express").Router();
let PayInfo = require("../../models/staff_management_models/payinfo");

router.route("/add").post((req, res) => {
    const { basicSalary, role, bonus, OTrate } = req.body;

    // Create a new instance of PayInfo with the data fields, including the new otHours field
    const newPayInfo = new PayInfo({
        basicSalary,
        role,
        bonus,
        OTrate,
       // Add otHours field
    });

    // Save the new PayInfo document to the database
    newPayInfo.save()
        .then(() => {
            // Send a JSON response indicating success
            res.json("Payment information added");
        })
        .catch((err) => {
            // Log the error and send a JSON response indicating failure
            console.error(err);
            res.status(500).json({ error: "Failed to add payment information" });
        });
});

router.route("/").get((req, res) => {
    PayInfo.find().then((payinfos) => {
        res.json(payinfos)
    }).catch((err)=> {
        console.log(err);
        res.status(500).json({ error: "Failed to get payment information" });
    })
})

router.route("/updatesalarayinfo/:id").put(async (req, res) => {
    // Retrieve the ID parameter from the URL
    const { id } = req.params;

    // Retrieve the updated data from the request body
    const { basicSalary, role, bonus, OTrate, otHours } = req.body;

    // Create an object with the updated data
    const updatePayInfo = {
        basicSalary,
        role,
        bonus,
        OTrate,
        otHours
    };

    try {
        // Find the PayInfo document by ID and update it with the new data
        const payInfo = await PayInfo.findByIdAndUpdate(id, updatePayInfo, { new: true });

        // Check if the PayInfo document was found and updated
        if (payInfo) {
            // Send a JSON response indicating success and include the updated document
            res.status(200).json({ status: "Information updated", payInfo });
        } else {
            // Send a JSON response indicating the document was not found
            res.status(404).json({ error: "Information not found" });
        }
    } catch (err) {
        // Log the error and send a JSON response indicating failure
        console.error(err);
        res.status(500).json({ error: "Failed to update Information" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Retrieve the ID parameter from the URL
        const payInfo = await PayInfo.findById(id); // Find pay information data by ID

        // If pay information data is not found, return a 404 error
        if (!payInfo) {
            return res.status(404).json({ error: 'Pay information not found' });
        }

        // Send the pay information data as a JSON response
        res.json(payInfo);
    } catch (err) {
        console.error('Error fetching pay information data:', err);
        res.status(500).json({ error: 'Failed to fetch pay information data' });
    }
});

router.get('/role/:role', async (req, res) => {
    try {
        const { role } = req.params; // Retrieve the role parameter from the URL
        const payInfo = await PayInfo.findOne({ role }); // Find pay information data by role

        // If no pay information data is found, return a 404 error
        if (!payInfo) {
            return res.status(404).json({ error: `Pay information not found for role ${role}` });
        }

        // Send the pay information data as a JSON response
        res.json(payInfo);
    } catch (err) {
        console.error('Error fetching pay information data:', err);
        res.status(500).json({ error: 'Failed to fetch pay information data' });
    }
});



module.exports = router;
