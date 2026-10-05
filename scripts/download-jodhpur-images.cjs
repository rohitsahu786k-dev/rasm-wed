const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'jodhpur');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Rename test.jpg to umaid-bhawan-palace.jpg if exists
const testPath = path.join(targetDir, 'test.jpg');
const umaidPath = path.join(targetDir, 'umaid-bhawan-palace.jpg');
if (fs.existsSync(testPath)) {
  fs.copyFileSync(testPath, umaidPath);
  fs.unlinkSync(testPath);
  console.log('Saved umaid-bhawan-palace.jpg from test.jpg');
}

const images = [
  { name: 'blue-city-jodhpur.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Mehrangarh_Fort_5%2C_Jodhpur%2C_Rajasthan%2C_India.jpg' },
  { name: 'mandore-gardens.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Mandore_Garden_in_Mandore%2C_Jodhpur_city%2C_Rajasthan_02.jpg' },
  { name: 'jodhpur-fresco.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Fresco%2C_Mehrangarh_Fort%2C_Jodhpur%2C_Rajasthan.jpg' }
];

for (const img of images) {
  const dest = path.join(targetDir, img.name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 50000) {
    console.log('Already exists:', img.name);
    continue;
  }
  console.log('Downloading', img.name, '...');
  try {
    const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0" -o "${dest}" "${img.url}"`;
    execSync(cmd, { stdio: 'inherit' });
    const s = fs.statSync(dest);
    console.log('Done:', img.name, s.size, 'bytes');
  } catch (e) {
    console.error('Failed:', img.name, e.message);
  }
}
