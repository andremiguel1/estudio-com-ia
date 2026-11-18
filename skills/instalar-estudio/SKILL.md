---
name: instalar-estudio
description: Instalar e configurar o estúdio de vídeos com IA deste repositório no Claude Code, em Windows, macOS ou Linux. Confere o sistema, baixa e instala o que falta (Node 22+, ffmpeg/ffprobe, HyperFrames e o Chrome dele, as skills oficiais do HyperFrames e, se a pessoa quiser, o Python com o Whisper), copia as skills para `~/.claude/skills/` ou para o `.claude/skills/` de um projeto, oferece o setup opcional da voz (ElevenLabs) e do avatar (HeyGen) sem nunca pedir chave, e termina com um teste. Use quando a pessoa disser "instala as skills", "instala as skills do estúdio", "configura o estúdio", "como uso esse repositório", "acabei de clonar, e agora?", "falta o ffmpeg" ou "o estúdio não funciona", mesmo sem dizer "skill". NÃO use para fazer o vídeo (skill reels-narrado-hyperframes).
---

# Instalar o estúdio de vídeos

Quem chama esta skill acabou de clonar o repositório e quer o estúdio funcionando no Claude Code. **Você instala tudo o que faltar**: a pessoa só aprova a lista uma vez e faz os logins. Fale em português simples e mostre o progresso a cada item.

## Regras que valem em todos os passos

- **Uma aprovação para a lista inteira.** Antes de baixar qualquer coisa, mostre o que falta, de onde vem e o tamanho aproximado, e espere o "pode". Depois instale tudo em sequência, sem perguntar item por item. Os comandos do `winget` levam `--accept-package-agreements`: diga na lista que isso aceita os termos de cada pacote.
- **Só fontes oficiais:** winget, Homebrew, nvm, o próprio npm, uv (Astral) e os builds de ffmpeg indicados em ffmpeg.org. Nada de script de site desconhecido.
- **Sem `sudo`.** O Claude Code não consegue digitar a senha do computador. No Linux, use os caminhos sem `sudo` deste arquivo (nvm, ffmpeg estático em `~/.local/bin`, uv). Se só sobrar um caminho com senha, mostre o comando e peça para a pessoa rodar com `!` antes, no próprio Claude Code.
- **Nunca peça, leia, mostre nem digite chave de API ou senha.** Quando um serviço pedir login ou chave, explique onde a pessoa cola e deixe que ela faça. Se ela colar uma chave no chat, avise que ficou no histórico e sugira gerar outra no painel do serviço.
- **Não sobrescreva skill que já existe** com o mesmo nome sem mostrar e perguntar.
- No Windows, o Claude Code roda os comandos no Git Bash: use a sintaxe de Bash. Se o Claude Code está rodando no Windows, o Git Bash já está instalado.
- Rode as instalações demoradas (Chrome, Whisper) em segundo plano e siga com o próximo item enquanto isso.

## 1. Achar o repositório

1. Confira que a pasta atual é o clone: tem que existir `skills/reels-narrado-hyperframes/SKILL.md` e `skills/estilo-tipografia-cinetica/SKILL.md`. Se não existir, pergunte onde a pessoa clonou e use esse caminho como `<repo>` daqui para a frente.
2. Diga em uma linha o que vai acontecer: checar o computador, instalar o que faltar, copiar as skills, configurar voz e avatar se ela quiser, e testar.

## 2. Ver o que já existe

1. Sistema: `uname -s` (`Darwin` é macOS, `Linux` é Linux, `MINGW*`/`MSYS*` é Windows) e `uname -m` (`arm64`/`aarch64` ou `x86_64`). No Windows, confira `winget --version`; no macOS, `brew --version`.
2. Ferramentas:
   ```bash
   node --version          # precisa ser v22 ou mais
   ffmpeg -version | head -1
   ffprobe -version | head -1
   uv --version            # só se a pessoa quiser o Whisper
   ```
3. Pergunte só uma coisa agora: **quer o Whisper local?** Ele deixa a legenda cair exatamente em cada palavra (cerca de 1,5 GB com o modelo). Sem ele, o motor estima pelos silêncios.
4. Mostre a lista do que vai ser instalado, por exemplo:

| Item | Situação | Como vai ser instalado | Tamanho |
|---|---|---|---|
| Node.js 22+ | faltando (tem v18) | winget | ~30 MB |
| ffmpeg e ffprobe | ok (7.1) | — | — |
| HyperFrames + Chrome dele | vai baixar | npx | ~200 MB |
| Skills oficiais do HyperFrames | vai baixar | skills CLI | ~5 MB |
| Whisper local (opcional) | quer | uv + faster-whisper | ~1,5 GB |

   Espere o "pode".

