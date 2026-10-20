/**
 * PII Masker untuk melindungi data pribadi remaja
 * Menyaring nomor telepon, NIK, dan email secara otomatis
 */

export function maskPii(text: string): { sanitizedText: string; maskedCount: number } {
  let maskedCount = 0;
  let result = text;

  // Mask Phone numbers (+62 or 08xx-xxxx-xxxx)
  const phoneRegex = /(\+62|62|0)8[1-9][0-9]{6,11}/g;
  result = result.replace(phoneRegex, () => {
    maskedCount++;
    return "[NOMOR_TELEPON_DISAMARKAN]";
  });

  // Mask NIK (16 digit numeric)
  const nikRegex = /\b\d{16}\b/g;
  result = result.replace(nikRegex, () => {
    maskedCount++;
    return "[NIK_DISAMARKAN]";
  });

  // Mask Email
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  result = result.replace(emailRegex, () => {
    maskedCount++;
    return "[EMAIL_DISAMARKAN]";
  });

  return {
    sanitizedText: result,
    maskedCount,
  };
}
