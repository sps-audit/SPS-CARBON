"""Package the public assets plus reproducible source; no third-party build tools."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from shutil import copyfile

root = Path(__file__).resolve().parents[3]
brand = root / "public/brand"
docs = root / "docs/brand"
copyfile(docs / "brand-guidelines.md", brand / "brand-guidelines.md")
kit = brand / "brand-kit.zip"
with ZipFile(kit, "w", ZIP_DEFLATED, compresslevel=9) as archive:
    for p in sorted(brand.rglob("*")):
        if p.is_file() and p != kit:
            archive.write(p, "SPS-CARBON/" + p.relative_to(brand).as_posix())
    for p in sorted((docs / "source").rglob("*")):
        if p.is_file():
            archive.write(p, "SPS-CARBON/source/" + p.relative_to(docs / "source").as_posix())
    archive.write(docs / "verification.json", "SPS-CARBON/verification.json")
with ZipFile(kit) as archive:
    assert archive.testzip() is None
    files = archive.namelist()
    for filename in ("logo-dark.svg", "logo-light.svg", "symbol-dark.svg", "symbol-light.svg", "logo-family.png", "brand-guidelines.md", "fonts/OFL.txt"):
        assert "SPS-CARBON/" + filename in files
    print(f"Verified {len(files)} files; {kit.stat().st_size:,} bytes: {kit}")
