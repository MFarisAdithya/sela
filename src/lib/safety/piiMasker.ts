export function maskPii(text: string): string {
  if (!text) return "";

  let sanitized = text;

  // 1. Mask NIK / KTP / KK (16 consecutive digits or separated by dashes/spaces) - MUST RUN FIRST
  sanitized = sanitized.replace(/\b[0-9]{16}\b/g, "[NIK_DISAMARKAN]");
  sanitized = sanitized.replace(
    /\b[0-9]{4}[\s\-][0-9]{4}[\s\-][0-9]{4}[\s\-][0-9]{4}\b/g,
    "[KARTU_IDENTITAS_DISAMARKAN]"
  );

  // 2. Mask Indonesian Phone numbers: must start with boundary and +62 8, 628, or 08
  // e.g., 081234567890, 0812-3456-7890, +62 812 3456 7890, +62 812-9876-5432, 628123456789
  sanitized = sanitized.replace(
    /(?:^|[^\d])(?:\+62\s?|62\s?|0)8[0-9]{1,3}(?:[\s\-]?[0-9]{3,4}){2,3}\b/gi,
    (match) => {
      // Keep any leading non-digit character (like a space or punctuation)
      const prefix = match.match(/^[^\d]/) ? match[0] : "";
      return prefix + "[NOMOR_TELEPON_DISAMARKAN]";
    }
  );

  // Fallback pattern for continuous digits phone starting with 08, 628, or +628
  sanitized = sanitized.replace(
    /(?:^|[^\d])(?:\+62\s?|62\s?|0)8[1-9][0-9]{6,11}\b/gi,
    (match) => {
      const prefix = match.match(/^[^\d]/) ? match[0] : "";
      return prefix + "[NOMOR_TELEPON_DISAMARKAN]";
    }
  );

  // 3. Mask Emails
  sanitized = sanitized.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi,
    "[EMAIL_DISAMARKAN]"
  );

  // 4. Mask Explicit Legal Name Introductions
  sanitized = sanitized.replace(
    /(?:nama lengkap saya|nama asliku adalah|nama asliku|nama lengkapku)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/gi,
    "nama lengkap [NAMA_DISAMARKAN]"
  );

  return sanitized;
}
