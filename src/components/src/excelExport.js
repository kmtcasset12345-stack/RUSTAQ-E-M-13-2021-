import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName) => {
  if (!data || data.length === 0) return;

  // Convert JSON → Sheet
  const ws = XLSX.utils.json_to_sheet(data, { origin: "A2" });

  // Add Header Title
  const title = "Klaah Al Malada Trad & Cont.. in Rustaq";

  XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A1" });

  // Header style row
  const header = Object.keys(data[0]);
  XLSX.utils.sheet_add_aoa(ws, [header], { origin: "A3" });

  // Auto column width
  const colWidths = header.map(col => {
    const maxLength = Math.max(
      col.length,
      ...data.map(row => String(row[col] || "").length)
    );
    return { wch: maxLength + 5 };
  });

  ws["!cols"] = colWidths;

  // Apply border for all cells
  const range = XLSX.utils.decode_range(ws["!ref"]);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
      if (!ws[cellRef]) continue;

      ws[cellRef].s = {
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
        font: {
          bold: R === 2, // Header row (A3), Title row (A1 is R=0)
        },
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: true,
        },
      };
    }
  }

  // Create Workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Save File
  XLSX.writeFile(wb, fileName + ".xlsx");
};
