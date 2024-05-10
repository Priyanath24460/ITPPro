const router = require("express").Router();
let Payment = require("../../models/payment_management_model/payment");


// insert the card details
router.route("/addCardDetaiils").post((req,res) =>{

    const cardNumber = req.body.cardNumber;
    const expireDate = req.body.expireDate;
    const cvvNumber = req.body.cvvNumber;
    const paymentMethod = req.body.paymentMethod;

    const newpayment = new Payment({

        paymentMethod,
        cardNumber,
        expireDate,
        cvvNumber

    })

    newpayment.save().then(()=>{

        res.json("Account Details Added..")
    }).catch((err)=>{

        console.log(err);
    })

})
// retrive the card details
router.route("/viewDetails").get((req,res)=>{

    Payment.find().then((Payments)=>{

        res.json(Payments)
    }).catch((err)=>{

        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{

        let paymentId = req.params.id;
        const {paymentMethod, cardNumber,expireDate,cvvNumber} = req.body; // D Structure 

        const updatePaymentDetails = {
            paymentMethod,
            cardNumber,
            expireDate,
            cvvNumber
        }
      
        const update = await Payment.findByIdAndUpdate(paymentId, updatePaymentDetails).then(()=>{
            res.status(200).send({status: "Payment Details Updated..."})

        }).catch((err)=>{

            console.log(err);
            res.status(500).send({status:"Error with updating data...", error: err.message});
        })       

})

router.route("/delete/:id").delete(async(req,res)=>{

    let paymentId = req.params.id;
    await Payment.findByIdAndDelete(paymentId).then(()=>{

        res.status(200).send({status:"Card Details deleted..."});
    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status:"Error with delete Card Details...", error: err.message});
    })
})
router.route("/get/:id").get(async(req,res)=>{
    let paymentId = req.params.id;
    await Payment.findById(paymentId).then((accountdetails)=>{
        
        res.status(200).send({status:"AccountDetails fetched", accountdetails})
    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status:"Error with Fetch Account Details.."})
    })

})

router.route("/get/:nic").get(async (req, res) => {
    let nic = req.params.nic;
    await Payment.findOne({ nic: nic }).then((accountdetails) => {
        if (accountdetails) {
            res.status(200).send({ status: "AccountDetails fetched", accountdetails });
        } else {
            res.status(404).send({ status: "AccountDetails not found" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Fetch Account Details" });
    });
});

router.get("/viewDetails/:cardNumber", async (req, res) => {
    const cardNumber = req.params.cardNumber;
  
    try {
      // Query the database to find the user details by card number
      const user = await PaymentDetails.findOne({ cardNumber });
  
      if (user) {
        // If user details are found, send them as a response
        res.status(200).json(user);
      } else {
        // If user is not found, return a 404 status with an error message
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      // If an error occurs, return a 500 status with an error message
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;