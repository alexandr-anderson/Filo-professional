const PHONE_ALLOWED = /[^\d+()\s-]/g;

export function sanitizePhoneInput(value) {
  const raw = String(value);
  const plus = raw.trimStart().startsWith('+');
  const rest = raw.replace(PHONE_ALLOWED, '').replace(/\+/g, '');
  return (plus ? '+' : '') + rest;
}

export function normalizePhoneToPlus7(value) {
  let digits = String(value).replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('8') && digits.length >= 11) {
    digits = `7${digits.slice(1)}`;
  } else if (digits.length === 10) {
    digits = `7${digits}`;
  }

  if (digits.startsWith('7') && digits.length > 11) {
    digits = digits.slice(0, 11);
  }

  if (digits.length === 11 && digits.startsWith('7')) {
    return `+${digits}`;
  }

  return '';
}

export function isValidRuPhone(value) {
  return /^\+7\d{10}$/.test(normalizePhoneToPlus7(value));
}
