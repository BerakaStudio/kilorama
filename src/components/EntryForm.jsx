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
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Fecha
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <label className="text-lg font-semibold text-gray-700">
            Entregas del Día
          </label>
          <button
            onClick={addDelivery}
            className="text-blue-500 hover:text-blue-600 font-semibold flex items-center gap-1"
          >
            <Plus className="w-5 h-5" />
            Agregar Entrega
          </button>
        </div>

        {formData.deliveries.map((delivery, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4 mb-3">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-700">
                Entrega {index + 1}
              </span>
              {formData.deliveries.length > 1 && (
                <button
                  onClick={() => removeDelivery(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Solicitado (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={delivery.requested}
                  onChange={(e) => updateDelivery(index, 'requested', e.target.value)}
                  placeholder="0.0"
                  className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Entregado (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={delivery.delivered}
                  onChange={(e) => updateDelivery(index, 'delivered', e.target.value)}
                  placeholder="0.0"
                  className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-4 text-lg font-semibold flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          {isEditing ? 'Actualizar' : 'Guardar'}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl p-4 text-lg font-semibold flex items-center justify-center gap-2"
        >
          <X className="w-5 h-5" />
          Cancelar
        </button>
      </div>
    </div>
  );
}