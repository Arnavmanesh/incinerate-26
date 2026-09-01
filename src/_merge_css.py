from pathlib import Path

root = Path(__file__).resolve().parent
index = (root / "index.css").read_text(encoding="utf-8")
timeline = (root / "TImeline.css").read_text(encoding="utf-8")

idx_rest = index
for prefix in (
    '@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800;900&family=Montserrat:wght@400;700;900&display=swap");',
    '@import "tailwindcss";',
):
    idx_rest = idx_rest.replace(prefix, "", 1)
idx_rest = idx_rest.lstrip("\n")

tl = timeline
if tl.startswith('@import "tailwindcss";'):
    tl = tl[len('@import "tailwindcss";') :].lstrip("\n")

theme_end = tl.find("}", tl.find("@theme")) + 1
theme = tl[:theme_end].strip()
tl_rest = tl[theme_end:].lstrip("\n")

merged = (
    '@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800;900&family=Montserrat:wght@400;700;900&display=swap");\n'
    '@import "tailwindcss";\n\n'
    f"{theme}\n\n"
    f"{idx_rest.rstrip()}\n\n"
    "/* ═══════════════════════════════════════════════════════════\n"
    "   FORMER Timeline.css (appended after index.css so later rules keep winning)\n"
    "   ═══════════════════════════════════════════════════════════ */\n\n"
    f"{tl_rest}"
)

(root / "index.css").write_text(merged, encoding="utf-8", newline="\n")
print("wrote", root / "index.css")
print("lines", merged.count("\n") + 1)
