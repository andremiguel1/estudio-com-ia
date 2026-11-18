# Avatar na HeyGen (os trechos com rosto)

Usado no Reels 2 ("Meu estúdio de vídeos com IA", 17 e 18/11/2026): digital twin criado a partir de 45 s de webcam, seis clipes (H1 a H6) gerados só onde o rosto aparece e montados no HyperFrames com a cabeça saindo do card. Anote os seus IDs (avatar, visual, voz) num arquivo do projeto que **não** vai para repositório público.

## 1. Setup (uma vez)
- **Gere pelo HeyGen CLI com API key, não pelo MCP.** O MCP da HeyGen usa o plano da conta e bate no limite mensal de vídeo de avatar. Ele serve para criar o digital twin e consultar avatares.
- **Instalação do CLI:** pela página oficial do HeyGen CLI. No macOS e no Linux há um script de instalação; no Windows, baixe o zip `heygen_v<versão>_windows_amd64.zip` da página de releases e ponha o `heygen.exe` numa pasta do PATH (a v0.12.1 funcionou).
- **Login:** você mesmo roda `heygen auth login` e cola a sua API key. O Claude não pede nem digita a chave. A API usa o saldo pré-pago ("wallet"), separado do plano. `heygen auth status` mostra o `remaining_balance`.
- Em todo comando: `export HEYGEN_NO_ANALYTICS=1` (no PowerShell: `$env:HEYGEN_NO_ANALYTICS = "1"`).

## 2. Criar o digital twin (MCP ou site)
1. Grave de 30 a 60 s na webcam, olhando para a câmera, com fala natural (16:9 serve; o twin herda o fundo e a roupa).
2. Upload: se o widget de upload do MCP não aparecer, use o asset batch direto (`create_asset_upload_batch` → PUT do arquivo → `complete_asset_batch`).
3. `create_avatar_consent` → você abre o link e aceita → `create_digital_twin` com o seu nome → acompanhe com `get_avatar_group` até ficar pronto.
4. Visuais ("looks"): `show_avatar_looks` mostra as opções; escolha pelo ID. Visual gravado na horizontal em 9:16 precisa de `"fit":"cover"`.

## 3. A voz entra como áudio, nunca como voice_id
- O voice_id do ElevenLabs **não funciona** na HeyGen (`404 voice_not_found`). Gere a fala no ElevenLabs (com a sua voz clonada, `<SUA_VOZ_ID>`) e passe o áudio para a HeyGen.
- **Prefira `audio_asset_id` a `audio_url`:** o link assinado do ElevenLabs expira em cerca de 3 h. Suba o mp3 com `heygen asset create --file H1.mp3` e use o ID.
- **Use o mesmo áudio da edição:** se o vídeo usa a fala a 1,2×, corte o trecho do avatar do arquivo **já acelerado** (`assets/audio/x12/`). O lipsync sai casado com a voz final.

## 4. Gerar só onde o rosto importa
Avatar custa por segundo. Corte o roteiro em trechos com rosto (gancho, promessa, a pergunta, a virada, o fechamento, o CTA) e deixe o resto para cenas sem rosto. No Reels 2 foram 6 trechos e cerca de 37 s de avatar num vídeo de 2 min 11 s, por US$ 3,40. O rosto sumir por um tempo e voltar também faz o espectador sentir falta dele antes da virada.

```bash
export HEYGEN_NO_ANALYTICS=1
heygen video create --idempotency-key "meu-reels-H1-v1" -d '{"type":"avatar","avatar_id":"<SEU_LOOK_ID>","audio_asset_id":"<ASSET_ID>","aspect_ratio":"16:9","resolution":"1080p","engine":{"type":"avatar_v"},"title":"Reels - H1"}'
heygen video get <video_id>                          # até status completed
heygen video download <video_id> --output-path assets/video/heygen/H1.mp4
```
- `--idempotency-key` evita pagar duas vezes se o comando for repetido.
- `heygen video create --request-schema` mostra todos os campos da versão instalada.

## 5. Qual motor
| Motor | `engine.type` | O que se viu (17/11/2026) |
|---|---|---|
| Avatar V | `avatar_v` | **Padrão.** "Soa mais natural, parece que sou eu mesmo falando." |
| Avatar 6 Pro | `heygen-avatar-6` | Bom, mas "forçou um pouco no entusiasmo". Com `"motion_expressiveness":"less"` **dentro de `engine`** ficou contido; foi o usado no Reels 2 (16:9, 1080p). |
| Avatar IV | omitir `engine` | **Lipsync ruim.** É o padrão da API quando `engine` não é passado. Sempre passe `engine`. |

Para comparar motores, gere o mesmo trecho curto (de 5 a 10 s) em cada um e escolha assistindo.

## 6. Preparar os clipes para a edição
- **Formato:** 16:9 em 1080p dá folga para enquadrar o rosto em tela cheia 9:16 (escala de cerca de 1,9× com `object-fit:cover`) e em card.
- **Alinhar com a voz:** a cena do HyperFrames começa 0,15 s antes da fala. Preencha o começo com 0,15 s congelado e o fim com cerca de 2 s (`H1p`):
  `ffmpeg -i H1.mp4 -vf "tpad=start_duration=0.15:start_mode=clone:stop_mode=clone:stop_duration=2.2" -an -c:v libx264 -crf 18 -pix_fmt yuv420p H1p.mp4`
  Antes, confira onde a voz começa no clipe (`silencedetect=noise=-38dB:d=0.05`): se o clipe entra num corte que já está 0,1 s antes da palavra e a voz começa em 0,1 s, ele não precisa de preenchimento no começo.
- **Cabeça saindo do quadro (pop-out):** o fundo do twin é o real, não verde. O recorte sai de `npx --yes hyperframes@0.9.46 remove-background H1.mp4 -o H1.webm --quality best --device cpu` (cerca de 6,5 min por 6 s na CPU). Preencha o webm sem perder o alfa: `ffmpeg -c:v libvpx-vp9 -i H1.webm -vf "tpad=..." -c:v libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0 -b:v 2M H1p.webm`. Sem o `-c:v libvpx-vp9` **antes** do `-i`, o decoder ignora a transparência.
- **Não repita o mesmo clipe com os mesmos gestos:** se um trecho já apareceu (mesmo mudo, como ilustração), use outro intervalo do clipe ou outro teste.

## 7. Custos medidos (17/11/2026)
- 6 clipes de cerca de 37 s em 16:9 1080p no Avatar 6 Pro: **US$ 3,40**. Testes 9:16 de 24 s: cerca de US$ 2,30 cada.
- Diga o custo estimado antes de gerar e o saldo depois (`heygen auth status`).

## 8. Armadilhas
- `engine` omitido cai no Avatar IV (API) ou no Avatar 6 Turbo (MCP).
- `motion_expressiveness` fora de `engine` é ignorado.
- `audio_url` do ElevenLabs vencido gera vídeo com erro; use `audio_asset_id`.
- O teste com lipsync ruim pode virar prova no próprio vídeo ("o motor deixava a boca fora de sincronia"). Guarde os testes em `assets/video/testes-avatar/`.
- O twist "não sou eu, é meu avatar" funcionou porque o rosto apareceu como câmera real até ali (etiqueta CÂMERA no HUD).
