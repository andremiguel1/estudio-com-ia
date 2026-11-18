# Armadilhas já vistas (Reels 1, "o teto da Uber", v1 a v14, 14 a 16/11/2026, e Reels 2, "meu estúdio de vídeos com IA", v1 a v16, 17 e 18/11/2026)

Cada uma custou pelo menos uma rodada. Leia antes de construir uma cena e de novo quando um quadro sair estranho. As do HyperFrames em geral (`lazy:false`, `immediateRender`, `transformOrigin`, CSS embutido, duração `(N − 0,5)/fps`) estão no `oficio-motion.md` da skill `estilo-tipografia-cinetica`, seção 1.

## GSAP e estado inicial
- **Vários `fromTo` no mesmo elemento:** o último criado define o estado antes do primeiro tween. Do segundo em diante, use `immediateRender:false`. O `check` avisa com `gsap_repeated_fromto_without_baseline`.
- **Barra que já aparece cheia desde o começo da cena:** esconda num contêiner com `opacity:0` (ex.: `#r3bb`) e faça o contêiner entrar.
- **Tremor zera x/y:** `tremor()` faz `fromTo {x:0,y:0}`. Num elemento que foi movido com `y:-220`, ele pula de volta. Trema a camada `.mexe` da cena (`#c7m`).
- **Rotação em SVG:** use `svgOrigin:"x y"`. O `transform-origin` do CSS não funciona e o ponteiro do medidor sumia.
- **Texto com `transform: rotate()` no CSS e animação de escala:** passe a rotação explícita nos dois lados do `fromTo` (`rotation:-8`).

## Layout
- **Nome de classe genérico colide:** `.painel` da linha amarela achatou o `cartao painel` de outra cena. Use nomes com prefixo da cena (`.c8-selo`, `.r3-parou`).
- **Legenda por cima do gráfico:** ajuste o `topo` da fala ou desça a `.area`. Confira em snapshot.
- **Rodapé e divisória dentro da cena andam com a câmera:** ponha fora de `cena()`.
- **Elemento empurrado para fora da tela:** um `y:+540` tirou a faixa dos meses do quadro. Confira os limites no snapshot.
- **Rótulo pequeno sobre linha colorida fica ilegível:** dê fundo escuro ao rótulo ("TETO").
- **Card escalado 1,12× com `left:0; right:0`** passa de 900 px, mas ainda cabe em 1080. Mais que isso corta.
- **Botão largo (`white-space:nowrap`)** encosta nas bordas; o `check` dá `outside_safe_zone`. Aceitável no CTA, mas não coloque nada essencial abaixo de 78% da altura.

## Brilho e texto com gradiente
- **`filter: drop-shadow` junto com `background-clip:text`** deixou um traço fino de 1 px ao lado da marca escalada (v14). Faça o brilho com uma cópia do texto atrás, em cor sólida e `filter: blur(22px)` (`.marca-sombra`).
- **Brilho que varre o botão:** faixa `.brilho` com gradiente branco dentro do botão com `position:relative; overflow:hidden`, animada em `x` com `skewX:-20`. O `box-shadow` do botão não é cortado pelo `overflow`.
- **Brilho no texto da marca:** `background-size:300%` com o realce no meio do gradiente e `backgroundPosition` de `"100% 0%"` a `"0% 0%"`.

## Vídeo
- **`<video>` dentro de cena com tempo** quebra o `check` (`video_nested_in_timed_element`). Contêiner sem tempo fora da cena, com a mesma troca dela.
- **Tela dividida + câmera da cena** desalinha as metades. Desligue câmera e punch nessa cena.
- **Vídeo curto para a cena:** estique em câmera lenta (`setpts=1.85*PTS`) ou congele começo/fim (`tpad=start_mode=clone:start_duration=0.6:stop_mode=clone:stop_duration=1.6`) para o gesto cair na palavra.
- **Vídeo de dia na marca escura:** `eq=brightness=-0.06:contrast=1.08:saturation=0.9,colorbalance=bs=0.08:bm=0.04` (a opção `ms` do colorbalance não existe; é `bm`). Depois `scale=1080:1920:flags=lanczos` e véu escuro em CSS.
- **Trecho parado com vídeo:** o duelo em tela dividida ficou com 42% de quadros parados. Resolveu com aproximação lenta do vídeo dentro da moldura e linhas de código subindo a 35% de opacidade.

