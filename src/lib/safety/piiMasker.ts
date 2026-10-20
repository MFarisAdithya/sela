export function maskPii(text: string): string {
  if (!text) return "";

  let sanitized = text;

  // Mask Indonesian Phone numbers: 08xx-xxxx-xxxx or +62 8xx
  sanitized = sanitized.replace(/(\+62|62|0)8[1-9][0-9]{6,11}\b/gi, "[NOMOR_TELEPON_DISAMARKAN]");

  // Mask Emails
  sanitized = sanitized.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi,
    "[EMAIL_DISAMARKAN]"
  );

  // Mask NIK (16 digits)
  sanitized = sanitized.replace(/\b[0-9]{16}\b/g, "[NIK_DISAMARKAN]");

  return sanitized;
}
