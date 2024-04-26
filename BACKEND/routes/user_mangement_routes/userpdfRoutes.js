const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

// Route for generating PDF
router.post("/generateuserpdf", async (req, res) => {
  try {
    // Extract necessary data from request
    const { customers } = req.body;

    // Create a new PDF document
    const doc = new PDFDocument();

    // Add content to the PDF
    doc.text('Customer List');
    customers.forEach((customer) => {
      doc.text(`Name: ${customer.name}, NIC: ${customer.nic}`);
    });

    // Finalize the PDF
    const pdfData = await new Promise((resolve, reject) => {
      const chunks = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.end();
    });

    // Convert PDF data to base64
    const base64Data = pdfData.toString('base64');

    // Log the base64 encoded PDF data
    console.log("Base64 encoded PDF data:", base64Data);

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="customers.pdf"');

    // Send the base64 encoded PDF data in the response
    res.send(base64Data);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "An unexpected error occurred while generating PDF" });
  }
});

module.exports = router;
