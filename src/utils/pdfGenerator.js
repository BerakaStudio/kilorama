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

  // Calcular altura necesaria basada en cantidad de registros
  const baseHeight = 200;
  const totalDeliveries = periodEntries.reduce((sum, day) => 
    sum + day.entries.flatMap(e => e.deliveries).length, 0
  );
  const estimatedHeight = Math.max(baseHeight, 100 + (totalDeliveries * 8) + (periodEntries.length * 12));

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [120, estimatedHeight]
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

  // Icono tipo app: Centrado Horizontalmente
  const iconSize = 14;
  const spacing = 5;
  const logoText = 'KILORAMA';

  // 1. Calcular el ancho total del logo (Icono + Espacio + Texto)
  doc.setFontSize(20); 
  doc.setFont('courier', 'bold');
  const textWidth = doc.getTextWidth(logoText);
  const totalLogoWidth = iconSize + spacing + textWidth;

  // 2. Calcular la posición x inicial para centrar
  const xCentered = (pageWidth - totalLogoWidth) / 2;

  // Dibujar el rectángulo del icono
  doc.setFillColor(0, 0, 0);
  doc.roundedRect(xCentered, y, iconSize, iconSize, 3, 3, 'F');
  
  // Dibujar 'kg'
  doc.setFontSize(24);
  doc.setFont('courier', 'bold');
  doc.setTextColor(255, 255, 255);
  const kgText = 'kg';
  const kgWidth = doc.getTextWidth(kgText);
  // Centrar 'kg' dentro del rectángulo, que ahora está en xCentered
  doc.text(kgText, xCentered + (iconSize - kgWidth) / 2, y + 9.5);
  doc.setTextColor(0, 0, 0); // Reset color

  // Dibujar 'KILORAMA'
  doc.setFontSize(20);
  // Posicionar 'KILORAMA' después del icono (xCentered + iconSize + spacing)
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
  doc.setFontSize(20); // Se incrementa el tamaño
  doc.setFont('courier', 'bold'); // Se mantiene en negrita
  centerText('COMPROBANTE DE TRABAJO', y);
  y += 8;
  drawDashedLine(y);
  y += 8;

  // TABLA ENCABEZADO
  doc.setFontSize(11); // Se incrementa el tamaño
  doc.setFont('courier', 'bold');
  doc.text('Fecha', margin + 2, y);
  doc.text('Ent.', margin + 35, y);
  doc.text('Solicitado', margin + 50, y);
  doc.text('Entregado', margin + 80, y);
  y += 6;
  drawSolidLine(y);
  y += 6;

  doc.setFont('courier', 'normal');
  doc.setFontSize(11); // Se incrementa el tamaño de los valores de la tabla

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
    doc.setFontSize(12); // Se incrementa el subtotal
    doc.text('Subtotal día:', margin + 35, y);
    doc.text(`${dayTotal.toFixed(1)} kg`, margin + 82, y);
    doc.setFontSize(11); // Se restablece el tamaño para el texto normal de la tabla
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