## 3. Instalar o que falta

Instale nesta ordem e confira cada um logo depois (`--version`). Se um comando falhar, tente o caminho alternativo da mesma linha antes de desistir.

### Node.js 22+
| Sistema | Comando principal | Alternativa |
|---|---|---|
| Windows | `winget install --id OpenJS.NodeJS.LTS -e --silent --accept-package-agreements --accept-source-agreements` (o Windows pode abrir uma janela pedindo permissão: a pessoa clica em Sim) | baixar o instalador `.msi` em nodejs.org |
| macOS | `brew install node` | nvm, como no Linux |
| Linux | nvm, sem `sudo`: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh \| bash`, depois `. "$HOME/.nvm/nvm.sh" && nvm install 22` | — |

### ffmpeg e ffprobe
| Sistema | Comando principal | Alternativa sem gerenciador |
|---|---|---|
| Windows | `winget install --id Gyan.FFmpeg -e --silent --accept-package-agreements --accept-source-agreements` | baixar `https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip`, extrair e pôr a pasta `bin` em `~/.local/bin` |
| macOS | `brew install ffmpeg` | se não houver Homebrew: peça para a pessoa instalar o Homebrew (brew.sh; ele pede a senha do Mac, então é ela que roda) |
| Linux | build estático, sem `sudo`: baixar `https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz` (`-arm64-` em ARM), extrair e copiar `ffmpeg` e `ffprobe` para `~/.local/bin` | `sudo apt install ffmpeg`, rodado pela pessoa |

Quando usar `~/.local/bin`, confira se ele está no PATH; se não estiver, acrescente `export PATH="$HOME/.local/bin:$PATH"` ao `~/.bashrc` (ou `~/.zshrc`) e use o mesmo `export` na sessão atual.

**Depois do winget, o terminal atual não enxerga o comando novo.** Para continuar sem reiniciar, acrescente na sessão: `export PATH="$PATH:/c/Program Files/nodejs:$LOCALAPPDATA/Microsoft/WinGet/Links"`. Se ainda assim não achar, peça para a pessoa fechar e abrir o Claude Code e retome deste passo.

### HyperFrames e o Chrome dele
O HyperFrames (da HeyGen, Apache-2.0) é o motor que transforma HTML em vídeo. Ele roda pelo `npx`, sem instalação global:
```bash
npx --yes hyperframes --version         # baixa o CLI para o cache do npm
npx --yes hyperframes browser ensure    # baixa um Chrome só para ele (~150 MB)
npx --yes hyperframes doctor            # confere Node, ffmpeg, ffprobe e Chrome
```

### Whisper local (se a pessoa quis)
Pelo uv, que também baixa o Python certo, sem `sudo`:
| Sistema | Instalar o uv |
|---|---|
| Windows | `winget install --id astral-sh.uv -e --silent --accept-package-agreements --accept-source-agreements` |
| macOS | `brew install uv` |
| Linux | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |

```bash
uv venv "$HOME/.venvs/whisper" --python 3.12
uv pip install --python "$HOME/.venvs/whisper" faster-whisper numpy
```
O modelo `medium` baixa no primeiro uso da transcrição. Diga à pessoa como rodar: `~/.venvs/whisper/bin/python <skill>/scripts/transcrever.py ...` (no Windows, `~/.venvs/whisper/Scripts/python`). Em máquina mais fraca, `WHISPER_MODEL=small`.

## 4. Copiar as skills (global ou só num projeto)

1. Pergunte:
   - **Global** (`~/.claude/skills/`): as skills aparecem em qualquer pasta em que a pessoa abrir o Claude Code. É o mais simples.
   - **Só num projeto** (`<projeto>/.claude/skills/`): as skills só aparecem quando o Claude Code abre naquela pasta. Pergunte o caminho.
2. Confira se já existe pasta com o mesmo nome no destino. Se existir, mostre e pergunte se substitui, mantém ou renomeia a antiga com `-antiga`.
3. Copie as skills deste repositório:
   ```bash
   DEST="$HOME/.claude/skills"          # ou "<projeto>/.claude/skills"
   mkdir -p "$DEST"
   cp -r "<repo>/skills/reels-narrado-hyperframes" "<repo>/skills/estilo-tipografia-cinetica" "$DEST/"
   ```
   Pergunte se ela quer copiar também a `instalar-estudio` (útil para reinstalar ou consertar depois).
4. Instale as skills oficiais do HyperFrames no mesmo destino, direto da fonte (`heygen-com/hyperframes`), só para o Claude Code:
   ```bash
   # global
   npx --yes skills add heygen-com/hyperframes --skill '*' --agent claude-code -g -y --copy
   # só no projeto: rode dentro da pasta do projeto, sem o -g
   ```
   Se o `skills` falhar, use o instalador do próprio HyperFrames: `npx --yes hyperframes skills update`.
5. Liste o destino e confirme que cada pasta tem o seu `SKILL.md` (as do HyperFrames incluem `hyperframes`, `hyperframes-cli`, `hyperframes-registry` e `media-use`).

## 5. Voz: ElevenLabs (opcional)

Pergunte se ela vai narrar com voz de IA. Se sim, explique as três formas e deixe ela escolher:

- **Conector do ElevenLabs no Claude** (o mais simples, se a conta dela tiver): ela liga em claude.ai, em Configurações → Conectores, e faz o login lá.
- **Servidor MCP oficial do ElevenLabs** (`elevenlabs-mcp`, usa o `uv`; instale o uv como no passo 3 se ainda não tiver): ela pega a chave no painel do ElevenLabs e roda ela mesma o comando, com `!` antes, trocando o marcador. Mostre o comando com `<SUA_CHAVE>` e não preencha:
  ```bash
  claude mcp add elevenlabs -e ELEVENLABS_API_KEY=<SUA_CHAVE> -- uvx elevenlabs-mcp
  ```
- **API direta:** ela guarda a chave na variável de ambiente `ELEVENLABS_API_KEY` (no Windows: `setx ELEVENLABS_API_KEY "<SUA_CHAVE>"` num PowerShell e reabrir o terminal; no macOS/Linux: uma linha `export` no `~/.zshrc` ou `~/.bashrc`). O Claude nunca imprime o valor.

Depois, peça o ID da voz que ela quer usar (não é segredo) e sugira anotar num arquivo do projeto, no lugar de `<SUA_VOZ_ID>`. Para conferir sem gastar crédito, liste as vozes da conta.

## 6. Avatar: HeyGen (opcional)

Pergunte se ela quer aparecer em vídeo com um avatar (digital twin). Se sim, siga `skills/reels-narrado-hyperframes/references/avatar-heygen.md`:

1. Criar o twin pelo site da HeyGen ou pelo conector/MCP oficial da HeyGen (30 a 60 s de webcam e o consentimento, que ela mesma aceita).
2. Instalar o HeyGen CLI pela página oficial: você baixa e instala (no macOS e no Linux pelo script de instalação oficial; no Windows, o zip `heygen_v<versão>_windows_amd64.zip` da página de releases, com o `heygen.exe` em `~/.local/bin`). Confira com `heygen --version`.
3. Ela mesma faz `heygen auth login` (com `!` antes, no Claude Code) e cola a API key. Confira só com `heygen auth status`, que mostra o saldo, não a chave.
4. Avise que o avatar custa por segundo (no Reels de exemplo, 37 s de rosto custaram US$ 3,40) e que a API usa saldo pré-pago, separado do plano do site.

## 7. Teste final

1. Numa pasta temporária, crie um projeto de teste e confira:
   ```bash
   cd "$(mktemp -d)"
   npx --yes hyperframes init teste-estudio --skip-skills --non-interactive --resolution portrait
   cd teste-estudio
   npx --yes hyperframes check --json
   ```
   O JSON do `check` tem que trazer `"ok": true` (testado com a v0.9.65 num projeto em branco; o progresso sai no stderr, o JSON no stdout). Se a pessoa quiser ver um vídeo de verdade, rode `npx --yes hyperframes render --quality draft --output teste.mp4` (de 1 a 3 min) e mande o arquivo.
2. Se instalou o Whisper, confira com `~/.venvs/whisper/bin/python -c "import faster_whisper; print('ok')"` (no Windows, `Scripts/python`).
3. Confira que as skills aparecem no Claude Code: peça para a pessoa digitar `/` e procurar `reels-narrado-hyperframes` e `estilo-tipografia-cinetica`, ou perguntar "quais skills você tem?". Se não aparecerem, ela fecha e abre o Claude Code (as skills são lidas ao abrir a sessão), na pasta certa no caso da instalação por projeto.
4. Apague a pasta de teste.

## 8. Fechar

Mostre um resumo: o que já existia, o que foi instalado (com a versão) e onde, o que ficou opcional e de fora, e o primeiro passo para o primeiro vídeo:

> Abra o Claude Code na pasta onde vai guardar os vídeos e diga: "faz um Reels sobre <assunto>, com narração". A skill `reels-narrado-hyperframes` vai propor o roteiro e o plano do gancho antes de animar qualquer coisa.
