const router = require("express").Router();
let PayRoll = require("../../models/staff_management_models/PayRoll");

router.post('/addpayroll', async (req, res) => {
    try {
        // Retrieve the data from the request body
        const { nic, name, role, salary, otHours } = req.body; // Include otHours

        // Create a new payRoll document with the data
        const newPayRoll = new PayRoll({
            nic,
            name,
            role,
            salary,
            otHours, // Include otHours in the new payRoll document
        });

        // Save the new payRoll document to the database
        await newPayRoll.save();

        // Send a success response
        res.status(201).json({ message: 'Total salary and OT hours saved successfully!' });
    } catch (err) {
        console.error('Failed to save total salary and OT hours:', err);
        res.status(500).json({ error: 'Failed to save total salary and OT hours' });
    }
});

router.route("/PayRoll").get((req, res) => {
    PayRoll.find().then((payRolls) => {
        res.json(payRolls)
    }).catch((err)=> {
        console.log(err)
    })
})

router.route("/update").put(async (req, res) => {
    const userNic = req.params.nic;
    const { adminBasic, managerBasic, bonus, OTrate } = req.body;

    const updateUser = {
        adminBasic,
        managerBasic,
        bonus,
        OTrate
    };

    try {
        const user = await PayRoll.findOneAndUpdate({ nic: userNic }, updateUser, { new: true });
        if (user) {
            res.status(200).json({ status: "User updated", user });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user" });
    }
});


router.route("/delete/:nic").delete(async(req,res)=>{
    let userNic = req.params.nic;
  
    await PayRoll.findOneAndDelete({ nic: userNic }).then((deletedUser)=>{
       if (deletedUser) {
          res.status(200).send({ status: "User deleted", deletedUser });
       } else {
          res.status(404).send({ status: "User not found" });
       }
    }).catch((err)=>{
       console.log(err.message);
       res.status(500).send({ status: "Error with delete user", error: err.message });
    });
  });


router.route("/get/:nic").get(async (req, res) => {
    let userNic = req.params.nic;

    try {
        const user = await PayRoll.findOne({ nic: userNic }); // Using findOne to find a user by NIC
        if (user) {
            res.status(200).json({ status: "User fetched", user });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get user" });
    }
});

router.get('/getallpayrolls', async (req, res) => {
    try {
        // Fetch all payroll records from the payRoll model
        const payrolls = await PayRoll.find();

        // Send the payroll records as a JSON response
        res.json(payrolls);
    } catch (err) {
        console.error('Failed to fetch payroll records:', err);
        res.status(500).json({ error: 'Failed to fetch payroll records' });
    }
});

router.delete('/deletepayroll/:nic', async (req, res) => {
    const { nic } = req.params;

    try {
        // Delete the payroll record from the database
        await PayRoll.findOneAndDelete({ nic });

        // Send a success response
        res.json({ message: 'Payroll record deleted successfully!' });
    } catch (err) {
        console.error('Failed to delete payroll record:', err);
        res.status(500).json({ error: 'Failed to delete payroll record' });
    }
});



module.exports = router;
