import os
import sys

# Add ffmpeg from CapCut to PATH
ffmpeg_path = r"C:\Users\АллаРома\AppData\Local\CapCut\Apps\7.9.0.3294"
os.environ["PATH"] = ffmpeg_path + os.pathsep + os.environ.get("PATH", "")

import whisper

model = whisper.load_model("tiny")

efiry_dir = r"C:\Users\АллаРома\Downloads\Telegram Desktop\Эфиры"
files = [os.path.join(efiry_dir, f) for f in os.listdir(efiry_dir) if f.endswith(".mp4")]
files.sort()

out_dir = r"C:\Users\АллаРома\Documents\projects\my-mindLab\content"

for f in files:
    name = os.path.splitext(os.path.basename(f))[0]
    out_file = os.path.join(out_dir, name + ".txt")
    if os.path.exists(out_file):
        print(f"Пропускаю (уже готово): {name}")
        continue
    print(f"\n=== Транскрибирую: {name} ===")
    result = model.transcribe(f, language="ru")
    with open(out_file, "w", encoding="utf-8") as fp:
        fp.write(result["text"])
    print(f"Сохранено: {out_file}")

print("\n=== Все файлы обработаны ===")
