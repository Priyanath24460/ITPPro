import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import logo from '../../../src/letterhead.jpg'; // Import the JPG image

function TotalCostCalculator() {
  const [charges, setCharges] = useState({});
  const [selectedCharge, setSelectedCharge] = useState('');
  const [newChargeValue, setNewChargeValue] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const chargeNames = ['Inventory Charge', 'Meal Charge', 'Other Charge'];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleChargeChange = (index, value) => {
    const newCharges = { ...charges };
    newCharges[selectedMonth][index].value = value;
    setCharges(newCharges);
  };

  const handleNewChargeAdd = () => {
    if (selectedCharge && newChargeValue && selectedMonth) {
      const updatedCharges = { ...charges };
      updatedCharges[selectedMonth] = updatedCharges[selectedMonth] || [];
      updatedCharges[selectedMonth].push({ name: selectedCharge, value: newChargeValue });
      setCharges(updatedCharges);
      setNewChargeValue('');
    }
  };

  const calculateTotal = () => {
    if (!charges[selectedMonth]) return 0;
    return charges[selectedMonth].reduce((acc, charge) => acc + parseFloat(charge.value || 0), 0);
  };

  const handleDownloadPDF = () => {
    if (!charges[selectedMonth]) return; // Add a check to ensure charges[selectedMonth] exists

    const doc = new jsPDF();

// Add letterhead
doc.addImage(logo, 'JPEG',0.5,1, 210, 300); // Adjust the coordinates and size as needed
// doc.setFontSize(26); // Set font size
// doc.setTextColor(0, 128, 0); // Set text color to green (RGB: 0, 128, 0)
// doc.text('Human Care Center', 70, 25);

 // Add contact information with reduced font size and color
// doc.setFontSize(10); // Reduce font size further
// doc.setTextColor(150, 150, 150); // Set text color to a lighter shade of gray
// doc.text('TEL:072-6896542 / 011-1224568', 80, 30);
// doc.text('humancarehome@gmai.com', 140, 30);

// doc.setDrawColor(0, 0, 0); // Set line color to black
// doc.setLineWidth(0.5); // Set line width
// doc.line(20, 50, 190, 50); // Draw a line to close the letterhead section



    // Set up styles
    doc.setFont('helvetica'); // Set font to Helvetica
    doc.setFontSize(12); // Set font size to 12
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.setFillColor(200, 200, 200); // Set fill color to light gray for table headers

    // Add title
    doc.text('Total Cost Details', 10, 80);

    // Add charges
    let yPos = 90;
    charges[selectedMonth].forEach((charge, index) => {
      doc.text(`${charge.name}: Rs. ${charge.value}`, 10, yPos);
      yPos += 10;
    });

    // // Add table headers with background color
    // doc.rect(10, yPos, 70, 10, 'F'); // Draw rectangle for Charge Name header
    // doc.rect(80, yPos, 70, 10, 'F'); // Draw rectangle for Charge Value header
    // doc.setTextColor(255, 255, 255); // Set text color to white for headers
    // doc.text('Charge Name', 15, yPos + 7);
    // doc.text('Charge Value', 85, yPos + 7);
    // yPos += 10;

    // Set text color back to black for table data
    doc.setTextColor(0, 0, 0);

    // Add charges to the table
    // charges[selectedMonth].forEach((charge, index) => {
    //   doc.text(charge.name, 15, yPos);
    //   doc.text(`Rs. ${charge.value}`, 85, yPos);
    //   yPos += 10;
    // });

    // Calculate total and add it to the PDF
    const totalYPos = yPos + 10;
    doc.text(`Total Cost: Rs. ${calculateTotal()}`, 10, totalYPos);

    doc.save(`${selectedMonth}_total_cost.pdf`);
  };

  return (
    <div className="container">
      <h2 className="text-success">Total Cost Calculator</h2>
      <div className="form-group">
        <label htmlFor="month">Select Month:</label>
        <select className="form-control" id="month" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">-- Select Month --</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="charge">Select Charge:</label>
        <select className="form-control" id="charge" value={selectedCharge} onChange={(e) => setSelectedCharge(e.target.value)}>
          <option value="">-- Select Charge --</option>
          {chargeNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
        <input
          type="number"
          className="form-control"
          placeholder="Charge Value"
          value={newChargeValue}
          onChange={(e) => setNewChargeValue(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={handleNewChargeAdd}>Add New Charge</button>
      </div>
      {selectedMonth && (
        <div>
          <h3 className="text-success">{selectedMonth} Total Cost: Rs. {calculateTotal()}</h3>
          <table className="ktable table-bordered table-striped" style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
            <thead style={{ backgroundColor: '#f0f0f0' }}>
              <tr>
                <th style={{ padding: '10px', textAlign: 'center' }}>Charge Name</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Charge Value</th>
              </tr>
            </thead>
            <tbody>
              {charges[selectedMonth] && charges[selectedMonth].map((charge, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{charge.name}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{charge.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={handleDownloadPDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
}

export default TotalCostCalculator;
