import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function OnboardingModal({ isOpen, onComplete }) {
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState('');

  if (!isOpen) return null;

  const steps = [
    {
      title: '¡Bienvenido a Kilorama!',
      description: 'Gestiona tus registros de trozado de vegetales de forma simple y eficiente.',
      icon: 'src/img/welcome.svg'
    },
    {
      title: 'Registra tus entregas',
      description: 'Crea nuevos registros diarios con fecha y cantidades solicitadas/entregadas. Puedes agregar múltiples entregas por día.',
      icon: 'src/img/register.svg'
    },
    {
      title: 'Edita o elimina',
      description: 'Modifica registros existentes o elimina días completos con los íconos de edición y eliminación.',
      icon: 'src/img/edit.svg'
    },
    {
      title: 'Genera comprobantes',
      description: 'Crea comprobantes PDF por período con el resumen completo de tu trabajo para respaldo de pagos.',
      icon: 'src/img/receipt.svg'
    }
  ];

  const handleNext = () => {
    if (step < steps.length) {
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
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg transition-colors">
          <div className="p-8">
            {step < steps.length ? (
              <>
                <div className="flex justify-center mb-6">
                  <img 
                    src={steps[step].icon} 
                    alt={steps[step].title}
                    className="onboard-icon"
                  />
                </div>
                <h2 className="font-bold text-gray-800 dark:text-gray-100 text-center mb-4" style={{ fontSize: 'var(--text-2xl)' }}>
                  {steps[step].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-8" style={{ fontSize: 'var(--text-base)' }}>
                  {steps[step].description}
                </p>
                
                <div className="flex justify-center gap-2 mb-6">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === step 
                          ? 'w-8 bg-emerald-500' 
                          : 'w-2 bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  {step > 0 && (
                    <button
                      onClick={handleBack}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl p-4 font-semibold flex items-center justify-center gap-2 transition-all"
                      style={{ fontSize: 'var(--text-lg)' }}
                    >
                      <ArrowLeft style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
                      Atrás
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl p-4 font-semibold flex items-center justify-center gap-2 transition-all"
                    style={{ fontSize: 'var(--text-lg)' }}
                  >
                    Siguiente
                    <ArrowRight style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-bold text-gray-800 dark:text-gray-100 text-center mb-4" style={{ fontSize: 'var(--text-2xl)' }}>
                  ¿Cómo te llamas?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6" style={{ fontSize: 'var(--text-base)' }}>
                  Ingresa tu nombre para personalizar tu experiencia
                </p>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none mb-6 transition-colors"
                  style={{ fontSize: 'var(--text-lg)' }}
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleComplete()}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl p-4 font-semibold transition-all"
                    style={{ fontSize: 'var(--text-lg)' }}
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={!fullName.trim()}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl p-4 font-semibold transition-all"
                    style={{ fontSize: 'var(--text-lg)' }}
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