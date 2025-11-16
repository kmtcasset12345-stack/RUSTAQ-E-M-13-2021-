// src/utils/format.js
// KMTC APP — STANDARD FORMAT UTILITIES

const Format = {
  // Convert date → DD-MM-YYYY
  toDisplayDate(date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB"); // 14/11/2025
  },

  // Convert date → YYYY-MM-DD (HTML input format)
  toInputDate(date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  },

  // Convert time → HH:MM
  toDisplayTime(date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  },

  // Capitalize first letter of name
  capitalizeName(name) {
    if (!name) return "";
    return name
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  },

  // Generate SL number (1,2,3,4,...)
  slNo(index) {
    return index + 1;
  },

  // Format status (Materials, PPE, Leave)
  status(statusCode) {
    const map = {
      sent: "REQUEST",
      request: "REQUEST",
      accept: "IN PROCESS",
      accepted: "IN PROCESS",
      decline: "DECLINED",
      declined: "DECLINED",
      received: "COMPLETED",
      completed: "COMPLETED",
    };

    return map[statusCode?.toLowerCase()] || "UNKNOWN";
  },

  // Normalize nationality
  nationality(n) {
    if (!n) return "";
    return Format.capitalizeName(n);
  },

  // Clean area name (Rustaq, Hazam, Awabi...)
  area(name) {
    if (!name) return "";
    return Format.capitalizeName(name.trim());
  },

  // Human readable "time ago"
  timeAgo(date) {
    if (!date) return "";
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let unit in intervals) {
      const value = Math.floor(seconds / intervals[unit]);
      if (value > 1) return `${value} ${unit}s ago`;
      if (value === 1) return `1 ${unit} ago`;
    }

    return "Just now";
  },
};

export default Format;
