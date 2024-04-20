const router = require("express").Router();
let cholesterolMedicine = require("../../models/medical_data_manager_models/cholesterolMedicine")


router.route("/add_cholesterol_medicine").post((req,res)=>{


    const nic = req.body.nic;
    const name = req.body.name;
    const morningMedicine = req.body.morningMedicine;
    const morningdosage =req.body.morningdosage;
    const nightMedicine =req.body.nightMedicine;
    const nightdosage =req.body.nightdosage;
    const date =req.body.date;

    const newcholesterolMedicine = new cholesterolMedicine({

        nic,
        name,
        morningMedicine,
        morningdosage,
        nightMedicine,
        nightdosage,
        date

    })

    newcholesterolMedicine.save().then(()=>{

        res.json("Medicine Added");

    }).catch(()=>{

        console.log(err);
        
    })
});

//get cholesterolMedicine 

router.route("/get_cholesterol_Medicine/:nic").get(async (req, res) => {
    try {
      const usernic = req.params.nic;
      const CholesterolMedicine = await cholesterolMedicine .find({ nic: usernic })
  
      if (CholesterolMedicine) {
        res.status(200).send({ status: "cholesterol fetched", data: CholesterolMedicine });
      } else {
        res.status(404).send({ status: "cholesterol  not found" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ status: "Error with get cholesterol ", error: err.message });
    }
  });

  //update cholesterol medicine 

  router.route("/update_cholesterol_Medicine/:id").put(async(req,res)=>{
    try{
        const cholesterol_Medicine_id = req.params.id;
        const {morning_Medicine,morning_dosage,night_Medicine,night_dosage,date} = req.body;

        const cholesterol_medicine_Entry = await cholesterolMedicine.findById(cholesterol_Medicine_id);

        if(!cholesterol_medicine_Entry){
          return res.status(400).send({status:"Cholesterol Medicine data not found"});
        }

        //update the data

        cholesterol_medicine_Entry.morningMedicine = morning_Medicine;
        cholesterol_medicine_Entry.morningdosage = morning_dosage;
        cholesterol_medicine_Entry.nightMedicine = night_Medicine;
        cholesterol_medicine_Entry.nightdosage = night_dosage;
        cholesterol_medicine_Entry.date = date;

        //savve the updated diabetes data

        await cholesterol_medicine_Entry.save();

        res.status(200).send({ status: "cholesterol Medicine data updated", data: cholesterol_medicine_Entry });

    }catch(err){
      console.error(err.message);
      res.status(500).send({status:"Error updating cholesterol Medicine data",error:err.message});
    }
  });





module.exports = router;