const fs = require('fs');
const path = require('path');

const root = __dirname;
const appDir = path.join(root, 'src', 'app');

const ownerOld = path.join(appDir, '(owner)');
const ownerNew = path.join(appDir, 'owner');

const staffOld = path.join(appDir, '(staff)');
const staffNew = path.join(appDir, 'staff');

if (fs.existsSync(ownerOld)) {
  fs.cpSync(ownerOld, ownerNew, { recursive: true });
  fs.rmSync(ownerOld, { recursive: true, force: true });
}

if (fs.existsSync(staffOld)) {
  fs.cpSync(staffOld, staffNew, { recursive: true });
  fs.rmSync(staffOld, { recursive: true, force: true });
}

console.log("Renamed route groups successfully.");
