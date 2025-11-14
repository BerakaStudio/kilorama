import React from 'react';
import { Calendar } from 'lucide-react';

export default function Header({ currentPeriod }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Kilorama
      </h1>
      <div className="flex items-center gap-2 text-lg text-gray-600">
        <Calendar className="w-5 h-5" />
        <span>
          Período: {new Date(currentPeriod.start).toLocaleDateString('es-CL')} -{' '}
          {new Date(currentPeriod.end).toLocaleDateString('es-CL')}
        </span>
      </div>
    </div>
  );
}