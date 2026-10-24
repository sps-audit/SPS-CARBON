/** Render and verify the filled-path vector masters. Run from project root. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../../..');
const dir = path.join(root, 'public/brand');

function connected(data, info, startX, startY, predicate) {
  const seen = new Set();
  const stack = [[startX,startY]];
  while(stack.length) {
    const [x,y] = stack.pop();
    if(x<0||y<0||x>=info.width||y>=info.height) continue;
    const id=y*info.width+x;
    if(seen.has(id)||!predicate(data[id*info.channels+info.channels-1])) continue;
    seen.add(id);
    stack.push([x-1,y],[x+1,y],[x,y-1],[x,y+1]);
  }
  return seen;
}

async function main() {
  const results = [];
  for (const variant of ['dark', 'light', 'black', 'viridian']) {
    for (const kind of ['logo', 'symbol', 'wordmark']) {
      const base = `${kind}-${variant}`;
      const source = fs.readFileSync(path.join(dir, `${base}.svg`), 'utf8');
      assert(!/<(?:text|image|foreignObject|filter|clipPath)\b/.test(source), `${base} must be standalone outlined artwork`);
      assert(!/\bstroke=/.test(source), `${base} must contain filled shapes only`);
      if(kind==='symbol') assert.equal((source.match(/<path /g)||[]).length,1,'The carbon ring must be a single filled path');
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
  for (const size of [16,24,32,48,64,180,192,512]) {
    await sharp(path.join(dir,'symbol-dark.svg'), {density:300}).resize(size,size).png().toFile(path.join(dir,`symbol-dark-${size}.png`));
  }
  await sharp(path.join(dir,'logo-family.svg'), {density:150}).resize(1600).png().toFile(path.join(dir,'logo-family.png'));
  const smallChecks = [];
  for (const size of [16,24,32]) {
    const {data,info} = await sharp(path.join(dir,`symbol-dark-${size}.png`)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    const center = Math.floor(size/2);
    const opening = connected(data,info,center,center,a=>a<82);
    assert([...opening].some(id=>id%size===size-1),`Carbon-ring counter must connect to the right exterior at ${size}px`);
    let solidStart=-1;
    for(let i=0;i<size*size;i++) if(data[i*info.channels+info.channels-1]>180) {solidStart=i;break;}
    assert(solidStart>=0);
    const solid = connected(data,info,solidStart%size,Math.floor(solidStart/size),a=>a>180);
    let solidCount=0;
    for(let i=0;i<size*size;i++) if(data[i*info.channels+info.channels-1]>180) solidCount++;
    assert.equal(solid.size,solidCount,`Carbon ring must remain one connected shape at ${size}px`);
    smallChecks.push({size,diagonalOpening:'clear',filledRing:'connected'});
  }
  // ICO embeds the same transparent PNG symbol at native favicon sizes.
  const icoSizes=[16,32,48];
  const icoImages=await Promise.all(icoSizes.map(size=>sharp(path.join(dir,'symbol-dark.svg')).resize(size,size).png().toBuffer()));
  const icoHeader=Buffer.alloc(6+16*icoSizes.length);
  icoHeader.writeUInt16LE(1,2);
  icoHeader.writeUInt16LE(icoSizes.length,4);
  let offset=icoHeader.length;
  icoImages.forEach((buffer,i)=>{
    const p=6+16*i;
    icoHeader[p]=icoSizes[i];icoHeader[p+1]=icoSizes[i];
    icoHeader.writeUInt16LE(1,p+4);icoHeader.writeUInt16LE(32,p+6);
    icoHeader.writeUInt32LE(buffer.length,p+8);icoHeader.writeUInt32LE(offset,p+12);
    offset+=buffer.length;
  });
  fs.writeFileSync(path.join(dir,'favicon.ico'),Buffer.concat([icoHeader,...icoImages]));
  assert.equal(fs.readFileSync(path.join(dir,'favicon.ico')).readUInt16LE(4),3);
  fs.writeFileSync(path.join(root,'docs/brand/verification.json'),JSON.stringify({version:2,svgChecks:'passed: 12 standalone filled-path masters',pngChecks:'passed: 12 transparent PNGs at 300 ppi',smallSizeChecks:smallChecks,favicon:'SVG and ICO (16, 32, 48 px)',pngs:results},null,2)+'\n');
  console.log(JSON.stringify({svg:'12 valid masters with outlined paths',png:'12 transparent PNGs at 300 ppi',smallSize:smallChecks,favicon:'SVG and multi-resolution ICO'},null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1});
