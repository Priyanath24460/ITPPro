const router = require("express").Router();
let diabetesMedicine = require("../../models/medical_data_manager_models/diabetesMedicine")


router.route("/add_diabetes_medicine").post((req,res)=>{


    const nic = req.body.nic;
    const name = req.body.name;
    const morningMedicine = req.body.morningMedicine;
    const morningdosage =req.body.morningdosage;
    const nightMedicine =req.body.nightMedicine;
    const nightdosage =req.body.nightdosage;
    const date =req.body.date;

    const newdiabetesMedicine = new diabetesMedicine({

        nic,
        name,
        morningMedicine,
        morningdosage,
        nightMedicine,
        nightdosage,
        date

    })

    newdiabetesMedicine.save().then(()=>{

        res.json("Medicine Added");

    }).catch(()=>{

        console.log(err);
        
    })
});

//get DiabetesMedicine 

router.route("/get_diabetes_Medicine/:nic").get(async (req, res) => {
    try {
      const usernic = req.params.nic;
      const DiabetesMedicine = await diabetesMedicine .find({ nic: usernic })
  
      if (DiabetesMedicine) {
        res.status(200).send({ status: "Diabetes fetched", data: DiabetesMedicine });
      } else {
        res.status(404).send({ status: "Diabetes  not found" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ status: "Error with get Diabetes ", error: err.message });
    }
  });

  // update DiabetesMedicine 

  router.route("/update_diabetes_Medicine/:id").put(async(req,res)=>{
    try{
        const diabetes_Medicine_id = req.params.id;
        const {morning_Medicine,morning_dosage,night_Medicine,night_dosage,date} = req.body;

        const diabetes_medicine_Entry = await diabetesMedicine.findById(diabetes_Medicine_id);

        if(!diabetes_medicine_Entry){
          return res.status(400).send({status:"diabetes Medicine data not found"});
        }

        //update the data

        diabetes_medicine_Entry.morningMedicine = morning_Medicine;
        diabetes_medicine_Entry.morningdosage = morning_dosage;
        diabetes_medicine_Entry.nightMedicine = night_Medicine;
        diabetes_medicine_Entry.nightdosage = night_dosage;
        diabetes_medicine_Entry.date = date;

        //savve the updated diabetes data

        await diabetes_medicine_Entry.save();

        res.status(200).send({ status: "diabetes Medicine data updated", data: diabetes_medicine_Entry });

    }catch(err){
      console.error(err.message);
      res.status(500).send({status:"Error updating diabetes Medicine data",error:err.message});
    }
  });



module.exports = router;