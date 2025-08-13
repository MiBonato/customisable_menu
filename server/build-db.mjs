import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8'));
const menuItems = JSON.parse(fs.readFileSync(path.join(__dirname, 'menu.json'), 'utf8'));

const outDir = path.join(__dirname, 'build');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'db.json'),
  JSON.stringify({ users, menuItems }, null, 2),
  'utf8'
);

console.log('✅ Built server/build/db.json');