## Som
- **Arquivo com silêncio no começo** (`error` 0,60 s, `typing` 0,43 s): cortar pela duração crua deixa mudo. O `efeito()` mede; nunca escreva `data-start` à mão.
- **Pico estourado:** sem limitador, o pico chegou a −0,8 dBFS. O `scripts/finalizar.sh` já tem o `alimiter`.
- **Mesmo som repetido em sequência cansa:** o `impact-bass-1` em todo soco foi recusado ("repetitivo"). Varie (`boom-a`, `boom-b`, `carimbo`, `whoosh` grave/agudo).

## Tempo das palavras
- **Distribuir por letras erra até 1 s** em número por extenso. Use `blocos` em toda fala.
- **Marca removida** deixa um som sem tempo: o `efeito()` lança erro. Não silencie o erro; ache a marca nova.

## Ferramentas no Windows
- **Heredoc longo com crases e `${}`** quebra no Bash. Escreva o bloco num `.txt` e aplique com um `.cjs`.
- **`rm` falha com "pasta em uso"** quando o cwd da sessão está dentro dela.
- **O caminho de saída do filtro `metadata=...:file=`** precisa ser relativo (o `C:` quebra o filtro); o `medir-movimento.sh` usa `file=-`.
- **Preview do `index.html` pelo navegador embutido** abre como snapshot estático (sem `__timelines`). Para inspecionar um quadro, use `snapshot --at` e recorte com ffmpeg (`crop=w:h:x:y`).

## Reels 2, "meu estúdio de vídeos com IA" (17/11/2026)
- **Lint `gsap_non_transform_motion`:** é erro, não aviso, para tween de `left/top/width/height` e de `letterSpacing`. Troca de layout (card que muda de tamanho) é corte com obturador (`tl.set`) ou animação só com transform (x, y, scale, scaleX).
- **Cabeça saindo do quadro (pop-out):** o vídeo normal fica dentro de um card com `overflow:hidden`, e o recorte com alfa fica por cima num `#pop` com `clip-path: inset(0 0 <1920 - topo do card> 0)`. O recorte sai de `npx hyperframes@0.9.46 remove-background in.mp4 -o out.webm --quality best --device cpu` (cerca de 6,5 min por 6 s na CPU). Para cortar ou preencher o webm sem perder o alfa: `ffmpeg -c:v libvpx-vp9 -i in.webm -vf "tpad=...,format=yuva420p" -c:v libvpx-vp9 -pix_fmt yuva420p`.
- **Fundo claro:** a média de movimento cai mesmo com elementos mexendo. Cena sem rosto precisa de câmera ligada, punch por página e camadas contínuas (agulha, onda "falando", feixe varrendo) desde o primeiro plano.
- **Congelamento proposital:** não desligue a câmera da cena (deu 45% de quadros parados). Marque a pausa com tela cinza e ⏸ por 0,6 s.
- **Elemento fixo no canto** (ex.: `SKILL.md`, z 58) sobrepõe o que fica no topo, e o punch sobe o conteúdo cerca de 45 px. Deixe o topo do conteúdo em y ≥ 340.
- **`text_occluded` de propósito** (risco ou carimbo sobre texto): marque o pai **e cada filho de texto** com `data-layout-allow-occlusion`.
- **Vídeo de prova** (celular, monitor, b-roll): contêiner sem tempo fora das cenas; z 12 fica embaixo da cena (os carimbos dela ficam por cima) e z 13 serve para b-roll em tela cheia (`.fundo-video` precisa de CSS próprio). Zoom com `transformOrigin` no detalhe, num wrapper interno.
- **Whisper e tokens:** nomes compostos viram 2 palavras ("Claude Code" → "Cloud Code", "Eleven Labs", "Hey Gen", "Podcast Studio", "d 'água"). Use `{ d, s, wn: 2 }`, senão o alinhamento cai para a estimativa por silêncios.
- **Pedido do diretor:** cena sem rosto precisa de uma interface que ocupe a tela e execute a frase. Um painel pequeno com o centro vazio foi reprovado ("nada que prenda a atenção"). Os efeitos do kit antigo também foram reprovados: use efeitos do tema de cada vídeo.

