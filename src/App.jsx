import React, { useState, useEffect } from 'react';
import { Plus, FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Header from './components/Header';
import Summary from './components/Summary';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import Modal from './components/Modal';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModal';
import SettingsModal from './components/SettingsModal';
import { SkeletonCard, SkeletonSummary, SkeletonHeader } from './components/SkeletonLoader';
import { storage, userStorage } from './utils/storage';
import { generatePDF } from './utils/pdfGenerator';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState({ start: '', end: '' });
  const [editingId, setEditingId] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    deliveries: [{ requested: '', delivered: '' }]
  });

  useEffect(() => {
    loadEntries();
    calculateCurrentPeriod();
    checkOnboarding();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'vegetable-entries' && e.newValue) {
        try {
          const newEntries = JSON.parse(e.newValue);
          setEntries(newEntries);
          toast.success('Datos sincronizados desde otra pestaña');
        } catch (error) {
          console.error('Error al sincronizar datos:', error);
        }
      }
      
      if (e.key === 'kilorama-user' && e.newValue) {
        try {
          const newUser = JSON.parse(e.newValue);
          setUserData(newUser);
        } catch (error) {
          console.error('Error al sincronizar usuario:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const checkOnboarding = async () => {
    const hasSeenOnboarding = await userStorage.hasSeenOnboarding();
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
      setIsLoading(false);
    } else {
      const user = await userStorage.getUser();
      setUserData(user);
    }
  };

  const handleOnboardingComplete = async (fullName) => {
    const user = {
      fullName,
      hasSeenOnboarding: true,
      createdAt: new Date().toISOString()
    };
    await userStorage.setUser(user);
    setUserData(user);
    setShowOnboarding(false);
    setIsLoading(false);
    toast.success(`¡Bienvenido, ${fullName.split(' ')[0]}!`);
  };

  const handleUserNameChange = async (newName) => {
    const updatedUser = { ...userData, fullName: newName };
    await userStorage.setUser(updatedUser);
    setUserData(updatedUser);
  };

  const loadEntries = async () => {
    setIsLoading(true);
    const result = await storage.get('vegetable-entries');
    if (result?.value) {
      setEntries(JSON.parse(result.value));
    }
    // Simular delay mínimo para mostrar skeleton
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const saveEntriesImmediately = async (newEntries) => {
    await storage.set('vegetable-entries', JSON.stringify(newEntries));
  };

  const calculateCurrentPeriod = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    if (day <= 15) {
      setCurrentPeriod({
        start: new Date(year, month, 1).toISOString().split('T')[0],
        end: new Date(year, month, 15).toISOString().split('T')[0]
      });
    } else {
      const lastDay = new Date(year, month + 1, 0).getDate();
      setCurrentPeriod({
        start: new Date(year, month, 16).toISOString().split('T')[0],
        end: new Date(year, month, lastDay).toISOString().split('T')[0]
      });
    }
  };

  const handleQuickRegister = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      deliveries: [{ requested: '', delivered: '' }]
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!formData.date) {
      toast.error('Por favor ingresa una fecha');
      return;
    }

    const validDeliveries = formData.deliveries.filter(
      d => d.requested && d.delivered
    );

    if (validDeliveries.length === 0) {
      toast.error('Debes agregar al menos una entrega');
      return;
    }

    const newEntry = {
      id: Array.isArray(editingId) ? Date.now() : (editingId || Date.now()),
      date: formData.date,
      deliveries: validDeliveries.map(d => ({
        requested: parseFloat(d.requested),
        delivered: parseFloat(d.delivered)
      }))
    };

    let newEntries;
    
    if (editingId) {
      const idsToRemove = Array.isArray(editingId) ? editingId : [editingId];
      const filteredEntries = entries.filter(e => !idsToRemove.includes(e.id));
      newEntries = [...filteredEntries, newEntry];
      setEntries(newEntries);
      await saveEntriesImmediately(newEntries);
      setEditingId(null);
      toast.success('Registro actualizado correctamente');
    } else {
      newEntries = [...entries, newEntry];
      setEntries(newEntries);
      await saveEntriesImmediately(newEntries);
      toast.success('Registro guardado correctamente');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      deliveries: [{ requested: '', delivered: '' }]
    });
    setShowForm(false);
    setEditingId(null);
  };

  const startEdit = (entry) => {
    const sameDay = entries.filter(e => e.date === entry.date);
    const allDeliveries = sameDay.flatMap(e => e.deliveries);
    
    setFormData({
      date: entry.date,
      deliveries: allDeliveries.map(d => ({
        requested: d.requested.toString(),
        delivered: d.delivered.toString()
      }))
    });
    
    setEditingId(sameDay.map(e => e.id));
    setShowForm(true);
  };

  const deleteEntry = async (id) => {
    if (confirm('¿Eliminar este registro?')) {
      const newEntries = entries.filter(e => e.id !== id);
      setEntries(newEntries);
      await saveEntriesImmediately(newEntries);
      toast.success('Registro eliminado');
    }
  };

  const deleteDay = async (dayEntry) => {
    if (confirm('¿Eliminar todos los registros de este día?')) {
      const idsToDelete = dayEntry.entries.map(e => e.id);
      const newEntries = entries.filter(e => !idsToDelete.includes(e.id));
      setEntries(newEntries);
      await saveEntriesImmediately(newEntries);
      toast.success('Registros del día eliminados');
    }
  };

  const getPeriodEntries = () => {
    const filtered = entries.filter(
      e => e.date >= currentPeriod.start && e.date <= currentPeriod.end
    );

    const grouped = filtered.reduce((acc, entry) => {
      if (!acc[entry.date]) {
        acc[entry.date] = { date: entry.date, entries: [] };
      }
      acc[entry.date].entries.push(entry);
      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  };

  const calculateTotals = (periodEntries) => {
    let totalRequested = 0;
    let totalDelivered = 0;

    periodEntries.forEach(dayEntry => {
      dayEntry.entries.forEach(entry => {
        entry.deliveries.forEach(d => {
          totalRequested += d.requested;
          totalDelivered += d.delivered;
        });
      });
    });

    return { totalRequested, totalDelivered };
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const periodEntries = getPeriodEntries();
      const totals = calculateTotals(periodEntries);
      await generatePDF(periodEntries, currentPeriod, totals, userData?.fullName);
      toast.success('Comprobante generado correctamente');
    } catch (error) {
      toast.error('Error al generar el comprobante');
      console.error(error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const periodEntries = getPeriodEntries();
  const { totalRequested, totalDelivered } = calculateTotals(periodEntries);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      <OnboardingModal 
        isOpen={showOnboarding} 
        onComplete={handleOnboardingComplete} 
      />
      
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentUserName={userData?.fullName}
        onUserNameChange={handleUserNameChange}
      />
      
      <div className="flex-1 p-2 sm:p-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <>
              <SkeletonHeader />
              <SkeletonSummary />
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              </div>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <Header 
                currentPeriod={currentPeriod} 
                userName={userData?.fullName}
                workDays={periodEntries.length}
                onOpenSettings={() => setShowSettings(true)}
                onQuickRegister={handleQuickRegister}
              />

              <Summary
                totalRequested={totalRequested}
                totalDelivered={totalDelivered}
                daysWorked={periodEntries.length}
              />

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 font-semibold shadow-lg transition-all"
                  style={{ fontSize: 'var(--text-lg)' }}
                >
                  <Plus style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} />
                  Nuevo Registro
                </button>
                <button
                  onClick={handleGeneratePDF}
                  disabled={periodEntries.length === 0 || isGeneratingPDF}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 font-semibold shadow-lg transition-all"
                  style={{ fontSize: 'var(--text-lg)' }}
                >
                  {isGeneratingPDF ? (
                    <>
                      <Loader2 className="animate-spin" style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} />
                      Generando...
                    </>
                  ) : (
                    <>
                      <FileText style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} />
                      Generar Comprobante
                    </>
                  )}
                </button>
              </div>

              <Modal
                isOpen={showForm}
                onClose={resetForm}
                title={editingId ? 'Editar Registro' : 'Nuevo Registro'}
              >
                <EntryForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  onCancel={resetForm}
                  isEditing={!!editingId}
                />
              </Modal>

              <div className="space-y-4">
                <h2 className="font-bold text-gray-800 dark:text-gray-100" style={{ fontSize: 'var(--text-2xl)' }}>
                  Registros del Período
                </h2>
                <EntryList
                  periodEntries={periodEntries}
                  onEdit={startEdit}
                  onDelete={deleteEntry}
                  onDeleteDay={deleteDay}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}