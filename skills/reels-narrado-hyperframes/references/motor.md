# O motor `gerar.mjs`

Leia antes de mexer no `gerar.mjs`. O modelo em `modelo/gerar.mjs` é a v14 do Reels 1 ("o teto da Uber"), com 1.041 linhas. Ele é um script Node que mede as falas e escreve o `index.html` do HyperFrames: GSAP 3.15, uma timeline só (`tl`, pausada, `defaults:{lazy:false}`), registrada em `window.__timelines["main"]`. **Nunca edite o `index.html` à mão:** edite o `gerar.mjs` e rode `node gerar.mjs`.

## Sumário
1. Começar um projeto novo
2. Falas e palavras (`FALAS`, tokens, `blocos`, marcas)
3. Tempo: `S(k)`, `E(k)`, `D`, `M`
4. Cenas e camadas
5. Funções de animação
6. Cursor
7. Vídeo dentro do filme
8. Sons (`efeito`)
9. Legendas
10. Estrutura do HTML e camadas fixas
11. Como editar um trecho sem quebrar o resto
12. Variante com avatar e Whisper (`modelo/gerar-avatar.mjs`)

## 1. Começar um projeto novo

1. Crie a pasta do projeto (se você instalou as skills só num projeto, crie dentro dele, porque elas só carregam ali) e rode `npx --yes hyperframes@0.9.46 init <nome> --skip-skills`, ou copie `package.json`, `meta.json` e `hyperframes.json` de um projeto anterior. Mantenha a versão fixa `0.9.46`: trocar no meio muda o desenho do que já foi aprovado.
2. Copie `modelo/gerar.mjs` para a pasta. Ponha os efeitos sonoros em `assets/sfx/`, com os nomes da seção 8 (este repositório não traz os arquivos de som).
3. Ponha as falas em `assets/audio/` (`fala01.mp3`…) e a versão acelerada em `assets/audio/x12/` (`ffmpeg -i fala01.mp3 -af atempo=1.2 x12/fala01.mp3`). O `AUDIO` do script aponta para `x12/`.
4. Apague as cenas do Reels 1 (blocos `// 1. Gancho` a `// 7. CTA`), o CSS delas e as linhas de `efeito(...)` específicas, mas **guarde as funções** (seções "utilidades de animação", "cenas", "legendas", "áudio"). Escreva as cenas novas no mesmo formato.
5. Troque as cores da marca no `:root` (`--ground`, `--night`, `--glow`, `--sun`, `--azul`, `--mut`, `--rosa`, `--ink`) pelas da sua marca.

## 2. Falas e palavras

`FALAS` é a lista de falas em ordem. Cada uma tem:
- `arq`: o arquivo em `AUDIO`;
- `modo`: `'big'` (palavra grande, entrada com escala) ou `'cap'` (legenda, entrada de baixo);
- `topo`: o `top` da legenda em px (padrão 250). Mude quando a legenda cobrir o gráfico;
- `pausa`: segundos extras de silêncio depois da fala;
- `glitch: true`: aberração cromática na página;
- `blocos`: veja abaixo;
- `paginas`: lista de páginas; cada página é uma lista de tokens que aparecem juntos.

**Token** é uma string ou um objeto:
- `'palavra'`;
- prefixos: `*` chip na cor de destaque, `~` itálico (serifa), `!` explosão de confete na palavra;
- sufixo `@marca`: guarda o tempo da palavra em `M.marca` para disparar animação e som nela;
- objeto `{ d: 'na tela', s: 'o que a voz fala', hl: 1, cls: '', m: 'marca' }`: para número (`{ d: 'R$ 7.500.', s: 'sete mil e quinhentos reais', hl: 1, m: 'sete' }`) e sigla (`IA = { d: 'IA', s: 'inteligência artificial' }`).

**Tempo de cada palavra.** Sem transcritor local, o script acha os trechos de voz entre silêncios (`silencedetect=noise=-38dB:d=0.09`) e distribui as palavras pelo número de letras faladas. Isso erra até 1 s quando um trecho tem palavras longas faladas rápido (número por extenso). **Use sempre `blocos`:** `[[palavras, trechos], ...]` em ordem, prendendo cada grupo de palavras ao seu trecho de voz. A soma das palavras tem que bater com o total de tokens e a soma dos trechos com o número de trechos de voz; se não bater, o script avisa `blocos ignorados` e volta a distribuir por letras. Para descobrir os trechos: rode o `silencedetect` na fala e escreva no comentário acima da fala o que cada trecho diz (é assim no modelo). Um silêncio no fim do arquivo não abre trecho.

Para conferir o tempo de uma palavra, adicione um `console.log` com as marcas no fim do script (o modelo imprime as do CTA, das regras etc.).

## 3. Tempo

- `linhas[k].A`: quando a fala k começa a tocar. A primeira entra em `LEAD` (0,25 s); entre falas há `GAP` (0,25 s) + `pausa`.
- `S(k)` e `E(k)`: começo e fim da cena k (a cena começa 0,15 s antes da fala; o fim é o começo da próxima, ou a fala + `TAIL` 1,6 s na última).
- `D`: duração total.
- `M.marca`: tempo de uma palavra marcada com `@marca`.
- `r(x)`: arredonda para 3 casas (use em todo tempo escrito no HTML).
- `AX = 90, AY = 600`: canto da `.area` (900×820 px), onde ficam os gráficos. Explosões e cursor usam coordenadas absolutas: some `AX`/`AY`.

