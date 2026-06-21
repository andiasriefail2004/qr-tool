# qr-tool

A CLI and Node.js library for generating and scanning QR codes. Supports text/links, WiFi, contacts (vCard), locations, emails, SMS, phone numbers, and calendar events. Additional features: custom colors, error correction levels, and terminal display.

## Features
- Generate QR codes for: text, URLs, WiFi, contacts (vCard), locations (lat/lon), email, SMS, phone numbers, and calendar events (ICS).
- Foreground/background color options.
- Size settings (pixels) and error correction levels (L/M/Q/H).
- Scan QR codes from image files.
- Can be used as both CLI and library.

## Installation
Make sure Node.js and npm are installed.

1. Clone the repository:
   git clone https://github.com/andiasriefail2004/qr-tool.git
2. Navigate to the project folder:
   cd qr-tool
3. Install dependencies:
   npm install

## CLI Usage

General format:
node bin/cli.js <command> [arguments] [options]

Example commands:

### 1) Generate text / link
node bin/cli.js generate "https://github.com" -o qrcode.png

Display in terminal without saving:
node bin/cli.js generate "https://github.com" --terminal

### 2) Custom colors & error correction
node bin/cli.js generate "https://github.com" -o colored.png --dark "#1a73e8" --light "#ffffff" --ecl H

### 3) WiFi
node bin/cli.js wifi "WiFiName" "password123" -o wifi.png

### 4) Contact (vCard)
node bin/cli.js contact "John" "08123456789" -e john@email.com -o contact.png

### 5) Location
node bin/cli.js location -6.2088 106.8456 -o location.png

### 6) Email
node bin/cli.js email "john@email.com" -s "Hello" -b "How are you?" -o email.png

### 7) SMS
node bin/cli.js sms "08123456789" -m "Hello!" -o sms.png

### 8) Phone
node bin/cli.js phone "08123456789" -o phone.png

### 9) Calendar Event
node bin/cli.js event "Team Meeting" "2026-07-01T10:00:00" -e "2026-07-01T11:00:00" -l "Office" -o event.png

### 10) Scan QR Code
node bin/cli.js scan qrcode.png

## Common Options
- -o, --output: Output file path (default: qrcode.png)  
- -w, --width: QR code size in pixels (default: 300)  
- --terminal: Display QR code in terminal without saving file  
- `--dark <color>` — QR code color (foreground), hex format (default: `#000000`)
- `--light <color>` — background color, hex format (default: `#ffffff`)
- `--ecl <level>` — error correction level: `L` (low), `M` (medium), `Q` (high), `H` (very high) (default: `M`)

> Note: Option names (e.g., `--dark`, `--light`, `--ecl`) follow the implementation in `bin/cli.js`. If they differ, adjust the flags in the examples above.

## Usage as a Library (Node.js)
Example usage in code:
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
  console.log('Scan result:', result);
}).catch(err => console.error(err));
```

Adjust the API (function names/options) according to the implementation in the package if they differ.

## Development
- Run unit tests (if available) and check `bin/cli.js` to confirm flags and options.
- For contributions: create a new branch, commit changes, and open a PR.

## License
ISC
