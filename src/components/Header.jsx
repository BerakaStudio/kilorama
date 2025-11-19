import React from 'react';
import { Calendar, Settings, Plus } from 'lucide-react';

export default function Header({ currentPeriod, userName, workDays, onOpenSettings, onQuickRegister }) {
  const firstName = userName ? userName.split(' ')[0] : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 sm:p-6 mb-6 transition-colors">
      {/* Mobile: 3 filas verticales */}
      <div className="block sm:hidden space-y-3">
        {/* Fila 1: Logo + Título */}
        <div className="flex items-center gap-3">
          <img 
            src="/icon.svg" 
            alt="Kilorama" 
            className="w-20 h-20 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-18 lg:h-18 flex-shrink-0"
          />
          <h1 className="font-bold text-gray-800 dark:text-gray-100 truncate" style={{ fontSize: 'var(--text-2xl)' }}>
            Kilorama
          </h1>
        </div>

        {/* Fila 2: Período */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Calendar className="flex-shrink-0" style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
          <span className="truncate" style={{ fontSize: 'var(--text-sm)' }}>
            {new Date(currentPeriod.start).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit' })} - {new Date(currentPeriod.end).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </span>
        </div>

        {/* Fila 3: Usuario + Botones */}
        <div className="flex items-center justify-between gap-2">
          {firstName && (
            <div className="text-left min-w-0 flex-shrink">
              <div className="font-bold text-gray-800 dark:text-gray-100 truncate" style={{ fontSize: 'var(--text-base)' }}>
                {firstName}
              </div>
              <div className="text-gray-500 dark:text-gray-400 truncate" style={{ fontSize: 'var(--text-xs)' }}>
                {workDays} día{workDays !== 1 ? 's' : ''}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onQuickRegister}
              className="bg-green-500/10 hover:bg-green-500/20 text-green-500 border-2 border-green-500 rounded-lg px-2 py-2 flex items-center gap-1 font-semibold transition-all"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <Plus style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
              <span>Hoy</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 bg-gray-600/20 dark:bg-gray-400/20 hover:bg-gray-600/30 dark:hover:bg-gray-400/30 border-2 border-gray-600 dark:border-gray-400 rounded-full transition-all"
            >
              <Settings style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Layout original horizontal */}
      <div className="hidden sm:flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img 
            src="/icon.svg" 
            alt="Kilorama" 
            className="w-20 h-20 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-18 lg:h-18 flex-shrink-0"
          />
          <div className="flex flex-col">
            <h1 className="font-bold text-gray-800 dark:text-gray-100" style={{ fontSize: 'var(--text-3xl)' }}>
              Kilorama
            </h1>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="flex-shrink-0" style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
              <span style={{ fontSize: 'var(--text-base)' }}>
                Período: {new Date(currentPeriod.start).toLocaleDateString('es-CL')} - {new Date(currentPeriod.end).toLocaleDateString('es-CL')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {firstName && (
            <div className="text-right">
              <div className="font-bold text-gray-800 dark:text-gray-100" style={{ fontSize: 'var(--text-xl)' }}>
                {firstName}
              </div>
              <div className="text-gray-500 dark:text-gray-400" style={{ fontSize: 'var(--text-sm)' }}>
                {workDays} {workDays === 1 ? 'día trabajado' : 'días trabajados'}
              </div>
            </div>
          )}
          
          <button
            onClick={onQuickRegister}
            className="bg-green-500/10 hover:bg-green-500/20 text-green-500 border-2 border-green-500 rounded-xl px-3 py-2 flex items-center gap-2 font-semibold transition-all"
          >
            <Plus style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} />
            Registrar Hoy
          </button>

          <button
            onClick={onOpenSettings}
            className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 bg-gray-600/20 dark:bg-gray-400/20 hover:bg-gray-600/30 dark:hover:bg-gray-400/30 border-2 border-gray-600 dark:border-gray-400 rounded-full transition-all"
          >
            <Settings style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} />
          </button>
        </div>
      </div>
    </div>
  );
}