## 4. Cenas e camadas

`cena(k, html)` cria a cena k (uma por fala) como `.clip` com quatro camadas aninhadas:
`.in` (troca de cena) > `.cam` (câmera: aproximação de 8% + deriva por soma de senos, que nunca para) > `.mexe` (tremor) > `.zoom` (punch de cada página da legenda).
- IDs: cena k vira `#c{k+1}`, com `#c{k+1}i`, `#c{k+1}c`, `#c{k+1}m`, `#c{k+1}z`. Para tremer a cena inteira: `tremor('#c7m', t)`.
- `TROCA[k]`: como a cena k entra: `'zoom'`, `'cima'` ou `'esq'` (speed ramp) ou `'nenhum'` (entrada feita à mão). Varie o tipo.
- **Tela dividida com vídeo:** desligue a câmera e o punch na cena (`k !== 1` no modelo), senão as metades desalinham.
- Dentro da cena use `<div class="area pers">` para os gráficos (com perspectiva para giros 3D) e termine com `rodape('fonte...')` quando houver fonte.

## 5. Funções de animação

Todas escrevem `tl.fromTo`/`tl.to` com o tempo absoluto no fim.
- `ft(sel, de, para, t)` e `to(sel, para, t)`: genéricos (objetos GSAP como string).
- `entra(sel, t)`, `sai(sel, t)`, `sobe(sel, t)`, `pop(sel, t, escala)`.
- `slam(sel, t, escala)`: **t é o pouso** (o tween começa em t − 0,22). Ponha flash, tremor, explosão e som no mesmo t.
- `barra(sel, t, dur, ease, de)`: `scaleX` de `de` até 1.
- `tremor(sel, t, amplitude)`: keyframes de 0,32 s em x/y. Use na camada `.mexe` (`#cNm`) ou num elemento cujo x/y não esteja animado por outro tween (o tremor zera x/y).
- `conta(sel, t, até, dur, prefixo, sufixo, de)`: contador com milhar em ponto.
- `flash(t, cor, opacidade)`: flash de quadro inteiro, curto.
- `explode(x, y, t, n, raio)`: confete geométrico que explode e some (coordenadas absolutas).

## 6. Cursor

`mostra(t, x, y)`, `cur(t, x, y, dur)`, `clique(t)`, `esconde(t)`. Coordenadas absolutas. A etiqueta do cursor é "dev"; troque no HTML do `#ponteiro`.

## 7. Vídeo dentro do filme

O `<video>` precisa ter tempo próprio e **não pode ficar dentro de um elemento com tempo** (regra `video_nested_in_timed_element` do `check`). Padrão do modelo:
```js
cenas.push(`<div class="fundo-video" id="bg3w"><video id="bg3v" class="clip" data-start="${r(S(2))}" data-duration="${r(E(2) - S(2))}" data-track-index="8" muted playsinline src="assets/video/fundo.mp4"></video><div class="fundo-veu"></div></div>`);
chega('#bg3w', S(2), TROCA[2]); parte('#bg3w', E(2), TROCA[3]); // o contêiner sem tempo recebe a mesma troca da cena
```
- Vídeo de fundo em tela cheia: contêiner `position:absolute; inset:0`, `object-fit:cover` e um véu escuro por cima (`.fundo-veu`) para a legenda ler.
- Tela dividida do gancho: o vídeo entra direto em `cenas.push` com `top:1152px; height:768px` (40% de baixo) e uma linha amarela (`.divisa`) em 1148 px.
- Aproximação lenta dentro de uma moldura (`.lado-dev-zoom`): anime um contêiner interno, nunca o `<video>`.

## 8. Sons (`efeito`)

`efeito(nome, t, volume, util)` mede o arquivo de `assets/sfx/nome.mp3` (RMS em janelas de 10 ms) e alinha sozinho:
- `whoosh*`, `impact*`, `boom*`, `vira*`, `letreiro-trava*`: o **pico** cai em t;
- o resto (pop, click, error, chime, ping…): o **começo audível** cai em t (o `error` tem 0,60 s mudos no começo; sem essa medida ele sai mudo).
- `util`: quanto tocar depois do começo audível (ex.: `chime` com 1,3 s).
- Lança erro se t não for número (marca apagada).
- No fim, o script avisa quando algum som soa nos 0,5 s antes de um impacto (antecipação).
- `whoosh(t, vol)` roda entre `whoosh-short`, `-grave` e `-agudo` para não repetir. Um whoosh já sai em cada troca de cena (`linhas.forEach(... whoosh(l.S ...))`).
- O volume dos efeitos fica entre 0,16 e 0,5 (a voz é 1). O maior soco é o do gancho (`hook-caixa-b` 0,5); nada no corpo passa dele.

## 9. Legendas

