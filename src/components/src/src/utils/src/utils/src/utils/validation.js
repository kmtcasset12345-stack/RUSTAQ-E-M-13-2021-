// src/utils/validation.js

/**
 * KMTC APP — FORM VALIDATION UTILITIES
 * ------------------------------------
 * Contains reusable validation helpers for all modules:
 * Materials, PPE, Leave, Cancel, Profile, Login.
 */

export const Validation = {
  // Empty field check
  required: (value, label = "Field") => {
    if (value === null || value === undefined || value === "") {
      return `${label} is required`;
    }
    return null;
  },

  // Number check
  number: (value, label = "Field") => {
    if (value === "" || value === null) return `${label} is required`;
    if (isNaN(value)) return `${label} must be a number`;
    return null;
  },

  // Minimum length
  minLength: (value, len, label = "Field") => {
    if (!value || value.length < len) {
      return `${label} must be at least ${len} characters`;
    }
    return null;
  },

  // Maximum length
  maxLength: (value, len, label = "Field") => {
    if (value && value.length > len) {
      return `${label} must not exceed ${len} characters`;
    }
    return null;
  },

  // Email validation
  email: (value) => {
    if (!value) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? null : "Invalid email address";
  },

  // Oman phone validation (starts with 9, 7 or 2 — 8 digits)
  phone: (value) => {
    if (!value) return "Phone number is required";
    const regex = /^(9|7|2)\d{7}$/;
    return regex.test(value)
      ? null
      : "Invalid Oman phone number (must be 8 digits starting with 9, 7, or 2)";
  },

  // Date format check
  date: (value, label = "Date") => {
    if (!value) return `${label} is required`;
    const d = new Date(value);
    return isNaN(d.getTime()) ? `Invalid ${label}` : null;
  },

  // Ensure fromDate <= toDate
  dateRange: (from, to) => {
    if (!from || !to) return "Both dates are required";
    if (new Date(from) > new Date(to))
      return "Start date cannot be after end date";
    return null;
  },

  // Runs multiple validations
  run: (...validators) => {
    for (let v of validators) {
      if (v !== null) return v; // return first error
    }
    return null; // all good
  },
};

export default Validation;
