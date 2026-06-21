#!/usr/bin/env node

const { Command } = require('commander');
const path = require('path');
const {
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
} = require('../index.js');

const program = new Command();

program
  .name('qr-tool')
  .description('CLI untuk generate dan scan QR code (teks, WiFi, kontak, lokasi, email, SMS, telepon, event)')
  .version('1.1.0');

// Helper umum untuk output (terminal atau file)
async function output(text, options) {
  if (options.terminal) {
    const result = await generateQRTerminal(text);
    console.log(result);
    return;
  }
  const outputPath = path.resolve(options.output);
  await generateQR(text, outputPath, { width: parseInt(options.width, 10) });
  console.log(`✅ QR code berhasil dibuat: ${outputPath}`);
}

function addCommonOptions(cmd) {
  return cmd
    .option('-o, --output <path>', 'path file output', 'qrcode.png')
    .option('-w, --width <number>', 'ukuran QR code (px)', '300')
    .option('-t, --terminal', 'tampilkan QR langsung di terminal, tanpa simpan file');
}

// ---------- generate teks/link ----------
addCommonOptions(
  program.command('generate <text>').alias('gen').description('Generate QR code dari teks/link')
).action(async (text, options) => {
  try {
    await output(text, options);
  } catch (err) {
    console.error('❌ Gagal generate QR code:', err.message);
    process.exit(1);
  }
});

// ---------- scan ----------
program
  .command('scan <imagePath>')
  .description('Scan/baca QR code dari file gambar')
  .action(async (imagePath) => {
    try {
      const fullPath = path.resolve(imagePath);
      const result = await scanQR(fullPath);
      console.log('✅ Hasil scan:');
      console.log(result);
    } catch (err) {
      console.error('❌ Gagal scan QR code:', err.message);
      process.exit(1);
    }
  });

// ---------- wifi ----------
addCommonOptions(
  program
    .command('wifi <ssid> <password>')
    .description('Generate QR code untuk konek WiFi otomatis')
    .option('-e, --encryption <type>', 'jenis enkripsi (WPA/WEP/nopass)', 'WPA')
    .option('--hidden', 'tandai jaringan sebagai hidden')
).action(async (ssid, password, options) => {
  try {
    const text = formatWifi({ ssid, password, encryption: options.encryption, hidden: !!options.hidden });
    await output(text, options);
  } catch (err) {
    console.error('❌ Gagal generate QR WiFi:', err.message);
    process.exit(1);
  }
});

// ---------- contact ----------
addCommonOptions(
  program
    .command('contact <name> <phone>')
    .description('Generate QR code kontak (vCard)')
    .option('-e, --email <email>', 'alamat email')
    .option('--org <org>', 'nama organisasi/perusahaan')
    .option('-a, --address <address>', 'alamat')
).action(async (name, phone, options) => {
  try {
    const text = formatContact({ name, phone, email: options.email, org: options.org, address: options.address });
    await output(text, options);
  } catch (err) {
    console.error('❌ Gagal generate QR kontak:', err.message);
    process.exit(1);
  }
});

// ---------- location ----------
addCommonOptions(
  program
    .command('location <lat> <lng>')
    .description('Generate QR code lokasi/koordinat (buka di Maps saat di-scan)')
).action(async (lat, lng, options) => {
  try {
    const text = formatLocation({ lat, lng });
    await output(text, options);
  } catch (err) {
    console.error('❌ Gagal generate QR lokasi:', err.message);
    process.exit(1);
  }
});

// ---------- email ----------
addCommonOptions(
  program
    .command('email <to>')
    .description('Generate QR code untuk kirim email')
    .option('-s, --subject <subject>', 'subjek email', '')
    .option('-b, --body <body>', 'isi email', '')
).action(async (to, options) => {
  try {
    const text = formatEmail({ to, subject: options.subject, body: options.body });
    await output(text, options);
  } catch (err) {
    console.error('❌ Gagal generate QR email:', err.message);
    process.exit(1);
  }
});

// ---------- sms ----------
addCommonOptions(
  program
    .command('sms <phone>')
    .description('Generate QR code untuk kirim SMS')
    .option('-m, --message <message>', 'isi pesan', '')
).action(async (phone, options) => {
  try {
    const text = formatSMS({ phone, message: options.message });
    await output(text, options);
  } catch (err) {
    console.error('❌ Gagal generate QR SMS:', err.message);
    process.exit(1);
  }
});

// ---------- phone ----------
addCommonOptions(
  program
    .command('phone <number>')
    .description('Generate QR code untuk panggilan telepon')
).action(async (number, options) => {
  try {
    const text = formatPhone({ phone: number });
    await output(text, options);
  } catch (err) {
    console.error('❌ Gagal generate QR telepon:', err.message);
    process.exit(1);
  }
});

// ---------- event ----------
addCommonOptions(
  program
    .command('event <title> <start>')
    .description('Generate QR code event kalender. Format start/end: YYYY-MM-DDTHH:mm:ss')
    .option('-e, --end <end>', 'waktu selesai (ISO format)')
    .option('-l, --location <location>', 'lokasi acara', '')
    .option('-d, --description <description>', 'deskripsi acara', '')
).action(async (title, start, options) => {
  try {
    const startDate = new Date(start);
    const endDate = options.end ? new Date(options.end) : null;
    const text = formatEvent({
      title,
      start: startDate,
      end: endDate,
      location: options.location,
      description: options.description,
    });
    await output(text, options);
  } catch (err) {
    console.error('❌ Gagal generate QR event:', err.message);
    process.exit(1);
  }
});

program.parse(process.argv);
