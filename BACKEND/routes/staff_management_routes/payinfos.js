const router = require("express").Router();
let PayInfo = require("../../models/staff_management_models/payinfo");

router.route("/add").post((req, res) => {
    const { adminBasic, managerBasic, bonus, OTrate } = req.body;

    const newPayInfo = new PayInfo({
        adminBasic,
        managerBasic,
        bonus,
        OTrate
    });

    newPayInfo.save()
        .then(() => {
            res.json("Payment information added");
        })
        .catch((err) => {
            console.error(err)
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

router.route("/update").put(async (req, res) => {
    const { adminBasic, managerBasic, bonus, OTrate } = req.body;

    const updatePayInfo = {
        adminBasic,
        managerBasic,
        bonus,
        OTrate
    };

    try {
        const payinfo = await PayInfo.findOneAndUpdate({}, updatePayInfo, { new: true, upsert: true });
        if (payinfo) {
            res.status(200).json({ status: "Information updated", payinfo });
        } else {
            res.status(404).json({ error: "Information not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update Information" });
    }
});


module.exports = router;
