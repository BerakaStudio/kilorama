import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';

export default function EntryList({ periodEntries, onEdit, onDelete, onDeleteDay }) {
  if (periodEntries.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500">
        <p className="text-lg">No hay registros en este período</p>
        <p className="text-sm mt-2">Presiona "Nuevo Registro" para comenzar</p>
      </div>
    );
  }

  return (
    <>
      {periodEntries.map((dayEntry) => {
        const allDeliveries = dayEntry.entries.flatMap(e => e.deliveries);
        const totalDelivered = allDeliveries.reduce((sum, d) => sum + d.delivered, 0);

        return (
          <div key={dayEntry.date} className="bg-white rounded-2xl shadow-sm p-6 mb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xl font-bold text-gray-800">
                  {new Date(dayEntry.date + 'T00:00:00').toLocaleDateString('es-CL', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long'
                  })}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {allDeliveries.length} {allDeliveries.length === 1 ? 'entrega' : 'entregas'}
                </div>
              </div>
              <div className="relative group">
                <button
                  onClick={() => onDeleteDay(dayEntry)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    Eliminar día
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {dayEntry.entries.map((entry, entryIndex) => (
                <div key={entry.id} className="space-y-3">
                  {entry.deliveries.map((delivery, deliveryIndex) => {
                    const globalIndex = dayEntry.entries
                      .slice(0, entryIndex)
                      .reduce((sum, e) => sum + e.deliveries.length, 0) + deliveryIndex + 1;

                    return (
                      <div key={`${entry.id}-${deliveryIndex}`} className="relative">
                        <div className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4 border-l-4 border-emerald-400">
                          <div className="flex items-center gap-4">
                            <div className="bg-emerald-100 text-emerald-700 font-bold text-sm px-3 py-1 rounded-lg">
                              Entrega {globalIndex}
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-gray-800">
                                {delivery.delivered}
                              </span>
                              <span className="text-sm text-gray-500 font-medium">
                                kg entregados
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                Solicitado
                              </div>
                              <div className="text-lg font-semibold text-gray-700">
                                {delivery.requested} kg
                              </div>
                            </div>
                            {entry.deliveries.length === 1 && (
                              <div className="flex gap-1">
                                <div className="relative group">
                                  <button
                                    onClick={() => onEdit(entry)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                                    <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                      Editar registro
                                    </div>
                                  </div>
                                </div>
                                <div className="relative group">
                                  <button
                                    onClick={() => onDelete(entry.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                                    <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                      Eliminar registro
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        {entry.deliveries.length > 1 && deliveryIndex === entry.deliveries.length - 1 && (
                          <div className="flex justify-end gap-1 mt-2">
                            <div className="relative group">
                              <button
                                onClick={() => onEdit(entry)}
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                                <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                  Editar este registro
                                </div>
                              </div>
                            </div>
                            <div className="relative group">
                              <button
                                onClick={() => onDelete(entry.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                                <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                  Eliminar este registro
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t-2 border-gray-200 flex justify-between items-center bg-gray-50 rounded-lg p-4">
              <span className="text-base font-semibold text-gray-700">Total del día:</span>
              <span className="text-2xl font-bold text-emerald-600">
                {totalDelivered.toFixed(1)} kg
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}