import axios from "axios";
import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Modal } from "react-bootstrap";

export default function ViewDetails() {
  const [payments, setPayments] = useState([]);
  const [updatedPayment, setUpdatedPayment] = useState({
    id: "",
    paymentMethod: "",
    cardNumber: "",
    cvvNumber: "",
    expireDate: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    getPaymentDetails();
  }, []);

  const getPaymentDetails = () => {
    axios.get(`http://localhost:8070/paymentDetails/viewDetails`)
      .then((res) => {
        // Decrypt the payment details
        const decryptedPayments = res.data.map((payment) => {
          return {
            id: payment._id, // Assuming you have an ID field in your payment object
            paymentMethod: payment.paymentMethod,
            cardNumber: CryptoJS.AES.decrypt(payment.cardNumber, "secretKey").toString(CryptoJS.enc.Utf8),
            cvvNumber: CryptoJS.AES.decrypt(payment.cvvNumber, "secretKey").toString(CryptoJS.enc.Utf8),
            expireDate: CryptoJS.AES.decrypt(payment.expireDate, "secretKey").toString(CryptoJS.enc.Utf8)
          };
        });
        setPayments(decryptedPayments);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPayment({ ...updatedPayment, [name]: value });
  };

  const handleUpdate = (payment) => {
    setUpdatedPayment(payment);
    setShowModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    
    // Validation for card number and CVV number
    if (updatedPayment.cardNumber.length !== 16 || updatedPayment.cvvNumber.length !== 3) {
      setValidationError("Card number must be 16 digits and CVV number must be 3 digits.");
      return;
    }

    // Encrypt the updated payment details
    const encryptedPayment = {
      ...updatedPayment,
      cardNumber: CryptoJS.AES.encrypt(updatedPayment.cardNumber, "secretKey").toString(),
      cvvNumber: CryptoJS.AES.encrypt(updatedPayment.cvvNumber, "secretKey").toString(),
      expireDate: CryptoJS.AES.encrypt(updatedPayment.expireDate, "secretKey").toString()
    };

    // Send HTTP request to update payment details
    axios.put(`http://localhost:8070/paymentDetails/update/${updatedPayment.id}`, encryptedPayment)
      .then(() => {
        // Refresh payment details after updating
        getPaymentDetails();
        setShowModal(false); // Close the modal after updating
        setValidationError(""); // Clear validation error
      })
      .catch((err) => {
        alert("Error updating payment: " + err.message);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/paymentDetails/delete/${id}`)
      .then(() => {
        // Update payments state after successful deletion
        setPayments(payments.filter(payment => payment.id !== id));
      })
      .catch((err) => {
        alert("Error deleting payment: " + err.message);
      });
  };

  const modalStyle = {
    animation: "rotateIn 0.5s forwards", // Rotation animation
    transformOrigin: "center center" // Rotation origin
  };

  const fetchAccountDetailsByNIC = (nic) => {
    // Send HTTP request to fetch account details by NIC
    axios.get(`http://localhost:8070/paymentDetails/get/${nic}`)
      .then((res) => {
        // Handle the response here
        console.log(res.data);
      })
      .catch((err) => {
        alert("Error fetching account details: " + err.message);
      });
  };

  return (
    <div className="container mt-5 border shadow p-4 rounded border-0.5 mx-auto">
      <h1 className="mb-4">You Card Details</h1>
      <div className="payment-table-container">
        {payments.map((payment, index) => (
          <div className="payment-card" key={index}>
            <div className="payment-details">
              <div className="payment-detail"><strong>Payment Method:</strong> {payment.paymentMethod}</div>
              <div className="payment-detail"><strong>Card Number:</strong> {payment.cardNumber}</div>
              <div className="payment-detail"><strong>CVV Number:</strong> {payment.cvvNumber}</div>
              <div className="payment-detail"><strong>Expiration Date:</strong> {payment.expireDate}</div>
            </div>
            <div className="payment-actions">
              <button className="btn btn-primary me-2" onClick={() => handleUpdate(payment)}>Update</button>
              <button className="btn btn-danger" onClick={() => handleDelete(payment.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for updating payment details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} style={modalStyle}>
        <Modal.Header closeButton>
          <Modal.Title>Update Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <select className="form-control" name="paymentMethod" value={updatedPayment.paymentMethod} onChange={handleInputChange}>
                <option value="">Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input type="text" className="form-control" name="cardNumber" value={updatedPayment.cardNumber} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">CVV Number</label>
              <input type="text" className="form-control" name="cvvNumber" value={updatedPayment.cvvNumber} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Expiration Date</label>
              <input type="text" className="form-control" name="expireDate" value={updatedPayment.expireDate} onChange={handleInputChange} />
            </div>
            {validationError && <div className="text-danger mb-3">{validationError}</div>}
            <button type="submit" className="btn btn-success">Update Payment</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
