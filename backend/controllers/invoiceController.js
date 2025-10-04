import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import orderModel from "../models/orderModel.js";

export const generateInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch order
    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const doc = new PDFDocument({ margin: 50 });
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=invoice_${orderId}.pdf`
      );
      res.send(pdfData);
    });

    // --- Header: Sender Info Top Right ---
    doc.fontSize(10).text("Sender: OnlineCommerce", { align: "right" });
    doc.moveDown();

    // --- Logo ---
   const logoPath = path.join(process.cwd(), "public", "logo.png");
if (fs.existsSync(logoPath)) {
  doc.image(logoPath, 50, 20, { width: 80 });
}

    // --- Big Invoice Title ---
    doc.fontSize(22).text("INVOICE", { align: "center" });
    doc.moveDown(2);

    // --- Invoice Details (Left) ---
    const startY = doc.y;
    doc.fontSize(12)
      .text(`Invoice #: ${orderId}`, 50, startY)
      .text(`Date: ${new Date(order.date).toLocaleDateString()}`, 50, startY + 15)
      .text(`Payment Method: ${order.paymentMethod}`, 50, startY + 30);

    // --- Receiver Details (Right) ---
    doc.fontSize(12)
      .text("Receiver:", 350, startY)
      .text(`${order.address.firstName} ${order.address.lastName}`, 350, startY + 15)
     .text(`Phone: ${order.address.phone}`)
      .text(`Address: ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country} - ${order.address.pincode}`)


    doc.moveDown(5);

    // --- Items Table ---
    const tableTop = doc.y;
    const itemX = [50, 250, 350, 450]; // column positions

    // Table Header
    doc.fontSize(12).text("Item Description", itemX[0], tableTop);
    doc.text("Price (₹)", itemX[1], tableTop);
    doc.text("Quantity", itemX[2], tableTop);
    doc.text("Subtotal (₹)", itemX[3], tableTop);

    // Header line
    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    // Table Rows
    let y = tableTop + 25;
    order.items.forEach((item) => {
      doc.text(item.name, itemX[0], y);
      doc.text(item.price.toFixed(2), itemX[1], y);
      doc.text(item.quantity, itemX[2], y);
      doc.text((item.price * item.quantity).toFixed(2), itemX[3], y);
      y += 20;

      // Row line
      doc.moveTo(50, y).lineTo(550, y).stroke();
    });

    // --- Total ---
    doc.fontSize(12).text(`Total (₹): ${order.amount}`, itemX[3], y + 10);

    doc.moveDown(4);

    // --- Payment Instructions ---
    doc.fontSize(12).text("Kindly make your payment to:");
    doc.text("Bank: American Bank of Commerce");
    doc.text("A/C: 0534634546354634323");
    doc.text("BIC: 23141434");
    doc.moveDown();

    doc.fontSize(10).text(
      "Note: Please send a remittance advice by email to support@onlinecommerce.com"
    );

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating invoice" });
  }
};
