import concurrent.futures, json, re, urllib.request, urllib.parse
from html.parser import HTMLParser
from pathlib import Path

ROOT = 'https://sustaincarbon.ma'
OUT = Path(__file__).parent

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.parts=[]; self.skip=0; self.title=False; self.title_parts=[]; self.meta={}; self.headings=[]; self.h=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag in ('script','style','noscript'): self.skip+=1
        if tag=='title': self.title=True
        if tag=='a' and 'href' in a: self.links.append(a['href'])
        if tag in ('h1','h2','h3'): self.h=[]
        if tag=='meta' and a.get('name') in ('description','robots'): self.meta[a['name']]=a.get('content','')
    def handle_endtag(self, tag):
        if tag in ('script','style','noscript'): self.skip=max(0,self.skip-1)
        if tag=='title': self.title=False
        if tag in ('h1','h2','h3') and self.h is not None: self.headings.append(' '.join(self.h)); self.h=None
    def handle_data(self, data):
        text=' '.join(data.split())
        if not self.skip and text:
            self.parts.append(text)
            if self.title: self.title_parts.append(text)
            if self.h is not None: self.h.append(text)

def fetch(url):
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'SPS-Carbon-Research/1.0 (public website review)'})
        with urllib.request.urlopen(req, timeout=30) as r:
            raw=r.read(); status=r.status; final=r.url; ctype=r.headers.get('Content-Type','')
        html=raw.decode('utf-8','replace'); p=Page(); p.feed(html)
        return dict(url=url, final=final,status=status,bytes=len(raw),type=ctype,title=' '.join(p.title_parts),meta=p.meta,headings=p.headings,links=p.links,text='\n'.join(p.parts))
    except Exception as e: return dict(url=url,error=str(e))

def norm(link):
    u=urllib.parse.urlsplit(urllib.parse.urljoin(ROOT,link))
    if u.netloc!='sustaincarbon.ma' or u.scheme not in ('https','http'): return None
    path=u.path.rstrip('/') or '/'
    if re.search(r'\.(?:png|jpe?g|svg|webp|css|js|zip|pdf|ico|woff2?|ttf)$',path,re.I): return None
    if path.startswith(('/admin','/api','/cdn-cgi')): return None
    return ROOT+path

if __name__=='__main__':
    seen=set(); pending=[ROOT+'/']; pages=[]
    while pending and len(seen)<90:
        batch=[u for u in pending if u not in seen][:90-len(seen)]; seen.update(batch); pending=[]
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            for page in pool.map(fetch,batch):
                pages.append(page)
                for link in page.get('links',[]):
                    url=norm(link)
                    if url and url not in seen: pending.append(url)
        pending=list(dict.fromkeys(pending))
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'sustaincarbon-crawl.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2),encoding='utf-8')
    summary=[{k:p.get(k) for k in ('url','status','error','title','headings')} for p in pages]
    (OUT/'sustaincarbon-inventory.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'pages':len(pages),'failed':[p for p in pages if 'error' in p],'inventory':str(OUT/'sustaincarbon-inventory.json')},ensure_ascii=False))
