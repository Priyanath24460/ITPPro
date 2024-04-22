const router = require("express").Router();
let Patient = require("../../models/medical_data_manager_models/PatientS");

router.route("/add").post((req,res) =>{

    const nic = req.body.nic;
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const date = req.body.date;
    const diabetes = req.body.diabetes;
    const cholesterol = req.body.cholesterol;
    const pressure = req.body.pressure;
    




    const newPatient = new Patient({

        nic,
        name,
        age,
        gender,
        date,
        diabetes,
        cholesterol,
        pressure,
       
    })

    newPatient.save().then(()=>{

         res.json("Patient Added");

    }).catch(()=>{

        console.log(err);

    })

})


router.route("/get").get((req,res)=>{

    Patient.find().then((patient)=>{

        res.json(patient)

    }).catch(()=>{

        console.log(err);

    })

})


router.route("/update").put(async(req,res) =>{

    
    const{nic,name,age,gender,date,diabetes,cholesterol,pressure}=req.body;

    const updatePatient = {
        nic,
        name,
        age,
        gender,
        date,
        diabetes,
        cholesterol,
        pressure,
        
    };
    
    try {
        const updatedPatient = await Patient.findOneAndUpdate({ nic: nic }, updatePatient, { new: true });
    
        if (!updatedPatient) {
          return res.status(404).send({ status: "Patient not found" });
        }
    
        res.status(200).send({ status: "Patient updated" });
      } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
      }
   

})

router.route("/delete").delete(async(req,res) =>{

    const usernic = req.body.nic;
    
    
     await Patient.findOneAndDelete({nic:usernic}).
    then(()=>{
    
        res.status(200).send({status:"Patient deleted"})  ; 
    }).catch((err)=>{

       console.log(err.message);
       res.status(500).send({status:"Error with delete user"});
   

    })
   

})

router.route("/getone/:nic").get(async (req, res) => {
    try {
      const usernic = req.params.nic;
      const patient = await Patient.findOne({nic:usernic});
      if (patient) {
        res.status(200).send({ status: "patient fetched", patient });
      } else {
        res.status(404).send({ status: "patient not found" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ status: "Error with get patient", error: err.message });
    }
  });



module.exports = router;
