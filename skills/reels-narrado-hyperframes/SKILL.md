---
name: reels-narrado-hyperframes
description: Criar ou revisar um Reels 9:16 narrado em HyperFrames com gancho forte em tela dividida, uma imagem concreta por frase, algo novo a cada 3 a 5 s, vídeo no fundo, legenda palavra por palavra, sons pelo pico, CTA com botão de brilho (ou "comenta PALAVRA"), avatar da HeyGen só nos trechos com rosto (pop-out, tela cheia, plot twist) e entrega medida. Use SEMPRE que o usuário pedir "faz um Reels", "o gancho está fraco", "ajusta o trecho de X a Y segundos", "coloca um vídeo no fundo", "refaz o CTA", "revisa o Reels", "isso prende a atenção?", "monta o vídeo com meu avatar" ou "escreve a legenda do post", mesmo sem dizer "skill". Traz o processo (plano antes, um trecho por vez, versão salva), as preferências e recusas que já foram testadas, o motor `gerar.mjs`, os scripts de finalização e de medida e as armadilhas. NÃO use para publicar o vídeo.
---

# Reels narrado em HyperFrames

Provado em dois Reels reais de novembro de 2026:

- **Reels 1, "o teto da Uber"** (editorial, fundo azul-noite, sem rosto, 14 a 16/11/2026): a v1 "fazia dormir" (0,52 de movimento, 75% de quadros parados) e a v14 foi revista trecho a trecho até o diretor aprovar cada um. O `gerar.mjs` daquele projeto, copiado em `modelo/gerar.mjs`, é o motor.
- **Reels 2, "Meu estúdio de vídeos com IA"** (fundo claro, com avatar, 17 e 18/11/2026, 2 min 11 s, v1 a v16): o motor ganhou o rosto do avatar (card com a cabeça saindo pela borda e tela cheia), o tempo das palavras pelo Whisper local e a etiqueta de câmera que vira AVATAR no plot twist. Esse motor está em `modelo/gerar-avatar.mjs` (seção 12 do `motor.md`). Para vídeo com rosto, comece por ele. Os clipes do avatar saem da HeyGen: veja `references/avatar-heygen.md`.

"O diretor" nesta skill é quem pediu o vídeo (você). As preferências abaixo são as que funcionaram nesses dois Reels: use como ponto de partida e ajuste ao gosto de quem dirige.

Antes de começar, leia:
- `references/motor.md`: como o `gerar.mjs` funciona e como começar um projeto novo;
- `references/repertorio.md`: que imagem cada tipo de frase virou nos dois Reels;
- `references/armadilhas.md`: o que já deu errado;
- `references/avatar-heygen.md`: quando o vídeo tem rosto;
- a skill `estilo-tipografia-cinetica` (o estilo, os números, as cores) e o `oficio-motion.md` ao lado dela (curvas, speed ramp, sons pelo pico). Quando divergirem desta skill, vale esta, porque ela traz o que foi corrigido depois.

## Como trabalhar com o diretor

