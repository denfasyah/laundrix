const fs = require('fs');
const path = require('path');

const root = __dirname;
const src = path.join(root, 'src');

if (!fs.existsSync(src)) {
  fs.mkdirSync(src);
}

const foldersToMove = ['app', 'components', 'lib', 'types'];

foldersToMove.forEach(folder => {
  const oldPath = path.join(root, folder);
  const newPath = path.join(src, folder);
  if (fs.existsSync(oldPath)) {
    fs.cpSync(oldPath, newPath, { recursive: true });
    fs.rmSync(oldPath, { recursive: true, force: true });
  }
});

const newDirs = [
  'src/hooks',
  'src/constants',
  'src/schemas'
];

newDirs.forEach(dir => {
  const fullPath = path.join(root, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const newFiles = [
  { path: 'src/lib/db/queries/attendance.ts', content: '// Attendance queries\n' },
  { path: 'src/lib/db/queries/branches.ts', content: '// Branches queries\n' },
  { path: 'src/lib/db/queries/employees.ts', content: '// Employees queries\n' },
  { path: 'src/lib/db/queries/machine-reports.ts', content: '// Machine reports queries\n' },
  { path: 'src/lib/actions/report.actions.ts', content: '// Report actions\n' }
];

newFiles.forEach(f => {
  const fullPath = path.join(root, f.path);
  fs.writeFileSync(fullPath, f.content);
});

// Remove api/storage/upload
const uploadDir = path.join(src, 'app/api/storage/upload');
if (fs.existsSync(uploadDir)) {
  fs.rmSync(uploadDir, { recursive: true, force: true });
}
const storageDir = path.join(src, 'app/api/storage');
if (fs.existsSync(storageDir) && fs.readdirSync(storageDir).length === 0) {
  fs.rmSync(storageDir, { recursive: true, force: true });
}
const apiDir = path.join(src, 'app/api');
if (fs.existsSync(apiDir) && fs.readdirSync(apiDir).length === 0) {
  fs.rmSync(apiDir, { recursive: true, force: true });
}

console.log("Restructuring complete");
