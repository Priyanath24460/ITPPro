import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    width: '20%',
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  tableCell: {
    width: '20%',
    padding: 8,
  },
  totalCost: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const PDFDocument = ({ items, eventCosts }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Event Items</Text>
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Event ID</Text>
            <Text style={styles.tableHeader}>Event Name</Text>
            <Text style={styles.tableHeader}>Items</Text>
            <Text style={styles.tableHeader}>Quantity</Text>
            <Text style={styles.tableHeader}>Price</Text>
            <Text style={styles.tableHeader}>Cost</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.event_id}</Text>
              <Text style={styles.tableCell}>{item.event_name}</Text>
              <Text style={styles.tableCell}>{item.item}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{item.price}</Text>
              <Text style={styles.tableCell}>{item.cost}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.header}>Total Cost by Event ID</Text>
      <View>
        {Object.keys(eventCosts).map((eventId, index) => (
          <Text key={index} style={styles.totalCost}>
            {eventId}: {eventCosts[eventId].toFixed(2)}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
