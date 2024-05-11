import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

function HistoryList() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRemovePrice, setTotalRemovePrice] = useState(0);
  const [totalAddPrice, setTotalAddPrice] = useState(0);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch("http://localhost:8070/history/");
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await response.json();
      setHistory(data.history);
      setLoading(false);
      calculateTotalPrices(data.history);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleDelete = async (itemCode) => {
    try {
      const response = await fetch(`http://localhost:8070/history/delete/${itemCode}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete history entry");
      }
      // Filter out the deleted entry
      setHistory(history.filter((entry) => entry.itemCode !== itemCode));
      
      // Refresh history entries by fetching them again
      fetchHistory();
    } catch (error) {
      console.error("Error deleting history entry:", error);
    }
  };

  // Function to calculate total price
  const calculateTotalPrice = (count, pricePerItem) => {
    return count * pricePerItem;
  };

  // Function to calculate total remove price and total add price
  const calculateTotalPrices = (history) => {
    let removePrice = 0;
    let addPrice = 0;
    history.forEach(entry => {
      if (entry.operation === "remove") {
        removePrice += calculateTotalPrice(entry.count, entry.pricePerItem);
      } else {
        addPrice += calculateTotalPrice(entry.count, entry.pricePerItem);
      }
    });
    setTotalRemovePrice(removePrice);
    setTotalAddPrice(addPrice);
  };

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("History Entries", 10, 10);
    let startY = 20;
    history.forEach((entry, index) => {
      const y = startY + index * 10;
      doc.text(`${entry.itemCode}, ${entry.operation}, ${entry.count}, ${entry.pricePerItem}, ${calculateTotalPrice(entry.count, entry.pricePerItem)}, ${new Date(entry.updateDate).toLocaleString()}`, 10, y);
    });
    // Add total prices
    doc.text(`Total Remove Price: ${totalRemovePrice}`, 10, startY + (history.length + 1) * 10);
    doc.text(`Total Add Price: ${totalAddPrice}`, 10, startY + (history.length + 2) * 10);
    doc.save("history.pdf");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "1rem" }}>Medical History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={generatePDF} style={{ marginBottom: "1rem" }}>Generate PDF</button>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>Item Code</th>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>Operation</th>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>Count</th>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>Price Per Item</th>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>Total Price</th>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>Update Date</th>
                <th style={{ border: "1px solid #000", padding: "0.5rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr key={entry._id}>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>{entry.itemCode}</td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>{entry.operation}</td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>{entry.count}</td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>{entry.pricePerItem}</td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>{calculateTotalPrice(entry.count, entry.pricePerItem)}</td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>{new Date(entry.updateDate).toLocaleString()}</td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    <button
                      style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", cursor: "pointer" }}
                      onClick={() => handleDelete(entry.itemCode)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <p>Total Remove Price: {totalRemovePrice}</p>
            <p>Total Add Price: {totalAddPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryList;
