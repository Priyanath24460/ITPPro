const router = require("express").Router();
const paymentDetails = require("../../models/payment_management_model/paymentHolder");

// Insert the payment holder details
router.route("/addn").post((req, res) => {
    const { customerName, phoneNumber, EmailAddress, monthOfPayment, monthlyCost,nic } = req.body; // Destructure req.body

    const newDetails = new paymentDetails({
        customerName,
        phoneNumber,
        EmailAddress,
        monthOfPayment,
        monthlyCost,
        nic
    });

    newDetails.save().then(() => {
        res.json("Payment Holder Details Added...");
    }).catch((err) => {
        console.log(err);
    });
});

// Retrieve the holder details
router.route("/n").get((req, res) => {
    paymentDetails.find().then((paymentDetails) => {
        res.json(paymentDetails);
    }).catch((err) => {
        console.log(err);
    });
});


// Update the holder details
router.route("/updaten/:id").put(async (req, res) => {
    const PaymentDetailsId = req.params.id;
    const { customerName, phoneNumber, EmailAddress, monthOfPayment, monthlyCost,nic } = req.body; // Destructure req.body

    const updatePaymentHolderDetails = {
        customerName,
        phoneNumber,
        EmailAddress,
        monthOfPayment,
        monthlyCost,
        nic
        
    };

    await paymentDetails.findByIdAndUpdate(PaymentDetailsId, updatePaymentHolderDetails).then(() => {
        res.status(200).send({ status: "Payment Holder Details Updated..." });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data...", error: err.message });
    });
});

// Delete the holder details
router.route("/deleten/:id").delete(async (req, res) => { 
    const PaymentDetailsId = req.params.id;

    await paymentDetails.findByIdAndDelete(PaymentDetailsId).then(() => {
        res.status(200).send({ status: "Payment holder Details deleted..." });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete Payment holder details....", error: err.message });
    });
});

// Get one value
router.route("/getn/:id").get(async (req, res) => {
    const PaymentDetailsId = req.params.id;

    await paymentDetails.findById(PaymentDetailsId).then((paymentholdersdetails) => {
        res.status(200).send({ status: "Payment Holder details fetched...", paymentholdersdetails });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with fetch payment holder details..." });
    });
});

// Get one value
router.route("/:nic/:month").get(async (req, res) => {
    const nic = req.params.nic;
    const month = req.params.month;

    try {
        const holderDetails = await paymentDetails.findOne({ nic: nic, monthOfPayment: month });
        res.status(200).send({ status: "Payment Holder details fetched...", holderDetails });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with fetch payment holder details..." });
    }
});



module.exports = router;