- **Plano antes, sempre.** Para cada trecho, mostre uma tabela curta: palavra ou frase → o que aparece na tela → som. Espere o "Sim, pode fazer". Já aconteceu de o diretor parar um turno no meio para dizer "vamos planejar estes segundos antes de sair fazendo".
- **Opinião honesta, sem bajular.** O pedido foi literal: "você não é obrigado a concordar comigo e nem me agradar". Quando ele perguntar "você acredita mesmo que vai prender a atenção?", responda o que pensa. No Reels 1 a resposta certa foi "não", e o plano foi refeito. Discorde quando tiver motivo (ex.: tela cheia no fundo em vez de 40/60, porque a tela dividida é a marca do gancho) e deixe a decisão com ele.
- **Um trecho por vez, pelos segundos que ele cita** ("agora entre 20 s e 25 s", "o recibo e a lição"). Ele assiste antes de pedir o próximo. Não mexa em trecho aprovado sem avisar.
- **Cada versão fica guardada:** `gerar-vNN.mjs`, `versoes/index-vNN.html`, `renders/<nome>-vNN-bruto.mp4` e `-sem-musica.mp4`.
- **Referências inspiram, não são molde.** "O vídeo que te mostrei é apenas para referência, não para ser copiado." Tire os princípios (camadas, ritmo, pop-out) e monte uma identidade própria a cada vídeo. Um plano que copiava a referência foi descartado.
- **Prova real vale mais que ilustração.** Foram aprovados a v1 real do Reels 1, os testes reais dos avatares, as 14 regras reais, a gravação real da webcam e os quadros reais das 14 versões. Antes de desenhar uma ilustração, procure o arquivo verdadeiro.
- **Efeitos do tema de cada vídeo.** No Reels 2, o kit dos Reels anteriores (confete, flash, tremor, boom, caixa registradora) foi reprovado como "igual aos outros Reels". Os efeitos e sons nasceram do assunto (estúdio: obturador, foco, película, claquete, rebobinar, render), gerados por IA e escolhidos por medição.
- **Entrega com números:** o que mudou, por palavra; o que corrigiu nos quadros; `check`, LUFS, pico e movimento. Diga que o som foi medido, não ouvido.

## O que prende (o critério)

O critério é o de "um criador de conteúdo badass": o vídeo tem que fazer parar o scroll e segurar até o fim.

1. **O gancho é a parte mais importante.** Se o diretor disser "fraco", refaça a cena, não retoque. O que foi aprovado:
   - **Tela dividida só no gancho:** 60% em cima (texto) e 40% embaixo (vídeo de reação), com uma linha amarela na divisa.
   - **Número por extenso enquanto a voz lê:** "OITO MIL / DUZENTOS E / SETENTA E / DOIS REAIS" apagado desde o quadro 0; cada palavra acende quando é dita. Quando a voz termina, as linhas se fecham e o número em algarismos pousa com o soco mais forte do vídeo.
   - **Vídeo de reação específico ao tema** (dev diante da fatura), não espanto genérico. Uma referência gerada por IA funcionou; o melhor é o próprio criador filmado no celular. Congele o começo e o fim do vídeo para o gesto cair na palavra certa.
   - Foram recusados: caça-níquel girando, letreiro analógico, número pequeno parado no topo.
2. **Cada frase vira uma imagem concreta do que é dita**, e cada peça entra na palavra que a nomeia ("analista" → crachá, "carteira assinada" → carteira CLT, "Brasil" → pino). Um lead foi reprovado como "uma tela praticamente vazia com um fundo cheio de elementos aleatórios. Não representa nada".
3. **Algo novo a cada 3 a 5 s** e nada parado por mais de 1 s. Meta medida: movimento médio acima de 2, menos de 35% de quadros parados, maior trecho parado abaixo de 1 s (`scripts/medir-movimento.sh`).
4. **Sem elementos flutuando ao acaso no fundo.** Confete só como explosão no impacto, e some. As formas soltas do motor ficam desligadas depois do gancho.
5. **Vídeo no fundo de algumas cenas** (a virada "mas esse não é o dado mais estranho", um lado do duelo). O vídeo vem puro, sem texto gravado; a legenda de sempre, palavra por palavra, continua por cima. Prefira tela cheia nas viradas e deixe a tela dividida para o gancho.
6. **Não repita o gancho no lead.** No Reels 1, cortar a fala 2, que repetia o gancho em dólar, foi aprovado.
7. **Callback:** um objeto que volta muda de sentido (o cofre que zerou no orçamento volta cheio e "INTACTO" no CTA).
8. **Cena de prova vira ação:** "um máximo por mês" mostra três projetos ganhando o teto com o cursor; "decida antes" mostra o cursor escolhendo PARAR e a barra parando no teto.
9. **A tela não pulsa na batida.** Corte na batida pode; pulsar não.

