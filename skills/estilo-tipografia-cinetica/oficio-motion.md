# Ofício de motion e armadilhas do HyperFrames

Consulta da skill `estilo-tipografia-cinetica`. Leia antes de construir ou revisar uma cena e antes de pôr os efeitos sonoros.

Adaptado em 14/11/2026 da skill `fluxo-de-edicao`, de Lucas Leite (MIT; aviso de licença no fim). O original foi escrito para YouTube com apresentador e Premiere. Aqui fica só o que vale para Reels 9:16 narrado e sem câmera filmada.

**Quando este arquivo e a SKILL.md divergirem, vale a SKILL.md.** Os números dela foram medidos na referência de tipografia cinética, que é mais rápida que o ofício geral. Exemplo: a palavra entra em 0,32 s ali, e não nos ~0,5 s daqui.

## 1. Armadilhas do HyperFrames

Cada uma custou uma rodada ao autor. A skill `hyperframes` instalada não traz nenhuma delas, salvo o sorteio com semente.

- **Snapshot e render só mostram o mesmo quadro quando:**
  - todo movimento encadeado tem a partida explícita (`fromTo`; com `to`, a partida é lida da tela no momento);
  - todo tween novo tem `lazy: false` (sem isso, o GSAP adia o primeiro quadro);
  - dois tweens na mesma propriedade não se sobrepõem: o anterior termina onde o próximo começa.
- **`fromTo` que começa visível** (opacidade acima de 0 no "from") leva sempre `immediateRender: false`. Sem isso, o estado inicial aparece desde o tempo 0. É a mesma causa do "NAUBERUMASÓ" do Reels 1.
- **Origem da transformação:** num tween com `immediateRender: false`, a origem não vale quando o quadro é calculado pulando direto (snapshot, render em paralelo), e o zoom sai deslocado. Fixe com `tl.set(alvo, { transformOrigin: '…' }, <início do tween>)`.
- **Medir layout** (largura de uma palavra, de um chip): monte a timeline dentro de `document.fonts.ready.then(…)`.
- **CSS embutido** no `index.html`, nunca por `<link>`: o link mudou o desenho das letras no render.
- **Duração exata:** a duração da raiz é `(N − 0,5) / fps`, com N igual ao número de quadros. O render arredonda `duração × fps` para cima, e a conta direta às vezes sai com 1 quadro a mais.
- **Versão fixa dentro do vídeo:** todo comando leva a versão (`npx --yes hyperframes@<versão> …`). Trocar no meio pode mudar o desenho do que já foi aprovado.
- **Texto com gradiente corta a última letra** quando usa `background-clip: text` com entreletra negativa (a palavra-chave usa −0,03 em). Dê folga sem mudar o layout: `display: inline-block; padding: 0.1em 0.14em; margin: -0.1em -0.14em;`. Confira a última letra num quadro do render final.
- **Desfoque de movimento:**
  - ligue na raiz com `data-motion-blur="on"` e `data-motion-blur-tier="filter"`. No modo padrão ("capture"), o elemento animado é desenhado por cima de tudo;
  - nada de `backdrop-filter` em cartão com texto animado: use cor sólida, e o vidro vem da borda, do degradê e da luz;
  - nada de `filter: drop-shadow` em texto com gradiente, porque deixa uma caixa visível enquanto anima. Faça o brilho numa camada atrás (o mesmo texto em cor sólida, com `blur`);
  - ele só borra o elemento animado **mais externo**. Ignora camadas transparentes de quadro inteiro, tudo em 3D (`perspective`, `rotateX`) e elementos maiores que metade do quadro. Anime o menor elemento possível (cada dígito, não o contador inteiro). Para os cartões em 3D, faça o desfoque direcional à mão (SVG `feGaussianBlur` calculado pela velocidade).
- **Vinheta de quadro inteiro:** use `box-shadow: inset`, não `background`. Com `background`, o `check` acusa texto encoberto.
- **Luz ou reflexo dentro de cartão:** `z-index` abaixo do texto.
- **Brilho dentro de janela com `overflow: hidden`:** a janela corta o brilho nas laterais. Recorte só no eixo do movimento, com folga.
- **Efeito gerado** (ruído, confete, imagem se formando): canvas desenhado num `onUpdate`, com sorteio de semente fixa, para o render sair igual toda vez.
- **O render não é 100% determinístico:** dois renders do mesmo projeto diferem em até ~1/255 em poucos pixels, perto do desfoque de movimento. Ao comparar antes e depois, essa é a margem de ruído.
- **As orientações do HyperFrames x este estilo:** o HyperFrames considera "aproximação lenta contínua" e "título que continua se movendo" sinais de vídeo gerado. Este estilo pede movimento contínuo (meta da SKILL.md, item 2b), então vale o estilo.

