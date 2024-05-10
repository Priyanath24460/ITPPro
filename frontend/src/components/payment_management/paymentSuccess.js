import React from "react";
import { useLocation, Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { BsCheckCircle } from 'react-icons/bs'; 

const PaymentSuccess = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const customerName = params.get("customerName");
    const phoneNumber = params.get("phoneNumber");
    const EmailAddress = params.get("EmailAddress");
    const monthOfPayment = params.get("monthOfPayment");
    const monthlyCost = params.get("monthlyCost");

    // Function to handle PDF receipt download
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
        doc.text(`Customer Name: ${customerName}`, 10, 50);
        doc.text(`Phone Number: ${phoneNumber}`, 10, 60);
        doc.text(`Email Address: ${EmailAddress}`, 10, 70);

        doc.setFont("helvetica", "bold");
        doc.text("Payment Details", 10, 80);
        doc.setFont("helvetica", "normal");
        doc.text(`Month of Payment: ${monthOfPayment}`, 10, 90);
        doc.text(`Monthly Cost: Rs.${monthlyCost}/-`, 10, 100);

        // Additional content with green color and increased font size using inline CSS, aligned to the center
        // Calculate the left margin
const leftMargin = -30; // Adjust the margin value as needed

// Calculate the position with left margin
const xPosWithMargin = xPos + leftMargin;

// Add content to the PDF with center alignment and custom color
doc.setTextColor(0, 128, 0); // Green color
doc.setFontSize(25); // Increased font size
doc.text("Thank you for your payment!", xPosWithMargin, 120);
        // doc.text("Have a great day!", xPos, 130);

        // Save the PDF
        doc.save("payment_receipt.pdf");
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title" style={{ color: "green", textAlign: "center" }}>
                                <BsCheckCircle /> Payment Successful!
                            </h2>
                            <p className="card-text" style={{ textAlign: "center" }}>Your payment has been successfully processed.</p>
                            <p style={{ textAlign: "center" }}><strong>Customer Name:</strong> {customerName}</p>
                            <p style={{ textAlign: "center" }}><strong>Phone Number:</strong> {phoneNumber}</p>
                            <p style={{ textAlign: "center" }}><strong>Email Address:</strong> {EmailAddress}</p>
                            <p style={{ textAlign: "center" }}><strong>Month of Payment:</strong> {monthOfPayment}</p>
                            <p style={{ textAlign: "center" }}><strong>Monthly Cost:</strong> <span style={{ color: "blue" }}>Rs.{monthlyCost}/-</span></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Back button positioned at the bottom left */}
            <div className="row mt-3">
                <div className="col-md-6">
                    <Link to="/addn" className="btn btn-success" style={{ marginLeft: '400px' }}>Go back</Link>
                </div>
                <div className="col-md-6 text-right">
                    {/* Button to download PDF receipt */}
                    <button onClick={handleDownloadReceipt} className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faDownload} /> Download Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
