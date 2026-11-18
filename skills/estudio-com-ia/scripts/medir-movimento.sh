#!/usr/bin/env bash
# Mede o movimento entre quadros (diferença de brilho a 270x480). Meta: média > 2, parados < 35%, maior trecho parado < 1 s.
# Uso (Git Bash, na pasta do MP4): bash medir-movimento.sh video.mp4 [início] [fim]
#   sem início/fim mede o vídeo inteiro; com eles mede só o trecho revisto (ex.: 50.6 61).
# Referência de tipografia cinética: 2,84 · 26% · 0,9 s. Reels 1, v1 (padrão antigo): 0,52 · 75% · 2,1 s. v14: 2,75 · 4% · 0,30 s (vídeo inteiro).
# Mede em cinza, como a tabela da referência; sem o format=gray a média sai menor (o CTA da v14 deu 2,34 em cor e 2,72 em cinza).
set -euo pipefail
IN="$1"; A=()
[ $# -ge 3 ] && A=(-ss "$2" -to "$3")
ffmpeg -v error "${A[@]}" -i "$IN" -an \
  -vf "scale=270:480,format=gray,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-" \
  -f null - | grep -o 'YAVG=[0-9.]*' | cut -d= -f2 |
  awk '{n++; s+=$1; if($1<0.35){p++; run++; if(run>mx)mx=run} else run=0}
       END {printf "movimento médio %.2f · quadros parados %.0f%% · maior trecho parado %.2f s\n", s/n, 100*p/n, mx/30}'
