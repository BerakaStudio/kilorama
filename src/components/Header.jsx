import React from 'react';
import { Calendar, Settings } from 'lucide-react';

export default function Header({ currentPeriod, userName, workDays, onOpenSettings }) {
  const firstName = userName ? userName.split(' ')[0] : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6 transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img 
            src="/icon.svg" 
            alt="Kilorama" 
            className="w-10 h-10 sm:w-20 sm:h-20 flex-shrink-0"
          />
          <div className="flex flex-col">
            <h1 className="font-bold text-gray-800 dark:text-gray-100" style={{ fontSize: 'var(--text-3xl)' }}>
              Kilorama
            </h1>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="flex-shrink-0" style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
              <span className="break-words" style={{ fontSize: 'var(--text-base)' }}>
                Período: {new Date(currentPeriod.start).toLocaleDateString('es-CL')} -{' '}
                {new Date(currentPeriod.end).toLocaleDateString('es-CL')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
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
          
          <div className="relative group">
            <button
              onClick={onOpenSettings}
              className="p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all icon-hover"
            >
              <Settings style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} />
            </button>
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10 tooltip-enter">
              <div className="bg-gray-800 text-white rounded py-1 px-2 whitespace-nowrap" style={{ fontSize: 'var(--text-xs)' }}>
                Configuración
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}