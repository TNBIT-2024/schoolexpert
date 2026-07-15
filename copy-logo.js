const fs = require('fs');
const path = require('path');

const source = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\535d8908-d840-4dda-b7fc-c29cce0f2b95\\schoolexpert_logo_transparent_1780552477009.png";
const dest = path.join(__dirname, 'public', 'schoolexpert_logo.png');

try {
  fs.copyFileSync(source, dest);
  console.log("Successfully updated logo to transparent version!");
} catch (err) {
  console.error("Error copying logo:", err);
}
