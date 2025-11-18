import React from 'react';
import { Plus, Trash2, Check, X } from 'lucide-react';

export default function EntryForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditing
}) {
  const addDelivery = () => {
    setFormData({
      ...formData,
      deliveries: [...formData.deliveries, { requested: '', delivered: '' }]
    });
  };

  const updateDelivery = (index, field, value) => {
    const newDeliveries = [...formData.deliveries];
    newDeliveries[index][field] = value;
    setFormData({ ...formData, deliveries: newDeliveries });
  };

  const removeDelivery = (index) => {
    if (formData.deliveries.length > 1) {
      setFormData({
        ...formData,
        deliveries: formData.deliveries.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2" style={{ fontSize: 'var(--text-lg)' }}>
          Fecha
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors [color-scheme:light] dark:[color-scheme:dark]"
          style={{ fontSize: 'var(--text-lg)' }}
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <label className="font-semibold text-gray-700 dark:text-gray-200" style={{ fontSize: 'var(--text-lg)' }}>
            Entregas del Día
          </label>
          <button
            onClick={addDelivery}
            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors"
            style={{ fontSize: 'var(--text-base)' }}
          >
            <Plus style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
            Agregar Entrega
          </button>
        </div>

        {formData.deliveries.map((delivery, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-3 transition-colors">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-700 dark:text-gray-200" style={{ fontSize: 'var(--text-base)' }}>
                Entrega {index + 1}
              </span>
              {formData.deliveries.length > 1 && (
                <button
                  onClick={() => removeDelivery(index)}
                  className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                >
                  <Trash2 style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-gray-600 dark:text-gray-400 mb-1" style={{ fontSize: 'var(--text-sm)' }}>
                  Solicitado (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={delivery.requested}
                  onChange={(e) => updateDelivery(index, 'requested', e.target.value)}
                  placeholder="0.0"
                  className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                  style={{ fontSize: 'var(--text-lg)' }}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-600 dark:text-gray-400 mb-1" style={{ fontSize: 'var(--text-sm)' }}>
                  Entregado (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={delivery.delivered}
                  onChange={(e) => updateDelivery(index, 'delivered', e.target.value)}
                  placeholder="0.0"
                  className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                  style={{ fontSize: 'var(--text-lg)' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-4 font-semibold flex items-center justify-center gap-2 transition-all"
          style={{ fontSize: 'var(--text-lg)' }}
        >
          <Check style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
          {isEditing ? 'Actualizar' : 'Guardar'}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-xl p-4 font-semibold flex items-center justify-center gap-2 transition-all"
          style={{ fontSize: 'var(--text-lg)' }}
        >
          <X style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
          Cancelar
        </button>
      </div>
    </div>
  );
}