// src/utils/pdfExport.js
import jsPDF from "jspdf";
import "jspdf-autotable";

// Generic PDF export function for all modules
export const exportPDF = (title, data) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text(title, 14, 20);

  // If no data
  if (!data || data.length === 0) {
    doc.setFontSize(12);
    doc.text("No data available.", 14, 40);
    doc.save(`${title}.pdf`);
    return;
  }

  // Convert object list → table format
  const tableColumn = Object.keys(data[0]);
  const tableRows = data.map((item) => Object.values(item));

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [40, 40, 40],
      textColor: 255,
      fontSize: 10,
    },
  });

  doc.save(`${title}.pdf`);
};
