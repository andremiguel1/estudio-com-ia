---
name: estilo-tipografia-cinetica
description: Estilo de Reels 9:16 com tipografia cinética sincronizada à narração. A legenda é o próprio visual, um cursor de "agente" digita e opera mini-interfaces, há uma só cor de destaque sobre quase-preto e um elemento novo a cada segundo. Use quando o usuário pedir "reel no estilo da referência", "tipografia cinética", "legenda que é o vídeo", "estilo do cursor digitando" ou um Reels curto de produto com narração, mesmo sem dizer "skill". Traz por que o estilo funciona, os números (ritmo, tamanhos, posições, eases), a receita em HyperFrames e como trocar para as cores de cada marca. NÃO use para vídeo com a tela real gravada de um app nem para publicar.
---

# Estilo: tipografia cinética com cursor-agente

Extraído em 14/11/2026 de um reel de referência de 81 s (1080×1920, 30 fps, −14 LUFS), estudado quadro a quadro só para aprender a gramática. **Não copie as frases, a ordem das cenas nem as telas dele**: o que se reaproveita é a gramática abaixo.

## Por que funciona

1. **Gancho que se demonstra.** Nos primeiros 2 s, a frase inteira do gancho já está na tela como um "fantasma" (o mesmo texto a 12% de opacidade), e um cursor com etiqueta digita por cima, letra a letra. O espectador lê a promessa e, ao mesmo tempo, vê o produto fazendo o trabalho. A curiosidade vem antes de qualquer explicação.
2. **A legenda é o vídeo.** As palavras entram na tela no ritmo da fala, cerca de 3 palavras/s. (Isso foi deduzido dos quadros, não medido com transcrição. A medida das pausas no áudio mixado não vale, porque a música tapa os silêncios.)
2b. **Nada fica parado: é isso que segura o polegar.** Medido em 14/11/2026 pela diferença de brilho entre quadros (ffmpeg `tblend=difference` + `signalstats`, a 270×480):

    | | Referência | Reels 1, v1 (padrão antigo) |
    |---|---|---|
    | Movimento médio entre quadros | 2,84 | 0,52 |
    | Quadros parados (< 0,35) | 26% | 75% |
    | Segundos quase parados | 5 de 82 | 48 de 81 |
    | Maior trecho parado | 0,9 s | 2,1 s |

    Meta para qualquer Reels: movimento médio acima de 2, menos de 35% de quadros parados e nenhum trecho parado acima de 1 s. O script de medida está em "Medir antes de entregar", no fim.
2c. **Como a referência mantém tudo em movimento** (visto a 10 quadros/s):
    - uma cena nova a cada 1 a 1,5 s, com transição de 0,2 a 0,3 s (a anterior encolhe e desfoca enquanto a próxima já entra);
    - letras com física: a palavra-chave se monta letra a letra, cada uma vindo de um ponto com rotação e quique;
    - confete geométrico (círculo, quadrado, triângulo, X) explode em volta da palavra-chave e fica flutuando;
    - máquina de escrever com cursor em bloco e fonte mono para "código";
    - seleção de texto azul com cursor I, como num editor;
    - cartões das cenas anteriores voando em 3D (câmera em perspectiva);
    - cursor com etiqueta presente quase o tempo todo, andando e clicando;
    - fichas pequenas que saem girando da tela.
3. **Três vozes tipográficas:**
   - **palavra-chave:** grotesca pesada, caixa alta, gigante;
   - **frase de apoio:** pequena, cinza;
   - **ênfase:** chip de cor sólida atrás da palavra, ou serifada itálica, para ironia ou calma ("normal", "relaxa").
   O olho sabe na hora o que importa.
4. **Uma cor de destaque só.** Quase-preto, um brilho quente difuso atrás do texto e a cor de destaque apenas em chip, número gigante, tachado e cursor. A troca de cor de destaque (laranja → roxo) marca a virada para o ato final.
5. **Prova a cada 1 ou 2 s.** Abaixo do texto aparece uma mini-interface estilizada (linha do tempo, barra de render, editor, chat, caixa de comentário), e o cursor-agente opera essa interface. É ilustração vetorial limpa, não print.
6. **Negação visual.** O que o produto *não* faz entra e leva um tachado na cor de destaque. Um número gigante sozinho na tela ("0", "99%") funciona como pausa e soco.
7. **Fim com ação de uma palavra.** "Comenta X": a palavra X se monta gigante, com glitch, e um mock de comentário ganha um coração.

## Números

