import csv, html, json, re
from pathlib import Path
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
import reportlab
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'docs/research/2026-10-28-sustaincarbon-competitive-study.md'
OUTPUT=ROOT/'output/pdf/SPS-CARBON-Competitive-Study-and-Plan.pdf'
OUTPUT.parent.mkdir(parents=True,exist_ok=True)
fontdir=Path(reportlab.__file__).parent/'fonts'
for name,file in [('Body','Vera.ttf'),('Body-Bold','VeraBd.ttf'),('Body-Italic','VeraIt.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(fontdir/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='Body-Bold',italic='Body-Italic',boldItalic='Body-Bold')
ink=colors.HexColor('#071F27'); green=colors.HexColor('#0B5A43'); mint=colors.HexColor('#29C792'); pale=colors.HexColor('#F3F8F7')
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='Text',fontName='Body',fontSize=9.3,leading=14,textColor=ink,spaceAfter=8,allowWidows=0,allowOrphans=0))
styles.add(ParagraphStyle(name='Chapter',fontName='Body-Bold',fontSize=16,leading=21,textColor=green,spaceBefore=19,spaceAfter=11,keepWithNext=True))
styles.add(ParagraphStyle(name='Cell',fontName='Body',fontSize=8.0,leading=11.5,textColor=ink))
styles.add(ParagraphStyle(name='CellHead',parent=styles['Cell'],fontName='Body-Bold',textColor=colors.white))
styles.add(ParagraphStyle(name='BulletText',parent=styles['Text'],leftIndent=13,firstLineIndent=-10))
styles.add(ParagraphStyle(name='QuoteText',parent=styles['Text'],leftIndent=14,borderColor=mint,borderWidth=2,borderPadding=6,spaceBefore=10,spaceAfter=20,backColor=pale))
styles.add(ParagraphStyle(name='CoverTitle',fontName='Body-Bold',fontSize=29,leading=36,textColor=ink,spaceAfter=22))
styles.add(ParagraphStyle(name='CoverSmall',fontName='Body-Bold',fontSize=11,leading=16,textColor=green,spaceAfter=20))

def inline(s):
    s=html.escape(s)
    s=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'<link href="\2" color="#0B5A43"><u>\1</u></link>',s)
    s=re.sub(r'\*\*([^*]+)\*\*',r'<b>\1</b>',s)
    s=re.sub(r'`([^`]+)`',r'<font size="8">\1</font>',s)
    return s

def footer(c,doc):
    c.setStrokeColor(mint); c.setLineWidth(1); c.line(42, A4[1]-34, A4[0]-42,A4[1]-34)
    c.setFont('Body',8); c.setFillColor(ink)
    c.drawString(42,A4[1]-26,'SPS-CARBON  /  COMPETITIVE STUDY & UPGRADE PLAN')
    c.drawString(42,26,'28 October 2026  |  Public evidence + local product review')
    c.drawRightString(A4[0]-42,26,str(doc.page))

lines=SOURCE.read_text(encoding='utf-8').splitlines()
story=[Spacer(1,66),Paragraph('SPS-CARBON',styles['CoverSmall']),Paragraph('Competitive study<br/>and upgrade plan',styles['CoverTitle']),Paragraph('Benchmark: SustainCarbon<br/>28 October 2026',styles['Text']),Spacer(1,22),Paragraph('Make the service easier to understand, the calculations easier to trust, and the customer journey easier to complete.',styles['Chapter']),Spacer(1,18)]
story.append(Paragraph('A review of 56 discoverable public pages, the main visitor journeys, and the current SPS-CARBON website. Includes positioning, website design, product priorities, service packaging and a phased 90-day plan.',styles['Text']))
story.append(Spacer(1,20))
for item in ['01  Competitive evidence and opportunities','02  Website, UI and customer experience','03  Platform and service requirements','04  Delivery plan and acceptance criteria']:
    story.append(Paragraph(item,styles['CoverSmall']))
story.append(Spacer(1,12)); story.append(Paragraph('Public product claims are distinguished from tested behavior. Authenticated competitor features and service delivery were not independently evaluated.',styles['Text'])); story.append(PageBreak())
i=0
while i<len(lines):
    s=lines[i].strip()
    if not s or s.startswith('# '): i+=1; continue
    if s.startswith('## '):
        story.append(Paragraph(inline(s[3:]),styles['Chapter'])); i+=1; continue
    if s.startswith('|'):
        rows=[]
        while i<len(lines) and lines[i].strip().startswith('|'):
            cells=[x.strip() for x in lines[i].strip().strip('|').split('|')]
            if not all(re.fullmatch(r'[-: ]+',x) for x in cells): rows.append(cells)
            i+=1
        n=len(rows[0]); width=A4[0]-84
        ratios=([.22,.39,.39] if n==3 else [.16,.35,.17,.32] if n==4 else [1/n]*n)
        data=[[Paragraph(inline(v),styles['CellHead' if k==0 else 'Cell']) for v in row] for k,row in enumerate(rows)]
        table=Table(data,colWidths=[width*x for x in ratios],repeatRows=1,hAlign='LEFT')
        table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),ink),('ROWBACKGROUNDS',(0,1),(-1,-1),[pale,colors.white]),('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('LINEBELOW',(0,0),(-1,0),1,mint),('LINEBELOW',(0,1),(-1,-1),.3,colors.HexColor('#D7E4E0'))]))
        story.extend([table,Spacer(1,10)]); continue
    if s.startswith('>'):
        parts=[]
        while i<len(lines) and lines[i].strip().startswith('>'):
            parts.append(lines[i].strip()[1:].strip()); i+=1
        story.append(Paragraph('<br/>'.join(inline(p) for p in parts),styles['QuoteText'])); continue
    if s.startswith('- '): story.append(Paragraph('&#8226; '+inline(s[2:]),styles['BulletText'])); i+=1; continue
    story.append(Paragraph(inline(s),styles['Text'])); i+=1

doc=SimpleDocTemplate(str(OUTPUT),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=49,bottomMargin=43,title='SPS-CARBON Competitive Study and Upgrade Plan',author='SPS-CARBON research',allowSplitting=True)
doc.build(story,onFirstPage=footer,onLaterPages=footer)

pages=json.loads((ROOT/'tmp/research/sustaincarbon-crawl.json').read_text(encoding='utf-8'))
deep={'factures-energie-maroc-donnees-bilan-carbone','cout-bilan-carbone-maroc','cahier-des-charges-logiciel-bilan-carbone-maroc','facteurs-emission-maroc-base-carbone'}
inventory=SOURCE.with_name('2026-10-28-sustaincarbon-page-inventory.csv')
with inventory.open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.writer(f); w.writerow(['URL','Title','HTTP status','Review depth','Review date'])
    for p in pages:
        slug=p['url'].rstrip('/').split('/')[-1]
        depth='Public content review' if '/ressources/' not in p['url'] else ('Selected deeper content review' if slug in deep else 'Inventory, thematic and reference-link scan')
        w.writerow([p['url'],p['title'],p['status'],depth,'2026-10-28'])
reader=PdfReader(OUTPUT)
text='\n'.join(p.extract_text() or '' for p in reader.pages)
assert '14. Decisions to make before development expands' in text
assert '13. Acceptance tests and success measures' in text
assert '10,000 MAD' in text
print(json.dumps({'pdf':str(OUTPUT),'pages':len(reader.pages),'words':len(SOURCE.read_text(encoding='utf-8').split()),'inventory_rows':len(pages),'pdf_bytes':OUTPUT.stat().st_size}))
