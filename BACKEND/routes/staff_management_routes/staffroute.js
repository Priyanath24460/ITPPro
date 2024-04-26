const router = require("express").Router();
let StaffRoute = require("../../models/user_management_models/staff.js");

router.get('/getallstaff', async (req, res) => {
    try {
        // Query the Staff model to get NIC, name, and role for all staff members
        const staffMembers = await StaffRoute.find({}, 'nic name role');

        // Return the data as a JSON response
        res.json(staffMembers);
    } catch (error) {
        console.error('Failed to get staff members:', error);
        res.status(500).json({ error: 'Failed to get staff members' });
    }
});

module.exports = router;