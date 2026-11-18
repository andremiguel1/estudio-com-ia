# Estúdio de vídeos com IA para o Claude Code

Skills que transformam o Claude Code num estúdio de Reels narrados: ele escreve o roteiro e a animação, gera a narração, sincroniza a legenda palavra por palavra, monta o rosto do seu avatar só nos trechos em que ele importa e entrega o vídeo medido (ritmo, volume, picos).

As regras daqui saíram de dois Reels reais, revistos versão por versão: um de 14 versões e outro de 16. Cada erro corrigido virou uma regra na skill, para não se repetir no vídeo seguinte.

## Como o estúdio funciona

| Peça | O que faz | Obrigatória? |
|---|---|---|
| [Claude Code](https://claude.com/claude-code) | escreve o roteiro, o plano de cada cena e o código da animação; roda as medições | sim |
| [HyperFrames](https://github.com/heygen-com/hyperframes) | transforma HTML + GSAP em vídeo, quadro a quadro | sim |
| ffmpeg | mede as falas, trata os vídeos e finaliza o MP4 | sim |
| [ElevenLabs](https://elevenlabs.io) | gera a narração (voz da biblioteca ou o seu clone de voz) | não, mas é o caminho testado |
| Whisper local ([faster-whisper](https://github.com/SYSTRAN/faster-whisper)) | acha o tempo exato de cada palavra para a legenda | não |
| [HeyGen](https://www.heygen.com) | gera o seu avatar (digital twin) falando, nos trechos com rosto | não |

## As skills

| Skill | Para que serve |
|---|---|
| `skills/reels-narrado-hyperframes/` | O processo completo de um Reels 9:16 narrado: plano antes de animar, um trecho por vez, gancho em tela dividida, uma imagem concreta por frase, algo novo a cada 3 a 5 s, sons alinhados pelo pico, CTA ("link na bio" ou "comenta PALAVRA"), avatar com a cabeça saindo do card e plot twist. Traz os dois motores (`modelo/gerar.mjs` e `modelo/gerar-avatar.mjs`), os scripts de finalização (−14 LUFS) e de medida de movimento, e as armadilhas já vistas. |
| `skills/estilo-tipografia-cinetica/` | O estilo visual: a legenda é o próprio vídeo, um cursor de "agente" opera mini-interfaces, uma só cor de destaque e um elemento novo a cada segundo. Traz os números (ritmo, tamanhos, curvas) e o `oficio-motion.md` com o ofício de motion e as armadilhas do HyperFrames. |
| `skills/instalar-estudio/` | Instala e configura tudo, conversando com você: confere o sistema, baixa e instala o que faltar (Node, ffmpeg, HyperFrames e o Chrome dele, Whisper se você quiser), copia as skills, instala as skills oficiais do HyperFrames, configura voz e avatar se você quiser e faz um teste. |

As skills oficiais do HyperFrames (`hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use` e outras) são da HeyGen e não estão neste repositório. A `instalar-estudio` instala direto da fonte oficial.

## Instalação rápida

1. Clone o repositório e abra o Claude Code dentro dele:
   ```bash
   git clone https://github.com/<usuario>/<repositorio>.git
   cd <repositorio>
   claude
   ```
2. Peça: **"instala as skills do estúdio"**. O Claude confere o seu computador, mostra a lista do que falta e, depois do seu OK, baixa e instala tudo sozinho (winget no Windows, Homebrew no macOS, sem `sudo` no Linux). Você só faz os logins da voz e do avatar, se quiser usá-los.

### Ou copie à mão

Global (as skills valem em qualquer pasta), no macOS, Linux ou Git Bash:

```bash
mkdir -p ~/.claude/skills
cp -r skills/reels-narrado-hyperframes skills/estilo-tipografia-cinetica ~/.claude/skills/
```

No Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse skills\reels-narrado-hyperframes, skills\estilo-tipografia-cinetica "$HOME\.claude\skills\"
```

Só num projeto: copie as mesmas pastas para `<seu-projeto>/.claude/skills/`.

Depois instale as skills oficiais do HyperFrames:

```bash
npx hyperframes skills update
```

Abra o Claude Code de novo para ele ler as skills novas.

## Pré-requisitos

A `instalar-estudio` instala os que faltarem. Se for fazer à mão, você precisa de:

- **Node.js 22 ou mais** (o HyperFrames exige).
- **ffmpeg e ffprobe** no PATH.
- **Windows:** Git for Windows (o Claude Code usa o Git Bash, e os scripts `.sh` rodam nele).
- **Opcional:** Python 3.10+ para o Whisper local; conta no ElevenLabs para a voz; conta na HeyGen com API para o avatar.

Confira tudo de uma vez com `npx hyperframes doctor`.

## Primeiro vídeo

Abra o Claude Code na pasta onde vai guardar os vídeos e diga, por exemplo: *"faz um Reels de 60 segundos sobre <assunto>, com narração"*. A skill vai propor o roteiro e o plano do gancho antes de animar qualquer coisa, e vai pedir a sua aprovação trecho por trecho.

## O que não vem aqui

- **Arquivos de som, vídeos, fotos e o avatar.** Os motores esperam os seus arquivos em `assets/` (os nomes estão em `skills/reels-narrado-hyperframes/references/motor.md`). Use material seu ou com licença livre.
- **Chaves de API.** Nenhuma skill pede a sua chave: você faz o login em cada serviço.

## Custos

HyperFrames e Whisper rodam no seu computador, sem custo. ElevenLabs, HeyGen e geradores de vídeo ou som por IA são pagos e cobram por uso. Os valores medidos nos Reels de exemplo estão nas skills (por exemplo, 37 s de avatar na HeyGen custaram US$ 3,40 em novembro de 2026). As skills mandam dizer o custo antes de gerar.

## Créditos e licenças de terceiros

- **HyperFrames**, da HeyGen, licença Apache-2.0: [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes). As skills oficiais dele são instaladas da fonte, não redistribuídas aqui.
- **`skills/estilo-tipografia-cinetica/oficio-motion.md`**: partes adaptadas de [LeiteZ/fluxo-de-edicao](https://github.com/LeiteZ/fluxo-de-edicao), de Lucas Leite, licença MIT. O aviso de licença original está no fim do arquivo.
- **GSAP** (carregado pelo CDN jsDelivr nos motores): segue a licença do GSAP, em [gsap.com](https://gsap.com).
- **faster-whisper** (MIT), **ffmpeg** (LGPL/GPL), **ElevenLabs** e **HeyGen** são de seus respectivos autores e seguem os termos de cada um.
- Os exemplos citam notícias públicas (fontes no rodapé de cada cena) e o logo de terceiros só como referência ao fato noticiado.

## Licença deste repositório

MIT: veja o arquivo [LICENSE](LICENSE). O `oficio-motion.md` também é MIT, com o aviso do autor original no fim do arquivo. O HyperFrames e os serviços citados seguem as licenças e os termos de cada um.