## Reels com avatar (o padrão aprovado no Reels 2)

- **Rosto só onde importa.** Gancho, promessa, a pergunta que arma a virada, o twist, a frase de fechamento e o CTA. O resto são cenas sem rosto com interface cheia. O rosto sumiu de 13,5 s a 66 s, e a volta dele deu peso ao "não sou eu".
- **Layouts do rosto:** card de baixo com a cabeça saindo pela borda (pop-out) no começo do gancho e no CTA; **tela cheia sem moldura** a partir de 4 s (pedido do diretor: "não precisa estar dentro do frame"). Fundo clean (off-white, grade de pontos, luz quente atrás do assunto) no lugar do azul-noite.
- **HUD de câmera como assinatura:** REC, etiqueta CÂMERA e timecode no rosto. No twist, o REC para, o timecode congela e a etiqueta vira AVATAR, que segue AVATAR depois da revelação.
- **Plot twist:** silêncio de efeitos até a frase, glitch no "não sou eu", escaneamento no "é meu avatar", carimbo e rebobinar com quadros reais do próprio vídeo numa pausa de 0,8 s (`pausa` na fala). Detalhes no repertório.
- **Callbacks:** o baralho do hook volta no fechamento com os quadros reais; o escaneamento que criou o gêmeo volta no twist; o painel do estúdio volta pequeno no fecho; o card com pop-out volta no CTA.

## CTA (o padrão aprovado no Reels 1, v14)

- A marca bate grande no "Na <sua-marca>", o brilho passa e ela encolhe para o cabeçalho, onde fica até o fim.
- O produto é demonstrado na própria fala (no Reels 1: chaves com um selo de teto mensal, a chave que bate no teto e "PAROU", as chamadas que viram X, o saldo "INTACTO ✓"), com a etiqueta ILUSTRAÇÃO.
- Botão amarelo com a oferta (ex.: "TESTE GRÁTIS, SEM CARTÃO") que bate, é clicado pelo cursor e tem o brilho passando três vezes; "LINK NA BIO ↑" com a seta subindo e descendo até o fim.
- Rodapé com as condições da oferta. **Nunca** número de telefone pessoal na tela.
- **Variante "comenta PALAVRA" (Reels 2):** em vez de botão e link na bio, a palavra (ESTÚDIO) se monta grande letra por letra, um comentário de exemplo "@você · ESTÚDIO" ganha coração e chega a resposta na DM do perfil (`@seu.perfil`), com "COMENTA ESTÚDIO ↓ · LINK DO REPO NA DM" até o fim. A tela mostra a entrega concreta (o repositório das skills no GitHub, mandado por DM de forma manual). Pergunte **o que a pessoa recebe** antes de montar o CTA: sem isso, a chamada fica vaga.
- **Enquete no vídeo:** desenhada (SIM / NÃO, cursor passando pelos dois), sem porcentagem inventada. O sticker nativo do Instagram não foi usado.
- **Final com folga:** a última chamada fica cerca de 2 s na tela (`cauda` na última fala, seção 12 do motor).

## Legenda do post

- **Mini hook que não entrega e não proíbe.** "Assiste até o fim antes de abrir esta legenda" foi recusado: "é exatamente o que a pessoa vai fazer… o gatilho da curiosidade é um dos mais fortes". "Assista até o fim…" foi aprovado.
- **Nunca revele a virada na legenda.** Quem abre a legenda antes do fim não pode descobrir o twist por ela. Feche com uma pergunta que só faz sentido para quem viu tudo ("você percebeu antes da hora?") e repita o CTA do vídeo.
- Só fatos que estão no vídeo, sem número novo. Rascunho em `legenda-post.md` na pasta do projeto, para o diretor aprovar.

## Regras de conteúdo

