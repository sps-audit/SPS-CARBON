"""Rebuild SPS CARBON's vector assets. Requires fonttools. Run from project root."""
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
glyphs = font.getGlyphSet(location={"wght": 650})
cmap = font.getBestCmap()
units = font["head"].unitsPerEm
font_size = 35.5
scale = font_size / units

# Three separate filled bands; their broad counters remain open at small sizes.
# Top and bottom share a half-turn relationship about the 32,32 centre.
MARK = (
    "M54 6H24C14.059 6 6 13.163 6 22H18C18 19.791 20.686 18 24 18H54Z",
    "M7 26H40C48.7 26 56 31.1 58 38H24C15.3 38 8 32.9 7 26Z",
    "M10 58H40C49.941 58 58 50.837 58 42H46C46 44.209 43.314 46 40 46H10Z",
)

def outlined_text(text, size, x=0, baseline=0, weight=650, tracking=.65):
    gs = font.getGlyphSet(location={"wght":weight})
    s = size / units
    cursor = x
    paths = []
    for ch in text:
        name = cmap[ord(ch)]
        glyph = gs[name]
        pen = SVGPathPen(gs)
        transformed = TransformPen(pen, (s,0,0,-s,cursor,baseline))
        glyph.draw(transformed)
        d = pen.getCommands()
        if d:
            paths.append(f'<path d="{d}"/>')
        cursor += glyph.width*s + tracking
    return "".join(paths), cursor-x-tracking

# Cap-height alignment is optical, with the mark retaining more visual height.
cap = BoundsPen(glyphs)
glyphs[cmap[ord("H")]].draw(cap)
cap_h = (cap.bounds[3]-cap.bounds[1])*scale
base = 32 + cap_h / 2
word, word_width = outlined_text("SPS CARBON", font_size, 82, base)
full_width = round(82+word_width+6, 3)
word_only, ww = outlined_text("SPS CARBON", font_size, 3, cap_h+3)
mark = "".join(f'<path d="{d}"/>' for d in MARK)

def svg(body, width, height, fill, label):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
            f'viewBox="0 0 {width} {height}" fill="{fill}" role="img" aria-labelledby="title">'
            f'<title id="title">{label}</title>{body}</svg>\n')

for suffix, color in (("dark", "#132D38"),("light", "#FFFFFF"),("black", "#000000")):
    (OUT/f"logo-{suffix}.svg").write_text(svg(mark+word, full_width, 64, color, "SPS CARBON"), encoding="utf-8")
    (OUT/f"symbol-{suffix}.svg").write_text(svg(mark, 64, 64, color, "SPS CARBON symbol"), encoding="utf-8")
    (OUT/f"wordmark-{suffix}.svg").write_text(svg(word_only, round(ww+6,3), round(cap_h+6,3), color, "SPS CARBON wordmark"), encoding="utf-8")

# All lettering on the review sheet is outlined as well.
def line(text, size, x, y, color, weight=500, tracking=.1):
    p,_ = outlined_text(text,size,x,y,weight,tracking)
    return f'<g fill="{color}">{p}</g>'

def lockup(x,y,width,color):
    return f'<g transform="translate({x} {y}) scale({width/full_width})" fill="{color}">{mark}{word}</g>'

def symbol(x,y,size,color):
    return f'<g transform="translate({x} {y}) scale({size/64})" fill="{color}">{mark}</g>'

sheet = '<rect width="1600" height="1120" fill="#F6F8F6"/>'
sheet += line("SPS CARBON",30,72,75,"#132D38",650,1)
sheet += line("A measured identity.",18,72,111,"#597079")
sheet += line("01 / LOGO FAMILY",12,1302,76,"#597079",600,1)
sheet += '<rect x="72" y="160" width="728" height="370" fill="#FFFFFF"/>'
sheet += '<rect x="800" y="160" width="728" height="370" fill="#132D38"/>'
sheet += '<rect x="72" y="546" width="728" height="370" fill="#BDCCB5"/>'
sheet += '<rect x="800" y="546" width="728" height="370" fill="#132D38"/>'
sheet += lockup(154,293,564,"#132D38")
sheet += lockup(882,293,564,"#FFFFFF")
sheet += symbol(364,635,144,"#132D38")
sheet += symbol(1092,635,144,"#FFFFFF")
sheet += line("PRIMARY / MIDNIGHT",11,104,498,"#597079",600,1)
sheet += line("PRIMARY / REVERSED",11,832,498,"#BDCCB5",600,1)
sheet += line("SYMBOL / MIDNIGHT",11,104,884,"#415548",600,1)
sheet += line("SYMBOL / REVERSED",11,832,884,"#BDCCB5",600,1)
sheet += line("Three bands. One accountable view.",17,72,976,"#132D38",600,.1)
sheet += line("Vector masters / Outlined typography / Transparent PNG exports",13,72,1008,"#597079")
sheet += '<rect x="1215" y="962" width="60" height="26" fill="#132D38"/><rect x="1283" y="962" width="60" height="26" fill="#BDCCB5"/><rect x="1351" y="962" width="60" height="26" fill="#FFFFFF"/><rect x="1419" y="962" width="60" height="26" fill="#000000"/>'
sheet += line("SPS-CARBON / 2026",11,72,1070,"#597079",500,1)
sheet += line("DESIGNED TO SCALE",11,1315,1070,"#597079",500,1)
(OUT/"logo-family.svg").write_text(svg(sheet,1600,1120,"#132D38","SPS CARBON logo family"),encoding="utf-8")

manifest = {
    "brand":"SPS-CARBON", "wordmark":"SPS CARBON", "symbolViewBox":"0 0 64 64",
    "logoViewBox":f"0 0 {full_width} 64", "palette":{"midnight":"#132D38","mineral":"#F6F8F6","sage":"#BDCCB5","reversed":"#FFFFFF"},
    "font":{"family":"Manrope","weight":650,"license":"SIL Open Font License 1.1", "source":"https://github.com/google/fonts/tree/main/ofl/manrope", "sha256":hashlib.sha256(FONT.read_bytes()).hexdigest()},
    "construction":"Three separately filled bands form an open, compact S silhouette. No live text, strokes, filters, clipping masks, embedded bitmap images or external dependencies in logo masters."
}
(OUT/"brand-manifest.json").write_text(json.dumps(manifest,indent=2)+"\n",encoding="utf-8")
print(json.dumps({"logoWidth":full_width,"capHeight":cap_h,"fontSha256":manifest["font"]["sha256"]}))
