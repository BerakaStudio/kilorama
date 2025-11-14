import React, { useState } from 'react';
import { Plus, Edit2, Trash2, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

export default function OnboardingModal({ isOpen, onComplete }) {
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState('');

  if (!isOpen) return null;

  const steps = [
    {
      title: '¡Bienvenido a Kilorama!',
      description: 'Gestiona tus registros de trozado de vegetales de forma simple y eficiente.',
      icon: <Plus className="w-16 h-16 text-emerald-500" />
    },
    {
      title: 'Registra tus entregas',
      description: 'Crea nuevos registros diarios con fecha y cantidades solicitadas/entregadas. Puedes agregar múltiples entregas por día.',
      icon: <Plus className="w-16 h-16 text-green-500" />
    },
    {
      title: 'Edita o elimina',
      description: 'Modifica registros existentes o elimina días completos con los íconos de edición y eliminación.',
      icon: <Edit2 className="w-16 h-16 text-blue-500" />
    },
    {
      title: 'Genera comprobantes',
      description: 'Crea comprobantes PDF por período con el resumen completo de tu trabajo para respaldo de pagos.',
      icon: <FileText className="w-16 h-16 text-indigo-500" />
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    if (fullName.trim()) {
      onComplete(fullName.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
          <div className="p-8">
            {step < steps.length ? (
              <>
                <div className="flex justify-center mb-6">
                  {steps[step].icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  {steps[step].title}
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  {steps[step].description}
                </p>
                
                <div className="flex justify-center gap-2 mb-6">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === step ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  {step > 0 && (
                    <button
                      onClick={handleBack}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl p-4 text-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Atrás
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl p-4 text-lg font-semibold flex items-center justify-center gap-2"
                  >
                    Siguiente
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  ¿Cómo te llamas?
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Ingresa tu nombre para personalizar tu experiencia
                </p>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none mb-6"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleComplete()}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl p-4 text-lg font-semibold"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={!fullName.trim()}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white rounded-xl p-4 text-lg font-semibold"
                  >
                    Comenzar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}