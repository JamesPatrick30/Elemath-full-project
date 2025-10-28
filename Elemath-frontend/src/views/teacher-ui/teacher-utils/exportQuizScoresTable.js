import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportQuizScoresTable(data,titlegive="📘 Quiz Scores Report",filename) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Quiz Scores");

  // --- TITLE ---
  worksheet.mergeCells("A1", "Z1"); // big merge for flexibility
  const title = worksheet.getCell("A1");
  title.value = titlegive;
  title.font = { size: 18, bold: true, color: { argb: "FF1F4E78" } };
  title.alignment = { vertical: "middle", horizontal: "center" };
  title.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDCE6F1" } };

  // --- DATE ROW ---
  worksheet.mergeCells("A2", "Z2");
  const dateCell = worksheet.getCell("A2");
  dateCell.value = `Date Generated: ${new Date().toLocaleDateString()}`;
  dateCell.font = { italic: true, color: { argb: "FF555555" } };
  dateCell.alignment = { horizontal: "center" };

  worksheet.addRow([]); // spacer

  // --- Determine maximum number of quizzes ---
  const maxQuizzes = Math.max(...data.map(s => s.quiz.length));

  // --- Build dynamic headers ---
  const headers = ["Name"];
  for (let i = 0; i < maxQuizzes; i++) headers.push(`Score ${i + 1}`);
  headers.push("Average");

  const headerRow = worksheet.addRow(headers);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F4E78" } };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };

  // --- Adjust column widths ---
  worksheet.columns = headers.map((h, i) => ({
    key: h.toLowerCase().replace(/\s+/g, "_"),
    width: i === 0 ? 35 : 12,
  }));

  // --- Add student rows ---
  data.forEach(student => {
    const row = [];
    row.push(student.name);

    let totalQuiz = 0;
    let averagesum = 0;

    student.quiz.forEach(q => {
      row.push(`${q.score}/${q.total}`);
      totalQuiz ++;
      averagesum += (q.score / q.total || 0);
    });

    // Fill missing cells if not all students have the same number of quizzes
    while (row.length < maxQuizzes + 1) row.push("");

    const average = ((averagesum / totalQuiz) * 100).toFixed(2) + "%";
    row.push(average);

    worksheet.addRow(row);
  });

  // --- Styling borders & alignment ---
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 3) { // skip header section
      row.eachCell(cell => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });
    }
  });

  // --- Save file ---
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]),`${filename || ''}.xlsx`);
}
