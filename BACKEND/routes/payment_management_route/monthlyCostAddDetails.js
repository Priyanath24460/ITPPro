const router = require("express").Router();
const monthlyCostDetails = require("../../models/payment_management_model/monthlyCostAdd");
const monthlyCostAdd = require("../../models/payment_management_model/monthlyCostAdd");
const { route } = require("../../routes/payment_management_route/paymentHolderDetails");

// Insert the monthly cost

router.route("/addcost").post((req,res)=>{

    const monthlyCost = req.body.monthlyCost;


    const newCost = new monthlyCostDetails({
       
        monthlyCost

    })

    newCost.save().then(()=>{

        res.json("Monthly cost added...")
    }).catch((err)=>{

        console.log(err);
    })

})

// retrive the holder details

router.route("/cost").get((req,res)=>{

    monthlyCostDetails.find().then((monthlyCostDetails)=>{

        res.json(monthlyCostDetails)
    }).catch((err)=>{

        console.log(err);
    })

})
// update the monthly cost details

router.route("/updatecost/:id").put(async(req,res)=>{

    let monthlyCostDetailsId = req.params.id;
    const {monthlyCost} = req.body // D Structure

    const updatemonthlyCostDetails = {

        monthlyCost
    }
    const update = await monthlyCostDetails.findByIdAndUpdate(monthlyCostDetailsId,updatemonthlyCostDetails).then(()=>{
        res.status(200).send({status:"Monthly Cost Updated..."})
    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status:"Error with updating data...",error:err.message})
    })

})
// delete the cost details

router.route("/deletecost/:id").delete(async(req,res)=>{

    let monthlyCostDetailsId = req.params.id;
    await monthlyCostDetails.findByIdAndDelete(monthlyCostDetailsId).then(()=>{

        res.status(200).send({status:"Monthly cost Details deleted..."});
    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status:"Error with deleting data...",error:err.message})
    })
})
// get the one value
router.route("/getcost/:id").get(async(req,res)=>{
    let monthlyCostDetailsId = req.params.id;
    await paymentDetails.findById(monthlyCostDetailsId).then((monthlyCostAddDetails)=>{

        res.status(200).send({status:"Monthly cost details fetched...",monthlyCostAddDetails})
    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status:"Error with fetch Monthly cost details..."})
    })
})

module.exports = router;