- **Nenhum número inventado que pareça dado real.** Valor ilustrativo leva a etiqueta "ILUSTRAÇÃO"; sem fonte, use barra sem valor (o cofre do orçamento ficou sem reais porque a fonte não dizia o valor).
- **Fonte e data no rodapé** da cena que cita o dado (ex.: "TechCrunch, 02/06/2026, citando The Information.").
- **Fala relatada sem aspas** quando a fonte não traz a frase literal ("CTO DA UBER · contou em abril").
- **Logo de terceiro** (no Reels 1, o da Uber, do Wikimedia Commons) só na parte da notícia, longe da sua marca; avise o risco de marca.
- **Fatos de produto** só os provados; nada de comparação de preço com concorrente sem fonte.

## Voz

- ElevenLabs, uma fala por arquivo (`fala01.mp3`…), uma de cada vez, não em paralelo. Pergunte a voz a cada vídeo e anote o ID dela no projeto (`<SUA_VOZ_ID>`). Gere a fala 1 e espere o diretor ouvir antes das outras. Baixe os áudios logo: os links do ElevenLabs vencem em horas.
- **Fala a 1,2×** com `atempo=1.2` em `assets/audio/x12/`: o ritmo normal pareceu lento.
- Números por extenso no texto da voz; na tela, algarismos (token `{ d, s }`).
- Siglas e nomes estrangeiros podem sair errados. Com uma das vozes, "IA" saiu "ei-ai": escreva "inteligência artificial" na fala e deixe "IA" só na tela. Nomes estrangeiros vão grafados como se falam.
- Se o diretor apontar uma fala estranha, gere só aquela (guarde a anterior como `falaNN-v1.mp3`), mande o áudio para ele ouvir e só depois regere o vídeo.

## Som

- **Biblioteca base:** `assets/sfx/` do projeto, com variações de cada efeito (boom-a/b, carimbo-a/b, vira-cartao-a/b, hook-caixa-a/b, whoosh-short e as variações grave e aguda, pop, click, click-soft, error, chime, ping, notification, typing, glitch-2). Os arquivos de som não vêm neste repositório: gere ou baixe os seus com licença livre e mantenha esses nomes, que o `efeito()` usa para saber como alinhar.
- **O que funcionou no Reels 1:** a caixa registradora (`hook-caixa-b`) no pouso do número do gancho; boom no impacto principal de cada cena; carimbo; alarme (`error`) no "susto" e no "para"; ding (`chime`) no "intacto".
- **O que foi recusado:** o mesmo impacto grave em todo soco ("repetitivo"), som de caça-níquel e de letreiro enquanto o número rola ("ainda não gostei"), digitação longa.
- **Regras:** o som segue o que se vê; pico do whoosh e do impacto no quadro do evento (o `efeito()` faz isso); nada nos 0,5 s antes de um impacto; o maior soco é o do gancho; não repetir o mesmo arquivo em ~20 s.
- **No Reels 2, a biblioteca acima foi reprovada como "igual aos outros Reels".** Cada vídeo ganha sons do próprio tema, em `assets/sfx/tema/` (versões a/b de cada um, escolhidas pela medição). O `efeito()` alinha pelo pico os nomes `trailer`, `obturador` e `claquete`, além de `whoosh`, `boom` e `vira`.
- **Efeito novo:** gere num gerador de efeitos sonoros com IA (o Reels 2 usou o Magnific, de 8 a 10 créditos cada; 12 efeitos custaram 100), mande uma audição (`renders/audicao-*.mp3`) e espere o diretor escolher.
- **Música:** entregue `-sem-musica.mp4`; a música é escolhida no app do Instagram ao publicar.

## Mídia de fundo e de reação

