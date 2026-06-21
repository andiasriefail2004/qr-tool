const QRCode = require('qrcode');
const { Jimp } = require('jimp');
const jsQR = require('jsqr');

async function generateQR(text, outputPath, options = {}) {
  const opts = {
    width: options.width || 300,
    margin: options.margin || 2,
    errorCorrectionLevel: options.errorCorrectionLevel || 'M',
    color: {
      dark: options.dark || '#000000',
      light: options.light || '#ffffff',
    },
  };
  await QRCode.toFile(outputPath, text, opts);
  return outputPath;
}

async function generateQRTerminal(text, options = {}) {
  const opts = {
    type: 'terminal',
    errorCorrectionLevel: options.errorCorrectionLevel || 'M',
  };
  const result = await QRCode.toString(text, opts);
  return result;
}

async function scanQR(imagePath) {
  const image = await Jimp.read(imagePath);
  const { data, width, height } = image.bitmap;
  const decoded = jsQR(new Uint8ClampedArray(data), width, height);
  if (!decoded) {
    throw new Error('QR code tidak ditemukan pada gambar ini.');
  }
  return decoded.data;
}

// ---------- Formatter untuk tipe data khusus ----------

function formatWifi({ ssid, password, encryption = 'WPA', hidden = false }) {
  return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
}

function formatContact({ name, phone, email, org, address }) {
  let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
  vcard += `FN:${name}\n`;
  if (phone) vcard += `TEL:${phone}\n`;
  if (email) vcard += `EMAIL:${email}\n`;
  if (org) vcard += `ORG:${org}\n`;
  if (address) vcard += `ADR:;;${address};;;;\n`;
  vcard += 'END:VCARD';
  return vcard;
}

function formatLocation({ lat, lng, query }) {
  if (query) return `geo:0,0?q=${encodeURIComponent(query)}`;
  return `geo:${lat},${lng}`;
}

function formatEmail({ to, subject = '', body = '' }) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function formatSMS({ phone, message = '' }) {
  return `SMSTO:${phone}:${message}`;
}

function formatPhone({ phone }) {
  return `tel:${phone}`;
}

function formatEvent({ title, start, end, location = '', description = '' }) {
  const fmt = (d) => {
    if (typeof d === 'string') return d;
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  let vevent = 'BEGIN:VEVENT\n';
  vevent += `SUMMARY:${title}\n`;
  vevent += `DTSTART:${fmt(start)}\n`;
  if (end) vevent += `DTEND:${fmt(end)}\n`;
  if (location) vevent += `LOCATION:${location}\n`;
  if (description) vevent += `DESCRIPTION:${description}\n`;
  vevent += 'END:VEVENT';
  return vevent;
}

module.exports = {
  generateQR,
  generateQRTerminal,
  scanQR,
  formatWifi,
  formatContact,
  formatLocation,
  formatEmail,
  formatSMS,
  formatPhone,
  formatEvent,
};
