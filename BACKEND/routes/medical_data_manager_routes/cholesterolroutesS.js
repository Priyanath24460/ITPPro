const express = require("express");
const path = require("path");
const router = express.Router();
const Cholesterol = require("../../models/medical_data_manager_models/cholesteroldata");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//router to add cholesterol data with PDF

router.route("/addcholesteroldata").post(upload.single("pdfFile"),(req,res)=>{

    const nic = req.body.nic;
    const name = req.body.name;
    const level = req.body.level;
    const date = req.body.date;

    const pdfFile = req.file;


    const newcholesterol = new Cholesterol({
        nic,
        name,
        level,
        date,
        pdf:{
            data: pdfFile.buffer,
            contentType:pdfFile.mimetype
        },
    });

    newcholesterol.save().then(()=>{
        res.json("new cholesterol data added");
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error saving cholesterol data" });
      });
});






// Update the "getonecholesteroldata" route in your server
router.route("/getonecholesteroldata/:nic").get(async (req, res) => {
  try {
    const usernic = req.params.nic;
    const cholesterol = await Cholesterol.find({ nic: usernic }).select("-pdf.data");
  
    

    if (cholesterol) {
      res.status(200).send({ status: "cholesterol fetched", data: cholesterol });
    } else {
      res.status(404).send({ status: "cholesterol not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with get cholesterol", error: err.message });
  }
});



router.route("/viewpdf/:id").get(async (req, res) => {
  try {
    const cholesterolID = req.params.id;
    const cholesterolEntry = await Cholesterol.findById(cholesterolID );

    if (cholesterolEntry && cholesterolEntry.pdf && cholesterolEntry.pdf.data) {
      res.setHeader('Content-Type', cholesterolEntry.pdf.contentType);
      res.send(cholesterolEntry.pdf.data);
    } else {
      res.status(404).send({ status: "PDF not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with view PDF", error: err.message });
  }
});





// Update cholesterol data

router.route("/update/:id").put(upload.single("pdfFile"), async (req, res) => {
  try {
    const cholesterolId = req.params.id;
    const { level, date } = req.body;
    const pdfFile = req.file;

    // Find the diabetes entry by ID
    const cholesterolEntry = await Cholesterol.findById(cholesterolId);

    if (!cholesterolEntry) {
      return res.status(404).send({ status: "cholesterol data not found" });
    }

    // Update the level and date
    cholesterolEntry.level = level;
    cholesterolEntry.date = date;

    // Update the PDF data if a new file is provided
    if (pdfFile) {
      cholesterolEntry.pdf.data = pdfFile.buffer;
      cholesterolEntry.pdf.contentType = pdfFile.mimetype;
    }

    // Save the updated diabetes entry
    await cholesterolEntry.save();

    res.status(200).send({ status: "cholesterol data updated", data: cholesterolEntry });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error updating cholesterol data", error: err.message });
  }
});

//  delete route for cholesterol data
router.route("/delete/:id").delete(async (req, res) => {
  try {
    const cholesterolId = req.params.id;

    // Find the cholesterol entry by ID and delete it
    const deletedCholesterol = await Cholesterol.findByIdAndDelete(cholesterolId);

    if (!deletedCholesterol) {
      return res.status(404).send({ status: "Cholesterol data not found" });
    }

    res.status(200).send({ status: "Cholesterol data deleted", data: deletedCholesterol });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error deleting cholesterol data", error: err.message });
  }
});







module.exports = router;