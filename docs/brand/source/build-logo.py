"""Build the SPS CARBON carbon-ring identity as standalone filled-path SVGs."""
from pathlib import Path
import sys
import json
import hashlib

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "docs/brand/.tools"))
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

OUT = ROOT / "public/brand"
FONT = OUT / "fonts/Manrope-Variable.ttf"
font = TTFont(FONT)
cmap = font.getBestCmap()
units = font["head"].unitsPerEm
PETROL, VIRIDIAN, ICE, AMBER = "#071F27", "#29C792", "#F3F8F7", "#DFB77A"

# One closed filled path. A six-sided carbon ring forms C; the right-side
# opening follows two parallel descending diagonals. There are no arrowheads,
# nodes or thin bonding lines to disappear in a favicon.
MARK = "M58 32V18L32 3L6 18V46L32 61L58 46V40L46 33V39L32 47L18 39V25L32 17L46 25Z"
mark = f'<path d="{MARK}"/>'

def outlined_text(text, size, x=0, baseline=0, weight=600, tracking=.65):
    gs = font.getGlyphSet(location={"wght":weight})
    s = size / units
    cursor = x
    paths = []
    for ch in text:
        glyph = gs[cmap[ord(ch)]]
        pen = SVGPathPen(gs)
        glyph.draw(TransformPen(pen, (s,0,0,-s,cursor,baseline)))
        d = pen.getCommands()
        if d:
            paths.append(f'<path d="{d}"/>')
        cursor += glyph.width*s + tracking
    return "".join(paths), cursor-x-tracking

font_size = 35.5
glyphs = font.getGlyphSet(location={"wght":600})
cap = BoundsPen(glyphs)
glyphs[cmap[ord("H")]].draw(cap)
cap_h = (cap.bounds[3]-cap.bounds[1])*font_size/units
word, word_width = outlined_text("SPS CARBON", font_size, 82, 32+cap_h/2)
full_width = round(82+word_width+6, 3)
word_only, ww = outlined_text("SPS CARBON", font_size, 3, cap_h+3)

def svg(body, width, height, fill, label):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
            f'viewBox="0 0 {width} {height}" fill="{fill}" role="img" aria-labelledby="title">'
            f'<title id="title">{label}</title>{body}</svg>\n')

for suffix, color in (("dark",PETROL),("light",ICE),("black","#000000"),("viridian",VIRIDIAN)):
    (OUT/f"logo-{suffix}.svg").write_text(svg(mark+word, full_width, 64, color, "SPS CARBON"), encoding="utf-8")
    (OUT/f"symbol-{suffix}.svg").write_text(svg(mark,64,64,color,"SPS CARBON carbon-ring symbol"), encoding="utf-8")
    (OUT/f"wordmark-{suffix}.svg").write_text(svg(word_only,round(ww+6,3),round(cap_h+6,3),color,"SPS CARBON wordmark"),encoding="utf-8")

(OUT/"favicon.svg").write_text(svg(mark,64,64,PETROL,"SPS CARBON"),encoding="utf-8")

def line(text,size,x,y,color,weight=500,tracking=.1):
    p,_ = outlined_text(text,size,x,y,weight,tracking)
    return f'<g fill="{color}">{p}</g>'

def lockup(x,y,width,color):
    return f'<g transform="translate({x} {y}) scale({width/full_width})" fill="{color}">{mark}{word}</g>'

def symbol(x,y,size,color):
    return f'<g transform="translate({x} {y}) scale({size/64})" fill="{color}">{mark}</g>'

sheet = f'<rect width="1600" height="1180" fill="{ICE}"/>'
sheet += line("SPS CARBON",27,72,76,PETROL,600,.8)
sheet += line("Carbon, measured. Progress, made visible.",19,72,113,"#49636A")
sheet += line("02 / CARBON RING",12,1300,76,"#49636A",600,.8)
sheet += f'<rect x="72" y="158" width="1456" height="360" fill="{PETROL}"/>'
sheet += lockup(280,270,1040,ICE)
sheet += line("PRIMARY / ICE ON PETROL",11,104,486,"#93B4B8",600,1)
sheet += f'<rect x="72" y="534" width="720" height="310" fill="white"/>'
sheet += f'<rect x="808" y="534" width="720" height="310" fill="{VIRIDIAN}"/>'
sheet += lockup(152,642,560,PETROL)
sheet += symbol(1096,594,144,PETROL)
sheet += line("PRIMARY / PETROL",11,104,812,"#49636A",600,1)
sheet += line("SYMBOL / CARBON STRUCTURE",11,840,812,PETROL,600,1)
sheet += line("A six-sided carbon ring. An open C. A downward trajectory.",20,72,910,PETROL,600,.1)
sheet += line("One filled shape. Legible in one ink. Drawn to scale from favicon to facade.",15,72,947,"#49636A")
sheet += symbol(81,987,64,PETROL) + symbol(176,1003,48,PETROL) + symbol(255,1019,32,PETROL) + symbol(318,1027,24,PETROL)
sheet += line("64",10,103,1080,"#49636A")+line("48",10,191,1080,"#49636A")+line("32",10,264,1080,"#49636A")+line("24 PX",10,315,1080,"#49636A")
for x,c in ((1210,PETROL),(1278,VIRIDIAN),(1346,ICE),(1414,AMBER)):
    sheet += f'<rect x="{x}" y="1008" width="60" height="40" fill="{c}"/>'
sheet += line("PETROL / VIRIDIAN / ICE / AMBER",10,1210,1080,"#49636A",500,.3)
sheet += line("SPS-CARBON / SAFEPERFORM SOLUTIONS",10,72,1134,"#49636A",500,.7)
sheet += line("VECTOR MASTERS / 2026",10,1322,1134,"#49636A",500,.7)
(OUT/"logo-family.svg").write_text(svg(sheet,1600,1180,PETROL,"SPS CARBON carbon-ring identity family"),encoding="utf-8")

manifest = {
    "brand":"SPS-CARBON", "parentBrand":"SAFEPERFORM SOLUTIONS", "wordmark":"SPS CARBON", "version":2,
    "symbolName":"Carbon ring", "symbolViewBox":"0 0 64 64", "logoViewBox":f"0 0 {full_width} 64",
    "palette":{"petrol":PETROL,"viridian":VIRIDIAN,"ice":ICE,"amber":AMBER,"black":"#000000"},
    "font":{"family":"Manrope","weight":600,"license":"SIL Open Font License 1.1","source":"https://github.com/google/fonts/tree/main/ofl/manrope","sha256":hashlib.sha256(FONT.read_bytes()).hexdigest()},
    "construction":"A single filled six-sided carbon ring forms an open C. Two parallel descending diagonal cuts create the right-hand opening and express a reduction trajectory. No live text, strokes, filters, clipping masks, embedded bitmap images or external dependencies in logo masters.",
    "minimumSize":{"symbolPx":24,"logoWidthPx":180,"wordmarkWidthPx":140},
    "clearSpace":"16 grid units beyond the visible artwork",
    "previousVersion":"docs/archive/brand-v1"
}
(OUT/"brand-manifest.json").write_text(json.dumps(manifest,indent=2)+"\n",encoding="utf-8")
print(json.dumps({"logoWidth":full_width,"capHeight":cap_h,"symbol":MARK,"fontSha256":manifest["font"]["sha256"]}))
