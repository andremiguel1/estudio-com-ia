# Repertório: que imagem cada tipo de frase virou

Duas tabelas: o Reels 1 ("o teto da Uber", azul-noite, sem rosto) e, mais adiante, o Reels 2 ("meu estúdio de vídeos com IA", fundo claro, com avatar).

Do Reels 1 ("o teto da Uber"), versões aprovadas pelo diretor. Use como ponto de partida, não como molde: a imagem nasce do que a frase diz. Os tempos de cada cena estão no `modelo/gerar.mjs` (blocos `// 1. Gancho` a `// 7. CTA`).

| Tipo de frase | Exemplo do Reels 1 | O que apareceu | Som |
|---|---|---|---|
| **Número-choque no gancho** | "Oito mil duzentos e setenta e dois reais por mês." | Tela dividida 60/40; extenso acendendo palavra a palavra em cima, reação embaixo; o R$ 8.272 pousa no fim | `hook-caixa-b` no pouso |
| **Negação** | "Não é salário." | Contracheque "SALÁRIO DE DEV" chega e leva um X carimbado | whoosh grave + `carimbo-b` |
| **Revelação** | "É o teto de UMA ferramenta de IA na Uber." | O cartão vira e mostra "1 FERRAMENTA DE IA · TETO DA UBER" com o logo; mergulho na foto | `vira-cartao-b` |
| **Comparação** | "Agora compara: um analista... ganha R$ 7.500. Só uma ferramenta já passa esse salário." | Duelo em tela dividida: DEV (vídeo) x IA; cada palavra traz uma peça (curva da mediana, crachá, carteira CLT, pino BRASIL, valor); a barra da IA rompe a linha dos R$ 7.500 no "passa" | `boom-b` no VS, `click-soft` por peça, `boom-a` no "passa" |
| **Virada** | "Mas esse não é o dado mais estranho dessa história." | Vídeo em tela cheia (escritório à noite, monitores azuis), legenda grande com glitch | `glitch-2` curto |
| **Incentivo / escala** | "A Uber incentivou todo mundo a usar IA ao máximo, com ranking interno." | Mergulho no monitor do vídeo; 24 crachás em três levas; medidor cujo ponteiro estoura no "máximo"; placar com trocas de posição e coroa | `pop` por leva, whoosh grave no "máximo", `chime` na coroa |
| **Tempo passando / dinheiro acabando** | "Em abril, o CTO contou: o orçamento de IA do ano inteiro já tinha acabado. Em quatro meses." | Calendário arrancando JAN a MAR; selo "CTO DA UBER · contou em abril"; cofre escoando um mês por batida; carimbo "R$ 0"; MAI a DEZ rachando; "4 MESES" pousa | `click-soft` por mês, `carimbo-b`, `boom-b` |
| **Antes x depois** | "E o teto? Só veio depois do susto. E isso tem uma lição para o seu projeto." | Fatura da Uber passa da linha "TETO ?" e o excesso fica vermelho; alarme; só depois o teto bate ("DEPOIS"); entra "SEU PROJETO" com o teto já no lugar ("ANTES") e check | `error` no susto, `boom-a` 0,55 s depois |
| **Lista de regras** | "Três regras... Um... Dois... Três..." | Checklist com as linhas desfocadas vira indicador 1 2 3; cada regra é feita na prática (projetos ganham teto; quatro avisos semanais; painel em que o cursor escolhe PARAR e a barra para); no fim, o checklist volta completo e legível (o quadro para salvar) | `click-soft` por linha, `ping`/`notification` por aviso, `boom-a` no teto |
| **CTA com produto** | "Na <sua-marca>, cada chave tem o seu teto em reais. Chegou nele, a chave para, e o seu saldo fica intacto. Teste grátis, sem cartão. Link na bio." | Marca bate e vira cabeçalho; três chaves com selo "TETO R$ 50/mês" (ILUSTRAÇÃO); a Ferramenta C bate no teto: cadeado, "PAROU", chamadas viram X; cofre volta cheio com "INTACTO ✓"; botão com brilho; seta da bio | `pop`, whoosh agudo, `click-soft`, `error`, `chime`, `boom-b` |

## Padrões que se repetem

- **Peça por palavra:** cada substantivo forte da frase entra na hora em que é dito.
- **O soco no fim da frase:** a palavra-chave pousa com `slam`, tremor, flash curto e confete, tudo no mesmo quadro.
- **Fazer em vez de listar:** regra, recurso ou dica vira uma ação na tela, com o cursor.
- **Volta ao começo:** o fecho de uma lista mostra o quadro completo, que dá vontade de salvar.
- **Contraste de cor:** azul é o normal, amarelo é o destaque e o teto, rosa é o problema (excesso, PAROU), verde é o resultado bom (INTACTO).

