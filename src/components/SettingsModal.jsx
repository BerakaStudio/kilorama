import React, { useState } from 'react';
import { X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { userStorage } from '../utils/storage';
import toast from 'react-hot-toast';

export default function SettingsModal({ isOpen, onClose, currentUserName, onUserNameChange }) {
  const { theme, fontSize, toggleTheme, changeFontSize } = useTheme();
  const [newUserName, setNewUserName] = useState(currentUserName || '');
  const [hasChanges, setHasChanges] = useState(false);

  if (!isOpen) return null;

  const handleUserNameChange = (value) => {
    setNewUserName(value);
    setHasChanges(value.trim() !== currentUserName);
  };

  const handleSaveSettings = async () => {
    if (newUserName.trim() && newUserName.trim() !== currentUserName) {
      const user = await userStorage.getUser();
      await userStorage.setUser({
        ...user,
        fullName: newUserName.trim()  // Asegura que guarde el nombre completo
      });
      onUserNameChange(newUserName.trim());
      toast.success('Configuración guardada correctamente');
      setHasChanges(false);
      onClose();
    } else {
      toast.success('Configuración actualizada');
      onClose();
    }
  };

  const fontSizes = [
    { value: 'small', label: 'S' },
    { value: 'medium', label: 'M' },
    { value: 'large', label: 'L' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <h3 className="font-bold text-gray-800 dark:text-gray-100" style={{ fontSize: 'var(--text-xl)' }}>
              Configuración
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Modo Oscuro */}
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-3" style={{ fontSize: 'var(--text-base)' }}>
                Apariencia
              </label>
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  {theme === 'light' ? (
                    <Sun style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} className="text-yellow-500" />
                  ) : (
                    <Moon style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} className="text-blue-400" />
                  )}
                  <span className="text-gray-700 dark:text-gray-200 font-medium" style={{ fontSize: 'var(--text-base)' }}>
                    {theme === 'light' ? 'Modo Claro' : 'Modo Oscuro'}
                  </span>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Tamaño de Fuente */}
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-3" style={{ fontSize: 'var(--text-base)' }}>
                Tamaño de Texto
              </label>
              <div className="flex gap-2">
                {fontSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => changeFontSize(size.value)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                      fontSize === size.value
                        ? 'bg-emerald-500 text-white shadow-lg border-2 border-emerald-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-transparent'
                    }`}
                    style={{ fontSize: 'var(--text-lg)' }}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cambiar Nombre */}
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-3" style={{ fontSize: 'var(--text-base)' }}>
                Nombre de Usuario
              </label>
              <div className="space-y-3">
                <div className="text-gray-500 dark:text-gray-400" style={{ fontSize: 'var(--text-sm)' }}>
                  Actual: <span className="font-medium text-gray-700 dark:text-gray-300">{currentUserName}</span>
                </div>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => handleUserNameChange(e.target.value)}
                  placeholder="Nuevo nombre"
                  className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-xl focus:border-emerald-500 focus:outline-none"
                  style={{ fontSize: 'var(--text-base)' }}
                />
              </div>
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <button
              onClick={handleSaveSettings}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl p-4 font-semibold transition-all shadow-lg"
              style={{ fontSize: 'var(--text-lg)' }}>
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}