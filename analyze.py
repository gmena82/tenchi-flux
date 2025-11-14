from pathlib import Path
import re
text=Path('mirage.html').read_text(encoding='utf-8')
print(set(re.findall(r'/_[^"\s]+\.js', text)))