## Reels "meu estúdio de vídeos com IA" (17 e 18/11/2026, aprovado na v16)

| Tipo de frase | Exemplo | O que apareceu | Som (tema) |
|---|---|---|---|
| **Gancho com número de versões** | "precisou de catorze versões para ficar bom" | Card de baixo com a cabeça saindo pela borda; cartão v1 vira um baralho de película v1 a v14; o 14 pousa e o foco trava; a partir de 4 s, rosto em tela cheia com três palpites riscados | `trailer-b` no 14, `foco-b` |
| **Ferramentas juntas** | "três ferramentas… HyperFrames, ElevenLabs, Whisper" | Três encaixes que acendem um a um, terminal com `</>` em cada um, selo LOCAL | `timeline`, `teclado-b`, `claquete-b` |
| **Resultado ruim** | "montado… e péssimo" | Timeline de edição cheia (trilhas VÍDEO, VOZ, LEGENDA), RENDERIZAR clicado, notificação "⚠ 1 problema", exportação de 0 a 100%, celular com a v1 real e carimbo PÉSSIMO | `render-a`, `trailer-a` |
| **Diagnóstico** | "monótono, sem ritmo" | A v1 ao lado do painel ANÁLISE (movimento 0,52, 75% parados, tira de quadros reais, 0,6 s cinza com ⏸) | `rec-a` pulsando |
| **Estratégia** | "parar de corrigir na mão e ensinar o sistema" | Chave CORRIGIR NA MÃO → ENSINAR O SISTEMA; quatro celulares com o mesmo erro levam X por palavra; a correção é arrastada para o `SKILL.md`, que cresce | `obturador-b`, `teclado-b`, `claquete-a` |
| **Testes que deram errado** | "Testei alguns avatares. Um inventou um desenho na camiseta…" | Dois monitores com os testes reais; zoom no defeito, círculo ou caixa rosa e ✕ | `foco-a/b`, `claquete` |
| **Processo real** | "Gravei 45 segundos na webcam e ele criou meu gêmeo digital" | Painel de etapas (Gravar, Consentimento, Treinar); gravação real acelerada com REC e cronômetro até 0:45; moldura tracejada esperando o gêmeo; escaneamento e a cópia que desce e vira GÊMEO DIGITAL | `rec-a`, `timeline-b`, `render-a` |
| **Plot twist** | "quem está falando com você neste momento não sou eu. É meu avatar." | Push-in lento e nenhum efeito; cantoneiras no rosto; REC para e timecode congela; glitch no "não sou eu"; escaneamento, CÂMERA → AVATAR e carimbo no "avatar"; rebobinar com três quadros reais do próprio vídeo, cada um com AVATAR | silêncio, `glitch-2`, `render-b`, `claquete-b`, `rebobinar-b` |
| **Problema técnico resolvido** | "deixava a boca fora de sincronia… troquei o motor… resolvi" | Celular com o teste real do Avatar IV e zoom na boca; painel SINCRONIA (trilhas VOZ e BOCA que se desalinham e depois encaixam); seletor IV → V clicado; IDENTIFICADO ✓; REGRA 15 voa para o `SKILL.md` | `rebobinar-a`, `obturador-b`, `render-a`, `foco-b` |
| **Ressignificar o número** | "catorze versões não representam catorze tentativas perdidas" | O baralho do hook volta com os quadros reais das 14 versões; PERDIDA? em cascata; as faixas caem; cada versão vira uma linha do `SKILL.md`; NÃO SE REPETE ✓ | `projetor-a/b`, `teclado-a`, `claquete-b` |
| **Contraste de conceitos** | "gerar vídeos com IA e construir um estúdio" | Rosto em tela cheia; chip cinza GERAR à esquerda, chip amarelo CONSTRUIR à direita; painel do estúdio volta pequeno; GERAR apaga e o foco trava no CONSTRUIR | `claquete-a`, `render-b`, `foco-a` |
| **CTA com palavra** | "você percebeu…? …comenta ESTÚDIO" | Card com pop-out; enquete SIM/NÃO; repositório no GitHub com as três skills; ESTÚDIO letra por letra; comentário com coração e resposta na DM | `rec-a`, `teclado-b`, `trailer-a`, `render-a` |

### Padrões do Reels 2
- **Interface cheia que executa a frase** em toda cena sem rosto, palavra por palavra (o painel pequeno com o centro vazio foi reprovado).
- **Prova real no lugar de ilustração:** v1 real, testes reais, gravação real, quadros reais.
- **Callback muda o sentido:** o baralho das 14 versões abre como "quanto trabalho" e fecha como "14 aulas para o sistema".
- **O rosto some e volta:** a ausência longa dá peso à volta e ao twist.
- **Cores com significado:** amarelo destaca, rosa marca problema, verde marca resolvido, azul é sistema e escaneamento.
