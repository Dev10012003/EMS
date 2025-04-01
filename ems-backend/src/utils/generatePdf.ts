import { Response } from "express";
import fs from "fs";
import moment from "moment-business-days";
import path from "path";
import PDFDocument from "pdfkit";

export const generatePDF = async (salaryData: any, res: Response) => {
  const doc = new PDFDocument({ margin: 50 });

  const payDate = moment(salaryData.payDate);
  const prevMonth = payDate.clone().subtract(1, "month");
  const month = prevMonth.format("MMMM");
  const year = prevMonth.format("YYYY");
  const filename = `Salary_${salaryData.employeeId.employeeId}_${month}_${year}.pdf`;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

  doc.pipe(res);

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const margin = 20;

  doc
    .rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin)
    .stroke();
  doc
    .strokeColor("teal")
    .rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin)
    .stroke();

  doc
    .fontSize(22)
    .font("Helvetica-Bold")
    .text("EMS Pvt. Ltd.", { align: "center" });
  doc
    .fontSize(12)
    .text("10, Maruti Enterprises, Shiv Kailash Road, Ahmedabad, India", {
      align: "center",
    });
  doc.fontSize(12).text("Email: ems@gmail.com | Phone: +91 9875462130", {
    align: "center",
  });
  doc.moveDown(2);

  doc
    .fontSize(18)
    .fillColor("teal")
    .text(`Salary Slip (${month}-${year})`, {
      align: "center",
      underline: true,
    })
    .fillColor("black");
  doc.moveDown(1);

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Employee Details", { underline: true })
    .moveDown(0.5);
  doc
    .fontSize(12)
    .font("Helvetica")
    .text(`Employee ID: ${salaryData.employeeId.employeeId}`);
  doc.text(`Name: ${salaryData.employeeId.userId.name}`);
  doc.text(`Department: ${salaryData.employeeId.department.dep_name}`);
  doc.text(
    `Pay Date: ${new Date(salaryData.payDate).toLocaleDateString("en-GB")}`
  );
  doc.moveDown(1);

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Salary Breakdown", { underline: true })
    .moveDown(0.5);

  const startX = 50;
  let currentY = doc.y;
  const columnWidth = 260;
  const rowHeight = 30;

  doc.font("Helvetica-Bold").fontSize(12).fillColor("#ffffff");
  doc
    .rect(startX, currentY, columnWidth * 2, rowHeight)
    .fill("teal")
    .stroke();
  doc.fillColor("#ffffff").text("Description", startX + 10, currentY + 10);
  doc.text("Amount", startX + columnWidth + 10, currentY + 10, {
    align: "right",
  });

  doc.fillColor("black");

  const salaryDetails = [
    { label: "Basic Salary", value: salaryData.basicSalary },
    { label: "Allowances", value: salaryData.allowances },
    { label: "Deductions", value: `- ${salaryData.deductions}` },
    { label: "Leaves", value: salaryData.leaveDays },
    { label: "Paid Leaves", value: salaryData.paidLeavesUsed },
    { label: "Remaining Paid Leaves", value: salaryData.carryForwardLeaves },
    { label: "Leave Deductions", value: `- ${salaryData.leaveDeduction}` },
    { label: "Net Salary", value: salaryData.netSalary, bold: true },
  ];

  salaryDetails.forEach((item, index) => {
    currentY += rowHeight;
    doc
      .rect(startX, currentY, columnWidth * 2, rowHeight)
      .fill(index % 2 === 0 ? "#f0f0f0" : "#ffffff")
      .stroke();
    doc.fillColor("black").font(item.bold ? "Helvetica-Bold" : "Helvetica");
    doc.text(item.label, startX + 10, currentY + 10);
    doc.text(item.value.toString(), startX + columnWidth + 10, currentY + 10, {
      align: "right",
    });
  });

  doc.moveDown(2);
  const projectRoot = process.cwd();
  const signaturePath = path.join(projectRoot, "public/uploads/sign.png");

  if (fs.existsSync(signaturePath)) {
    const signatureWidth = 120; // Adjust the width as needed
    const signatureHeight = 40; // Adjust the height if needed
    const signatureX = 430; // X position of the signature
    const signatureY = doc.y - 10; // Move it slightly up to align properly

    doc.image(signaturePath, signatureX, signatureY, {
      width: signatureWidth,
      height: signatureHeight,
    });

    doc.moveDown(2); // Adjust spacing after the image
  } else {
    doc.text("Authorized Signatory", { align: "right" }).moveDown(1);
  }

  doc.text("__________________", 430, doc.y); // Explicitly set X position
  doc.text("HR Manager", 450, doc.y + 15); // Move HR Manager below the line

  doc.end();
};
