const fs = require('fs');
const path = require('path');
const dirs = ['public/assets/tilesets', 'public/assets/sprites'];
dirs.forEach(d => {
  console.log('Dir:', d);
  const files = fs.readdirSync(d).filter(f => f.endsWith('.png'));
  for (const f of files) {
    const p = path.join(d, f);
    const buf = fs.readFileSync(p);
    if (buf[0] === 0x89 && buf[1] === 0x50) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      console.log(`  ${f}: ${width}x${height} (cols: ${width/48}, rows: ${height/48})`);
    }
  }
});
