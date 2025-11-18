import React from 'react';

export default function Summary({ totalRequested, totalDelivered }) {
  return (
    <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600 rounded-2xl shadow-lg p-6 mb-6 text-white transition-colors">
      <h2 className="font-semibold mb-4" style={{ fontSize: 'var(--text-xl)' }}>Resumen del Período</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 dark:bg-white/10 rounded-xl p-4">
          <div className="opacity-90 mb-1" style={{ fontSize: 'var(--text-sm)' }}>Total Solicitado</div>
          <div className="font-bold" style={{ fontSize: 'var(--text-3xl)' }}>{totalRequested.toFixed(1)} kg</div>
        </div>
        <div className="bg-white/20 dark:bg-white/10 rounded-xl p-4">
          <div className="opacity-90 mb-1" style={{ fontSize: 'var(--text-sm)' }}>Total Entregado</div>
          <div className="font-bold" style={{ fontSize: 'var(--text-3xl)' }}>{totalDelivered.toFixed(1)} kg</div>
        </div>
      </div>
    </div>
  );
}