- **`fromTo` em elemento sem tempo (fora das cenas):** se o from não for `opacity:0`, passe `immediateRender:false` no to. Sem isso, o GSAP aplica o from no quadro 0 e o elemento aparece desde o começo do vídeo (Reels 2, v12: a moldura do gêmeo, com opacidade 0,6 e blur, ficou como retângulo translúcido sobre o vídeo todo). Depois de cena nova, confira snapshots do vídeo inteiro.

## Reels 2, falas 9 a 13 (v12 a v16, 17 e 18/11/2026)
- **`rnd()` numa cena nova muda as cenas aprovadas.** O punch das legendas (direção x ±24) sorteia com o mesmo `rnd()` e roda depois de todas as cenas. Uma chamada a mais numa cena nova muda o punch de todas as falas. Na cena nova, use fórmula fixa (`((i * 7) % 5) * 0.03`).
- **Erro do `check` num trecho já aprovado** (ex.: `text_occluded` nas falas 6 e 7) pode surgir só porque as amostras caem em outros tempos quando o vídeo fica mais longo. Confira o tempo do erro antes de mexer em trecho aprovado.
- **Aviso "não casou com a transcrição"** aparece no `node gerar.mjs` quando o Whisper ouve uma palavra a mais ("tinha **a** marca"). A fala cai na estimativa por silêncios sem parar o script. Leia a saída a cada geração.
- **HUD que precisa "parar":** o REC pisca e o timecode corre por tweens globais com `repeat`, que voltam a valer a cada quadro e passam por cima de um `tl.set`. Para congelar, ponha por cima, dentro do HUD, elementos próprios (ponto cinza `#vis-pausa`, timecode fixo `#vis-tc2` com fundo opaco e `data-layout-allow-overlap`) e ligue a opacidade deles.
- **Glitch com cópia do rosto:** abra o `clipPath` do `#pop` (recorte com alfa) e ponha `mixBlendMode:"screen"` **no `#pop`**, não no vídeo: o `#pop` tem `z-index` e cria um contexto de empilhamento, então o blend no filho não mistura com o card. Vídeo com `filter:"sepia(1) saturate(9) hue-rotate(-40deg)"` e `x` tremendo; faixas com `mix-blend-mode:difference`; `tremor('#card')`. Volte tudo ao normal (clipPath, blend, filtro) 0,5 s depois.
- **Etiqueta com texto que muda:** `tl.set('#vis-tag', '{textContent:"AVATAR"}', t)` funciona. Volte ao valor anterior no fim da cena, senão a próxima cena com rosto herda a etiqueta.
- **Faixa que desliza dentro de um painel** (a trilha BOCA deslocada 70 px) sai pela borda. Envolva-a num `div` com `overflow:hidden`, sem fechar o painel inteiro (as etiquetas dele ficam em `top:-20px`).
- **Carimbo ou chip grande na borda direita:** com a câmera (escala 1,06) e o punch (x ±24), o que termina em x > 1000 sai da tela. Termine em x ≤ 980.
- **Vídeo 9:16 numa moldura 16:9:** centralize sobre uma cópia desfocada dele mesmo, sem cortar o rosto: `[0:v]split[a][b];[a]scale=960:-2,crop=960:540,boxblur=24:2,eq=brightness=-0.08[bg];[b]scale=-2:540[fg];[bg][fg]overlay=(W-w)/2:0`.
- **Gravação real acelerada** (45 s de webcam em 1,5 s): `setpts=PTS/30` e `tpad=stop_mode=clone:stop_duration=8`, para segurar o último quadro. O contador (0:00 a 0:45) corre no mesmo tempo da parte acelerada, por `onUpdate` num objeto.
- **Respiro antes de uma revelação:** `pausa: 0.8` na fala empurra as falas seguintes. Faça isso quando elas ainda não foram construídas, porque mexe no tempo de tudo o que vem depois.
- **Última chamada curta demais:** o `check` dá `line_unread` (pede cerca de 2 s no fim). Use `cauda: 0.8` na última fala (o `l.E` da última soma `l.cauda`).
- **Pico acima de −1 dBFS depois do AAC** (claquetes, −0,5 dBFS): o `finalizar.sh` agora usa `alimiter=limit=0.7`. Se ainda passar, rode de novo só o áudio (`-c:v copy -af alimiter=limit=0.7`) e meça.
- **Chip ao lado do rosto em tela cheia:** a área livre é estreita (x < 250 ou x > 830, na altura da têmpora). Abaixo disso, ele cobre olho ou boca. Use fonte de 46 a 50 px.