## 2. Ofício de motion

Valores em quadros a 30 fps. São tendência, não regra: regra absoluta faz todo vídeo sair igual.

### Princípio
- **Uma coisa protagonista por vez.** Em cada momento, só um elemento chama a atenção. O resto (confete, brilho, deriva) fica na periferia, devagar, e nunca atravessa a área do texto.
- **O que aparece nasce do que está sendo dito.** Escolha a imagem que explica aquela fala, não um modelo genérico.
- **Alinhamento:** cada elemento alinhado ao que acompanha (o chip à palavra, as linhas de um bloco entre si). Desalinhamento é o que mais passa amadorismo.

### Hierarquia de velocidade
| Camada | Velocidade |
|---|---|
| Elemento entrando | ~15 f; opacidade e foco em 6–10 f |
| Elemento saindo | ~8 f, sempre mais rápido que a entrada |
| Texto | 6–12 f por palavra |
| Câmera virtual | lenta, 1,5–3,5 s |
| Secundário | contínuo |

O contraste é o que dá fluidez: entrada rápida sobre câmera lenta.

### Curva por papel (GSAP)
| Papel | Curva | Duração |
|---|---|---|
| Entrada de elemento | posição e escala em ease-out; opacidade e foco em `expo.out`, mais curtos | ~15 f |
| Saída de elemento | `power3.in`, um movimento só (cai ou encolhe + desfoque + fade) | ~8 f |
| Grupo se reorganizando | palavras `power3.out`; cartões `power2.out` | 15 f; 21 f |
| Aproximação da câmera na abertura | `power2.out` a `circ.out` | 1,5–3,5 s |
| Deriva da câmera depois que assenta | `none` ou `sine.out` | até o fim da cena |
| Punch num detalhe | in-out assimétrico com pico em ~30% (`expo.in` curto + `expo.out` longo) | ~1–1,7 s |
| Passo de carrossel, troca de item | `power4.inOut` ou `expo.inOut` | 13 f + ~7 f parado |
| Escurecer ou desfocar o fundo | `power1.inOut` | ~14 f |
| Progresso, rotação, barra | `none` | — |
| Speed ramp (troca de cena) | `power4.in` → corte → `expo.out` | ~1 s + ~1,5 s |

**Nada se move linearmente**, exceto a deriva da câmera e o que segue um progresso.

### Câmera virtual
- **Aproximação e deriva correm juntas, em camadas separadas:** o contêiner de fora faz a aproximação em ease-out, e o de dentro faz a deriva linear durante a cena inteira. O `gerar.mjs` já tem as camadas (`.cam` e `.zoom`). Se as duas curvas forem encadeadas na mesma camada, a velocidade cai a zero e volta, e o zoom "engasga".
- **Câmera fluida:** o que mais parece amador é vários movimentos que começam e terminam parados em sequência. Emende um no outro sem a velocidade chegar a zero. Mais suave não é mais lento.
- Um recuo que revela continua recuando devagar, no mesmo sentido, em vez de recuar e voltar.
- O conteúdo principal entra centralizado desde o começo, mesmo com zoom; o recuo revela o resto.

### Troca de cena
- **Speed ramp:** a cena acelera numa direção (`power4.in`, ~1 s), corta no quadro mais rápido, e a nova chega na mesma direção e freia (`expo.out`, ~1,5 s).
  - **Percurso:** o conteúdo ainda está no quadro no corte. Medido em 1080 de largura: ~700 px na saída e ~560 px na chegada. Com ~1.300 px o conteúdo some antes do corte.
  - **Velocidade casada no corte:** a final do `power4.in` é 4·D/T, e a inicial do `expo.out` é ≈ 6,93·D/T. Exemplo: 700 px em 1 s dá 2.800 px/s; 560 px em 1,5 s dá ~2.590 px/s.
  - A cena nova chega com o conteúdo principal; os detalhes entram em cascata ~0,2 s depois.
- **A chegada nunca para seco:** freia longa e continua andando.
- **Corte com assentamento:** a cena nova entra ~5% maior e assenta em ~6 f.
- Varie o tipo de troca; não repita a mesma em sequência. O whip da SKILL.md é uma das formas, não a única.