Geradas a partir de `FALAS`: uma página por vez, palavra a palavra no tempo medido − 0,04 s; chip (`*`) com escala e giro; página sai encolhendo com desfoque quando a próxima entra; punch alternado no `.zoom` a cada página. O texto da legenda é "o de sempre", palavra por palavra: o diretor não quis bloco de texto parado nem trocar a legenda por texto fixo.

## 10. Estrutura do HTML

Camadas por `z-index`: `#bg` (fundo, dois brilhos que andam, grão) 1 · `#particulas` 5 (formas soltas: **desligadas** com `to('#particulas', '{opacity:0}')` logo depois do gancho, porque elementos aleatórios flutuando foram reprovados) · cenas 10+k · vídeos · `#fx` 55 (explosões e flashes) · `#legendas` 60 · `#ponteiro` 80 · áudios (vozes na trilha 5, efeitos na 6, música na 7, `data-volume` 0,16 se houver `assets/audio/trilha.mp3`).

Elementos que não podem andar com a câmera (rodapé do gancho, linha divisória) entram direto em `cenas.push` como `.clip` próprio, fora de `cena()`.

## 11. Como editar um trecho sem quebrar o resto

1. `cp gerar.mjs gerar-vNN.mjs` **antes** de mexer (a fonte da v3 se perdeu por isso) e, depois de gerar, `cp index.html versoes/index-vNN.html`.
2. Escreva o bloco novo da cena num `.txt` no scratchpad e um `.cjs` que só copia: troca o trecho entre dois marcadores (`// 7. CTA` até `// ---------- legendas`), acrescenta o CSS depois de uma âncora única e troca as linhas de som com `troca(a, b)` que falha se não achar exatamente uma ocorrência. Heredoc longo com crases quebra no Bash e `String.raw` não impede `${}`.
3. Atualize a primeira linha do script: `// Gera o index.html ... versão N: <o que mudou>` e empurre a anterior para `// Versão N-1:`.
4. Escreva no comentário da cena o pedido do diretor e a data.

## 12. Variante com avatar e Whisper (`modelo/gerar-avatar.mjs`)

É o motor do Reels 2, "meu estúdio de vídeos com IA" (v16, cerca de 1.700 linhas), com as mesmas funções da seção 5 e mais:
- **Tempo pelo Whisper, no lugar de `blocos`:** `python scripts/transcrever.py assets/audio/x12/fala01.mp3 ...` (faster-whisper `medium` na CPU, venv `~/.venvs/whisper`; o ffmpeg gera o PCM porque o `av` do venv quebra) grava `dados/transcricao/falaNN.json`. O `alinhar()` casa cada token com as palavras do Whisper; para nome composto, use `{ d, s, m, wn: 2 }`. Se a soma não bater, o script avisa "não casou" e cai na estimativa por silêncios.
- **`TODAS` e `TRECHO=N`:** `TRECHO=9 node gerar.mjs` gera só as 9 primeiras falas, para revisar o trecho novo sem renderizar o resto.
- **Por fala:** `pausa` (silêncio extra depois dela, empurra as próximas) e `cauda` (só na última: segundos a mais no fim).
- **Rosto (`#card` e `#pop`):** `CARD` tem os modos `baixo` (800×470 em y 1130, com pop-out), `cheio` e `tela` (tela cheia sem borda, HUD em top 250). Troque com `cardModo(t, modo)` + `obturador(t)`, nunca com tween de left/top (o lint reprova). `trechoAvatar(id, mp4, webm, ini, fim)` põe o clipe no card e o recorte com alfa no `#pop`, fora das cenas. Fonte 16:9 em 1080p: rosto em x ≈ 970, topo da cabeça em y ≈ 200.
- **HUD:** `#vis-rec` (pisca), `#vis-tag` (CÂMERA / AVATAR), `#vis-tc` (timecode) e as camadas de congelar `#vis-pausa` e `#vis-tc2`.
- **Troca de lugar do rosto no meio da fala:** `CORTES[k]` é o tempo do corte; a legenda que o atravessa se divide nele. `ONDE(k, t)` dá o `top` da legenda por fala e por lado do corte (rosto em tela cheia: 1250; card de baixo: 900; sem rosto: 1390 a 1420).
- **`celular`:** array de contêineres sem tempo para todo `<video>` fora do rosto (provas, monitores, b-roll); z 12 fica embaixo da cena e z 13 é b-roll em tela cheia (`.fundo-video`). Se o elemento tem `fromTo` com from diferente de `opacity:0`, passe `immediateRender:false`. Esconda no fim da fala com `set(..., '{opacity:0}', E(k))`.
- **Efeitos do tema:** `foco(sel, t, box, cor)` (cantoneiras que travam numa cor, com desfoque no alvo) e `obturador(t)` (duas faixas fecham e abrem em 0,16 s, em toda troca de cena). O `efeito()` alinha pelo pico também `trailer`, `obturador` e `claquete`.
- **Patches:** escreva cada cena num `.py` no scratchpad (Write) com `troca(a, b)` e `antes(ancora, novo)`, que exigem ocorrência única. É o `.cjs` da seção 11, em Python.
