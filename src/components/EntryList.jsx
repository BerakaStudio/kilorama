import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';

export default function EntryList({ periodEntries, onEdit, onDelete, onDeleteDay }) {
  if (periodEntries.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center text-gray-500 dark:text-gray-400 transition-colors">
        <p style={{ fontSize: 'var(--text-lg)' }}>No hay registros en este período</p>
        <p className="mt-2" style={{ fontSize: 'var(--text-sm)' }}>Presiona "Nuevo Registro" para comenzar</p>
      </div>
    );
  }

  return (
    <>
      {periodEntries.map((dayEntry) => {
        const allDeliveries = dayEntry.entries.flatMap(e => e.deliveries);
        const totalDelivered = allDeliveries.reduce((sum, d) => sum + d.delivered, 0);
        const firstEntry = dayEntry.entries[0];

        return (
          <div key={dayEntry.date} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-4 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-bold text-gray-800 dark:text-gray-100" style={{ fontSize: 'var(--text-xl)' }}>
                  {new Date(dayEntry.date + 'T00:00:00').toLocaleDateString('es-CL', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long'
                  })}
                </div>
                <div className="text-gray-500 dark:text-gray-400 mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                  {allDeliveries.length} {allDeliveries.length === 1 ? 'entrega' : 'entregas'}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="relative group">
                  <button
                    onClick={() => onEdit(firstEntry)}
                    className="p-2 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all icon-hover"
                  >
                    <Edit2 style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
                  </button>
                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10 tooltip-enter">
                    <div className="bg-gray-800 text-white rounded py-1 px-2 whitespace-nowrap" style={{ fontSize: 'var(--text-xs)' }}>
                      Editar día
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <button
                    onClick={() => onDeleteDay(dayEntry)}
                    className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all icon-hover"
                  >
                    <Trash2 style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
                  </button>
                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10 tooltip-enter">
                    <div className="bg-gray-800 text-white rounded py-1 px-2 whitespace-nowrap" style={{ fontSize: 'var(--text-xs)' }}>
                      Eliminar día
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {allDeliveries.map((delivery, index) => (
                <div key={index} className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border-l-4 border-emerald-400 dark:border-emerald-500 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold px-3 py-1 rounded-lg" style={{ fontSize: 'var(--text-sm)' }}>
                      Entr. {index + 1}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-gray-800 dark:text-gray-100" style={{ fontSize: 'var(--text-2xl)' }}>
                        {delivery.delivered}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                        kg entregados
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                      Solicitado
                    </div>
                    <div className="font-semibold text-gray-700 dark:text-gray-300" style={{ fontSize: 'var(--text-lg)' }}>
                      {delivery.requested} kg
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t-2 border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
              <span className="font-semibold text-gray-700 dark:text-gray-300" style={{ fontSize: 'var(--text-base)' }}>Total del día:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400" style={{ fontSize: 'var(--text-2xl)' }}>
                {totalDelivered.toFixed(1)} kg
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}