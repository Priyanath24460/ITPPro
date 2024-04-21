const router = require("express").Router();
let PayRoll = require("../../models/staff_management_models/PayRoll");

router.route("/addPayRoll").post((req, res) => {
    const { nic, name, position, salary } = req.body;

    const newPayRoll = new PayRoll({
        nic,
        name,
        position,
        salary
    });

    newPayRoll.save()
        .then(() => {
            res.json("Added");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to add" });
        });
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



module.exports = router;
