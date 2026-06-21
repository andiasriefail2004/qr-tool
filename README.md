# qr-tool

CLI dan library Node.js sederhana untuk generate dan scan QR code — mendukung teks, link, WiFi, kontak, lokasi, email, SMS, telepon, dan event kalender.

## Instalasi
git clone https://github.com/andiasriefail2004/qr-tool.git
cd qr-tool
## Penggunaan CLI

### Teks / Link
node bin/cli.js generate
"https://github.com" -o qrcode.png
node bin/cli.js generate
"https://github.com" -t
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
- `-o, --output <path>` — path file output (default: `qrcode.png`)
- `-w, --width <number>` — ukuran QR code dalam piksel (default: `300`)
- `-t, --terminal` — tampilkan QR code di terminal tanpa menyimpan file

## Penggunaan sebagai Library
const { generateQR, scanQR } = require('qr-tool');
await generateQR('https://github.com', 'output.png');
const text = await scanQR('output.png');
console.log(text);
## Lisensi

ISC