### Entradas, saídas e texto
- **Cascata:** 2–4 f entre itens irmãos; o próximo começa antes de o anterior assentar.
- **Grupo que chega em sequência fica centralizado como um grupo só:** o primeiro nasce no centro, e quando o seguinte chega o grupo desliza até ficar centrado de novo.
- **Linha no ritmo da fala:** ou cada palavra entra na hora em que é dita e a linha desliza para continuar centrada (~0,5 s, `power3.out`), ou a linha inteira aparece apagada e cada palavra acende quando é dita (é o fantasma da SKILL.md). Revelar palavra a palavra sem recentralizar deixa o começo torto. Isso resolve a armadilha "palavras ainda escondidas ocupam espaço" da SKILL.md.
- **Sincronia:** o elemento que representa uma palavra entra **na** palavra, pelo tempo medido, não num intervalo fixo.
- **Tempo de leitura:** sem outra animação logo depois, o letreiro segura ~1–1,5 s depois da última palavra.
- **O herói do fim** (logo, CTA) tem tempo de ser visto.
- **Cursor e clique:** o cursor anda em arco, como uma mão, e cada clique afunda e volta com mola.
- **Texto digitado:** ~23 caracteres/s, cada letra com borda suave (opacidade e desfoque). A referência digita o gancho a ~14 letras/s: lá vale a SKILL.md.

### Evitar
- tudo entrando com o mesmo fade e deslize;
- vários protagonistas ao mesmo tempo;
- câmera que para e recomeça em sequência;
- flash de quadro inteiro (o flash fica no próprio elemento).

Feedback geral ("básico", "sem vida", "monótono") pede refazer a cena, não retocar.

## 3. Eventos para o som

Aplicado na v3 do `gerar.mjs` do Reels 1 (14/11/2026). Ali, `efeito(nome, tempo do evento, volume)` mede o arquivo e o posiciona sozinho.

### Anotar enquanto constrói
Para cada coisa que **chega, sai, bate, troca, clica, digita, conta ou revela**, anote:
- o tempo;
- o tipo, em palavras livres (`chip_trava`, `cartao_voa`, não só "impacto");
- a força (leve, média ou forte);
- a duração, quando dura.

Movimento de "vida" (deriva, confete flutuando) não é evento. Os efeitos saem dessa lista.

### Regras
- **O som segue o que se vê.** O que não aparece não tem som.
- **Um protagonista por momento:** no máximo 3 camadas por evento, cada uma numa faixa (grave, principal, agudo curto). Dois sons do mesmo tipo no mesmo quadro embolam.
- **Sincronia pelo pico, não pelo começo do arquivo:**
  - impacto: o transiente cai no quadro do evento;
  - whoosh: o pico cai no quadro da troca ou da chegada (quando o elemento freia);
  - pop, clique e ding começam no evento.
- **Antecipação:** nada de outro som nos ~0,5 s antes de um impacto forte.
- **Escalada:** o maior impacto vai na frase-chave do gancho, e nada no corpo passa dele.
- **Variação:** não repetir o mesmo arquivo em ~20 s.
- **Nível:** efeito bem abaixo da voz.

### Tempo até o som dos efeitos da biblioteca do Reels 1 (`assets/sfx`)
Medido em 14/11/2026 pelo RMS em janelas de 10 ms. "Começa a soar" é a primeira janela a até 30 dB do pico.

| Arquivo | Começa a soar | Pico | Alinhar pelo |
|---|---|---|---|
| `whoosh-short` (e `-grave`, `-agudo`) | 0,07 s | 0,16 s | pico |
| `whoosh-cinematic` | 1,45 s | 2,54 s | pico |
| `impact-bass-1` | 0,05 s | 0,14 s | pico |
| `pop` | 0,11 s | 0,12 s | começo |
| `click`, `click-soft` | 0,04 s | 0,05 s | começo |
| `error` | **0,60 s** | 0,65 s | começo |
| `typing` | **0,43 s** | 0,45 s | começo |
| `chime` | 0,16 s | 0,42 s | começo |
| `glitch-2` | 0,02 s | 3,18 s | começo (só os primeiros 0,7 s) |

- **Pico no evento:** `data-start = evento − pico`. **Começo no evento:** `data-start = evento − começa a soar`.
- **Corte curto engole o som.** Na v2, o `error` tinha `data-duration` de 0,6 s e só começa a soar aos 0,60 s, então as três vezes saíram mudas. O `typing` tocou só 0,07 s. Sempre meça o arquivo antes de cortar.
- **O evento de um `slam` é o pouso,** no fim do tween (power4.in), e não o começo. Na v2, o confete, o flash e o impacto saíam no começo, e a palavra só aparecia 0,22 s (6–7 quadros) depois. Na v3, o `slam(sel, t)` recebe o tempo do pouso, e tudo vai nesse t.

---

Partes deste arquivo foram adaptadas de https://github.com/LeiteZ/fluxo-de-edicao (`guias/hyperframes.md`, `guias/oficio-motion.md`, `guias/etapa-sfx.md`).

MIT License

Copyright (c) 2026 Lucas Leite

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
