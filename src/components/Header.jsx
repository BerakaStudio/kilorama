import React from 'react';
import { Calendar } from 'lucide-react';

export default function Header({ currentPeriod }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex items-center gap-4">
        <img 
          src="/icon.svg" 
          alt="Kilorama" 
          className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            Kilorama
          </h1>
          <div className="flex items-center gap-2 text-sm sm:text-lg text-gray-600">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="break-words">
              Período: {new Date(currentPeriod.start).toLocaleDateString('es-CL')} -{' '}
              {new Date(currentPeriod.end).toLocaleDateString('es-CL')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}