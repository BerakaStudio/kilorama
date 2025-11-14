import { jsPDF } from 'jspdf';

export const generatePDF = (periodEntries, currentPeriod, totals, userName = null) => {
  const { totalRequested, totalDelivered } = totals;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateLong = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-CL', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const doc = new jsPDF();
  let y = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;

  const centerText = (text, yPos, size = 10, style = 'normal') => {
    doc.setFontSize(size);
    doc.setFont('courier', style);
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, yPos);
  };

  const drawLine = (yPos) => {
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
  };

  // Header
  centerText('KILORAMA', y, 14, 'bold');
  y += 7;
  centerText('COMPROBANTE DE TRABAJO', y, 12, 'bold');
  y += 10;
  drawLine(y);
  y += 8;

  if (userName) {
    y += 5;
    doc.setFontSize(10);
    doc.setFont('courier', 'normal');
    centerText(`Trabajador: ${userName}`, y);
    y += 5;
  }

  // Period info
  doc.setFontSize(10);
  doc.setFont('courier', 'normal');
  doc.text('Período:', margin, y);
  doc.setFont('courier', 'bold');
  doc.text(`${formatDate(currentPeriod.start)} - ${formatDate(currentPeriod.end)}`, margin + 30, y);
  y += 6;

  doc.setFont('courier', 'normal');
  doc.text('Emisión:', margin, y);
  doc.setFont('courier', 'bold');
  doc.text(formatDate(new Date().toISOString().split('T')[0]), margin + 30, y);
  y += 10;

  drawLine(y);
  y += 8;

  // Details
  centerText('DETALLE DE ENTREGAS', y, 11, 'bold');
  y += 8;

  periodEntries.forEach((dayEntry) => {
    const allDeliveries = dayEntry.entries.flatMap(e => e.deliveries);
    const dayTotal = allDeliveries.reduce((sum, d) => sum + d.delivered, 0);

    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFont('courier', 'bold');
    doc.setFontSize(10);
    doc.text(formatDateLong(dayEntry.date), margin, y);
    y += 6;

    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    allDeliveries.forEach((delivery, index) => {
      doc.text(`  Entrega ${index + 1}:`, margin + 3, y);
      doc.text(`Solic. ${delivery.requested.toFixed(1)} kg`, margin + 35, y);
      doc.setFont('courier', 'bold');
      doc.text(`Entreg. ${delivery.delivered.toFixed(1)} kg`, margin + 75, y);
      doc.setFont('courier', 'normal');
      y += 5;
    });

    y += 2;
    doc.setFont('courier', 'bold');
    doc.text('Total día:', margin + 3, y);
    doc.setFontSize(10);
    doc.text(`${dayTotal.toFixed(1)} kg`, margin + 75, y);
    doc.setFontSize(9);

    y += 8;
    doc.setLineWidth(0.1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  });

  // Totals
  y += 4;
  drawLine(y);
  y += 8;

  centerText('TOTALES DEL PERÍODO', y, 11, 'bold');
  y += 8;

  doc.setFontSize(10);
  doc.setFont('courier', 'normal');

  doc.text('Total Solicitado:', margin + 20, y);
  doc.setFont('courier', 'bold');
  doc.text(`${totalRequested.toFixed(1)} kg`, pageWidth - margin - 30, y);
  y += 7;

  doc.setFont('courier', 'normal');
  doc.text('Total Entregado:', margin + 20, y);
  doc.setFont('courier', 'bold');
  doc.setFontSize(12);
  doc.text(`${totalDelivered.toFixed(1)} kg`, pageWidth - margin - 30, y);
  y += 9;

  doc.setFontSize(10);
  doc.setFont('courier', 'normal');
  doc.text('Días Trabajados:', margin + 20, y);
  doc.setFont('courier', 'bold');
  doc.text(`${periodEntries.length}`, pageWidth - margin - 30, y);

  doc.save(`comprobante_${currentPeriod.start}_${currentPeriod.end}.pdf`);
};