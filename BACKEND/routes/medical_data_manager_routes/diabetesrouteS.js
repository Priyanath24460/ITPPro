const express = require("express");
const path = require("path");
const router = express.Router();
const Diabetes = require("../../models/medical_data_manager_models/diabetesdataS");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//router to add diabetes data with PDF

router.route("/adddiabetesdata").post(upload.single("pdfFile"),(req,res)=>{

    const nic = req.body.nic;
    const name = req.body.name;
    const level = req.body.level;
    const date = req.body.date;

    const pdfFile = req.file;


    const newdiabetes = new Diabetes({
        nic,
        name,
        level,
        date,
        pdf:{
            data: pdfFile.buffer,
            contentType:pdfFile.mimetype
        },
    });

    newdiabetes.save().then(()=>{
        res.json("new diabetes data added");
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error saving pressure data" });
      });
});

// Route to get diabetes data by NIC
router.route("/getonediabetesdata/:nic").get(async (req, res) => {
    try {
      const usernic = req.params.nic;
      const diabetes = await Diabetes.find({ nic: usernic }).select("-pdf.data");
  
      if (diabetes) {
        res.status(200).send({ status: "diabetes fetched", data: diabetes});
      } else {
        res.status(404).send({ status: "diabetes not found" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ status: "Error with get diabetes", error: err.message });
    }
  });

  // Add a new route to get PDF data by entry ID
/*router.route("/getpdf/:id").get(async (req, res) => {
  try {
    const diabetesId = req.params.id;
    const diabetesEntry = await Diabetes.findById(diabetesId);

    if (diabetesEntry && diabetesEntry.pdf && diabetesEntry.pdf.data) {
      res.setHeader('Content-Type', diabetesEntry.pdf.contentType);
      res.setHeader('Content-Disposition', `attachment; filename=${diabetesEntry.nic}_diabetes.pdf`);
      res.send(diabetesEntry.pdf.data);
    } else {
      res.status(404).send({ status: "PDF not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with get PDF", error: err.message });
  }
});*/


// Add a new route for updating diabetes data by ID
/*router.route("/update/:id").put(async (req, res) => {
  try {
    const diabetesId = req.params.id;
    const { level, date } = req.body;

    // Find the diabetes entry by ID and update the level and date
    const updatedDiabetes = await Diabetes.findByIdAndUpdate(
      diabetesId,
      { level, date },
      { new: true } // This option returns the updated document
    );

    if (updatedDiabetes) {
      res.status(200).send({ status: "Diabetes data updated", data: updatedDiabetes });
    } else {
      res.status(404).send({ status: "Diabetes data not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error updating diabetes data", error: err.message });
  }
});*/

// ... (existing imports and code)

// Add a new route to view PDF data by entry ID
router.route("/viewpdf/:id").get(async (req, res) => {
  try {
    const diabetesId = req.params.id;
    const diabetesEntry = await Diabetes.findById(diabetesId);

    if (diabetesEntry && diabetesEntry.pdf && diabetesEntry.pdf.data) {
      res.setHeader('Content-Type', diabetesEntry.pdf.contentType);
      res.send(diabetesEntry.pdf.data);
    } else {
      res.status(404).send({ status: "PDF not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with view PDF", error: err.message });
  }
});

// Route to update diabetes data PDF by ID
/*router.route("/updatepdf/:id").put(upload.single("pdfFile"), async (req, res) => {
  try {
    const diabetesId = req.params.id;
    const pdfFile = req.file;

    // Find the diabetes entry by ID
    const diabetesEntry = await Diabetes.findById(diabetesId);

    if (!diabetesEntry) {
      return res.status(404).send({ status: "Diabetes data not found" });
    }

    // Update the PDF data if a new file is provided
    if (pdfFile) {
      diabetesEntry.pdf.data = pdfFile.buffer;
      diabetesEntry.pdf.contentType = pdfFile.mimetype;

      // Save the updated diabetes entry
      await diabetesEntry.save();

      res.status(200).send({ status: "Diabetes data PDF updated", data: diabetesEntry });
    } else {
      res.status(400).send({ status: "No PDF file provided for update" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error updating diabetes data PDF", error: err.message });
  }
});*/

router.route("/update/:id").put(upload.single("pdfFile"), async (req, res) => {
  try {
    const diabetesId = req.params.id;
    const { level, date } = req.body;
    const pdfFile = req.file;

    // Find the diabetes entry by ID
    const diabetesEntry = await Diabetes.findById(diabetesId);

    if (!diabetesEntry) {
      return res.status(404).send({ status: "Diabetes data not found" });
    }

    // Update the level and date
    diabetesEntry.level = level;
    diabetesEntry.date = date;

    // Update the PDF data if a new file is provided
    if (pdfFile) {
      diabetesEntry.pdf.data = pdfFile.buffer;
      diabetesEntry.pdf.contentType = pdfFile.mimetype;
    }

    // Save the updated diabetes entry
    await diabetesEntry.save();

    res.status(200).send({ status: "Diabetes data updated", data: diabetesEntry });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error updating diabetes data", error: err.message });
  }
});






module.exports = router;