import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#009688',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#009688',
    borderBottomWidth: 1,
  },
  tableCellHeader: {
    backgroundColor: '#009688',
    color: '#FFFFFF',
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '20%', // Adjust the width according to your preference
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    textAlign: 'left', // Align details to the left side
    width: '20%', // Adjust the width according to your preference
  },
  totalCost: {
    marginTop: 20,
  fontSize: 12,
  fontWeight: 'bold',
  textAlign: 'left',
  color: 'black', 
  borderStyle: 'solid',
  borderWidth: 1,
  padding: 5,
  borderColor: '#000000', // Border color
  },
});

// Create PDF component
export const HolderDetailsPDF = ({ holderDetails, totalCostByMonth, totalMonthlyCost }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Holder Details</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Customer Name</Text>
            <Text style={styles.tableCellHeader}>NIC</Text> {/* Include NIC column */}
            <Text style={styles.tableCellHeader}>Phone Number</Text>
            <Text style={styles.tableCellHeader}>Email Address</Text>
            <Text style={styles.tableCellHeader}>Month Of Payment</Text>
            <Text style={styles.tableCellHeader}>Total Monthly Cost</Text>
          </View>
          {/* Table Body */}
          {holderDetails.map((holder, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{holder.customerName}</Text>
              <Text style={styles.tableCell}>{holder.nic}</Text> {/* Display NIC */}
              <Text style={styles.tableCell}>{holder.phoneNumber}</Text>
              <Text style={styles.tableCell}>{holder.EmailAddress}</Text>
              <Text style={styles.tableCell}>{holder.monthOfPayment}</Text>
              <Text style={styles.tableCell}>{holder.monthlyCost}</Text>
            </View>
          ))}
        </View>
        {/* Total Cost by Month */}
        <View style={styles.totalCost}>
          <Text>Total Cost by Month</Text>
          {Object.entries(totalCostByMonth).map(([month, cost]) => (
            <Text key={month}>{month}: Rs.{cost}</Text>
          ))}
        </View>
        {/* Total Monthly Cost */}
        <View style={styles.totalCost}>
          <Text style={{ color: 'green' }}>Total Monthly Cost: Rs.{totalMonthlyCost}</Text>
        </View>
      </View>
    </Page>
  </Document>
);
