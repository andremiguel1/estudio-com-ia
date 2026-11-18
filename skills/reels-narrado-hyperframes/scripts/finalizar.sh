#!/usr/bin/env bash
# Finaliza o MP4 bruto do HyperFrames: loudnorm em dois passos (-14 LUFS) + limitador, H.264 leve para o celular.
# Uso (Git Bash, na pasta do MP4): bash finalizar.sh reel-vNN-bruto.mp4 reel-vNN-sem-musica.mp4
# Saída medida no Reels 1 (v3 a v14): -14,3 LUFS e pico de -1,3 a -1,4 dBFS. Sem o limitador, o pico chegou a -0,8.
# Reels 2 (18/11/2026): com limit=0.79, as claquetes passaram de -1 dBFS depois do AAC (-0,5). Com 0.7: -14,6 LUFS e -2,7 dBFS.
# Acima de 30 MB, o arquivo não chega bem ao celular: o script gera também a cópia "-celular.mp4" com crf 26.
set -euo pipefail
IN="$1"; OUT="$2"
J=$(ffmpeg -hide_banner -i "$IN" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
v() { echo "$J" | grep "\"$1\"" | grep -o '[-0-9.]*' | head -1; }
ffmpeg -v error -y -i "$IN" -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,alimiter=limit=0.7:level=0:attack=1:release=50" \
  -ar 48000 -c:a aac -b:a 192k -movflags +faststart "$OUT"
echo "== $OUT"
ffmpeg -hide_banner -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I:|Peak:)" | tail -2
printf "duração: "; ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
printf "tamanho: "; du -h "$OUT" | cut -f1
if [ "$(wc -c < "$OUT" | tr -d " ")" -gt 30000000 ]; then  # wc em vez de stat: funciona no Linux, no macOS e no Git Bash
  CEL="${OUT/-sem-musica/-celular}"; [ "$CEL" = "$OUT" ] && CEL="${OUT%.mp4}-celular.mp4"
  ffmpeg -v error -y -i "$OUT" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -c:a copy -movflags +faststart "$CEL"
  printf "acima de 30 MB: cópia para o celular em %s (" "$CEL"; du -h "$CEL" | cut -f1 | tr -d '\n'; echo ")"
fi
