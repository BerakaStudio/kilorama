import React from 'react';

export default function Summary({ totalRequested, totalDelivered, daysWorked }) {
  return (
    <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl shadow-lg p-6 mb-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Resumen del Período</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 rounded-xl p-4">
          <div className="text-sm opacity-90 mb-1">Total Solicitado</div>
          <div className="text-3xl font-bold">{totalRequested.toFixed(1)} kg</div>
        </div>
        <div className="bg-white/20 rounded-xl p-4">
          <div className="text-sm opacity-90 mb-1">Total Entregado</div>
          <div className="text-3xl font-bold">{totalDelivered.toFixed(1)} kg</div>
        </div>
      </div>
      <div className="mt-4 text-sm opacity-90">
        Días trabajados: {daysWorked}
      </div>
    </div>
  );
}