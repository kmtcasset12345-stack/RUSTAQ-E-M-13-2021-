// src/utils/storage.js

/**
 * LOCAL STORAGE WRAPPER FOR KMTC APP
 * ----------------------------------
 * Features:
 * ✔ Auto-ID generation
 * ✔ Add / update / delete / soft-delete / restore
 * ✔ Per-module storage (materials, ppe, leave, cancel, profile)
 * ✔ Timestamp tracking
 * ✔ Safe operations with fallback
 */

const getData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error(`❌ Storage getData error for key ${key}`, err);
    return [];
  }
};

const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`❌ Storage saveData error for key ${key}`, err);
  }
};

const generateId = () => {
  return "ID-" + Math.random().toString(36).substr(2, 9);
};

// -------------------------------------
// PUBLIC STORAGE FUNCTIONS
// -------------------------------------

export const Storage = {
  // READ
  getAll: (key) => {
    return getData(key).filter((item) => !item.isDeleted);
  },

  getDeleted: (key) => {
    return getData(key).filter((item) => item.isDeleted);
  },

  getById: (key, id) => {
    return getData(key).find((item) => item.id === id);
  },

  // CREATE
  add: (key, newItem) => {
    const data = getData(key);

    const item = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false,
      ...newItem,
    };

    data.push(item);
    saveData(key, data);

    return item;
  },

  // UPDATE
  update: (key, id, updates) => {
    const data = getData(key);
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) return null;

    data[index] = {
      ...data[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    saveData(key, data);
    return data[index];
  },

  // SOFT DELETE
  softDelete: (key, id) => {
    const data = getData(key);
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) return false;

    data[index].isDeleted = true;
    data[index].deletedAt = new Date().toISOString();

    saveData(key, data);
    return true;
  },

  // RESTORE
  restore: (key, id) => {
    const data = getData(key);
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) return false;

    data[index].isDeleted = false;
    delete data[index].deletedAt;

    saveData(key, data);
    return true;
  },

  // PERMANENT DELETE
  forceDelete: (key, id) => {
    const data = getData(key);
    const updated = data.filter((item) => item.id !== id);
    saveData(key, updated);
    return true;
  },
};

export default Storage;
