// Detectar si estamos en Claude.ai con window.storage disponible
const hasWindowStorage = typeof window !== 'undefined' && window.storage;

export const storage = {
  async get(key) {
    try {
      if (hasWindowStorage) {
        // Usar window.storage (persistente entre sesiones)
        return await window.storage.get(key, false);
      } else {
        // Fallback a localStorage
        const value = localStorage.getItem(key);
        if (!value) return null;
        
        JSON.parse(value); // Validar JSON
        return { key, value, shared: false };
      }
    } catch (error) {
      console.error('Error al leer datos:', key, error);
      if (!hasWindowStorage) {
        localStorage.removeItem(key); // Limpiar datos corruptos
      }
      return null;
    }
  },

  async set(key, value) {
    try {
      // Validar JSON antes de guardar
      if (typeof value === 'string') {
        JSON.parse(value);
      }
      
      if (hasWindowStorage) {
        return await window.storage.set(key, value, false);
      } else {
        localStorage.setItem(key, value);
        return { key, value, shared: false };
      }
    } catch (error) {
      console.error('Error al guardar datos:', key, error);
      return null;
    }
  },

  async delete(key) {
    try {
      if (hasWindowStorage) {
        return await window.storage.delete(key, false);
      } else {
        localStorage.removeItem(key);
        return { key, deleted: true, shared: false };
      }
    } catch (error) {
      console.error('Error al eliminar datos:', key, error);
      return null;
    }
  },

  async list(prefix) {
    try {
      if (hasWindowStorage) {
        return await window.storage.list(prefix, false);
      } else {
        const keys = Object.keys(localStorage).filter(
          k => !prefix || k.startsWith(prefix)
        );
        return { keys, shared: false };
      }
    } catch (error) {
      console.error('Error al listar datos:', error);
      return { keys: [], shared: false };
    }
  }
};

// Funciones específicas de usuario
export const userStorage = {
  async getUser() {
    const result = await storage.get('kilorama-user');
    return result?.value ? JSON.parse(result.value) : null;
  },

  async setUser(userData) {
    await storage.set('kilorama-user', JSON.stringify(userData));
  },

  async hasSeenOnboarding() {
    const user = await this.getUser();
    return user?.hasSeenOnboarding || false;
  }
};