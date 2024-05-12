import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const PaymentDetailsForm = () => {
  const [holderDetails, setHolderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [nic, setNic] = useState('');
  const [month, setMonth] = useState('');

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/paymentHolderDetails/${nic}/${month}`);
      setHolderDetails(response.data.holderDetails);
      setError(null); // Reset error state if successful
      setNic(''); // Clear NIC input field
      setMonth(''); // Clear month input field
    } catch (error) {
      setError('Error fetching data');
      setHolderDetails(null); // Reset holderDetails if error occurs
    }
  };

  const handleChangeNIC = (event) => {
    setNic(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchData();
  };

  const handleDownloadReceipt = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Calculate the center position based on the width of the text and the page width
    const textWidth = doc.getStringUnitWidth("Payment Receipt") * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const xPos = (doc.internal.pageSize.getWidth() - textWidth) / 2;

    // Add content to the PDF with center alignment and custom color
    doc.setTextColor(50, 50, 255); // Custom blue color
    doc.setFontSize(16);
    doc.text("Payment Receipt", xPos, 10);

    // Other PDF content
    doc.setTextColor(0, 0, 0); // Reset text color to black
    doc.setFontSize(12);
    doc.text("Payment Successful!", 10, 20);
    doc.text("Your payment has been successfully processed.", 10, 30);

    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", 10, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`Customer Name: ${holderDetails.customerName}`, 10, 50);
    doc.text(`Phone Number: ${holderDetails.phoneNumber}`, 10, 60);
    doc.text(`Email Address: ${holderDetails.EmailAddress}`, 10, 70);

    doc.setFont("helvetica", "bold");
    doc.text("Payment Details", 10, 80);
    doc.setFont("helvetica", "normal");
    doc.text(`Month of Payment: ${holderDetails.monthOfPayment}`, 10, 90);
    doc.text(`Monthly Cost: Rs.${holderDetails.monthlyCost}/-`, 10, 100);

    // Additional content with green color and increased font size using inline CSS, aligned to the center
    // Calculate the left margin
    const leftMargin = -30; // Adjust the margin value as needed

    // Calculate the position with left margin
    const xPosWithMargin = xPos + leftMargin;

    // Add content to the PDF with center alignment and custom color
    doc.setTextColor(0, 128, 0); // Green color
    doc.setFontSize(25); // Increased font size
    doc.text("Thank you for your payment!", xPosWithMargin, 120);

    // Save the PDF
    doc.save("payment_receipt.pdf");
  };

  return (
    <div className="container mt-2">
      <h1 className="mb-4">Payment History</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nic" className="form-label">Enter NIC:</label>
          <input type="text" id="nic" placeholder='Enter your NIC' className="form-control" value={nic} onChange={handleChangeNIC} />
        </div>
        <div className="mb-3">
          <label htmlFor="month" className="form-label">Select Month of Payment:</label>
          <select id="month" className="form-select" value={month} onChange={handleChangeMonth}>
            <option value="">Select Month...</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary me-2">View Your Payment</button>
        {holderDetails && (
          <button onClick={handleDownloadReceipt} className="btn btn-success">Download Payment Receipt</button>
        )}
      </form>
      {error && <p className="text-danger mt-5">{error}</p>}
{holderDetails && (
  <div className="mt-4">
    <h2 style={{ color: 'green' }}>Holder Details:</h2>
    <p><strong style={{ color: 'black' }}>Customer Name:</strong> <span style={{ color: 'green' }}>{holderDetails.customerName}</span></p>
    <p><strong style={{ color: 'black' }}>NIC:</strong> <span style={{ color: 'green' }}>{holderDetails.nic}</span></p>
    <p><strong style={{ color: 'black' }}>Phone Number:</strong> <span style={{ color: 'green' }}>{holderDetails.phoneNumber}</span></p>
    <p><strong style={{ color: 'black' }}>Email Address:</strong> <span style={{ color: 'green' }}>{holderDetails.EmailAddress}</span></p>
    <p><strong style={{ color: 'black' }}>Month of Payment:</strong> <span style={{ color: 'green' }}>{holderDetails.monthOfPayment}</span></p>
    <p><strong style={{ color: 'black' }}>Monthly Cost:</strong> <span style={{ color: 'green' }}>Rs {holderDetails.monthlyCost}/-</span></p>
    {/* Render other details as needed */}
  </div>
      )}
    </div>
  );
};

export default PaymentDetailsForm;