- **Pexels:** busque e mostre as opções (link e descrição) **sem baixar**; baixar qualquer arquivo exige o OK do diretor.
- **Vídeo gerado por IA (ex.: Magnific):** confira o custo antes e diga o valor. O que funcionou: MiniMax H3 Max Turbo, 9:16 ou 16:9, 768p, 5 s por 200 créditos (10 s custam 400; o Seedance 2.5 em 1080p custaria 3.950). Prompt sem texto na imagem. Guarde o original como `*-magnific.mp4` (ou o nome do gerador).
- **Tratamento:** escala para 1080×1920 (ou a faixa do gancho, 1080×768), escurecido e puxado para a cor da marca, câmera lenta ou quadros congelados para casar com a fala; o comando está em `references/armadilhas.md` (seção Vídeo).

## O ciclo de cada trecho

1. Leia o trecho no vídeo atual (snapshot dos segundos citados) e diga o que acha.
2. Plano em tabela (palavra → imagem → som) e espere o sim.
3. `cp gerar.mjs gerar-vNN.mjs`. Se a fala ainda não tem `blocos`, acrescente (veja `references/motor.md`, seção 2) e imprima os tempos das marcas.
4. Escreva a cena num `.txt` e aplique com um `.cjs` (seção 11 do motor). Atualize o cabeçalho do script.
5. `node gerar.mjs` → `npx --yes hyperframes@0.9.46 check --json > .check.json` (0 erros; leia os avisos do trecho) → `npx --yes hyperframes@0.9.46 snapshot --at t1,t2,...` com 10 a 16 momentos do trecho **e 3 ou 4 de outras partes do vídeo** (elemento novo fora das cenas pode vazar para o vídeo todo) → **olhe a contact sheet** e recorte com ffmpeg o que parecer estranho. Corrija e repita. Erros do `check` em trechos já aprovados podem aparecer só porque as amostras mudam de tempo quando o vídeo cresce: confira se o trecho é antigo antes de mexer.
6. `cp index.html versoes/index-vNN.html` e render em segundo plano: `npx --yes hyperframes@0.9.46 render --quality looks --output renders/<nome>-vNN-bruto.mp4` (2 a 6 min).
7. `bash <pasta-da-skill>/scripts/finalizar.sh <nome>-vNN-bruto.mp4 <nome>-vNN-sem-musica.mp4` e `bash <pasta-da-skill>/scripts/medir-movimento.sh <nome>-vNN-sem-musica.mp4 <início> <fim>`.
8. Mande o vídeo para o diretor revisar (no app do Claude, até 30 MB chega bem ao celular). Acima de 30 MB, o `finalizar.sh` já gera a cópia `-celular.mp4` com crf 26 (2 min 11 s deu 25 MB): mande essa.
9. Registre a versão num `ESTADO.md` na pasta do projeto (o que mudou, armadilha nova), para a próxima sessão retomar dali.

A versão `0.9.46` do HyperFrames é a que foi usada nesses Reels. Num projeto novo, escolha a versão atual e mantenha a mesma até o fim do vídeo.

## Antes de entregar

- [ ] O gancho completo está na tela até 2,5 s, com o soco no pouso do número.
- [ ] Toda frase tem uma imagem que a representa; nenhum trecho de fala sem algo entrando.
- [ ] Sem formas flutuando ao acaso; vídeo de fundo sem texto gravado.
- [ ] Números ilustrativos com "ILUSTRAÇÃO"; fontes no rodapé; nenhum dado inventado.
- [ ] Legenda não cobre gráfico; nada essencial abaixo de 78% da altura.
- [ ] CTA com botão e "LINK NA BIO" (ou a variante "comenta PALAVRA" com a entrega na tela) e sem número pessoal.
- [ ] Snapshots de pontos do vídeo inteiro, não só do último trecho.
- [ ] Legenda do post sem spoiler da virada, aprovada pelo diretor.
- [ ] `check` com 0 erros; −14 LUFS ±0,5 e pico abaixo de −1 dBFS; movimento dentro da meta.
- [ ] Versão anterior guardada; nada publicado.
