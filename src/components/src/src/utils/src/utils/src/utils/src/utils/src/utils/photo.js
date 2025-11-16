// src/utils/photo.js
// KMTC APP — PHOTO HANDLING UTILITIES
// -----------------------------------

const MAX_SIZE_MB = 2;
const VALID_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const PhotoUtils = {
  // Validate image before upload
  validate(file) {
    if (!file) return "No file selected";

    if (!VALID_TYPES.includes(file.type)) {
      return "Invalid file type. Only JPG, JPEG, PNG allowed.";
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_SIZE_MB) {
      return `File too large. Maximum allowed ${MAX_SIZE_MB} MB`;
    }

    return null; // no error
  },

  // Convert file to Base64
  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);

      reader.readAsDataURL(file);
    });
  },

  // Compress image using canvas
  async compress(file, quality = 0.7) {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const width = img.width;
          const height = img.height;

          // Resize logic if needed
          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            quality
          );
        };
      };

      reader.readAsDataURL(file);
    });
  },

  // Create preview URL for img tag
  preview(file) {
    return URL.createObjectURL(file);
  },

  // Clean preview URL to avoid memory leak
  revoke(url) {
    URL.revokeObjectURL(url);
  },

  // Auto rename file (e.g. OLD_20251116_1830.jpg)
  rename(originalName, prefix = "PHOTO") {
    const ext = originalName.split(".").pop();
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:T.]/g, "")
      .slice(0, 14); // e.g. 20251116183020

    return `${prefix}_${timestamp}.${ext}`;
  },
};

export default PhotoUtils;
