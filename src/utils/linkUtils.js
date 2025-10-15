// Utilities for building external links

/**
 * Build a WhatsApp link using wa.me or api.whatsapp.com depending on needs.
 * Here we keep the format consistent with existing usage.
 */
export function buildWhatsAppLink(phone, text = '') {
  const cleanPhone = String(phone).replace(/\s/g, '').replace('+', '');
  const url = new URL('https://api.whatsapp.com/send');
  url.searchParams.set('phone', cleanPhone);
  if (text) url.searchParams.set('text', text);
  return url.toString();
}
