#!/usr/bin/env node
// Builds a WordPress-compatible ZIP (forward-slash paths, real PK headers) for wordpress-plugin/rasm-agent-store.
// PowerShell's Compress-Archive writes backslash paths, which makes WordPress say "files do not exist".
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const srcDir = path.resolve('wordpress-plugin/rasm-agent-store');
const out = path.resolve('wordpress-plugin/rasm-agent-store.zip');
const root = path.basename(srcDir);

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else files.push(p);
  }
})(srcDir);

const parts = [];
const central = [];
let offset = 0;
const dosTime = (() => {
  const d = new Date();
  return { t: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), d: ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate() };
})();

for (const file of files) {
  const name = `${root}/${path.relative(srcDir, file).split(path.sep).join('/')}`;
  const data = fs.readFileSync(file);
  const comp = zlib.deflateRawSync(data);
  const crc = zlib.crc32(data);
  const nameBuf = Buffer.from(name);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x0800, 6); // UTF-8 names
  local.writeUInt16LE(8, 8); // deflate
  local.writeUInt16LE(dosTime.t, 10);
  local.writeUInt16LE(dosTime.d, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(comp.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  parts.push(local, nameBuf, comp);

  const cd = Buffer.alloc(46);
  cd.writeUInt32LE(0x02014b50, 0);
  cd.writeUInt16LE(20, 4);
  cd.writeUInt16LE(20, 6);
  cd.writeUInt16LE(0x0800, 8);
  cd.writeUInt16LE(8, 10);
  cd.writeUInt16LE(dosTime.t, 12);
  cd.writeUInt16LE(dosTime.d, 14);
  cd.writeUInt32LE(crc, 16);
  cd.writeUInt32LE(comp.length, 20);
  cd.writeUInt32LE(data.length, 24);
  cd.writeUInt16LE(nameBuf.length, 28);
  cd.writeUInt32LE(offset, 42);
  central.push(cd, nameBuf);
  offset += local.length + nameBuf.length + comp.length;
}

const cdBuf = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(cdBuf.length, 12);
end.writeUInt32LE(offset, 16);
fs.writeFileSync(out, Buffer.concat([...parts, cdBuf, end]));
console.log(`wrote ${out} (${files.length} file(s))`);
