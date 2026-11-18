# Transcreve as falas com tempo por palavra (faster-whisper local, por exemplo num venv em ~/.venvs/whisper), sem passar pelo av.
# Uso: python transcrever.py assets/audio/x12/fala01.mp3 [...]  -> dados/transcricao/falaNN.json
# Em algumas instalações, o av do venv quebra no decode_audio do faster-whisper ("metadata_errors"); por isso o ffmpeg gera o PCM.
import json, subprocess, sys, os
import numpy as np
from faster_whisper import WhisperModel

modelo = WhisperModel(os.environ.get('WHISPER_MODEL', 'medium'), device='cpu', compute_type='int8')  # CPU; WHISPER_MODEL=small é mais rápido e erra um pouco mais
os.makedirs('dados/transcricao', exist_ok=True)
for arq in sys.argv[1:]:
    pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', arq, '-f', 's16le', '-ac', '1', '-ar', '16000', '-'], capture_output=True, check=True).stdout
    audio = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768.0
    segs, _ = modelo.transcribe(audio, language='pt', word_timestamps=True, vad_filter=False, beam_size=5)
    palavras = [{'w': w.word.strip(), 's': round(w.start, 3), 'e': round(w.end, 3)} for s in segs for w in s.words]
    nome = os.path.splitext(os.path.basename(arq))[0]
    json.dump(palavras, open(f'dados/transcricao/{nome}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print(nome, ' '.join(f"{p['w']}@{p['s']:.2f}" for p in palavras))