Os tamanhos, posições e cores desta tabela foram **estimados** de miniaturas de 216 px, não medidos em resolução cheia. Use como ponto de partida.

| Item | Valor (quadro de 1080×1920) |
| --- | --- |
| Ritmo da fala | 2,8 a 3,2 palavras/s; um elemento novo a cada 0,8 a 1,2 s; nada parado por mais de 1,5 s |
| Gancho | frase completa em até 2,5 s; letra a letra a ~14 letras/s |
| Palavra-chave | grotesca 800 a 900, caixa alta, 130 a 170 px, entreletra −0,03 em, entrelinha 0,92 |
| Frase de apoio | 400 a 500, 38 a 46 px, cinza (≈ #9a9a9a no escuro), palavra a palavra |
| Chip de ênfase | fundo na cor de destaque, raio 10 px, respiro 0,08 em × 0,22 em, entra com wipe da esquerda em 0,25 s |
| Itálico de contraste | serifada itálica 400, 1,1× o corpo da frase |
| Posição do texto | bloco centrado em y ≈ 20 a 34% |
| Posição da mini-UI | y ≈ 40 a 72%, largura de 820 a 900 px, cartões com raio de 24 px e borda de 1 px a 8% de branco |
| Faixa segura | nada essencial abaixo de y = 78% (é onde fica a interface do Instagram) |
| Fundo | quase-preto #0b0b0d, com brilho radial na cor quente/da marca a 35 a 55% de opacidade, centro em y ≈ 35% |

## Movimento (GSAP)

- **Palavra entra:** `y: 28 → 0`, `opacity: 0 → 1`, `filter: blur(6px) → 0`, 0,32 s, `power3.out`.
- **Palavra-chave gigante:** letras de `yPercent: 100 → 0` com `stagger: 0.03`, 0,45 s, `power4.out`; ou montagem com glitch (letras de opacidade 0 → 1 fora de ordem, deslocamento horizontal de ±12 px em 3 quadros).
- **Troca de frase (whip):** o bloco sai com `yPercent: 0 → −40` e `filter: blur(0 → 14px)` em 0,18 s `power2.in`; o próximo entra de `yPercent: 40` com blur 14 → 0 em 0,22 s `power3.out`. Os dois se sobrepõem por 0,05 s.
- **Tachado:** uma linha de 8 px na cor de destaque, `scaleX: 0 → 1` a partir da esquerda, 0,3 s, `power2.inOut`.
- **Chip:** `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`, 0,25 s, `power3.out`; o texto do chip entra junto.
- **Cursor-agente:** seta e etiqueta com o nome do agente (ou da marca); anda por `x/y` com `power2.inOut` em 0,4 a 0,6 s e dá um clique com `scale: 1 → 0,85 → 1` em 0,12 s.
- **Número gigante:** de `scale: 1,25 → 1` com `opacity: 0 → 1` em 0,3 s; segura 0,6 s.
- Nada pulsa na batida da música: foi achado irritante.

## Receita em HyperFrames

1. Narração primeiro: gere a voz, meça as palavras e monte o mapa palavra → tempo. Sem transcritor local, use as pausas (`silencedetect=noise=-32dB:d=0.12`) e distribua as palavras pela duração de cada fala.
2. `index.html` de 1080×1920 com quatro trilhas:
   - fundo (`#bg`, brilho);
   - cenas (uma `.clip` por fala);
   - legendas (`data-track-kind="captions"`, uma `<span>` por palavra);
   - áudio (`<audio id="voz">` e `<audio id="trilha">`).
3. Cada palavra é uma `<span id="w-NN">`; a entrada dela na linha do tempo fica no tempo medido da fala menos 0,04 s.
4. As mini-UIs são HTML/CSS simples, dentro da cena: cartões, barras e linhas. Nada de imagem bitmap.
5. A trilha fica de 12 a 16 dB abaixo da voz (voz ≈ −18 LUFS por fala, final ≈ −14 a −15,5 LUFS). Entregue também uma versão sem música.
6. Rode `check --json` e `snapshot` no meio de cada cena, depois `render --quality looks`. Confira com ffprobe e com quadros decodificados.

## Armadilhas já vistas (Reels 1, "o teto da Uber", 14/11/2026)

- **Fantasma com escala embola as palavras.** O `fromTo` aplica o estado inicial no tempo 0. Com `scale: 1.22` no fantasma, as palavras se sobrepõem ("NAUBERUMASÓ"). Faça o fantasma só com opacidade e ponha a escala num segundo `fromTo` com `immediateRender: false`.
- **Palavras ainda escondidas ocupam espaço.** Com `text-align: center`, as primeiras palavras de uma página aparecem fora do centro até a frase completar. Isso é esperado (a frase se forma no lugar). Se incomodar, use páginas mais curtas.
- **Risco sobre texto quebrado em duas linhas** cai entre as linhas. Use `white-space: nowrap` no texto riscado.
- **Animar cor de fundo e de texto no mesmo `tl.to`** pinta o texto como bloco. Separe os alvos.
- **A voz fala mais devagar que a estimativa do roteiro.** A voz levou 72,9 s em falas estimadas para 58 s. Meça antes de prometer duração.
- **Sincronia sem transcritor local:** o `gerar.mjs` (em `modelo/` da skill `estudio-com-ia`) distribui as palavras pelos trechos de voz entre os silêncios, com peso pelo número de letras faladas. Ele aceita token com texto falado diferente do texto na tela (`{ d: 'US$ 1.500', s: 'mil e quinhentos dólares' }`) e marcas (`palavra@marca`) para disparar os gráficos na palavra certa.

**O processo completo de um Reels (plano por trecho, preferências e recusas já testadas, motor `gerar.mjs`, finalização e medida) está na skill `estudio-com-ia`**, tirada da revisão do Reels 1 (v14, 16/11/2026). Quando ela divergir desta, vale ela.

**Antes de construir ou revisar uma cena, leia `oficio-motion.md` (nesta pasta).** Ele traz as armadilhas do HyperFrames que a skill `hyperframes` não cobre (`lazy: false`, `immediateRender`, `transformOrigin`, desfoque de movimento, CSS embutido, duração `(N − 0,5)/fps`), as curvas por papel, a troca de cena com speed ramp e o tempo até o pico de cada efeito sonoro, para o som cair no quadro certo. Quando ele divergir daqui, vale esta skill.

## Adaptar à marca

Troque só três tokens: `--ground` (fundo), `--glow` (brilho) e `--accent` (chip, tachado, número, cursor). O texto do chip tem que ter contraste com o accent (texto escuro sobre amarelo, branco sobre laranja ou roxo). Para a virada final, defina um `--accent-2`.

- **Exemplo (azul-noite e amarelo, o do Reels 1):** `--ground #0a1626`, `--glow #1556a7`, `--accent #f2c941` (texto do chip em `#0a1626`), `--accent-2 #8db8e8`. Grotesca: Outfit 800. A serifada itálica não existia nessa marca: use Outfit 300 itálico ou deixe de fora.

## Checklist antes de entregar

- [ ] A frase inteira do gancho está na tela até 2,5 s, com movimento forte.
- [ ] Nenhum trecho de fala fica sem palavra entrando na tela.
- [ ] Cada fala tem a sua animação ou mini-UI mostrando o que é dito.
- [ ] Nenhum número inventado parece dado real (use barras sem valor ou "R$ ··").
- [ ] Nada essencial abaixo de 78% da altura.
- [ ] Há um CTA claro no fim, sem número de telefone pessoal.
- [ ] O som foi medido (LUFS, picos) e não ouvido: diga isso ao diretor do vídeo.

## Medir antes de entregar

Fala em 1,2× (`ffmpeg -af atempo=1.2`) é o padrão desde 14/11/2026: o ritmo normal pareceu lento.

Rode no vídeo final e compare com a tabela do item 2b. Se ficar abaixo da meta, ponha mais camadas contínuas antes de entregar: partículas, câmera que avança, cursor, contadores.

```bash
# na pasta do MP4; o caminho de saída precisa ser relativo (o "C:" quebra o filtro)
ffmpeg -v error -i video.mp4 -an -vf "scale=270:480,format=gray,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=mov.txt" -f null -
node -e 'const v=require("fs").readFileSync("mov.txt","utf8").match(/YAVG=([\d.]+)/g).map(s=>+s.slice(5));const m=v.reduce((a,b)=>a+b)/v.length;console.log("movimento médio",m.toFixed(2),"| parados",(v.filter(x=>x<0.35).length/v.length*100).toFixed(0)+"%")'
```

A versão que chegou a esse nível foi a v2 do `gerar.mjs` do Reels 1. Ela traz:
- **Camadas contínuas:** confete de fundo, dois brilhos que andam e câmera de 6% por cena.
- **Funções reutilizáveis:** explosão de confete, flash, tremor e contador.
- **Cursor "dev":** anda, clica e arrasta.
- **Legenda:** página que sai encolhendo, chip, itálico serifado e explosão por palavra.
