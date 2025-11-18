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

  // Calcular altura REAL necesaria paso a paso
  let calculatedHeight = 0;
  
  // ENCABEZADO
  calculatedHeight += 12; // margen inicial
  calculatedHeight += 8;  // después línea punteada
  calculatedHeight += 22; // logo + texto
  calculatedHeight += 6;  // línea período
  calculatedHeight += 6;  // línea emisión
  if (userName) calculatedHeight += 6; // línea trabajador
  calculatedHeight += 4;  // espacio
  calculatedHeight += 8;  // línea punteada
  
  // TÍTULO
  calculatedHeight += 8;  // título
  calculatedHeight += 8;  // línea punteada
  
  // TABLA
  calculatedHeight += 6;  // encabezado tabla
  calculatedHeight += 6;  // línea sólida + espacio
  
  // CONTENIDO (lo más importante)
  periodEntries.forEach((dayEntry) => {
    const allDeliveries = dayEntry.entries.flatMap(e => e.deliveries).length;
    calculatedHeight += (allDeliveries * 6); // cada entrega
    calculatedHeight += 4;  // subtotal
    calculatedHeight += 6;  // línea divisoria
  });
  
  // TOTALES Y PIE
  calculatedHeight += 4;  // espacio
  calculatedHeight += 8;  // línea punteada
  calculatedHeight += 8;  // total solicitado
  calculatedHeight += 8;  // total entregado
  calculatedHeight += 8;  // días trabajados
  calculatedHeight += 6;  // línea punteada
  calculatedHeight += 8;  // texto conserve
  calculatedHeight += 8;  // línea punteada
  calculatedHeight += 5;  // espacio
  calculatedHeight += 6;  // ID
  calculatedHeight += 10; // margen final de seguridad

  const finalHeight = Math.max(200, calculatedHeight);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [120, finalHeight]
  });

  let y = 12;
  const pageWidth = 120;
  const margin = 10;

  const centerText = (text, yPos, size = 10, style = 'normal') => {
    doc.setFontSize(size);
    doc.setFont('courier', style);
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, yPos);
  };

  const drawDashedLine = (yPos) => {
    doc.setLineDash([1.5, 1.5]);
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    doc.setLineDash([]);
  };

  const drawSolidLine = (yPos) => {
    doc.setLineWidth(0.4);
    doc.line(margin, yPos, pageWidth - margin, yPos);
  };

  // ENCABEZADO
  drawDashedLine(y);
  y += 8;

  const iconSize = 14;
  const spacing = 5;
  const logoText = 'KILORAMA';

  doc.setFontSize(20); 
  doc.setFont('courier', 'bold');
  const textWidth = doc.getTextWidth(logoText);
  const totalLogoWidth = iconSize + spacing + textWidth;
  const xCentered = (pageWidth - totalLogoWidth) / 2;

  doc.setFillColor(0, 0, 0);
  doc.roundedRect(xCentered, y, iconSize, iconSize, 3, 3, 'F');
  
  doc.setFontSize(24);
  doc.setFont('courier', 'bold');
  doc.setTextColor(255, 255, 255);
  const kgText = 'kg';
  const kgWidth = doc.getTextWidth(kgText);
  doc.text(kgText, xCentered + (iconSize - kgWidth) / 2, y + 9.5);
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(20);
  doc.text(logoText, xCentered + iconSize + spacing, y + 9);

  y += 22;

  // Info período
  doc.setFontSize(10);
  doc.setFont('courier', 'normal');
  centerText(`Período: ${formatDate(currentPeriod.start)} - ${formatDate(currentPeriod.end)}`, y);
  y += 6;
  
  doc.setFont('courier', 'bold');
  centerText(`Emisión: ${formatDate(new Date().toISOString().split('T')[0])}`, y);
  y += 6;

  if (userName) {
    centerText(`Trabajador: ${userName}`, y);
    y += 6;
  }

  y += 4;
  drawDashedLine(y);
  y += 8;

  // TÍTULO
  doc.setFontSize(20);
  doc.setFont('courier', 'bold');
  centerText('COMPROBANTE DE TRABAJO', y);
  y += 8;
  drawDashedLine(y);
  y += 8;

  // TABLA ENCABEZADO
  doc.setFontSize(11);
  doc.setFont('courier', 'bold');
  doc.text('Fecha', margin + 2, y);
  doc.text('Ent.', margin + 35, y);
  doc.text('Solicitado', margin + 50, y);
  doc.text('Entregado', margin + 80, y);
  y += 6;
  drawSolidLine(y);
  y += 6;

  doc.setFont('courier', 'normal');
  doc.setFontSize(11);

  // REGISTROS
  periodEntries.forEach((dayEntry) => {
    const allDeliveries = dayEntry.entries.flatMap(e => e.deliveries);
    
    const firstDelivery = allDeliveries[0];
    doc.text(formatDate(dayEntry.date), margin + 2, y);
    doc.text('1', margin + 37, y);
    doc.text(`${firstDelivery.requested.toFixed(1)} kg`, margin + 52, y);
    doc.text(`${firstDelivery.delivered.toFixed(1)} kg`, margin + 82, y);
    y += 6;

    for (let i = 1; i < allDeliveries.length; i++) {
      const delivery = allDeliveries[i];
      doc.text(`${i + 1}`, margin + 37, y);
      doc.text(`${delivery.requested.toFixed(1)} kg`, margin + 52, y);
      doc.text(`${delivery.delivered.toFixed(1)} kg`, margin + 82, y);
      y += 6;
    }

    const dayTotal = allDeliveries.reduce((sum, d) => sum + d.delivered, 0);
    doc.setFont('courier', 'bold');
    doc.setFontSize(12);
    doc.text('Subtotal día:', margin + 35, y);
    doc.text(`${dayTotal.toFixed(1)} kg`, margin + 82, y);
    doc.setFontSize(11);
    doc.setFont('courier', 'normal');
    y += 4;
    
    doc.setLineDash([0.8, 0.8]);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageWidth - margin, y);
    doc.setLineDash([]);
    y += 6;
  });

  y += 4;
  drawDashedLine(y);
  y += 8;

  // TOTALES
  doc.setFontSize(11);
  doc.setFont('courier', 'bold');

  doc.text('TOTAL SOLICITADO', margin + 4, y);
  doc.text(`${totalRequested.toFixed(1)} kg`, pageWidth - margin - 28, y);
  y += 8;

  doc.setFontSize(12);
  doc.text('TOTAL ENTREGADO', margin + 4, y);
  doc.text(`${totalDelivered.toFixed(1)} kg`, pageWidth - margin - 28, y);
  y += 8;

  doc.setFontSize(10);
  doc.text('Días Trabajados', margin + 4, y);
  doc.text(`${periodEntries.length}`, pageWidth - margin - 12, y);
  y += 8;

  drawDashedLine(y);
  y += 6;

  // PIE
  doc.setFontSize(8);
  doc.setFont('courier', 'italic');
  centerText('Conserve este comprobante como respaldo', y);
  y += 8;

  drawDashedLine(y);
  y += 5;

  // ID
  const now = new Date();
  const idCode = 
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0') +
    now.getHours().toString().padStart(2, '0') +
    now.getMinutes().toString().padStart(2, '0') +
    now.getSeconds().toString().padStart(2, '0');

  doc.setFontSize(8);
  doc.setFont('courier', 'normal');
  centerText(`ID: ${idCode}`, y);

  doc.save(`comprobante_${currentPeriod.start}_${currentPeriod.end}.pdf`);
};