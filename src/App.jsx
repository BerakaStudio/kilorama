import React, { useState, useEffect } from 'react';
import { Plus, FileText } from 'lucide-react';
import Header from './components/Header';
import Summary from './components/Summary';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import Modal from './components/Modal';
import Footer from './components/Footer';
import { storage } from './utils/storage';
import { generatePDF } from './utils/pdfGenerator';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState({ start: '', end: '' });
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    deliveries: [{ requested: '', delivered: '' }]
  });

  useEffect(() => {
    loadEntries();
    calculateCurrentPeriod();
  }, []);

  useEffect(() => {
    if (entries.length > 0) saveEntries();
  }, [entries]);

  const loadEntries = async () => {
    const result = await storage.get('vegetable-entries');
    if (result?.value) setEntries(JSON.parse(result.value));
  };

  const saveEntries = async () => {
    await storage.set('vegetable-entries', JSON.stringify(entries));
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

  const handleSubmit = () => {
    if (!formData.date) return;

    const validDeliveries = formData.deliveries.filter(
      d => d.requested && d.delivered
    );

    if (validDeliveries.length === 0) return;

    const newEntry = {
      id: Array.isArray(editingId) ? Date.now() : (editingId || Date.now()),
      date: formData.date,
      deliveries: validDeliveries.map(d => ({
        requested: parseFloat(d.requested),
        delivered: parseFloat(d.delivered)
      }))
    };

    if (editingId) {
      // Si es array, eliminar todos los registros viejos del día
      const idsToRemove = Array.isArray(editingId) ? editingId : [editingId];
      const filteredEntries = entries.filter(e => !idsToRemove.includes(e.id));
      setEntries([...filteredEntries, newEntry]);
      setEditingId(null);
    } else {
      setEntries([...entries, newEntry]);
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
    // Encontrar todos los registros del mismo día
    const sameDay = entries.filter(e => e.date === entry.date);
    
    // Consolidar todas las entregas del día
    const allDeliveries = sameDay.flatMap(e => e.deliveries);
    
    setFormData({
      date: entry.date,
      deliveries: allDeliveries.map(d => ({
        requested: d.requested.toString(),
        delivered: d.delivered.toString()
      }))
    });
    
    // Guardar todos los IDs del día para poder eliminarlos al actualizar
    setEditingId(sameDay.map(e => e.id));
    setShowForm(true);
  };

  const deleteEntry = (id) => {
    if (confirm('¿Eliminar este registro?')) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const deleteDay = (dayEntry) => {
    if (confirm('¿Eliminar todos los registros de este día?')) {
      const idsToDelete = dayEntry.entries.map(e => e.id);
      setEntries(entries.filter(e => !idsToDelete.includes(e.id)));
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

  const handleGeneratePDF = () => {
    const periodEntries = getPeriodEntries();
    const totals = calculateTotals(periodEntries);
    generatePDF(periodEntries, currentPeriod, totals);
  };

  const periodEntries = getPeriodEntries();
  const { totalRequested, totalDelivered } = calculateTotals(periodEntries);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <Header currentPeriod={currentPeriod} />

          <Summary
            totalRequested={totalRequested}
            totalDelivered={totalDelivered}
            daysWorked={periodEntries.length}
          />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 text-lg font-semibold shadow-lg transition-colors"
            >
              <Plus className="w-6 h-6" />
              Nuevo Registro
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={periodEntries.length === 0}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-xl p-4 flex items-center justify-center gap-2 text-lg font-semibold shadow-lg transition-colors"
            >
              <FileText className="w-6 h-6" />
              Generar Comprobante
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
            <h2 className="text-2xl font-bold text-gray-800">
              Registros del Período
            </h2>
            <EntryList
              periodEntries={periodEntries}
              onEdit={startEdit}
              onDelete={deleteEntry}
              onDeleteDay={deleteDay}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}