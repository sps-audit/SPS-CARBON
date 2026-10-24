/** Run with Node.js and the sharp package available. From repository root. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../../..');
const dir = path.join(root, 'public/brand');

async function main() {
  const results = [];
  for (const variant of ['dark', 'light', 'black']) {
    for (const kind of ['logo', 'symbol', 'wordmark']) {
      const base = `${kind}-${variant}`;
      const source = fs.readFileSync(path.join(dir, `${base}.svg`), 'utf8');
      assert(!/<(?:text|image|foreignObject|filter|clipPath)\b/.test(source), `${base} must be standalone outlined artwork`);
      assert(!/\bstroke=/.test(source), `${base} must contain filled shapes only`);
      const width = kind === 'symbol' ? 1024 : 2400;
      const file = path.join(dir, `${base}.png`);
      await sharp(Buffer.from(source), {density:300}).resize({width}).withMetadata({density:300}).png().toFile(file);
      const metadata = await sharp(file).metadata();
      assert(metadata.width === width && metadata.hasAlpha && metadata.density === 300);
      const {data, info} = await sharp(file).raw().toBuffer({resolveWithObject:true});
      assert(data[info.channels-1] === 0, `${base} background must be transparent`);
      results.push({file:`${base}.png`,width:metadata.width,height:metadata.height,alpha:metadata.hasAlpha,density:metadata.density});
    }
  }
  for (const size of [24,32,48]) {
    await sharp(path.join(dir,'symbol-dark.svg'), {density:300}).resize(size,size).png().toFile(path.join(dir,`symbol-dark-${size}.png`));
  }
  await sharp(path.join(dir,'logo-family.svg'), {density:150}).resize(1600).png().toFile(path.join(dir,'logo-family.png'));
  const small = await sharp(path.join(dir,'symbol-dark-24.png')).raw().toBuffer({resolveWithObject:true});
  const rows = [];
  for (let y=0;y<24;y++) {
    let max = 0;
    for (let x=0;x<24;x++) max = Math.max(max,small.data[(y*24+x)*small.info.channels+small.info.channels-1]);
    rows.push(max);
  }
  // Fractional pixel boundaries can leave a low-alpha antialias fringe; neither
  // opening may exceed 32% opacity anywhere across its two-pixel gap.
  assert(rows[8]<82 && rows[9]<82 && rows[14]<82 && rows[15]<82, 'The two band openings must remain clear at 24 px');
  fs.writeFileSync(path.join(root,'docs/brand/verification.json'),JSON.stringify({svgChecks:'passed',pngChecks:'passed',smallSizeChecks:'passed',pngs:results},null,2)+'\n');
  console.log(JSON.stringify({svg:'9 valid masters with outlined paths',png:'9 transparent PNGs at 300 ppi',smallSize:'Both band openings remain clear at 24 px',results},null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1});
