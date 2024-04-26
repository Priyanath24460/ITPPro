const router = require("express").Router();
let PressureMedicine = require("../../models/medical_data_manager_models/pressureMedicine");

router.route("/addpressuremedicine").post((req,res)=>{


    const nic = req.body.nic;
    const name = req.body.name;
    const morningMedicine = req.body.morningMedicine;
    const morningdosage =req.body.morningdosage;
    const nightMedicine =req.body.nightMedicine;
    const nightdosage =req.body.nightdosage;
    const date =req.body.date;

    const newpressureMedicine = new PressureMedicine({

        nic,
        name,
        morningMedicine,
        morningdosage,
        nightMedicine,
        nightdosage,
        date

    })

    newpressureMedicine.save().then(()=>{

        res.json("Medicine Added");

    }).catch(()=>{

        console.log(err);
        
    })
});

//get pressureMedicine 

router.route("/get_pressure_Medicine/:nic").get(async (req, res) => {
    try {
      const usernic = req.params.nic;
      const pressureMedicine = await PressureMedicine .find({ nic: usernic })
  
      if (pressureMedicine) {
        res.status(200).send({ status: "pressure fetched", data: pressureMedicine });
      } else {
        res.status(404).send({ status: "pressure not found" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ status: "Error with get pressure", error: err.message });
    }
  });

// update pressureMedicine

router.route("/update_pressure_Medicine/:id").put(async(req,res)=>{
  try{
    const {morning_Medicine,morning_dosage,night_Medicine,night_dosage,date} = req.body;
    const pressure_Medicine_id = req.params.id;

      const pressure_medicine_Entry = await PressureMedicine.findById(pressure_Medicine_id);

      if(!pressure_medicine_Entry){
        return res.status(400).send({status:"pressure Medicine data not found"});
      }

      //update the data

      pressure_medicine_Entry.morningMedicine = morning_Medicine;
      pressure_medicine_Entry.morningdosage = morning_dosage;
      pressure_medicine_Entry.nightMedicine = night_Medicine;
      pressure_medicine_Entry.nightdosage = night_dosage;
      pressure_medicine_Entry.date = date;

      //savve the updated diabetes data

      await pressure_medicine_Entry.save();

      res.status(200).send({ status: "pressure Medicine data updated", data: pressure_medicine_Entry });

  }catch(err){
    console.error(err.message);
    res.status(500).send({status:"Error updating pressure Medicine data",error:err.message});
  }
});

// Route to delete pressure medicine data by ID
router.route("/delete_pressure_medicine/:id").delete(async (req, res) => {
  try {
      const pressureMedicineId = req.params.id;

      // Find the pressure medicine entry by ID and delete it
      const deletedPressureMedicine = await PressureMedicine.findByIdAndDelete(pressureMedicineId);

      if (!deletedPressureMedicine) {
          return res.status(404).send({ status: "Pressure medicine data not found" });
      }

      res.status(200).send({ status: "Pressure medicine data deleted", data: deletedPressureMedicine });
  } catch (err) {
      console.error(err.message);
      res.status(500).send({ status: "Error deleting pressure medicine data", error: err.message });
  }
});



module.exports = router;