# qr-tool

CLI dan library Node.js untuk generate dan scan QR code — mendukung teks, link, WiFi, kontak (vCard), lokasi, email, SMS, telepon, dan event kalender, dengan opsi warna custom dan error correction level.

## Instalasi

git clone https://github.com/andiasriefail2004/qr-tool.git

cd qr-tool

npm install

## Penggunaan CLI

### Teks / Link
node bin/cli.js generate 

"https://github.com" -o qrcode.png

node bin/cli.js generate 

"https://github.com" -t

### Custom warna & error correction
node bin/cli.js generate "https://github.com" -o colored.png --dark "#1a73e8" --light "#ffffff" --ecl H

### WiFi
node bin/cli.js wifi "NamaWifi" "password123" -o wifi.png

### Kontak
node bin/cli.js contact "Budi" "08123456789" -e budi@email.com -o kontak.png

### Lokasi
node bin/cli.js location -6.2088 106.8456 -o lokasi.png

### Email
node bin/cli.js email "budi@email.com" -s "Halo" -b "Apa kabar?" -o email.png

### SMS
node bin/cli.js sms "08123456789" -m "Halo!" -o sms.png

### Telepon
node bin/cli.js phone "08123456789" -o telepon.png

### Event Kalender
node bin/cli.js event "Meeting Tim" "2026-07-01T10:00:00" -e "2026-07-01T11:00:00" -l "Kantor" -o event.png

### Scan QR Code
node bin/cli.js scan qrcode.png

### Opsi Umum
- output: path file hasil (default qrcode.png)
- width: ukuran QR dalam piksel (default 300)
- terminal: tampilkan QR di terminal tanpa simpan file
- dark: warna QR/foreground hex (default #000000)
- light: warna background hex (default #ffffff)
- ecl: error correction level L/M/Q/H (default M)

## Penggunaan sebagai Library

const { generateQR, scanQR } = require('qr-tool');
generateQR('https://github.com', 'output.png', { dark: '#1a73e8', errorCorrectionLevel: 'H' });
scanQR('output.png');

## Lisensi

ISC
