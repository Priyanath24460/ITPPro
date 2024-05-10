import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";

export default function AccountDetails() {
  const [selectedDate, setSelectedDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvvNumber, setCvvNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit card");
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeCardNumber = (e) => {
    const { value } = e.target;
    // Check if the input value is a number
    if (!isNaN(value)) {
      // Check if the input value is exactly 16 characters
      if (value.length <= 16) {
        setCardNumber(value);
      }
    }
  };

  const handleChangeCVVNumber = (e) => {
    const { value } = e.target;
    // Check if the input value is at most 3 characters
    if (value.length <= 3) {
      setCvvNumber(value);
    }
  };

  const handleChangePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const sendData = (e) => {
    e.preventDefault();

    // Check if the card details are filled in
    if (!cardNumber || !cvvNumber || !selectedDate) {
      alert("Card details must be filled.");
      return;
    }
    // Check if the card number is exactly 16 characters long
    if (cardNumber.length !== 16) {
      alert("Card number must be exactly 16 characters long.");
      return; // Stop further execution if the condition is not met
    }
    if (cvvNumber.length !== 3) {
      alert("CVV number must be exactly 3 characters long.");
      return; // Stop further execution if the condition is not met
    }

    // Encrypt account details
    const encryptedCardNumber = CryptoJS.AES.encrypt(cardNumber, "secretKey").toString();
    const encryptedCvvNumber = CryptoJS.AES.encrypt(cvvNumber, "secretKey").toString();
    const encryptedExpireDate = CryptoJS.AES.encrypt(selectedDate.toString(), "secretKey").toString();

    // Prepare data to be sent to the server
    const newAccountDetails = {
      paymentMethod,
      cardNumber: encryptedCardNumber,
      cvvNumber: encryptedCvvNumber,
      expireDate: encryptedExpireDate,
    };

    axios.post("http://localhost:8070/paymentDetails/addCardDetaiils", newAccountDetails)
      .then(() => {
        alert("Account details added successfully.");
      })
      .catch((err) => {
        alert("Error occurred while adding account details: " + err);
      });

    // Reset form data and set formSubmitted to true
    setCardNumber("");
    setCvvNumber("");
    setSelectedDate("");
    setFormSubmitted(true);
  };

  // Reset form data after 3 seconds if form has been submitted
  if (formSubmitted) {
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ position: "relative", margin: "0 auto" }}>
        <div style={{ position: "relative", zIndex: "1" }}>
          <div style={{ border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "1rem", width: "500px", height: "350px" }}>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label"><b>Payment Method</b></label>
                <div style={{ display: "flex" }}>
                  <div className="form-check" style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      className="form-check-input"
                      id="creditCardRadio"
                      value="credit card"
                      checked={paymentMethod === "credit card"}
                      onChange={handleChangePaymentMethod}
                    />
                    <label className="form-check-label" htmlFor="creditCardRadio">
                      Debit Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="debitCardRadio"
                      value="debit card"
                      checked={paymentMethod === "debit card"}
                      onChange={handleChangePaymentMethod}
                    />
                    <label className="form-check-label" htmlFor="debitCardRadio">
                      Credit Card
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label"><b>Card Number</b></label>
                <input type="text" className="form-control" value={cardNumber} onChange={handleChangeCardNumber} />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ textAlign: "left" }}><b>CVV</b></label>
                <input type="text" className="form-control" value={cvvNumber} onChange={handleChangeCVVNumber} />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ textAlign: "right" }}><b>Expiration Date</b></label>
                <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="MM/yyyy" showMonthYearPicker className="form-control" />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1"><i>Check me out</i></label>
              </div>
              <div style={{ maxHeight: "100px", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <Link to="/viewDetails" className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "120%", height: "150%", backgroundColor: "#E0FFC1", border: "2px solid white", borderRadius: "20px", zIndex: "0" }} />
      </div>
    </div>
  );
}
