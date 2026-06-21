# qr-tool

[![npm version](https://img.shields.io/npm/v/qr-tool.svg)](https://www.npmjs.com/package/qr-tool) [![license](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

CLI dan library Node.js untuk menghasilkan (generate) dan memindai (scan) QR code. Mendukung teks/link, WiFi, kontak (vCard), lokasi, email, SMS, telepon, dan event kalender. Fitur tambahan: warna kustom dan pengaturan error correction level.

## Fitur
- Generate QR untuk: teks, URL, WiFi, kontak (vCard), lokasi (lat/lon), email, SMS, telepon, event kalender (ICS).
- Opsi warna foreground/background.
- Pengaturan ukuran (pixel) dan error correction level (L/M/Q/H).
- Scan QR dari file gambar.
- Bisa dipakai sebagai CLI maupun library.

## Instalasi
Pastikan Node.js dan npm sudah terpasang.

1. Clone repo:
   git clone https://github.com/andiasriefail2004/qr-tool.git
2. Masuk ke folder proyek:
   cd qr-tool
3. Install dependensi:
   npm install

## Penggunaan CLI

Format umum:
node bin/cli.js <perintah> [argumen] [opsi]

Contoh-perintah (flag sesuai implementasi di bin/cli.js):

### Opsi Umum (semua perintah)
- -o, --output <path>        Path file output (default: `qrcode.png`)
- -w, --width <number>       Ukuran QR code dalam piksel (default: `300`)
- -t, --terminal             Tampilkan QR langsung di terminal, tanpa menyimpan file
- --dark <color>             Warna QR (foreground), format hex (default: `#000000`)
- --light <color>            Warna background, format hex (default: `#ffffff`)
- --ecl <level>              Error correction level: `L` / `M` / `Q` / `H` (default: `M`)

### 1) Generate teks / link
node bin/cli.js generate "https://github.com" -o qrcode.png

Tampilkan di terminal tanpa menyimpan:
node bin/cli.js generate "https://github.com" --terminal

### 2) Custom warna & error correction
node bin/cli.js generate "https://github.com" -o colored.png --dark "#1a73e8" --light "#ffffff" --ecl H

### 3) WiFi
node bin/cli.js wifi "NamaWifi" "password123" -o wifi.png --encryption WPA --hidden

### 4) Kontak (vCard)
node bin/cli.js contact "Budi" "08123456789" -e budi@email.com --org "Perusahaan" -a "Jalan 1" -o kontak.png

### 5) Lokasi
node bin/cli.js location -6.2088 106.8456 -o lokasi.png

### 6) Email
node bin/cli.js email "budi@email.com" -s "Halo" -b "Apa kabar?" -o email.png

### 7) SMS
node bin/cli.js sms "08123456789" -m "Halo!" -o sms.png

### 8) Telepon
node bin/cli.js phone "08123456789" -o telepon.png

### 9) Event Kalender
node bin/cli.js event "Meeting Tim" "2026-07-01T10:00:00" -e "2026-07-01T11:00:00" -l "Kantor" -d "Rapat bulanan" -o event.png

### 10) Scan QR Code
node bin/cli.js scan qrcode.png

## Contoh Output (preview)
Contoh output ketika generate berhasil:

✅ QR code berhasil dibuat: /full/path/to/qrcode.png

Contoh output ketika scan:

✅ Hasil scan:
{"type":"text","data":"https://github.com"}

## Penggunaan sebagai Library (Node.js)
Contoh penggunaan dalam kode:
```javascript
const { generateQR, scanQR } = require('qr-tool');

// generateQR(content, outputPath, options)
generateQR('https://github.com', 'output.png', {
  width: 400,
  dark: '#1a73e8',
  light: '#ffffff',
  errorCorrectionLevel: 'H'
});

// scanQR(pathOrBuffer)
scanQR('output.png').then(result => {
  console.log('Hasil scan:', result);
}).catch(err => console.error(err));
```

Sesuaikan API (nama fungsi/opsi) dengan implementasi di paket jika berbeda.

## Pengembangan
- Jalankan unit test (jika ada) dan periksa `bin/cli.js` untuk konfirmasi flag dan opsi.
- Untuk kontribusi: buat branch baru, commit perubahan, dan buka PR.

## Lisensi
ISC
