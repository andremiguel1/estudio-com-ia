// Gera o index.html do Reels "Meu estúdio de vídeos com IA", versão 16: + CTA (fala 13), rosto H6 no card de baixo com pop-out, enquete,
// repositório das skills, ESTÚDIO e a resposta na DM de @seu.perfil (link do repo no GitHub por DM, manual).
// Versão 15: + fechamento (fala 12) com as 14 versões reais e o rosto (H5);
// o gêmeo da fala 9 passa a ser o teste do Avatar IV de 12 a 19 s (gemeo2.mp4), para não repetir o H5.
// Versão 14: + "O último aprendizado" (fala 11), testes reais Avatar IV x V.
// Versão 13: + plot twist (fala 10), rosto H4, glitch, AVATAR e rebobinar.
// Versão 12: + "O gêmeo digital" (fala 9), webcam real e gêmeo (H5 mudo).
// Versão 11: + "O apresentador" (fala 8), com o rosto de volta (H3).
// Versão 10: + "As regras" (fala 7).
// Versão 9: + "A estratégia" (fala 6).
// Versão 8: + primeira virada (fala 5), com b-roll do Magnific.
// Versão 7: "montado… e péssimo" refeito como tela de edição cheia.
// Versão 6: + "montado… e péssimo" (fala 4), com a v1 real.
// Versão 5: + "O estúdio" (fala 3), sem rosto.
// Versão 4: hook aprovado (v3) + promessa (fala 2).
// Versão 3: a partir de 4 s, talking head em tela cheia, sem moldura.
// Versão 2: hook refeito com fundo claro, cabeça saindo do card
// (pop-out) e efeitos visuais e sonoros do tema estúdio de vídeo (pedido do diretor em 17/11/2026).
// Versão 1: só o hook (fala 1), no azul-noite, com o kit de efeitos dos Reels anteriores.
// v1b: correções do check (sobreposição do v14, tempo do cronômetro, área segura, HUD do visor no rosto cheio).
// Motor: gerar.mjs de um Reels anterior (v4), que vem do modelo da skill reels-narrado-hyperframes, com tempo de palavra pelo Whisper.
// Plano aprovado: roteiro-anotado-v1.md (17/11/2026). Identidade própria: azul-noite e amarelo, rosto sempre dentro do VISOR
// de câmera de estúdio, cartão ERRO que vira REGRA e entra no SKILL.md.
// Uso: node gerar.mjs            (vídeo inteiro com as falas já construídas)
//      TRECHO=1 node gerar.mjs   (só as N primeiras falas, para revisar um trecho por vez)
import { execFileSync, spawnSync } from 'node:child_process';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';

const LEAD = 0.25, GAP = 0.25, TAIL = 1.6;
const AUDIO = 'assets/audio/x12/';
const MUSICA = existsSync('assets/audio/trilha.mp3') ? 'assets/audio/trilha.mp3' : null;
const IA = { d: 'inteligência artificial', s: 'inteligência artificial' };

// Token: 'palavra' com prefixos * (chip), ~ (itálico serifado), ! (explosão) e sufixo @marca,
// ou { d: 'na tela', s: 'falado', hl, cls, m, wn }.
const TODAS = [
  // fala01 (hook): Um Reels meu, de um minuto, precisou de catorze versões para ficar bom. E o motivo não foi o que você imagina.
  { arq: 'fala01.mp3', paginas: [
    ['Um@um', 'Reels@reels', 'meu,'],
    ['de', 'um', 'minuto,@minuto'],
    ['precisou@precisou', 'de', { d: '14', s: 'catorze', m: 'catorze' }],
    ['*versões@versoes', 'para', 'ficar', 'bom.@bom'],
    ['E', 'o', 'motivo@motivo'],
    ['não@nao', 'foi@foi', 'o', 'que@que', 'você', '~imagina.@imagina'] ] },
  // fala02 (promessa): Eu montei um estúdio de produção de vídeos dentro do Claude Code. E vou mostrar como ele transforma cada erro
  // em uma regra para o próximo vídeo. (o Whisper ouve "Cloud Code": o token de duas palavras usa wn: 2)
  { arq: 'fala02.mp3', paginas: [
    ['Eu', 'montei', 'um', 'estúdio@estudio', 'de', 'produção', 'de', 'vídeos@videos'],
    ['dentro@dentro', 'do', { d: 'Claude Code.', s: 'Claude Code', m: 'claude', wn: 2 }],
    ['E@e2', 'vou', 'mostrar@mostrar', 'como', 'ele', 'transforma@transforma'],
    ['cada', '*erro@erro', 'em', 'uma', '*regra@regra'],
    ['para', 'o', 'próximo@proximo', 'vídeo.'] ] },
  // fala03 (o estúdio): São três ferramentas trabalhando juntas. O HyperFrames cria a estrutura visual e as animações do vídeo.
  // O Claude Code escreve tudo. O ElevenLabs gera a narração. E o Whisper, rodando localmente, sincroniza as legendas com cada palavra.
  // (o Whisper ouve "Cloud Code" e "Eleven Labs": tokens de duas palavras com wn: 2)
  { arq: 'fala03.mp3', paginas: [
    ['São', '*três@tres', 'ferramentas', 'trabalhando', 'juntas.@juntas'],
    ['O', 'HyperFrames@hyper', 'cria'], ['a', 'estrutura@estrutura', 'visual'], ['e', 'as', 'animações@anima', 'do', 'vídeo.'],
    ['O', { d: 'Claude Code', s: 'Claude Code', m: 'claude3', wn: 2 }, 'escreve', '*tudo.@tudo'],
    ['O', { d: 'ElevenLabs', s: 'ElevenLabs', m: 'eleven', wn: 2 }, 'gera', 'a', 'narração.@narracao'],
    ['E', 'o', 'Whisper,@whisper', 'rodando', 'localmente,@local'],
    ['sincroniza@sinc', 'as@w1', 'legendas@w2', 'com@w3', 'cada@w4', 'palavra.@w5'] ] },
  // fala04: Pronto. O estúdio estava montado. Mas tinha um problema: o primeiro vídeo ficou pronto rapidamente... e ficou péssimo.
  { arq: 'fala04.mp3', paginas: [
    ['Pronto.@pronto'], ['O', 'estúdio', 'estava', 'montado.@montado'], ['Mas@mas', 'tinha', 'um', '*problema:@problema'],
    ['o', 'primeiro', 'vídeo@video4', 'ficou'], ['pronto', 'rapidamente…@rapido'], ['e', 'ficou', '*péssimo.@pessimo'] ] },
  // fala05 (primeira virada): Monótono, sem ritmo e com momentos em que simplesmente nada acontecia na tela. Foi aí que percebi
  // o verdadeiro problema: o Claude Code não carregava automaticamente as correções que eu tinha feito na sessão anterior.
  { arq: 'fala05.mp3', paginas: [
    ['*Monótono,@monotono', 'sem', 'ritmo,@ritmo'], ['e', 'com', 'momentos@momentos', 'em', 'que'],
    ['simplesmente', 'nada@nada', 'acontecia@acontecia', 'na', 'tela.@tela'], ['Foi@foi5', 'aí', 'que', 'percebi@percebi'],
    ['o', '*verdadeiro@verdadeiro', '*problema:@problema5'], ['o', { d: 'Claude Code', s: 'Claude Code', m: 'claude5', wn: 2 }, 'não@nao5', 'carregava@carregava'],
    ['automaticamente', 'as', 'correções@correcoes'], ['que', 'eu', 'tinha', 'feito@feito'], ['na', 'sessão@sessao', 'anterior.@anterior'] ] },
  // fala06 (a estratégia): Então mudei a estratégia. Em vez de corrigir o mesmo erro em todo (o) vídeo, comecei a transformar cada
  // correção em uma skill: um arquivo com regras permanentes de produção. (a voz diz "em todo o vídeo")
  { arq: 'fala06.mp3', paginas: [
    ['Então,', 'mudei@mudei', 'a', 'estratégia.@estrategia'], ['Em', 'vez', 'de', 'corrigir@corrigir'], ['o', 'mesmo@mesmo', 'erro@erro6'],
    ['em', 'todo@todo', 'o', 'vídeo,@video6'], ['comecei@comecei', 'a', 'transformar@transformar'], ['cada', 'correção@correcao'],
    ['em', 'uma', '*skill:@skill'], ['um', 'arquivo@arquivo', 'com', 'regras@regras'], ['*permanentes@permanentes', 'de', 'produção.@producao'] ] },
  // fala07 (as regras): Fala mais rápida. Nenhum segundo de tela parada. Gancho sempre completo na abertura. Cada erro virava uma
  // regra. E o próximo vídeo já começava com o aprendizado dos anteriores.
  { arq: 'fala07.mp3', paginas: [
    ['Fala@fala7', 'mais', 'rápida.'], ['Nenhum@nenhum', 'segundo', 'de', 'tela', 'parada.@parada'], ['Gancho@gancho', 'sempre', 'completo@completo', 'na', 'abertura.'],
    ['Cada@cada7', 'erro', 'virava', 'uma', '*regra.@regra7'], ['E@e7', 'o', 'próximo@proximo7', 'vídeo'], ['já', 'começava', 'com', 'o'],
    ['aprendizado@aprendizado', 'dos', 'anteriores.@anteriores'] ] },
  // fala08 (o apresentador): Mas ainda faltava resolver uma coisa: o apresentador. Testei alguns avatares. Um inventou um desenho
  // na camiseta. Outro, no Podcast Studio do HeyGen, tinha marca d'água. (o Whisper ouve "podcast studio" e "d 'água": wn 2)
  { arq: 'fala08.mp3', paginas: [
    ['Mas', 'ainda', 'faltava'], ['resolver', 'uma', 'coisa:'], ['o', '*apresentador.@apresentador'], ['Testei@testei', 'alguns', 'avatares.@avatares'],
    ['Um@um8', 'inventou', 'um', 'desenho@desenho'], ['na', 'camiseta.@camiseta'], ['Outro,@outro', 'no', { d: 'Podcast Studio', s: 'Podcast Studio', m: 'podcast', wn: 2 }],
    ['do', 'HeyGen,@heygen8', 'tinha'], ['marca@marca', { d: "d'água.", s: "d'água", m: 'agua', wn: 2 }] ] },
  // fala09 (o gêmeo digital): Até que resolvi criar meu próprio avatar no HeyGen. Gravei quarenta e cinco segundos na webcam e ele
  // criou meu gêmeo digital. A voz? Meu clone de voz no ElevenLabs. (o Whisper ouve "Hey Gen" e "Eleven Labs": wn 2)
  { arq: 'fala09.mp3', paginas: [
    ['Até', 'que', 'resolvi'], ['criar', 'meu', '*próprio@proprio', 'avatar@avatar9'], ['no', { d: 'HeyGen.', s: 'HeyGen', m: 'heygen9', wn: 2 }],
    ['Gravei@gravei', { d: '45', s: 'quarenta e cinco', m: 'q45' }, 'segundos@segundos'], ['na', 'webcam@webcam'], ['e', 'ele', 'criou@criou'],
    ['meu', '*gêmeo@gemeo', 'digital.@digital'], ['A', 'voz?@voz'], ['Meu', 'clone@clone', 'de', 'voz'], ['no', { d: 'ElevenLabs.', s: 'ElevenLabs', m: 'eleven9', wn: 2 }] ] },
  // fala10 (plot twist): E tem uma coisa que talvez você ainda não tenha percebido: quem está falando com você neste momento não sou eu.
  // É meu avatar. (pausa de 0,8 s depois, aprovada, para o rebobinar caber)
  { arq: 'fala10.mp3', pausa: 0.8, paginas: [
    ['E', 'tem', 'uma', 'coisa'], ['que', 'talvez', 'você'], ['ainda', 'não', 'tenha'], ['percebido:@percebido10'],
    ['quem@quem10', 'está', 'falando'], ['com', 'você', 'neste'], ['momento@momento10'], ['*não@nao10', 'sou@sou10', 'eu.@eu10'], ['É@e10', 'meu', '*avatar.@avatar10'] ] },
  // fala11 (o último aprendizado): E nem isso funcionou perfeitamente de primeira. O motor de renderização deixava a boca fora de sincronia
  // com a voz. Troquei o motor, ajustei a configuração e resolvi. Mais um problema identificado. Mais uma regra incorporada ao estúdio.
  { arq: 'fala11.mp3', paginas: [
    ['E', 'nem', 'isso'], ['funcionou@funcionou11', 'perfeitamente'], ['de', 'primeira.@primeira11'],
    ['O', 'motor@motor11', 'de'], ['renderização@renderizacao11'], ['deixava', 'a', 'boca@boca11'], ['fora@fora11', 'de', 'sincronia@sincronia11'], ['com', 'a', 'voz.@voz11'],
    ['Troquei@troquei11', 'o', 'motor,@motor11b'], ['ajustei@ajustei11', 'a', 'configuração'], ['e', 'resolvi.@resolvi11'],
    ['Mais@mais11a', 'um', '*problema@problema11'], ['identificado.@identificado11'], ['Mais@mais11b', 'uma', '*regra@regra11'], ['incorporada@incorporada11', 'ao', 'estúdio.@estudio11'] ] },
  // fala12 (fechamento): É por isso que catorze versões não representam catorze tentativas perdidas. Representam catorze oportunidades
  // de ensinar o sistema a não cometer os mesmos erros. A diferença entre gerar vídeos com inteligência artificial e construir um estúdio
  // de produção com inteligência artificial está justamente nisso. (a última frase é o rosto, H5)
  { arq: 'fala12.mp3', paginas: [
    ['É', 'por', 'isso', 'que'], [{ d: '14', s: 'catorze', m: 'c14a' }, 'versões@versoes12'], ['não@nao12', 'representam'], [{ d: '14', s: 'catorze', m: 'c14b' }, 'tentativas'], ['*perdidas.@perdidas12'],
    ['Representam@representam12'], [{ d: '14', s: 'catorze', m: 'c14c' }, '*oportunidades@oportunidades12'], ['de', 'ensinar@ensinar12', 'o', 'sistema@sistema12'], ['a', 'não@nao12b', 'cometer'], ['os', 'mesmos', 'erros.@erros12'],
    ['A@a12', 'diferença@diferenca12', 'entre'], ['*gerar@gerar12', 'vídeos', 'com'], [{ ...IA, m: 'ia12a' }], ['e@e12', '*construir@construir12'], ['um', 'estúdio@estudio12b', 'de', 'produção'], ['com', { ...IA, m: 'ia12b' }], ['está@esta12', 'justamente', 'nisso.@nisso12'] ] },
  // fala13 (CTA): Agora me conta: você percebeu que era um avatar antes de eu revelar? E se quiser conhecer as skills que uso para
  // produzir meus vídeos, comenta ESTÚDIO.
  { arq: 'fala13.mp3', cauda: 0.8, paginas: [ // cauda: 0,8 s a mais no fim, para a chamada final ficar ~2 s na tela
    ['Agora@agora13', 'me', 'conta:'], ['você@voce13', 'percebeu@percebeu13'], ['que', 'era', 'um'], ['*avatar@avatar13', 'antes'], ['de', 'eu', 'revelar?@revelar13'],
    ['E@e13', 'se', 'quiser'], ['conhecer@conhecer13', 'as', '*skills@skills13'], ['que', 'uso', 'para'], ['produzir@produzir13', 'meus', 'vídeos,@videos13'], ['comenta@comenta13', '*ESTÚDIO.@estudio13'] ] },
];
const N = Math.min(TODAS.length, +(process.env.TRECHO || TODAS.length));
const FALAS = TODAS.slice(0, N);

// ---------- medição ----------
const duracao = (arq) => parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', AUDIO + arq]).toString());
function silencios(arq) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-i', AUDIO + arq, '-af', 'silencedetect=noise=-38dB:d=0.09', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
  const ini = [...r.matchAll(/silence_start: ([\d.]+)/g)].map(m => +m[1]);
  const fim = [...r.matchAll(/silence_end: ([\d.]+)/g)].map(m => +m[1]);
  return ini.map((s, i) => [s, fim[i] ?? s]);
}
const falado = (t) => typeof t === 'string' ? t.replace(/^[*~!]+/, '').replace(/@.*$/, '') : t.s;
const peso = (t) => falado(t).replace(/[^\p{L}\p{N} ]/gu, '').length + 1;
function info(t) {
  if (typeof t !== 'string') return { d: t.d, hl: !!t.hl, cls: t.cls || '', m: t.m, it: false, bum: false, obj: true };
  let d = t, hl = false, it = false, bum = false, m;
  while (/^[*~!]/.test(d)) { if (d[0] === '*') hl = true; if (d[0] === '~') it = true; if (d[0] === '!') bum = true; d = d.slice(1); }
  const at = d.indexOf('@'); if (at >= 0) { m = d.slice(at + 1); d = d.slice(0, at); }
  return { d, hl, it, bum, m, cls: '' };
}
// casa cada token com as palavras do Whisper
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
function alinhar(toks, ws) {
  const out = []; let j = 0;
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (j >= ws.length) return null;
    let n = 1;
    if (typeof t !== 'string') {
      if (t.wn) n = t.wn;
      else if (i === toks.length - 1) n = ws.length - j;
      else if (typeof toks[i + 1] === 'string') { const alvo = norm(falado(toks[i + 1])); while (j + n < ws.length && norm(ws[j + n].w) !== alvo) n++; }
      else n = falado(t).split(/\s+/).length;
    }
    if (j + n > ws.length) return null;
    out.push([ws[j].s, ws[j + n - 1].e]); j += n;
  }
  return j === ws.length ? out : null;
}

const M = {};
const linhas = [];
let A = LEAD;
for (const f of FALAS) {
  const dur = duracao(f.arq);
  const sil = silencios(f.arq).filter(([a, b]) => b - a > 0.05);
  const voz = []; let c = 0;
  for (const [a, b] of sil) { if (a > c + 0.02) voz.push([c, a]); c = b; }
  if (dur > c + 0.02) voz.push([c, dur]);
  const total = voz.reduce((s, [a, b]) => s + (b - a), 0);
  const mapa = (fr) => { let x = fr * total; for (const [a, b] of voz) { if (x <= b - a) return a + x; x -= b - a; } return dur; };
  const toks = f.paginas.flat();
  const W = toks.reduce((s, t) => s + peso(t), 0);
  let acc = 0; const tempos = [];
  for (const t of toks) { tempos.push(A + mapa(acc / W)); acc += peso(t); }
  const trans = `dados/transcricao/${f.arq.replace(/\.mp3$/, '')}.json`;
  const fins = toks.map(() => null);
  if (existsSync(trans)) {
    const al = alinhar(toks, JSON.parse(readFileSync(trans, 'utf8')));
    if (al) al.forEach(([s, e], q) => { tempos[q] = A + s; fins[q] = A + e; });
    else console.log(`aviso: ${f.arq} não casou com a transcrição; ficou a estimativa pelos silêncios`);
  } else console.log(`aviso: ${trans} não existe; rode transcrever.py`);
  let i = 0;
  const paginas = f.paginas.map(pg => pg.map(t => { const o = { ...info(t), t: tempos[i], fim: fins[i] }; i++; if (o.m) M[o.m] = o.t; return o; }));
  linhas.push({ ...f, A, dur, voz, paginas });
  A += dur + GAP + (f.pausa || 0);
}
linhas.forEach((l, k) => { l.S = k === 0 ? 0 : l.A - 0.15; });
linhas.forEach((l, k) => { l.E = k < linhas.length - 1 ? linhas[k + 1].S : l.A + l.dur + TAIL + (l.cauda || 0); });
const D = +linhas[linhas.length - 1].E.toFixed(3);
const r = (x) => +x.toFixed(3);
const S = (k) => linhas[k].S, E = (k) => linhas[k].E;
const FIMVOZ = (k) => linhas[k].A + linhas[k].dur;

// ---------- utilidades de animação ----------
let seed = 11;
const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const js = [];
const add = (s) => js.push(s);
const ft = (sel, de, para, t) => add(`tl.fromTo("${sel}",${de},${para},${r(t)});`);
const to = (sel, para, t) => add(`tl.to("${sel}",${para},${r(t)});`);
const set = (sel, v, t) => add(`tl.set("${sel}",${v},${r(t)});`);
const entra = (sel, t, d = 0.3) => ft(sel, '{opacity:0,scale:1.12,filter:"blur(14px)"}', `{opacity:1,scale:1,filter:"blur(0px)",duration:${d},ease:"power3.out"}`, t);
const sai = (sel, t, d = 0.18) => to(sel, `{opacity:0,scale:0.9,y:-60,filter:"blur(14px)",duration:${d},ease:"power2.in"}`, t - d);
const sobe = (sel, t, d = 0.32) => ft(sel, '{opacity:0,y:40}', `{opacity:1,y:0,duration:${d},ease:"power3.out"}`, t);
const pop = (sel, t, s = 1.5) => ft(sel, `{opacity:0,scale:${s}}`, '{opacity:1,scale:1,duration:0.32,ease:"back.out(2.2)"}', t);
const slam = (sel, t, s = 2.4) => ft(sel, `{opacity:0,scale:${s},filter:"blur(10px)"}`, '{opacity:1,scale:1,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', t - 0.22);
const risca = (sel, t, d = 0.3) => ft(sel, '{scaleX:0}', `{scaleX:1,duration:${d},ease:"power2.inOut"}`, t);
const tremor = (sel, t, a = 14) => add(`tl.fromTo("${sel}",{x:0,y:0},{keyframes:[{x:${-a},y:${a / 2}},{x:${a * 0.8},y:${-a / 2}},{x:${-a / 2},y:${a / 3}},{x:${a / 3},y:0},{x:0,y:0}],duration:0.32,ease:"none"},${r(t)});`);
const flashes = []; const flash = (t, cor = '#ffffff', a = 0.5) => { const id = `fl${flashes.length + 1}`; flashes.push(`<div class="flash" id="${id}" style="background:${cor}"></div>`); ft(`#${id}`, '{opacity:0}', `{keyframes:[{opacity:${a},duration:0.04},{opacity:0,duration:0.24}],ease:"none"}`, t); };

// confete geométrico (só como explosão no impacto, e some)
const CORES = ['#f2c941', '#8db8e8', '#ffffff', '#f2c941', '#ff8a8a'];
function forma(tipo, tam, cor) {
  const s = `width="${tam}" height="${tam}" viewBox="0 0 40 40"`;
  if (tipo === 0) return `<svg ${s}><circle cx="20" cy="20" r="15" fill="none" stroke="${cor}" stroke-width="5"/></svg>`;
  if (tipo === 1) return `<svg ${s}><rect x="7" y="7" width="26" height="26" rx="4" fill="none" stroke="${cor}" stroke-width="5"/></svg>`;
  if (tipo === 2) return `<svg ${s}><polygon points="20,5 36,34 4,34" fill="${cor}"/></svg>`;
  if (tipo === 3) return `<svg ${s}><path d="M8 8 L32 32 M32 8 L8 32" stroke="${cor}" stroke-width="6" stroke-linecap="round"/></svg>`;
  return `<svg ${s}><circle cx="20" cy="20" r="11" fill="${cor}"/></svg>`;
}
const explosoes = [];
function explode(x, y, t, n = 14, raio = 340) {
  const id = `ex${explosoes.length + 1}`;
  const pecas = [];
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + rnd() * 0.5, dist = raio * (0.55 + rnd() * 0.6);
    const dx = r(Math.cos(ang) * dist), dy = r(Math.sin(ang) * dist), rot = r((rnd() - 0.5) * 540);
    pecas.push(`<i id="${id}-${i}">${forma(Math.floor(rnd() * 5), r(22 + rnd() * 26), CORES[Math.floor(rnd() * CORES.length)])}</i>`);
    ft(`#${id}-${i}`, '{x:0,y:0,scale:0,rotation:0,opacity:1}', `{x:${dx},y:${dy},scale:1,rotation:${rot},duration:0.55,ease:"power3.out"}`, t);
    to(`#${id}-${i}`, `{opacity:0,scale:0.4,duration:0.35,ease:"power1.in"}`, t + 0.56);
  }
  explosoes.push(`<div class="explosao" style="left:${x}px;top:${y}px">${pecas.join('')}</div>`);
}

// ---------- cenas ----------
const cenas = [];
const TROCA = [null, 'zoom', 'cima', 'zoom', 'esq', 'zoom', 'cima', 'esq', 'zoom', 'cima', 'nenhum', 'esq', 'zoom', 'cima'];
const EIXO = { cima: 'y', esq: 'x' };
function chega(sel, t, tipo) {
  if (tipo === 'nenhum') return;
  if (tipo === 'zoom') return entra(sel, t);
  ft(sel, `{${EIXO[tipo]}:390,filter:"blur(16px)"}`, `{${EIXO[tipo]}:0,filter:"blur(0px)",duration:0.45,ease:"expo.out"}`, t);
  ft(sel, '{opacity:0}', '{opacity:1,duration:0.06,ease:"none"}', t);
}
function parte(sel, t, tipo) {
  if (tipo === 'nenhum') return;
  if (tipo === 'zoom') return sai(sel, t);
  to(sel, `{${EIXO[tipo]}:-300,filter:"blur(16px)",duration:0.2,ease:"power4.in"}`, t - 0.2);
}
function cena(k, inner, camera = true) {
  const id = `c${k + 1}`;
  cenas.push(`<div id="${id}" class="clip cena" data-start="${r(S(k))}" data-duration="${r(E(k) - S(k))}" data-track-index="1" data-track-kind="graphics" data-layout-allow-overlap data-layout-allow-overflow style="z-index:${10 + k}"><div class="in" id="${id}i"><div class="cam" id="${id}c"><div class="mexe" id="${id}m"><div class="zoom" id="${id}z">${inner}</div></div></div></div></div>`);
  if (camera) {
    const dur = r(E(k) - S(k)), f = k * 1.7;
    add(`tl.fromTo("#${id}c",{scale:1},{scale:1.06,duration:${dur},ease:"power1.out"},${r(S(k))});`);
    add(`(function(){const el=document.querySelector("#${id}c"),o={t:0};tl.fromTo(o,{t:0},{t:${dur},duration:${dur},ease:"none",onUpdate:()=>{const t=o.t;gsap.set(el,{x:(10*Math.sin(1.3*t+${r(f)})+5*Math.sin(2.9*t+${r(f * 2.3)})),y:(8*Math.sin(1.1*t+${r(f + 1)})+4*Math.sin(3.3*t+${r(f * 1.9)})),rotation:0.4*Math.sin(0.9*t+${r(f)})});}},${r(S(k))});})();`);
  }
  if (k > 0) chega(`#${id}i`, S(k), TROCA[k]);
  if (k < linhas.length - 1) parte(`#${id}i`, E(k), TROCA[k + 1]);
}

// ---------- CARD com pop-out (assinatura do vídeo, v2) ----------
// O rosto fica num card de estúdio (borda amarela, REC, timecode e etiqueta) e a cabeça passa por cima da borda de cima:
// o vídeo normal fica dentro do card e o recorte transparente (assets/video/recorte/*.webm, remove-background do HyperFrames,
// modelo u2net_human_seg) fica por cima, cortado para aparecer só acima da borda.
// Fonte do avatar: 1920×1080, rosto em x ≈ 970, topo da cabeça em y ≈ 200, queixo em y ≈ 700. Geometria do vídeo em
// coordenadas da página; o vídeo de dentro do card é deslocado pelo canto do card e pela borda (BORDA).
const BORDA = 6;
const CARD = {
  cheio: { c: { left: 70, top: 420, width: 940, height: 1240, r: 48 }, v: { left: -987, top: -25, width: 3022, height: 1700 }, luz: { x: 540, y: 820 } },
  baixo: { c: { left: 140, top: 1130, width: 800, height: 470, r: 40 }, v: { left: -358, top: 855, width: 1778, height: 1000 }, luz: { x: 540, y: 1250 } },
  // v3: tela cheia, sem moldura (pedido do diretor: "a partir do segundo 4, talking head na tela cheia, não precisa estar dentro do frame")
  tela: { c: { left: 0, top: 0, width: 1080, height: 1920, r: 0, b: 0 }, v: { left: -1292, top: -120, width: 3627, height: 2040 }, luz: { x: 540, y: 820 }, hud: '{top:250,left:46,right:46,bottom:380}' }, // v11: abaixo do SKILL.md do canto
};
function cardModo(t, modo) {
  const { c, v, luz } = CARD[modo], b = c.b ?? BORDA;
  set('#card', `{left:${c.left},top:${c.top},width:${c.width},height:${c.height},borderRadius:${c.r},borderWidth:${b},boxShadow:"${b ? '0 40px 90px rgba(10,22,38,0.28), 0 0 0 1px rgba(10,22,38,0.08)' : 'none'}"}`, t);
  set('.card-vid', `{left:${v.left - c.left - b},top:${v.top - c.top - b},width:${v.width},height:${v.height}}`, t);
  set('.pop-vid', `{left:${v.left},top:${v.top},width:${v.width},height:${v.height}}`, t);
  set('#pop', `{clipPath:"inset(0px 0px ${b ? 1920 - c.top - b : 1920}px 0px)"}`, t); // sem moldura, nada sai por cima
  set('#card-hud', CARD[modo].hud || '{top:0,left:0,right:0,bottom:0}', t);
  set('#luz', `{left:${luz.x},top:${luz.y}}`, t);
}
// v4: o card anima de um modo para outro (a tela cheia encolhe até o card de baixo, com a cabeça saindo pela borda)
function cardAnima(t, de, para, d = 0.5) {
  const A = CARD[de], B = CARD[para], ba = A.c.b ?? BORDA, bb = B.c.b ?? BORDA, ease = 'power3.inOut';
  const tw = (sel, a, b) => ft(sel, a, `${b.slice(0, -1)},duration:${d},ease:"${ease}",immediateRender:false}`, t);
  tw('#card', `{left:${A.c.left},top:${A.c.top},width:${A.c.width},height:${A.c.height},borderRadius:${A.c.r},borderWidth:${ba}}`, `{left:${B.c.left},top:${B.c.top},width:${B.c.width},height:${B.c.height},borderRadius:${B.c.r},borderWidth:${bb}}`);
  tw('.card-vid', `{left:${A.v.left - A.c.left - ba},top:${A.v.top - A.c.top - ba},width:${A.v.width},height:${A.v.height}}`, `{left:${B.v.left - B.c.left - bb},top:${B.v.top - B.c.top - bb},width:${B.v.width},height:${B.v.height}}`);
  tw('.pop-vid', `{left:${A.v.left},top:${A.v.top},width:${A.v.width},height:${A.v.height}}`, `{left:${B.v.left},top:${B.v.top},width:${B.v.width},height:${B.v.height}}`);
  tw('#pop', `{clipPath:"inset(0px 0px ${ba ? 1920 - A.c.top - ba : 1920}px 0px)"}`, `{clipPath:"inset(0px 0px ${bb ? 1920 - B.c.top - bb : 1920}px 0px)"}`);
  const h = (m) => (CARD[m].hud || '{top:0,left:0,right:0,bottom:0}');
  tw('#card-hud', h(de), h(para));
  tw('#luz', `{left:${A.luz.x},top:${A.luz.y}}`, `{left:${B.luz.x},top:${B.luz.y}}`);
  set('#card', `{boxShadow:"${bb ? '0 40px 90px rgba(10,22,38,0.28), 0 0 0 1px rgba(10,22,38,0.08)' : 'none'}"}`, t);
}
// um trecho do avatar: o vídeo do card e o recorte, com o mesmo tempo (fora de qualquer elemento com tempo, regra do check)
const trechosCard = [], trechosPop = [];
function trechoAvatar(id, src, recorte, ini, fim) {
  trechosCard.push(`<video id="${id}" class="clip card-vid" data-start="${r(ini)}" data-duration="${r(fim - ini)}" data-track-index="8" muted playsinline src="${src}"></video>`);
  trechosPop.push(`<video id="${id}p" class="clip pop-vid" data-start="${r(ini)}" data-duration="${r(fim - ini)}" data-track-index="9" muted playsinline src="${recorte}"></video>`);
}
// efeitos do tema (v2), no lugar do confete, flash e tremor dos Reels anteriores:
// foco: o quadro sai do desfoque e as cantoneiras de foco travam em verde em volta do alvo;
// obturador: duas faixas fecham e abrem em 0,16 s (troca de cena e corte).
const focos = [];
function foco(sel, t, box, cor = '#3fbf74') { // box: {left, top, width, height} em px da página; cor em que as cantoneiras travam
  const id = `fo${focos.length + 1}`;
  focos.push(`<div class="foco" id="${id}" style="left:${box.left}px;top:${box.top}px;width:${box.width}px;height:${box.height}px"><i></i><i></i><i></i><i></i></div>`);
  ft(sel, '{filter:"blur(10px)"}', '{filter:"blur(0px)",duration:0.3,ease:"power2.out",immediateRender:false}', t - 0.3);
  ft(`#${id}`, '{opacity:0,scale:1.45}', '{opacity:1,scale:1,duration:0.26,ease:"power3.out"}', t - 0.26);
  to(`#${id} i`, `{borderColor:"${cor}",duration:0.06}`, t);
  to(`#${id}`, '{opacity:0,duration:0.25}', t + 0.9);
}
const OBT = '{keyframes:[{scaleY:1,duration:0.07,ease:"power2.in"},{scaleY:0,duration:0.09,ease:"power2.out"}],immediateRender:false}';
const obturador = (t) => { ft('#obt-a', '{scaleY:0}', OBT, t - 0.07); ft('#obt-b', '{scaleY:0}', OBT, t - 0.07); };

// 1. HOOK (roteiro anotado, 17/11/2026)
// [ROSTO: baixo] [TÍTULO: "14 versões" grande, "pra um Reels de 1 minuto" pequeno]. O cartão v1 entra, o cronômetro marca 1:00,
// o cartão vira um baralho de v1 a v14 e o contador trava no 14 (hook-caixa-b, o maior soco). "para ficar bom": check verde no v14.
// "E o motivo" [ROSTO: cheio] [CORTE: seco]: três palpites levam tachado rosa; "imagina" ganha o chip "?".
const T1 = linhas[0].paginas.flat();
const CORTE1 = 4.0;  // v3: tela cheia a partir de 4 s (pedido do diretor); na v1/v2 era no "E o" (4,5 s)
const CORTES = { 0: CORTE1, 1: M.dentro - 0.05, 7: M.testei - 0.1, ...(M.a12 ? { 11: M.a12 - 0.1 } : {}) }; // v4: troca de lugar do rosto em cada fala (legenda acompanha)
const POUSO14 = M.catorze + 0.12;
const NCART = 14;
const leque = (i) => { const u = (i - (NCART - 1) / 2) / ((NCART - 1) / 2); return { x: r(u * 340), y: r(Math.abs(u) * 50), rot: r(u * 28) }; };
cena(0, `<div class="h1-top" id="h1top" data-layout-allow-occlusion>
  <div class="h1-tit"><span class="h1-l1"><b id="h1w1">UM REELS</b> <b id="h1w2">DE 1 MINUTO</b></span>
    <span class="h1-l2"><b class="n" id="h1n">14</b> <b id="h1w3">VERSÕES</b></span></div>
  <div class="h1-deck">${Array.from({ length: NCART }, (_, i) => `<div class="h1-card" id="h1k${i + 1}" data-layout-allow-occlusion><div class="h1-play"></div><div class="h1-tl"><i></i></div><span class="h1-v" data-layout-allow-occlusion>v${i + 1}</span></div>`).join('')}
    <div class="h1-crono" id="h1cr">1:00</div>
    <div class="h1-ok" id="h1ok">✓</div></div>
</div>
<div class="h1-palp" id="h1pal">${['IA ruim', 'falta prompt', 'app errado'].map((p, i) => `<div class="h1-p p${i}" id="h1p${i}" data-layout-allow-occlusion><span data-layout-allow-occlusion>${p}</span><i id="h1r${i}" data-layout-allow-occlusion></i></div>`).join('')}</div>`, false);
// fantasma do gancho desde o quadro 0; cada parte acende quando é dita
['#h1w1', '#h1w2', '#h1n', '#h1w3'].forEach(s => set(s, '{opacity:0.14}', 0));
to('#h1w1', '{opacity:1,duration:0.2}', M.um - 0.05);
to('#h1w2', '{opacity:1,duration:0.2}', M.minuto - 0.2);
to('#h1w3', '{opacity:1,duration:0.2}', M.versoes - 0.05);
// o cartão v1 entra no "Um Reels"; o cronômetro bate 1:00 no "minuto"
for (let i = 2; i <= NCART; i++) set(`#h1k${i}`, '{opacity:0}', 0);
ft('#h1k1', '{opacity:0,scale:0.5,rotation:-8,y:80}', '{opacity:1,scale:1,rotation:0,y:0,duration:0.38,ease:"back.out(1.8)"}', M.um - 0.05);
slam('#h1cr', M.minuto + 0.1, 2.2);
// "precisou de catorze": o baralho abre em leque, um cartão por vez, e o número do fantasma gira de 1 a 14
const DEAL0 = M.minuto + 0.34, DEAL1 = POUSO14 - 0.05, PASSO = (DEAL1 - DEAL0) / (NCART - 1);
for (let i = 1; i <= NCART; i++) {
  const p = leque(i - 1), t = DEAL0 + (i - 1) * PASSO;
  if (i === NCART) { ft('#h1k14', '{opacity:0,x:0,y:-160,rotation:0,scale:0.9}', '{opacity:1,x:0,y:-6,rotation:0,scale:1.12,duration:0.3,ease:"back.out(1.6)",immediateRender:false}', t); continue; }
  if (i === 1) ft('#h1k1', '{x:0,y:0,rotation:0}', `{x:${p.x},y:${p.y},rotation:${p.rot},duration:0.3,ease:"power3.out",immediateRender:false}`, t);
  else ft(`#h1k${i}`, '{opacity:0,x:0,y:-40,rotation:0,scale:0.9}', `{opacity:1,x:${p.x},y:${p.y},rotation:${p.rot},scale:1,duration:0.28,ease:"power3.out",immediateRender:false}`, t);
}
to('#h1cr', '{opacity:0,scale:0.6,duration:0.15}', M.catorze);
add(`(function(){const o={v:1},el=document.querySelector("#h1n");tl.fromTo(o,{v:1},{v:14,duration:${r(DEAL1 - DEAL0)},ease:"none",immediateRender:false,onUpdate:()=>{el.textContent=Math.round(o.v);}},${r(DEAL0)});})();`);
to('#h1n', '{opacity:1,duration:0.15}', DEAL0);
// pouso do 14 (v2): foco puxado no topo e cantoneiras de foco travando em verde em volta do número
ft('#h1n', '{scale:1}', '{keyframes:[{scale:1.35,duration:0.08},{scale:1,duration:0.3}],ease:"power2.out",immediateRender:false}', POUSO14);
foco('#h1top', POUSO14, { left: 24, top: 248, width: 250, height: 165 });
// "para ficar bom": check verde no v14 e os outros escurecem
pop('#h1ok', M.bom - 0.3, 2.2); // v3: no "ficar", para ficar visível antes do corte de 4 s
for (let i = 1; i < NCART; i++) to(`#h1k${i}`, '{opacity:0.35,duration:0.3}', M.bom - 0.3);
// "E o motivo": obturador e corte seco para o card grande; o gráfico de cima some no corte
cardModo(0, 'baixo');
cardModo(CORTE1, 'tela');
obturador(CORTE1);
set('#h1top', '{opacity:0}', CORTE1);
// três palpites e o tachado rosa em cada um, nas palavras "não", "foi" e "que"; o "?" no "imagina" vem na legenda (itálico)
[0, 1, 2].forEach(i => ft(`#h1p${i}`, `{opacity:0,x:${i === 1 ? 60 : -60},scale:0.8}`, '{opacity:1,x:0,scale:1,duration:0.28,ease:"back.out(1.8)"}', CORTE1 + 0.12 + i * 0.16));
[M.nao, M.foi, M.que].forEach((t, i) => risca(`#h1r${i}`, t - 0.02, 0.22));
trechoAvatar('av1', 'assets/video/heygen/H1p.mp4', 'assets/video/recorte/H1p.webm', 0, E(0));
// o REC pisca o tempo todo e o timecode corre
add(`tl.fromTo("#vis-rec",{opacity:1},{opacity:0.15,duration:0.5,repeat:${Math.ceil(D / 1)},yoyo:true,ease:"steps(1)"},0);`);
add(`(function(){const o={t:0},el=document.querySelector("#vis-tc");tl.fromTo(o,{t:0},{t:${D},duration:${D},ease:"none",onUpdate:()=>{const s=Math.floor(o.t),f=Math.floor((o.t-s)*25);el.textContent="00:00:"+String(s).padStart(2,"0")+":"+String(f).padStart(2,"0");}},0);})();`);

// 2. PROMESSA (plano aprovado pelo diretor em 17/11/2026)
// Tela cheia (H2) → claquete "ESTÚDIO · CENA 1 · TAKE 14" no "estúdio" → no "dentro do Claude Code" a imagem encolhe até o card
// de baixo (cabeça saindo pela borda) e entra o terminal "claude ›" com um comando em rajadas → "e vou mostrar" a barra do terminal
// corre → "cada erro" cai o cartão rosa ERRO → "regra" ele vira REGRA #1 → "próximo vídeo" a regra voa para o SKILL.md, que fica.
if (N >= 2) {
  const ENCOLHE = CORTES[1];
  cena(1, `<div class="p2-claq" id="p2q"><div class="p2-braco" id="p2qb"></div><div class="p2-tab"><b>ESTÚDIO</b><span>CENA 1</span><span>TAKE <em>14</em></span></div></div>
  <div class="p2-term" id="p2t"><div class="p2-cab"><i></i><i></i><i></i><span>claude</span></div>
    <div class="p2-corpo"><p class="p2-l" id="p2l1"><b>claude ›</b> <span id="p2c1">cria o Reels das 14 versões</span><u id="p2cur"></u></p>
      <p class="p2-l p2-mut" id="p2l2" data-layout-allow-occlusion>lendo o roteiro · gerando as cenas…</p>
      <div class="p2-bar"><i id="p2bar"></i></div></div></div>
  <div class="p2-flip" id="p2f"><div class="p2-erro" id="p2e" data-layout-allow-occlusion><small data-layout-allow-occlusion>v1</small><b data-layout-allow-occlusion>ERRO</b><span data-layout-allow-occlusion>vídeo monótono</span></div><div class="p2-regra" id="p2r"><small>REGRA #1</small><b>REGRA</b><span>fala a 1,2×</span></div></div>`, false);
  cardModo(S(1), 'tela');
  trechoAvatar('av2', 'assets/video/heygen/H2p.mp4', 'assets/video/recorte/H2p.webm', S(1), E(1));
  // claquete: entra antes, o braço fecha no "estúdio" e sai quando a imagem encolhe
  ft('#p2q', '{opacity:0,y:-40,rotation:-6}', '{opacity:1,y:0,rotation:0,duration:0.3,ease:"back.out(1.8)"}', M.estudio - 0.35);
  ft('#p2qb', '{rotation:-28}', '{rotation:0,duration:0.12,ease:"power3.in",immediateRender:false}', M.estudio - 0.12);
  to('#p2q', '{opacity:0,y:-30,duration:0.2}', ENCOLHE);
  // "dentro do Claude Code": obturador e corte para o card de baixo (a animação de encolher usava left/top, que o check reprova
  // por travar em pixel inteiro); o terminal entra em cima
  cardModo(ENCOLHE, 'baixo'); obturador(ENCOLHE);
  ft('#p2t', '{opacity:0,y:60,scale:0.94}', '{opacity:1,y:0,scale:1,duration:0.4,ease:"expo.out"}', ENCOLHE + 0.25);
  add(`(function(){const el=document.querySelector("#p2c1"),txt=el.textContent;const o={n:0};tl.fromTo(o,{n:0},{n:txt.length,duration:0.9,ease:"steps(${'cria o Reels das 14 versões'.length})",onUpdate:()=>{el.textContent=txt.slice(0,Math.round(o.n));}},${r(ENCOLHE + 0.45)});})();`);
  add(`tl.fromTo("#p2cur",{opacity:1},{opacity:0,duration:0.3,repeat:12,yoyo:true,ease:"steps(1)"},${r(ENCOLHE + 0.45)});`);
  sobe('#p2l2', M.e2 - 0.05);
  ft('#p2bar', '{scaleX:0}', `{scaleX:1,duration:${r(M.erro - M.e2 - 0.1)},ease:"power1.inOut"}`, M.e2);
  // "cada erro": cartão rosa ERRO cai; "regra": vira e mostra REGRA #1; "próximo vídeo": voa para o SKILL.md
  ft('#p2f', '{opacity:0,y:-260,rotation:-10,scale:1.1}', '{opacity:1,y:0,rotation:-4,scale:1,duration:0.32,ease:"back.out(1.4)"}', M.erro - 0.12);
  ft('#p2e', '{rotationY:0}', '{rotationY:90,duration:0.12,ease:"power2.in",immediateRender:false}', M.regra - 0.12);
  ft('#p2r', '{rotationY:-90}', '{rotationY:0,duration:0.16,ease:"power2.out"}', M.regra);
  to('#p2f', '{x:360,y:-355,scale:0.18,rotation:0,opacity:0,duration:0.45,ease:"power3.in"}', M.proximo);
  pop('#skill', M.proximo + 0.3, 1.6);
  set('#skill-n', '{textContent:"1 regra"}', M.proximo + 0.3);
}

// 3. O ESTÚDIO (plano aprovado pelo diretor em 17/11/2026), sem rosto: o card some e o motion explica.
// Três encaixes empilhados (1 HyperFrames, 2 ElevenLabs, 3 Whisper) ligados por uma linha dourada; o Claude Code aparece no topo
// e manda setas para os três ("escreve tudo"); a onda da narração se estende até o Whisper e as palavras encaixam nos picos.
if (N >= 3) {
  const SLOT_Y = [520, 800, 1080];
  const BAR = (n, id) => Array.from({ length: n }, (_, i) => `<i id="${id}${i}" style="height:${r(30 + 70 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)))}px"></i>`).join('');
  const PALAVRAS = ['as', 'legendas', 'com', 'cada', 'palavra'];
  cena(2, `<div class="e3-tit" id="e3tit">O <em>estúdio</em></div>
  <div class="e3-cc" id="e3cc"><div class="e3-cc-cab"><i></i><i></i><i></i><span>claude</span></div>
    <p id="e3c0">gsap.to(".cena", { ... })</p><p id="e3c1">&lt;audio src="fala03.mp3"&gt;</p><p id="e3c2">legenda: palavra por palavra</p></div>
  <svg class="e3-fios" width="1080" height="1920" viewBox="0 0 1080 1920">
    <path id="e3liga" d="M1010 ${SLOT_Y[0] + 110} L1010 ${SLOT_Y[2] + 110}" stroke="#c99a0e" stroke-width="8" stroke-linecap="round" fill="none"/>
  </svg>
  ${SLOT_Y.map((y, i) => `<div class="e3-slot" id="e3s${i}" style="top:${y}px"><b class="e3-n">${i + 1}</b><div class="e3-chip" id="e3k${i}">${['HYPERFRAMES', 'ELEVENLABS', 'WHISPER'][i]}</div><div class="e3-prev" id="e3p${i}"></div><div class="e3-cod" id="e3cod${i}">&lt;/&gt;</div></div>`).join('')}
  <div class="e3-hf" id="e3hf"><svg width="520" height="150" viewBox="0 0 520 150"><rect id="e3w0" x="10" y="10" width="150" height="90" rx="10"/><rect id="e3w1" x="180" y="10" width="160" height="40" rx="8"/><rect id="e3w2" x="180" y="62" width="110" height="38" rx="8"/></svg>
    <div class="e3-tl"><span></span><b class="e3-ph" id="e3ph"></b>${[0, 1, 2, 3].map(i => `<em id="e3kf${i}" style="left:${60 + i * 120}px"></em>`).join('')}</div></div>
  <div class="e3-el" id="e3el"><div class="e3-mic"><i></i></div><div class="e3-onda">${BAR(22, 'e3b')}</div></div>
  <div class="e3-wh" id="e3wh"><div class="e3-note"><i></i></div><div class="e3-onda e3-onda2">${BAR(16, 'e3o')}</div>
    <div class="e3-pal">${PALAVRAS.map((w, i) => `<span id="e3pw${i}">${w}</span>`).join('')}</div><div class="e3-local" id="e3lo">LOCAL</div></div>`);
  set('#card', '{opacity:0}', S(2));
  set('#luz', '{left:540,top:820}', S(2));
  sobe('#e3tit', S(2) + 0.1);
  // "São três ferramentas": os três encaixes entram; "juntas": a linha dourada liga os três
  SLOT_Y.forEach((_, i) => ft(`#e3s${i}`, '{opacity:0,x:-80}', '{opacity:1,x:0,duration:0.32,ease:"expo.out"}', M.tres + i * 0.18));
  ft('#e3liga', '{strokeDasharray:600,strokeDashoffset:600}', '{strokeDashoffset:0,duration:0.45,ease:"power2.inOut"}', M.juntas - 0.1);
  // "HyperFrames": chip; "estrutura visual": wireframes se desenham; "animações": as caixas mexem e os keyframes acendem
  pop('#e3k0', M.hyper, 1.5);
  entra('#e3hf', M.hyper + 0.1);
  [0, 1, 2].forEach(i => ft(`#e3w${i}`, '{strokeDasharray:600,strokeDashoffset:600}', '{strokeDashoffset:0,duration:0.4,ease:"power2.out"}', M.estrutura + i * 0.12));
  ft('#e3w0', '{x:0}', '{x:30,duration:0.5,ease:"power2.inOut",yoyo:true,repeat:1,immediateRender:false}', M.anima);
  ft('#e3w1', '{y:0}', '{y:-6,duration:0.25,ease:"power2.inOut",yoyo:true,repeat:3,immediateRender:false}', M.anima);
  [0, 1, 2, 3].forEach(i => ft(`#e3kf${i}`, '{backgroundColor:"rgba(10,22,38,0.25)",scale:1}', '{backgroundColor:"#f2c941",scale:1.3,duration:0.15,ease:"back.out(3)"}', M.anima + i * 0.12));
  // "O Claude Code escreve tudo": o terminal entra no topo, digita em rajadas e no "tudo" manda setas para os três encaixes
  ft('#e3tit', '{opacity:1}', '{opacity:0,y:-30,duration:0.2,immediateRender:false}', M.claude3 - 0.25);
  ft('#e3cc', '{opacity:0,y:-40,scale:0.9}', '{opacity:1,y:0,scale:1,duration:0.32,ease:"back.out(1.6)"}', M.claude3 - 0.1);
  [0, 1, 2].forEach(i => ft(`#e3c${i}`, '{opacity:0,x:-20}', '{opacity:1,x:0,duration:0.12,ease:"power2.out"}', M.claude3 + 0.2 + i * 0.22));
  // v5: no "tudo", um selo </> (código escrito pelo Claude) pousa em cada encaixe (as setas ficavam emboladas na borda)
  [0, 1, 2].forEach(i => pop(`#e3cod${i}`, M.tudo - 0.05 + i * 0.09, 1.8));
  // "ElevenLabs gera a narração": chip, microfone e a onda crescendo barra a barra
  pop('#e3k1', M.eleven, 1.5);
  entra('#e3el', M.eleven + 0.1);
  for (let i = 0; i < 22; i++) ft(`#e3b${i}`, '{scaleY:0.08}', '{scaleY:1,duration:0.2,ease:"back.out(2)"}', M.eleven + 0.3 + i * 0.03);
  // "E o Whisper, rodando localmente": chip, nota no notebook e o selo LOCAL carimbado
  pop('#e3k2', M.whisper, 1.5);
  entra('#e3wh', M.whisper + 0.1);
  ft('#e3lo', '{opacity:0,scale:2.2,rotation:-18}', '{opacity:1,scale:1,rotation:-8,duration:0.2,ease:"power4.in"}', M.local + 0.05);
  // "sincroniza as legendas com cada palavra": a onda cresce no 3 e cada palavra encaixa num pico, no tempo em que é dita
  for (let i = 0; i < 16; i++) ft(`#e3o${i}`, '{scaleY:0.08}', '{scaleY:1,duration:0.18,ease:"back.out(2)"}', M.sinc + i * 0.025);
  PALAVRAS.forEach((_, i) => ft(`#e3pw${i}`, '{opacity:0,y:-36,scale:0.7}', '{opacity:1,y:0,scale:1,duration:0.18,ease:"back.out(2.4)"}', M[`w${i + 1}`] - 0.03));
  // v5b: camadas contínuas (a medida deu 0,46 de movimento e 88% parado): a agulha corre na linha do tempo do HyperFrames,
  // as ondas "falam" sem parar e os wireframes respiram
  ft('#e3ph', '{x:0,opacity:1}', `{x:440,duration:1.6,ease:"none",repeat:${Math.ceil((E(2) - M.anima) / 1.6)}}`, M.anima);
  const fala = (pref, n, t0, amp) => add(`(function(){const els=[...Array(${n}).keys()].map(i=>document.querySelector("#${pref}"+i)),o={t:0};tl.fromTo(o,{t:0},{t:${r(E(2) - t0)},duration:${r(E(2) - t0)},ease:"none",immediateRender:false,onUpdate:()=>{els.forEach((el,i)=>gsap.set(el,{scaleY:${amp}+(1-${amp})*Math.abs(Math.sin(o.t*7.3+i*0.9)*Math.cos(o.t*3.1+i*0.4))}));}},${r(t0)});})();`);
  fala('e3b', 22, M.eleven + 1.0, 0.25);
  fala('e3o', 16, M.sinc + 0.5, 0.3);
  ft('#e3hf svg', '{scale:1}', `{scale:1.04,duration:0.8,ease:"sine.inOut",yoyo:true,repeat:${Math.ceil((E(2) - M.estrutura) / 0.8)},transformOrigin:"50% 50%",immediateRender:false}`, M.estrutura + 0.6);
}

// 4. MONTADO… E PÉSSIMO, sem rosto. v7 (pedido do diretor em 17/11/2026: "está bem vazio… nada que prenda a atenção";
// "com algo que faça sentido com o que está sendo narrado"): o estúdio montado vira uma TIMELINE DE EDIÇÃO que ocupa a tela.
//   "Pronto. O estúdio estava" → os clipes voam para as três trilhas (VÍDEO/HyperFrames, VOZ/ElevenLabs, LEGENDA/Whisper) e a agulha corre;
//   "montado" → o cursor clica em ▶ RENDERIZAR, que vira ✓ MONTADO; "problema" → o foco se perde, as trilhas ficam rosadas e desce
//   a notificação "⚠ 1 problema encontrado"; "pronto rapidamente" → a janela de exportação vai de 0 a 100%; logo depois a timeline sai
//   e o celular com a v1 REAL (Reels 1, v1, de 14 s a 28 s, muda) sobe; "péssimo" → cinza, carimbo e foco rosa.
const celular = []; // o <video> não pode ficar dentro de elemento com tempo: o celular é um contêiner sem tempo, fora das cenas
if (N >= 4) {
  const CENAS4 = [[0, 150, '#1556a7'], [160, 120, '#f2c941'], [290, 170, '#1556a7'], [470, 110, '#5fcf8e'], [590, 90, '#1556a7']];
  const PAL4 = ['pronto', 'o', 'estúdio', 'estava', 'montado'];
  const ONDA4 = Array.from({ length: 34 }, (_, i) => `<i id="m4o${i}" style="height:${r(16 + 70 * Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.5)))}px"></i>`).join('');
  cena(3, `<div class="m4-toast" id="m4toast"><b>⚠</b> 1 problema encontrado</div>
  <div class="m4-ed" id="m4ed">
    <div class="m4-cab"><i></i><i></i><i></i><span>estudio.hf · v1</span><em id="m4tc">00:00:00</em></div>
    <div class="m4-regua"></div>
    ${['VÍDEO|HyperFrames', 'VOZ|ElevenLabs', 'LEGENDA|Whisper'].map((t, k) => { const [a, b] = t.split('|'); return `<div class="m4-tr" style="top:${120 + k * 230}px"><div class="m4-rot"><b>${a}</b><small>${b}</small></div><div class="m4-pista" id="m4t${k}"></div></div>`; }).join('')}
    <div class="m4-clips">
      ${CENAS4.map(([x, w, c], i) => `<div class="m4-cv" id="m4cv${i}" style="left:${x}px;width:${w}px;background:${c}"><i></i></div>`).join('')}
      <div class="m4-onda">${ONDA4}</div>
      <div class="m4-pal">${PAL4.map((w, i) => `<span id="m4w${i}">${w}</span>`).join('')}</div>
    </div>
    <div class="m4-rosa" id="m4rosa"></div>
    <div class="m4-agulha" id="m4ag"></div>
    <div class="m4-veu" id="m4veu"></div>
    <div class="m4-mod" id="m4mod"><small id="m4mt">exportando v1.mp4…</small><div class="m4-trilho"><i id="m4xb"></i></div><b id="m4xp">0%</b></div>
  </div>
  <div class="m4-btn" id="m4btn"><span id="m4bt">▶ RENDERIZAR</span></div>
  <svg class="m4-cur" id="m4cur" width="56" height="64" viewBox="0 0 28 32"><path d="M3 2 L3 26 L9 20 L13 30 L17 28 L13 18 L22 18 Z" fill="#ffffff" stroke="#0a1626" stroke-width="2" stroke-linejoin="round"/></svg>
  <div class="m4-carimbo" id="m4c">PÉSSIMO</div>`);
  celular.push(`<div class="cel" id="cel"><video id="celv" class="clip" data-start="${r(M.rapido + 0.5)}" data-duration="${r(E(3) - M.rapido - 0.5)}" data-track-index="10" muted playsinline src="assets/video/prova/uber-v1.mp4"></video><span class="cel-tag">v1</span></div>`);
  const SAI = M.rapido + 0.45; // a timeline sai e o celular sobe
  // a timeline entra; os clipes voam para as trilhas em rajada no "Pronto. O estúdio estava"
  ft('#m4ed', '{opacity:0,y:80,scale:0.94}', '{opacity:1,y:0,scale:1,duration:0.4,ease:"expo.out"}', S(3) + 0.05);
  CENAS4.forEach((_, i) => ft(`#m4cv${i}`, '{opacity:0,x:420,scale:0.8}', '{opacity:1,x:0,scale:1,duration:0.28,ease:"back.out(1.6)"}', M.pronto + 0.2 + i * 0.12));
  for (let i = 0; i < 34; i++) ft(`#m4o${i}`, '{scaleY:0.05}', '{scaleY:1,duration:0.18,ease:"back.out(2)"}', M.pronto + 0.45 + i * 0.025);
  PAL4.forEach((_, i) => ft(`#m4w${i}`, '{opacity:0,y:-30,scale:0.7}', '{opacity:1,y:0,scale:1,duration:0.2,ease:"back.out(2.4)"}', M.pronto + 0.9 + i * 0.14));
  // a agulha corre pela timeline sem parar e o timecode da edição anda
  ft('#m4ag', '{x:0}', `{x:700,duration:1.4,ease:"none",repeat:${Math.ceil((SAI - S(3)) / 1.4)}}`, S(3) + 0.3);
  add(`(function(){const o={t:0},el=document.querySelector("#m4tc");tl.fromTo(o,{t:0},{t:${r(SAI - S(3))},duration:${r(SAI - S(3))},ease:"none",immediateRender:false,onUpdate:()=>{const s=Math.floor(o.t*3.7),f=Math.floor((o.t*3.7-s)*30);el.textContent="00:00:"+String(s).padStart(2,"0")+":"+String(f).padStart(2,"0");}},${r(S(3) + 0.3)});})();`);
  // a onda da voz fica viva enquanto a agulha corre
  add(`(function(){const els=[...Array(34).keys()].map(i=>document.querySelector("#m4o"+i)),o={t:0};tl.fromTo(o,{t:0},{t:${r(SAI - M.pronto - 1.4)},duration:${r(SAI - M.pronto - 1.4)},ease:"none",immediateRender:false,onUpdate:()=>{els.forEach((el,i)=>gsap.set(el,{scaleY:0.35+0.65*Math.abs(Math.sin(o.t*6.1+i*0.8))}));}},${r(M.pronto + 1.4)});})();`);
  // "montado": o cursor vai até ▶ RENDERIZAR, clica e o botão vira ✓ MONTADO
  sobe('#m4btn', M.montado - 0.9);
  ft('#m4cur', '{opacity:0,x:860,y:1560}', '{opacity:1,x:600,y:1300,duration:0.5,ease:"power2.inOut"}', M.montado - 0.55);
  ft('#m4cur', '{scale:1}', '{scale:0.8,duration:0.08,yoyo:true,repeat:1,ease:"power1.inOut",immediateRender:false}', M.montado - 0.02);
  to('#m4btn', '{backgroundColor:"#2f9e5e",duration:0.12}', M.montado + 0.05);
  set('#m4bt', '{textContent:"✓ MONTADO"}', M.montado + 0.05);
  ft('#m4btn', '{scale:1}', '{keyframes:[{scale:1.12,duration:0.08},{scale:1,duration:0.25}],ease:"power2.out",immediateRender:false}', M.montado + 0.05);
  to('#m4cur', '{opacity:0,duration:0.2}', M.montado + 0.5);
  // "problema": o foco se perde, as trilhas ficam rosadas e a notificação desce
  ft('#c4z', '{filter:"blur(0px)"}', '{keyframes:[{filter:"blur(9px)",duration:0.14},{filter:"blur(0px)",duration:0.3}],ease:"power2.inOut",immediateRender:false}', M.problema);
  ft('#m4rosa', '{opacity:0}', '{opacity:1,duration:0.2}', M.problema + 0.1);
  ft('#m4toast', '{opacity:0,y:-70}', '{opacity:1,y:0,duration:0.35,ease:"back.out(1.8)"}', M.problema + 0.1);
  to('#m4btn', '{backgroundColor:"#e5484d",duration:0.12}', M.problema + 0.1);
  set('#m4bt', '{textContent:"! PROBLEMA"}', M.problema + 0.1);
  // "o primeiro vídeo ficou pronto rapidamente": a janela de exportação vai de 0 a 100% em meio segundo
  ft('#m4veu', '{opacity:0}', '{opacity:1,duration:0.2}', M.video4 - 0.1);
  ft('#m4mod', '{opacity:0,scale:0.85}', '{opacity:1,scale:1,duration:0.28,ease:"back.out(1.8)"}', M.video4 - 0.1);
  ft('#m4xb', '{scaleX:0}', '{scaleX:1,duration:0.5,ease:"power2.in"}', M.rapido - 0.2);
  add(`(function(){const o={v:0},el=document.querySelector("#m4xp");tl.fromTo(o,{v:0},{v:100,duration:0.5,ease:"power2.in",immediateRender:false,onUpdate:()=>{el.textContent=Math.round(o.v)+"%";}},${r(M.rapido - 0.2)});})();`);
  set('#m4mt', '{textContent:"v1.mp4 · exportado ✓"}', M.rapido + 0.3);
  // logo depois: a timeline, o botão e a notificação saem e o celular com a v1 real sobe grande para o centro
  ['#m4ed', '#m4btn', '#m4toast'].forEach(sel => to(sel, '{opacity:0,scale:0.86,duration:0.3,ease:"power2.in"}', SAI));
  ft('#cel', '{opacity:0,y:260,scale:0.85}', '{opacity:1,y:0,scale:1,duration:0.45,ease:"back.out(1.4)"}', SAI + 0.1);
  ft('#cel', '{rotation:-2.5}', `{rotation:2.5,duration:0.7,ease:"sine.inOut",yoyo:true,repeat:${Math.ceil((E(3) - SAI) / 0.7)},immediateRender:false}`, SAI + 0.4);
  set('#cel', '{opacity:0}', E(3));
  // "péssimo": a v1 fica cinza, o carimbo pousa e o foco trava em rosa em volta do celular
  to('#cel', '{filter:"grayscale(1) brightness(0.8)",duration:0.2}', M.pessimo - 0.05);
  ft('#m4c', '{opacity:0,scale:2.6,rotation:-8,filter:"blur(10px)"}', '{opacity:1,scale:1,rotation:-8,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', M.pessimo - 0.17);
  foco('#c4z', M.pessimo + 0.05, { left: 300, top: 580, width: 480, height: 760 }, '#e5484d');
}

// 5. PRIMEIRA VIRADA (plano aprovado em 17/11/2026), sem rosto.
//   A (monótono → tela): o celular com a v1 vai para a esquerda; à direita, o painel ANÁLISE DA v1 com o monitor de movimento,
//     que fica reto, e o contador cai para 0,52 (meta > 2); embaixo, a tira com quadros reais da v1 ganha faixas PARADO e sobe o 75%.
//     No "nada" a tela congela de propósito por 0,6 s (sem som, sem câmera). Números medidos na v1 em 14/11 (2,84 é a referência).
//   B (foi aí que percebi o verdadeiro problema): b-roll do Magnific em tela cheia e o chip O VERDADEIRO PROBLEMA.
//   C (o Claude Code não carregava…): SESSÃO 1 · ontem com as correções; SESSÃO 2 · hoje vazia; as correções viram poeira
//     no caminho; carimbo COMEÇA DO ZERO.
if (N >= 5) {
  const FOI = M.foi5 - 0.1, SESS = M.claude5 - 0.15;
  const CORR = ['✓ fala a 1,2×', '✓ gancho completo', '✓ nada parado'];
  cena(4, `<div class="v5-a" id="v5a">
    <div class="v5-an" id="v5an"><small>ANÁLISE DA v1</small>
      <svg width="540" height="200" viewBox="0 0 540 200"><line x1="0" y1="66" x2="540" y2="66" stroke="#2f9e5e" stroke-width="3" stroke-dasharray="10 10"/>
        <path id="v5ekg" d="M0 120 L60 120 L80 40 L100 170 L120 120 L200 120 L220 50 L240 160 L260 120 L540 120" fill="none" stroke="#e5484d" stroke-width="6" stroke-linejoin="round"/></svg>
      <span class="v5-meta">meta: acima de 2</span>
      <div class="v5-mov"><em>MOVIMENTO</em><b id="v5mv">2,84</b></div></div>
    <div class="v5-tira" id="v5t">${Array.from({ length: 8 }, (_, i) => `<div class="v5-q"><img src="assets/img/v1/q${i}.jpg" alt=""></div>`).join('')}
      ${[[0, 2.6], [3.2, 2.2], [5.8, 2.2]].map(([x, w], i) => `<i class="v5-par" id="v5p${i}" style="left:${r(x * 118)}px;width:${r(w * 118)}px">PARADO</i>`).join('')}</div>
    <div class="v5-pct" id="v5pct"><b id="v5pn">0%</b> DOS QUADROS PARADOS</div>
  </div>
  <div class="v5-chip" id="v5chip">O VERDADEIRO PROBLEMA</div>
  <div class="v5-c" id="v5c">
    <div class="v5-s" id="v5s1" style="top:330px;height:450px"><div class="v5-cab"><i></i><i></i><i></i><span>SESSÃO 1 · ontem</span></div>
      ${CORR.map((c, i) => `<p id="v5r${i}">${c}</p>`).join('')}</div>
    <div class="v5-seta" id="v5seta">↓</div>
    <div class="v5-s v5-s2" id="v5s2" style="top:880px;height:380px"><div class="v5-cab"><i></i><i></i><i></i><span>SESSÃO 2 · hoje</span></div>
      <p class="v5-vazio">claude › <u id="v5cur"></u></p></div>
    ${CORR.map((c, i) => `<p class="v5-voa" id="v5v${i}" style="top:${420 + i * 76}px">${c}</p>`).join('')}
    <div class="v5-zero" id="v5z">COMEÇA DO ZERO</div>
  </div>
  <div class="v5-pausa" id="v5pausa">⏸</div>`);
  celular.push(`<div class="cel cel2" id="cel2"><video id="cel2v" class="clip" data-start="${r(S(4))}" data-duration="${r(FOI - S(4))}" data-track-index="10" muted playsinline src="assets/video/prova/uber-v1.mp4"></video><span class="cel-tag">v1</span></div>`);
  celular.push(`<div class="fundo-video" id="v5bw"><video id="v5bv" class="clip" data-start="${r(FOI)}" data-duration="${r(SESS - FOI)}" data-track-index="11" muted playsinline src="assets/video/broll-percebi.mp4"></video><div class="fundo-veu"></div></div>`);
  // A: celular à esquerda, painel e tira
  set('#cel2', '{opacity:1,filter:"grayscale(1) brightness(0.85)"}', S(4));
  set('#cel2', '{opacity:0}', FOI);
  ft('#v5an', '{opacity:0,x:120}', '{opacity:1,x:0,duration:0.35,ease:"expo.out"}', S(4) + 0.1);
  ft('#v5ekg', '{strokeDasharray:900,strokeDashoffset:900}', '{strokeDashoffset:0,duration:0.9,ease:"none"}', S(4) + 0.2);
  // "sem ritmo": a linha fica reta (o pulso some)
  to('#v5ekg', '{attr:{d:"M0 120 L60 120 L80 120 L100 120 L120 120 L200 120 L220 120 L240 120 L260 120 L540 120"},duration:0.5,ease:"power2.inOut"}', M.ritmo);
  add(`(function(){const o={v:2.84},el=document.querySelector("#v5mv");tl.fromTo(o,{v:2.84},{v:0.52,duration:0.9,ease:"power2.out",immediateRender:false,onUpdate:()=>{el.textContent=o.v.toFixed(2).replace(".",",");}},${r(M.ritmo - 0.1)});})();`);
  to('#v5mv', '{color:"#e5484d",duration:0.2}', M.ritmo + 0.6);
  ft('#v5t', '{opacity:0,y:80}', '{opacity:1,y:0,duration:0.35,ease:"expo.out"}', M.momentos - 0.2);
  [M.momentos + 0.1, M.momentos + 0.45, M.nada - 0.3].forEach((t, i) => ft(`#v5p${i}`, '{scaleX:0}', '{scaleX:1,duration:0.25,ease:"power2.out"}', t));
  sobe('#v5pct', M.momentos + 0.1);
  add(`(function(){const o={v:0},el=document.querySelector("#v5pn");tl.fromTo(o,{v:0},{v:75,duration:${r(M.nada - 0.1 - M.momentos)},ease:"power1.out",immediateRender:false,onUpdate:()=>{el.textContent=Math.round(o.v)+"%";}},${r(M.momentos + 0.1)});})();`);
  // "nada": congela de propósito por 0,6 s (sem som; v8b: a câmera continua, mas a tela fica cinza com o ⏸, porque sem câmera
  // o trecho mediu 45% parado) e o 75% bate depois
  set('#v5a', '{filter:"grayscale(1)"}', M.nada); set('#v5a', '{filter:"grayscale(0)"}', M.nada + 0.6);
  set('#v5pausa', '{opacity:1}', M.nada); set('#v5pausa', '{opacity:0}', M.nada + 0.6);
  ft('#v5pct', '{scale:1}', '{keyframes:[{scale:1.18,duration:0.08},{scale:1,duration:0.25}],ease:"power2.out",immediateRender:false}', M.nada + 0.6);
  set('#v5a', '{opacity:0}', FOI);
  // B: b-roll em tela cheia, chip no "verdadeiro"
  set('#v5bw', '{opacity:1}', FOI); obturador(FOI);
  set('#v5bw', '{opacity:0}', SESS);
  ft('#v5chip', '{opacity:0,scale:2.4,rotation:-4,filter:"blur(10px)"}', '{opacity:1,scale:1,rotation:-4,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', M.verdadeiro - 0.17);
  set('#v5chip', '{opacity:0}', SESS);
  // C: as duas sessões; as correções descem e viram poeira; carimbo COMEÇA DO ZERO
  obturador(SESS);
  set('#v5c', '{opacity:1}', SESS);
  ft('#v5s1', '{opacity:0,y:-60}', '{opacity:1,y:0,duration:0.32,ease:"expo.out"}', SESS + 0.05);
  CORR.forEach((_, i) => ft(`#v5r${i}`, '{opacity:0,x:-30}', '{opacity:1,x:0,duration:0.15,ease:"power2.out"}', SESS + 0.25 + i * 0.12));
  ft('#v5seta', '{opacity:0,y:-20}', '{opacity:1,y:0,duration:0.25}', M.carregava - 0.1);
  ft('#v5s2', '{opacity:0,y:60}', '{opacity:1,y:0,duration:0.32,ease:"expo.out"}', M.carregava - 0.05);
  add(`tl.fromTo("#v5cur",{opacity:1},{opacity:0,duration:0.3,repeat:10,yoyo:true,ease:"steps(1)"},${r(M.carregava)});`);
  CORR.forEach((_, i) => {
    const t = M.correcoes - 0.1 + i * 0.15;
    ft(`#v5v${i}`, '{opacity:0,y:0,scale:1,filter:"blur(0px)"}', '{opacity:1,y:0,duration:0.1}', t);
    to(`#v5v${i}`, '{y:260,scale:1.25,opacity:0,filter:"blur(14px)",scaleX:1.5,duration:0.7,ease:"power2.in"}', t + 0.1);
  });
  ft('#v5z', '{opacity:0,scale:2.4,rotation:-6,filter:"blur(10px)"}', '{opacity:1,scale:1,rotation:-6,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', M.anterior - 0.05);
}

// 6. A ESTRATÉGIA (plano aprovado em 17/11/2026), sem rosto.
// A chave CORRIGIR NA MÃO → ENSINAR O SISTEMA vira no "estratégia"; quatro celulares (v2 a v5) com o mesmo ERRO levam um X por palavra;
// o cursor arrasta a correção do v5, que vira amarela; no "skill" o SKILL.md do canto cresce até o centro e recebe o cartão; o arquivo
// abre com "1. fala a 1,2×" e linhas borradas (a fala 7 preenche); no "permanentes" o cadeado fecha e pousa PERMANENTE.
if (N >= 6) {
  const POS6 = [[90, 400], [570, 400], [90, 790], [570, 790]];
  cena(5, `<div class="s6-tog" id="s6tog"><span class="s6-l"><em>CORRIGIR NA MÃO<i id="s6lr"></i></em></span><span class="s6-r">ENSINAR O SISTEMA</span><div class="s6-trilho" id="s6tr"><i id="s6kn"></i></div></div>
  ${POS6.map(([x, y], i) => `<div class="s6-cel" id="s6c${i}" style="left:${x}px;top:${y}px"><b>v${i + 2}</b><div class="s6-tela"><i></i><i></i><i></i></div><div class="s6-erro">ERRO: fala lenta</div><div class="s6-x" id="s6x${i}">✕</div></div>`).join('')}
  <div class="s6-cont" id="s6ct">corrigido <b id="s6n">0</b>×</div>
  <div class="s6-arr" id="s6ar">ERRO: fala lenta</div>
  <svg class="s6-cur" id="s6cur" width="56" height="64" viewBox="0 0 28 32"><path d="M3 2 L3 26 L9 20 L13 30 L17 28 L13 18 L22 18 Z" fill="#ffffff" stroke="#0a1626" stroke-width="2" stroke-linejoin="round"/></svg>
  <div class="s6-file" id="s6f"><div class="s6-cab"><div class="skill-ic"><i></i></div><b>SKILL.md</b><span>· estúdio</span><em id="s6lock">🔓</em></div>
    <p class="s6-h"># Regras do estúdio</p>
    <p class="s6-li" id="s6l1">1. fala a 1,2×</p>
    ${[2, 3, 4, 5].map(i => `<p class="s6-li s6-bor">${i}. ···········</p>`).join('')}
    <div class="s6-perm" id="s6p">PERMANENTE</div></div>`);
  // "estratégia": a chave vira para ENSINAR O SISTEMA
  ft('#s6tog', '{opacity:0,y:60,scale:0.9}', '{opacity:1,y:0,scale:1,duration:0.35,ease:"back.out(1.6)"}', S(5) + 0.1);
  ft('#s6kn', '{x:0}', '{x:330,duration:0.28,ease:"back.out(1.8)"}', M.estrategia);
  to('#s6tr', '{backgroundColor:"#2f9e5e",duration:0.2}', M.estrategia);
  // v9b: o rótulo da esquerda é riscado e o da direita acende; a chave sai antes dos celulares (no topo ela batia no SKILL.md)
  to('.s6-l', '{color:"#9aa3ae",duration:0.2}', M.estrategia); risca('#s6lr', M.estrategia, 0.25);
  to('.s6-r', '{color:"#2f9e5e",duration:0.2}', M.estrategia);
  to('#s6tog', '{opacity:0,scale:0.9,duration:0.25}', M.corrigir - 0.35);
  // "corrigir o mesmo erro em todo o vídeo": os quatro celulares com o mesmo erro, um X por palavra, e o contador
  POS6.forEach((_, i) => ft(`#s6c${i}`, '{opacity:0,y:80,scale:0.85}', '{opacity:1,y:0,scale:1,duration:0.3,ease:"back.out(1.5)"}', M.corrigir - 0.3 + i * 0.08));
  [M.corrigir, M.mesmo, M.erro6, M.todo].forEach((t, i) => ft(`#s6x${i}`, '{opacity:0,scale:2.4,rotation:-12}', '{opacity:1,scale:1,rotation:-12,duration:0.18,ease:"power4.in"}', t + 0.05));
  sobe('#s6ct', M.corrigir);
  [M.corrigir, M.mesmo, M.erro6, M.todo].forEach((t, i) => set('#s6n', `{textContent:"${i + 1}"}`, t + 0.2));
  // "comecei a transformar cada correção": o cursor pega a correção do v5 e ela vira amarela enquanto sobe
  ft('#s6cur', '{opacity:0,x:900,y:1340}', '{opacity:1,x:800,y:1070,duration:0.4,ease:"power2.inOut"}', M.comecei - 0.3);
  ft('#s6cur', '{scale:1}', '{scale:0.8,duration:0.08,yoyo:true,repeat:1,immediateRender:false}', M.transformar - 0.05);
  ft('#s6ar', '{opacity:0}', '{opacity:1,duration:0.05}', M.transformar);
  to('#s6ar', '{x:-230,y:-400,rotation:-4,duration:0.9,ease:"power2.inOut"}', M.transformar + 0.05);
  to('#s6cur', '{x:570,y:670,duration:0.9,ease:"power2.inOut"}', M.transformar + 0.05);
  to('#s6ar', '{backgroundColor:"#f2c941",color:"#0a1626",duration:0.3}', M.correcao);
  set('#s6ar', '{textContent:"REGRA: fala a 1,2×"}', M.correcao + 0.15);
  // "skill": o SKILL.md do canto cresce até o centro e recebe o cartão; os celulares saem
  POS6.forEach((_, i) => to(`#s6c${i}`, '{opacity:0,scale:0.8,duration:0.25}', M.skill - 0.1));
  ['#s6ct', '#s6tog', '#s6cur'].forEach(sel => to(sel, '{opacity:0,duration:0.2}', M.skill - 0.1));
  set('#skill', '{opacity:0}', M.skill - 0.1);
  ft('#s6f', '{opacity:0,x:330,y:-500,scale:0.22}', '{opacity:1,x:0,y:0,scale:1,duration:0.45,ease:"power3.out"}', M.skill - 0.1);
  to('#s6ar', '{x:-230,y:-260,scale:0.4,opacity:0,duration:0.3,ease:"power2.in"}', M.skill + 0.35);
  // "um arquivo com regras permanentes": a linha 1 é digitada; no "permanentes" o cadeado fecha e o carimbo pousa
  add(`(function(){const el=document.querySelector("#s6l1"),txt="1. fala a 1,2×";const o={n:0};tl.fromTo(o,{n:0},{n:txt.length,duration:0.5,ease:"steps(${'1. fala a 1,2×'.length})",immediateRender:false,onUpdate:()=>{el.textContent=txt.slice(0,Math.round(o.n));}},${r(M.arquivo)});})();`);
  set('#s6l1', '{textContent:""}', S(5));
  set('#s6lock', '{textContent:"🔒"}', M.permanentes);
  ft('#s6lock', '{scale:1}', '{keyframes:[{scale:1.5,duration:0.1},{scale:1,duration:0.2}],immediateRender:false}', M.permanentes);
  ft('#s6p', '{opacity:0,scale:2.4,rotation:-7,filter:"blur(10px)"}', '{opacity:1,scale:1,rotation:-7,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', M.permanentes + 0.1);
  set('#skill', '{opacity:1}', E(5));
}

// 7. AS REGRAS (plano aprovado em 17/11/2026), sem rosto. O SKILL.md grande em cima; embaixo, cada regra demonstrada na hora em que é dita.
// As 14 regras são reais (skills do estúdio, correções do diretor nos Reels de 08 a 17/11/2026).
// "e o próximo vídeo…": volta a SESSÃO 2 · hoje (a do COMEÇA DO ZERO), agora com as 14 regras carregadas.
if (N >= 7) {
  const REGRAS = ['fala a 1,2×', 'nada parado na tela', 'gancho completo até 2,5 s', 'legenda sincronizada (Whisper)', 'sem formas soltas no fundo',
    'IA por extenso na fala', 'som no pico de cada efeito', 'áudio final a −14 LUFS', 'nada essencial abaixo de 78%',
    'vídeo de fundo sem texto', 'CTA sem número pessoal', 'uma imagem por frase', 'plano antes de animar', 'versão salva antes de mexer'];
  const LH = 62;
  cena(6, `<div class="r7-a" id="r7a">
    <div class="r7-file"><div class="s6-cab"><div class="skill-ic"><i></i></div><b>SKILL.md</b><span>· estúdio</span><em>🔒</em></div>
      <div class="r7-janela"><div class="r7-lista" id="r7lista">${REGRAS.map((t, i) => `<p class="r7-li${i >= 1 ? ' r7-bor' : ''}" id="r7l${i}"><b>${i + 1}.</b> ${t}</p>`).join('')}</div></div></div>
    <div class="r7-demo r7-dial" id="r7dial"><svg width="520" height="300" viewBox="0 0 520 300"><path d="M60 270 A200 200 0 0 1 460 270" fill="none" stroke="rgba(10,22,38,0.15)" stroke-width="36"/><path d="M330 82 A200 200 0 0 1 460 270" fill="none" stroke="#2f9e5e" stroke-width="36"/>
      <g id="r7ag"><path d="M252 270 L260 96 L268 270 Z" fill="#0a1626"/></g><circle cx="260" cy="270" r="22" fill="#0a1626"/></svg>
      <span class="r7-v" id="r7v">1,0×</span><em class="r7-et">velocidade da fala</em></div>
    <div class="r7-demo r7-med" id="r7med"><em class="r7-et">movimento na tela</em><div class="r7-trilho"><i id="r7bar"></i><u></u></div><b class="r7-mv" id="r7mv">0,52</b><span class="r7-meta" id="r7meta">meta: acima de 2</span></div>
    <div class="r7-demo r7-gan" id="r7gan"><div class="r7-cel"><p id="r7g0">UM REELS</p><p id="r7g1">DE 1 MINUTO</p><p class="r7-g14" id="r7g2">14 VERSÕES</p></div>
      <div class="r7-crono"><b id="r7cr">0,0 s</b><span>limite: 2,5 s</span><i id="r7ok">✓</i></div></div>
    <div class="r7-demo r7-grade" id="r7gr">${REGRAS.map((_, i) => `<i id="r7c${i}">${i + 1}</i>`).join('')}</div>
  </div>
  <div class="r7-b" id="r7b">
    <div class="v5-s r7-sess" id="r7s"><div class="v5-cab"><i></i><i></i><i></i><span>SESSÃO 2 · hoje</span></div>
      <p class="r7-p" id="r7p0">claude › lendo SKILL.md…</p><div class="r7-load"><i id="r7ld"></i></div><p class="r7-p r7-okt" id="r7p1">✓ 14 regras carregadas</p></div>
    <div class="r7-prox" id="r7px"><b>v1</b><span>próximo vídeo</span><div class="r7-load r7-load2"><i></i></div><em id="r7pk">✓</em></div>
  </div>`);
  sobe('#r7a', S(6) + 0.05);
  // "Fala mais rápida": linha 1 acende; o ponteiro vai de 1,0× a 1,2×
  to('#r7l0', '{backgroundColor:"rgba(242,201,65,0.55)",duration:0.2}', M.fala7);
  entra('#r7dial', M.fala7 - 0.05);
  ft('#r7ag', '{rotation:-62,svgOrigin:"260 270"}', '{rotation:38,svgOrigin:"260 270",duration:0.55,ease:"back.out(1.6)"}', M.fala7 + 0.15);
  set('#r7v', '{textContent:"1,2×"}', M.fala7 + 0.45);
  to('#r7v', '{color:"#2f9e5e",duration:0.15}', M.fala7 + 0.45);
  // "Nenhum segundo de tela parada": linha 2 desembaça; o medidor sobe de 0,52 (v1) e passa a meta
  to('#r7dial', '{opacity:0,y:-40,duration:0.2}', M.nenhum - 0.15);
  to('#r7l0', '{backgroundColor:"rgba(242,201,65,0)",duration:0.2}', M.nenhum - 0.1);
  to('#r7l1', '{filter:"blur(0px)",color:"#0a1626",backgroundColor:"rgba(242,201,65,0.55)",duration:0.25}', M.nenhum);
  entra('#r7med', M.nenhum - 0.05);
  ft('#r7bar', '{scaleX:0.13}', '{scaleX:0.74,duration:0.9,ease:"power2.out"}', M.nenhum + 0.2);
  add(`(function(){const o={v:0.52},el=document.querySelector("#r7mv");tl.fromTo(o,{v:0.52},{v:2.97,duration:0.9,ease:"power2.out",immediateRender:false,onUpdate:()=>{el.textContent=o.v.toFixed(2).replace(".",",");}},${r(M.nenhum + 0.2)});})();`);
  set('#r7meta', '{textContent:"meta: acima de 2 ✓"}', M.parada);
  to('#r7meta', '{color:"#2f9e5e",duration:0.15}', M.parada);
  // "Gancho sempre completo na abertura": linha 3; o mini celular mostra o gancho inteiro antes do cronômetro chegar a 2,5 s
  to('#r7med', '{opacity:0,y:-40,duration:0.2}', M.gancho - 0.15);
  to('#r7l1', '{backgroundColor:"rgba(242,201,65,0)",duration:0.2}', M.gancho - 0.1);
  to('#r7l2', '{filter:"blur(0px)",color:"#0a1626",backgroundColor:"rgba(242,201,65,0.55)",duration:0.25}', M.gancho);
  entra('#r7gan', M.gancho - 0.05);
  [0, 1, 2].forEach(i => ft(`#r7g${i}`, '{opacity:0.15}', '{opacity:1,duration:0.12}', M.gancho + 0.15 + i * 0.2));
  add(`(function(){const o={v:0},el=document.querySelector("#r7cr");tl.fromTo(o,{v:0},{v:1.6,duration:0.9,ease:"none",immediateRender:false,onUpdate:()=>{el.textContent=o.v.toFixed(1).replace(".",",")+" s";}},${r(M.gancho + 0.1)});})();`);
  pop('#r7ok', M.completo + 0.2, 2);
  // "Cada erro virava uma regra": as linhas 4 a 14 aparecem rolando; 14 cartões viram amarelos em onda; o SKILL.md do canto vai a 14
  to('#r7gan', '{opacity:0,y:-40,duration:0.2}', M.cada7 - 0.15);
  to('#r7l2', '{backgroundColor:"rgba(242,201,65,0)",duration:0.2}', M.cada7 - 0.1);
  for (let i = 3; i < REGRAS.length; i++) to(`#r7l${i}`, '{filter:"blur(0px)",color:"#0a1626",duration:0.12}', M.cada7 + (i - 3) * 0.08);
  ft('#r7lista', '{y:0}', `{y:${-(REGRAS.length - 6) * LH},duration:1.0,ease:"power2.inOut"}`, M.cada7 + 0.1);
  entra('#r7gr', M.cada7 - 0.05);
  REGRAS.forEach((_, i) => ft(`#r7c${i}`, '{backgroundColor:"#e5484d",rotationY:0}', '{backgroundColor:"#f2c941",rotationY:360,duration:0.35,ease:"power2.out"}', M.cada7 + 0.15 + i * 0.06));
  set('#skill-n', '{textContent:"14 regras"}', M.regra7);
  ft('#skill', '{scale:1}', '{keyframes:[{scale:1.18,duration:0.1},{scale:1,duration:0.25}],ease:"power2.out",immediateRender:false}', M.regra7);
  // "E o próximo vídeo já começava com o aprendizado dos anteriores": volta a SESSÃO 2, agora carregando as 14 regras
  obturador(M.e7 - 0.1);
  set('#r7a', '{opacity:0}', M.e7 - 0.1);
  set('#r7b', '{opacity:1}', M.e7 - 0.1);
  set('#r7s', '{opacity:1}', M.e7 - 0.1);
  ft('#r7p0', '{opacity:0,x:-20}', '{opacity:1,x:0,duration:0.15}', M.e7 + 0.05);
  ft('#r7ld', '{scaleX:0}', `{scaleX:1,duration:${r(M.aprendizado - M.e7 - 0.1)},ease:"power1.inOut"}`, M.e7 + 0.15);
  ft('#r7p1', '{opacity:0,y:20}', '{opacity:1,y:0,duration:0.25,ease:"back.out(2)"}', M.aprendizado);
  ft('#r7px', '{opacity:0,y:80}', '{opacity:1,y:0,duration:0.35,ease:"back.out(1.5)"}', M.aprendizado + 0.2);
  pop('#r7pk', M.anteriores, 2);
}

// 8. O APRESENTADOR (plano aprovado em 17/11/2026). O rosto volta em tela cheia na frase inteira (H3); no "apresentador" a etiqueta
// CÂMERA pisca e pousa o chip APRESENTADOR? (a ironia que arma o twist). "Testei alguns avatares": dois monitores com os testes reais
// (OmniHuman do Magnific e Podcast Studio do HeyGen, de um Reels anterior); zoom no desenho inventado na camiseta e na marca d'água.
if (N >= 8) {
  const CT8 = CORTES[7];
  // monitores em coordenadas da página: 900×510, topo 340 e 870 (os vídeos ficam fora das cenas)
  const MON = [{ id: 'm8a', top: 340, src: 'assets/video/prova/omni.mp4', foco: [558, 510], z: 2.6 }, { id: 'm8b', top: 870, src: 'assets/video/prova/podcast.mp4', foco: [800, 434], z: 1.8 }];
  MON.forEach(m => celular.push(`<div class="a8-mon" id="${m.id}" style="top:${m.top}px"><div class="a8-zoom" id="${m.id}z"><video id="${m.id}v" class="clip" data-start="${r(CT8)}" data-duration="${r(E(7) - CT8)}" data-track-index="10" muted playsinline src="${m.src}"></video></div><b class="a8-x" id="${m.id}x">✕</b></div>`));
  cena(7, `<div class="a8-chip" id="a8chip">APRESENTADOR?</div>
  <div class="a8-circ" id="a8circ"></div><div class="a8-et" id="a8e1" style="left:120px;top:760px">DESENHO INVENTADO</div>
  <div class="a8-box" id="a8box"></div><div class="a8-et" id="a8e2" style="left:120px;top:1232px">MARCA D'ÁGUA</div>`);
  // rosto em tela cheia (H3) do começo até o corte de "Testei"
  set('#card', '{opacity:1}', S(7));
  cardModo(S(7), 'tela');
  trechoAvatar('av3', 'assets/video/heygen/H3p.mp4', 'assets/video/recorte/H3p.webm', S(7), CT8);
  set('#vis-tag', '{textContent:"CÂMERA"}', S(7));
  ft('#vis-tag', '{scale:1,backgroundColor:"#f2c941"}', '{keyframes:[{scale:1.35,backgroundColor:"#e5484d",duration:0.12},{scale:1,backgroundColor:"#f2c941",duration:0.25}],repeat:1,immediateRender:false}', M.apresentador);
  ft('#a8chip', '{opacity:0,scale:2.2,rotation:-5,filter:"blur(10px)"}', '{opacity:1,scale:1,rotation:-5,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', M.apresentador + 0.1);
  set('#a8chip', '{opacity:0}', CT8);
  set('#card', '{opacity:0}', CT8);
  obturador(CT8);
  // "Testei alguns avatares": os dois monitores entram
  MON.forEach((m, i) => { ft(`#${m.id}`, '{opacity:0,y:100,scale:0.9}', '{opacity:1,y:0,scale:1,duration:0.35,ease:"back.out(1.5)"}', CT8 + 0.1 + i * 0.15); set(`#${m.id}`, '{opacity:0}', E(7)); });
  // "desenho na camiseta": zoom no peito do OmniHuman, círculo rosa e ✕
  ft('#m8az', '{scale:1}', `{scale:${MON[0].z},transformOrigin:"${MON[0].foco[0]}px ${MON[0].foco[1]}px",duration:0.6,ease:"power3.inOut",immediateRender:false}`, M.desenho - 0.25);
  ft('#a8circ', '{opacity:0,scale:1.6,rotation:-20}', '{opacity:1,scale:1,rotation:0,duration:0.3,ease:"back.out(2)"}', M.desenho + 0.3);
  sobe('#a8e1', M.camiseta);
  ft('#m8ax', '{opacity:0,scale:2.4,rotation:-12}', '{opacity:1,scale:1,rotation:-12,duration:0.2,ease:"power4.in"}', M.camiseta + 0.25);
  // "marca d'água": zoom no canto do Podcast Studio, caixa rosa e ✕
  ft('#m8bz', '{scale:1}', `{scale:${MON[1].z},transformOrigin:"${MON[1].foco[0]}px ${MON[1].foco[1]}px",duration:0.6,ease:"power3.inOut",immediateRender:false}`, M.podcast - 0.1);
  ft('#a8box', '{opacity:0,scale:1.5}', '{opacity:1,scale:1,duration:0.3,ease:"back.out(2)"}', M.marca - 0.05);
  sobe('#a8e2', M.marca);
  ft('#m8bx', '{opacity:0,scale:2.4,rotation:-12}', '{opacity:1,scale:1,rotation:-12,duration:0.2,ease:"power4.in"}', M.agua + 0.15);
}

// 9. O GÊMEO DIGITAL (plano aprovado em 17/11/2026). Sem o rosto do HeyGen: o painel "novo gêmeo digital" com as três etapas no topo e a
// moldura da webcam vazia ("+ GRAVAR VÍDEO", chip MEU AVATAR). "Gravei 45 segundos": a gravação real do criador (45 s a 30×) com REC e
// cronômetro de 0:00 a 0:45. "criou meu gêmeo digital": escaneamento azul, a cópia desce de trás da moldura e vira o GÊMEO DIGITAL
// (H5 mudo); a de cima vira "REAL · webcam". "A voz?": o "?" e a onda que sai da boca do gêmeo, com o chip CLONE DE VOZ · ElevenLabs.
if (N >= 9) {
  const REC9 = M.gravei - 0.15, FIM9 = E(8), FR = { left: 160, width: 760, height: 428 }, TOPA = 480, TOPB = 945;
  celular.push(`<div class="g9-fr" id="g9a" style="top:${TOPA}px"><div class="g9-vazio" id="g9vz"><b id="g9mais">+</b><span>GRAVAR VÍDEO</span></div><video id="g9av" class="clip" data-start="${r(REC9)}" data-duration="${r(FIM9 - REC9)}" data-track-index="10" muted playsinline src="assets/video/prova/webcam9.mp4"></video><div class="g9-scan" id="g9sc"><i id="g9sl"></i></div><div class="g9-rec" id="g9rec"><i id="g9dot"></i><span id="g9cr">0:00</span></div><b class="g9-tag" id="g9ta">WEBCAM</b></div>`);
  celular.push(`<div class="g9-fr g9-gem" id="g9b" style="top:${TOPB}px"><video id="g9bv" class="clip" data-start="${r(M.criou)}" data-duration="${r(FIM9 - M.criou)}" data-track-index="10" muted playsinline src="assets/video/prova/gemeo2.mp4"></video><b class="g9-tag g9-tag-y" id="g9tb">GÊMEO DIGITAL</b></div>`);
  const etapa = (n, nome) => `<div class="g9-st" id="g9s${n}"><span class="g9-hl" id="g9h${n}"></span><i data-layout-allow-occlusion>${n}</i>${nome}<b class="g9-ok" id="g9k${n}">✓</b></div>`;
  const BARRAS = 12;
  cena(8, `<div class="g9-pan" id="g9pan"><span class="g9-leg">HEYGEN · NOVO GÊMEO DIGITAL</span>${etapa(1, 'Gravar')}<u></u>${etapa(2, 'Consentimento')}<u></u>${etapa(3, 'Treinar')}</div>
  <div class="g9-slot" id="g9slot" style="top:${TOPB}px"><i id="g9sdot"></i><span>GÊMEO DIGITAL</span><small>aguardando a gravação…</small></div>
  <div class="g9-chip" id="g9me">MEU AVATAR</div>
  <div class="g9-q" id="g9q">?</div>
  <div class="g9-onda" id="g9on">${Array.from({ length: BARRAS }, (_, i) => `<i id="g9w${i}"></i>`).join('')}</div>
  <div class="g9-clone" id="g9cl"><b>CLONE DE VOZ</b><em id="g9el">ElevenLabs</em></div>`);
  // "Até que resolvi criar": o painel desce e a moldura vazia entra; o "+" pulsa até a gravação
  sobe('#g9pan', S(8) + 0.1, 0.4);
  ft('#g9a', '{opacity:0,y:60,scale:0.94}', '{opacity:1,y:0,scale:1,duration:0.4,ease:"back.out(1.4)"}', S(8) + 0.2);
  // o lugar do gêmeo já espera embaixo (a moldura vazia, tracejada), para a cópia cair nele no "criou"
  sobe('#g9slot', S(8) + 0.35, 0.4);
  ft('#g9sdot', '{opacity:1}', '{opacity:0.2,duration:0.4,yoyo:true,repeat:11,ease:"sine.inOut"}', S(8) + 0.5);
  to('#g9slot', '{opacity:0,duration:0.12}', M.criou + 0.08); // some antes de a cópia pousar (na v12a o texto ficava sobre o gêmeo)
  ft('#g9mais', '{scale:1}', '{scale:1.16,duration:0.3,ease:"sine.inOut",yoyo:true,repeat:5}', S(8) + 0.6);
  // "meu próprio avatar": o chip MEU AVATAR bate no canto da moldura
  ft('#g9me', '{opacity:0,scale:2.2,rotation:-5,filter:"blur(10px)"}', '{opacity:1,scale:1,rotation:-5,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', M.proprio - 0.12);
  to('#g9me', '{opacity:0,y:-30,duration:0.2}', REC9 - 0.25);
  // "no HeyGen": a etapa 1 acende
  ft('#g9h1', '{opacity:0,scale:1.25}', '{opacity:1,scale:1,duration:0.25,ease:"back.out(2)"}', M.heygen9);
  // "Gravei 45 segundos na webcam": a gravação real, REC piscando e o cronômetro de 0:00 a 0:45 (45 s a 30× = 1,51 s)
  to('#g9vz', '{opacity:0,duration:0.15}', REC9 - 0.05);
  ft('#g9rec', '{opacity:0,x:-20}', '{opacity:1,x:0,duration:0.2,ease:"power3.out"}', REC9);
  ft('#g9dot', '{opacity:1}', '{opacity:0.15,duration:0.19,yoyo:true,repeat:7,ease:"none",immediateRender:false}', REC9);
  add(`(function(){const el=document.querySelector("#g9cr"),o={v:0};tl.fromTo(o,{v:0},{v:45,duration:1.51,ease:"none",onUpdate:()=>{el.textContent="0:"+String(Math.floor(o.v)).padStart(2,"0");}},${r(REC9)});})();`);
  ft('#g9rec', '{scale:1}', '{keyframes:[{scale:1.18,duration:0.1},{scale:1,duration:0.2}],immediateRender:false}', REC9 + 1.51);
  to('#g9rec', '{backgroundColor:"#2f9e5e",duration:0.1}', REC9 + 1.51);
  // a etapa 1 ganha check e a 2 acende
  pop('#g9k1', M.webcam + 0.05, 1.8);
  to('#g9h1', '{opacity:0,duration:0.2}', M.webcam + 0.05);
  ft('#g9h2', '{opacity:0,scale:1.25}', '{opacity:1,scale:1,duration:0.25,ease:"back.out(2)"}', M.webcam + 0.1);
  // "e ele criou": malha azul e linha de escaneamento na webcam; a cópia desce de trás da moldura
  to('#g9rec', '{opacity:0,duration:0.15}', M.criou - 0.3);
  ft('#g9sc', '{opacity:0}', '{opacity:1,duration:0.12}', M.criou - 0.3);
  ft('#g9sl', '{y:0}', `{y:${FR.height},duration:0.55,ease:"power1.inOut"}`, M.criou - 0.3);
  to('#g9sc', '{opacity:0,duration:0.25}', M.gemeo + 0.1);
  ft('#g9b', `{opacity:0.6,y:${TOPA - TOPB},scale:0.97,filter:"blur(8px)"}`, '{opacity:1,y:0,scale:1,filter:"blur(0px)",duration:0.45,ease:"power3.out",immediateRender:false}', M.criou + 0.05); // v12b: sem isso o from (opacidade 0,6) valia desde o quadro 0 e o retângulo aparecia no vídeo todo
  // "meu gêmeo digital": as etiquetas e as etapas 2 e 3
  set('#g9ta', '{textContent:"REAL · webcam"}', M.gemeo);
  ft('#g9ta', '{scale:1.4}', '{scale:1,duration:0.25,ease:"back.out(2)",immediateRender:false}', M.gemeo);
  pop('#g9tb', M.gemeo, 1.8);
  pop('#g9k2', M.gemeo + 0.05, 1.8);
  to('#g9h2', '{opacity:0,duration:0.2}', M.gemeo + 0.05);
  ft('#g9h3', '{opacity:0,scale:1.25}', '{opacity:1,scale:1,duration:0.25,ease:"back.out(2)"}', M.gemeo + 0.1);
  pop('#g9k3', M.digital, 1.8);
  to('#g9h3', '{opacity:0,duration:0.2}', M.digital + 0.08);
  foco('#g9b', M.digital + 0.25, { left: FR.left, top: TOPB, width: FR.width, height: FR.height });
  // "A voz?": o "?" ao lado do gêmeo
  ft('#g9q', '{opacity:0,scale:2.4,rotation:-12}', '{opacity:1,scale:1,rotation:8,duration:0.28,ease:"back.out(2)"}', M.voz - 0.05);
  ft('#g9q', '{y:0}', '{y:-14,duration:0.25,yoyo:true,repeat:1,ease:"sine.inOut",immediateRender:false}', M.voz + 0.25);
  to('#g9q', '{opacity:0,scale:0.6,duration:0.2}', M.clone - 0.1);
  // "Meu clone de voz": a onda sai da boca do gêmeo e segue até o fim; o chip CLONE DE VOZ bate e o ElevenLabs entra
  ft('#g9on', '{opacity:0,scaleX:0}', '{opacity:1,scaleX:1,duration:0.35,ease:"power3.out"}', M.voz + 0.3);
  for (let i = 0; i < BARRAS; i++) {
    const d = r(0.16 + ((i * 7) % 5) * 0.03), h = r(0.45 + ((i * 5) % 7) * 0.08), t0 = M.voz + 0.3; // sem rnd(): não mexe no sorteio do punch das cenas aprovadas
    ft(`#g9w${i}`, '{scaleY:0.2}', `{scaleY:${h},duration:${d},yoyo:true,repeat:${Math.ceil((FIM9 - t0) / d)},ease:"sine.inOut"}`, t0);
  }
  ft('#g9cl', '{opacity:0,scale:2,rotation:-3,filter:"blur(10px)"}', '{opacity:1,scale:1,rotation:-3,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', M.clone - 0.17);
  ft('#g9el', '{opacity:0,x:-30}', '{opacity:1,x:0,duration:0.25,ease:"power3.out"}', M.eleven9);
  ['#g9a', '#g9b'].forEach(sel => set(sel, '{opacity:0}', FIM9));
}

// 10. PLOT TWIST (plano aprovado em 17/11/2026). Rosto em tela cheia (H4) com push-in lento e nenhum efeito sonoro até o "não sou eu".
// "quem está falando": cantoneiras de foco no rosto; "neste momento": o REC para (ponto cinza) e o timecode congela.
// "não sou eu": o sinal falha (cópia do rosto deslocada em vermelho, faixas com cor invertida, quadro tremendo).
// "É meu avatar": a mesma malha de escaneamento da fala 9 passa no rosto, CÂMERA vira AVATAR, carimbo AVATAR e zoom forte.
// Depois, na pausa: rebobinar com três quadros reais do "meu" rosto (66 s, 4,5 s, 1 s), cada um com o carimbo AVATAR.
if (N >= 10) {
  const FIM10 = E(9), REW = FIMVOZ(9) + 0.05, G = M.nao10, PARA = M.momento10 + 0.1;
  const TC = (t) => { const x = Math.floor(t), f = Math.floor((t - x) * 25); return `00:00:${String(x).padStart(2, '0')}:${String(f).padStart(2, '0')}`; };
  celular.push(`<div class="t10-scan" id="t10sc"><i id="t10sl"></i></div><div class="t10-gl" id="t10gl"><i id="t10b1" style="top:430px;height:70px"></i><i id="t10b2" style="top:770px;height:44px"></i><i id="t10b3" style="top:1090px;height:110px"></i></div>`);
  const QUADROS = [{ n: 3, tc: '01:08' }, { n: 2, tc: '00:04' }, { n: 1, tc: '00:01' }];
  cena(9, `<div class="t10-st" id="t10st" data-layout-allow-occlusion>AVATAR</div>
  <div class="t10-rew" id="t10rew"><div class="t10-veu"></div><div class="t10-cab">◀◀ REBOBINANDO</div>${QUADROS.map((q, i) => `<div class="t10-q" id="t10q${i}"><img src="assets/img/rebobinar/r${q.n}.jpg" alt=""><b class="t10-tc">◀◀ ${q.tc}</b><span class="t10-qs" id="t10qs${i}" data-layout-allow-occlusion>AVATAR</span></div>`).join('')}</div>`);
  // rosto em tela cheia (H4p: 0,15 s antes da voz e o último quadro segurado no fim)
  set('#card', '{opacity:1}', S(9));
  cardModo(S(9), 'tela');
  trechoAvatar('av4', 'assets/video/heygen/H4p.mp4', 'assets/video/recorte/H4p.webm', S(9), FIM10);
  set('#vis-tag', '{textContent:"CÂMERA"}', S(9));
  // push-in lento até o "É" e zoom forte no "avatar"
  ft('#av4,#av4p', '{scale:1}', `{scale:1.1,duration:${r(M.e10 - S(9))},ease:"none"}`, S(9));
  to('#av4,#av4p', '{scale:1.28,duration:0.25,ease:"power3.out"}', M.avatar10 - 0.05);
  // "quem está falando com você": as cantoneiras de foco fecham no rosto
  foco('#av4', M.quem10 + 0.2, { left: 250, top: 270, width: 580, height: 860 }, '#f2c941');
  // "neste momento": o REC para e o timecode congela
  set('#vis-pausa', '{opacity:1}', PARA);
  set('#vis-tc2', `{textContent:"${TC(PARA)}",opacity:1}`, PARA);
  // "não sou eu": o sinal falha
  set('#pop', '{clipPath:"inset(0px 0px 0px 0px)",mixBlendMode:"screen"}', G - 0.02);
  set('#av4p', '{opacity:0.6,filter:"sepia(1) saturate(9) hue-rotate(-40deg)"}', G - 0.02);
  ft('#av4p', '{x:0,y:0}', '{keyframes:[{x:-28,y:4,duration:0.06},{x:20,y:-3,duration:0.06},{x:-12,y:2,duration:0.05},{x:32,y:0,duration:0.07},{x:-10,y:0,duration:0.06},{x:14,y:0,duration:0.06},{x:0,y:0,duration:0.06}],ease:"none",immediateRender:false}', G);
  ft('#av4', '{filter:"contrast(1) saturate(1) hue-rotate(0deg)"}', '{keyframes:[{filter:"contrast(1.8) saturate(2.2) hue-rotate(30deg)",duration:0.05},{filter:"contrast(1) saturate(1) hue-rotate(0deg)",duration:0.08},{filter:"contrast(1.6) saturate(0.4) hue-rotate(-30deg)",duration:0.05},{filter:"contrast(1) saturate(1) hue-rotate(0deg)",duration:0.12}],ease:"none",immediateRender:false}', G);
  ft('#t10gl', '{opacity:0}', '{keyframes:[{opacity:1,duration:0.05},{opacity:0,duration:0.05},{opacity:1,duration:0.05},{opacity:1,duration:0.18},{opacity:0,duration:0.05}],ease:"none"}', G);
  [['#t10b1', 90], ['#t10b2', -70], ['#t10b3', 50]].forEach(([sel, a]) => ft(sel, '{x:0}', `{keyframes:[{x:${-a},duration:0.06},{x:${a * 0.7},duration:0.06},{x:${-a * 0.4},duration:0.07},{x:${a},duration:0.07},{x:0,duration:0.08}],ease:"none",immediateRender:false}`, G));
  tremor('#card', G, 16);
  tremor('#card', G + 0.32, 9);
  set('#pop', '{clipPath:"inset(0px 0px 1920px 0px)",mixBlendMode:"normal"}', G + 0.5);
  set('#av4p', '{opacity:1,filter:"none"}', G + 0.5);
  // "É meu avatar": a malha de escaneamento da fala 9 passa no rosto; CÂMERA vira AVATAR; carimbo
  ft('#t10sc', '{opacity:0}', '{opacity:1,duration:0.1}', M.e10 - 0.08);
  ft('#t10sl', '{y:0}', '{y:1300,duration:0.5,ease:"power1.inOut"}', M.e10 - 0.08);
  to('#t10sc', '{opacity:0,duration:0.25}', M.avatar10 + 0.45);
  set('#vis-tag', '{textContent:"AVATAR"}', M.avatar10);
  ft('#vis-tag', '{scale:1.6,backgroundColor:"#e5484d",color:"#ffffff"}', '{scale:1,backgroundColor:"#e5484d",color:"#ffffff",duration:0.3,ease:"back.out(2)",immediateRender:false}', M.avatar10);
  ft('#t10st', '{opacity:0,scale:2.6,rotation:-8,filter:"blur(8px)"}', '{opacity:1,scale:1,rotation:-8,filter:"blur(0px)",duration:0.2,ease:"power4.in"}', M.avatar10 - 0.15);
  to('#t10st', '{opacity:0,duration:0.1}', REW);
  // rebobinar: três quadros reais, do mais recente ao primeiro, cada um com o carimbo AVATAR
  ft('#t10rew', '{opacity:0}', '{opacity:1,duration:0.06}', REW);
  QUADROS.forEach((q, i) => {
    const t = REW + 0.05 + i * 0.24;
    ft(`#t10q${i}`, '{opacity:0,x:-260,scale:0.9}', '{opacity:1,x:0,scale:1,duration:0.1,ease:"power2.out"}', t);
    ft(`#t10qs${i}`, '{opacity:0,scale:2.2,rotation:-10}', '{opacity:1,scale:1,rotation:-10,duration:0.1,ease:"power4.in"}', t + 0.06);
    if (i < QUADROS.length - 1) to(`#t10q${i}`, '{opacity:0,x:260,duration:0.06}', t + 0.2);
  });
  // fim da fala: tudo volta ao normal para as próximas cenas com rosto
  set('#card', '{opacity:0}', FIM10);
  set('#vis-pausa', '{opacity:0}', FIM10);
  set('#vis-tc2', '{opacity:0}', FIM10);
  set('#vis-tag', '{textContent:"CÂMERA",backgroundColor:"#f2c941",color:"#0a1626"}', FIM10);
}

// 11. O ÚLTIMO APRENDIZADO (plano aprovado em 17/11/2026). Sem rosto do HeyGen: celular com o teste real do Avatar IV, painel SINCRONIA
// (trilhas VOZ e BOCA, que se desalinham no "fora de sincronia"), seletor MOTOR IV → V clicado pelo cursor, o celular troca para o teste
// real do Avatar V, as trilhas encaixam e o painel fica verde; PROBLEMA ganha IDENTIFICADO ✓; o cartão da regra voa para o SKILL.md (14 → 15).
if (N >= 11) {
  const FIM11 = E(10), TRC = M.troquei11 + 0.05;
  celular.push(`<div class="s11-cel" id="s11cel"><div class="s11-zoom" id="s11z"><video id="s11iv" class="clip" data-start="${r(S(10))}" data-duration="${r(TRC - S(10))}" data-track-index="10" muted playsinline src="assets/video/prova/iv11.mp4"></video><video id="s11v" class="clip" data-start="${r(TRC)}" data-duration="${r(FIM11 - TRC)}" data-track-index="11" muted playsinline src="assets/video/prova/v11.mp4"></video></div><div class="s11-circ" id="s11ci"></div><b class="s11-tag" id="s11tag">AVATAR IV · teste</b></div>`);
  const ALT = Array.from({ length: 36 }, (_, i) => r(18 + 62 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37))));
  cena(10, `<div class="s11-1a" id="s11pri">1ª TENTATIVA</div>
  <div class="s11-lab" id="s11lab">MOTOR DE RENDERIZAÇÃO</div>
  <div class="s11-bt s11-iv" id="s11b1">AVATAR IV</div>
  <div class="s11-bt" id="s11b2">AVATAR V<span class="s11-sel" id="s11sel">AVATAR V ✓</span></div>
  <div class="s11-pb" id="s11pb" data-layout-allow-occlusion>⚠ BOCA FORA DE SINCRONIA</div>
  <div class="s11-id" id="s11id" data-layout-allow-occlusion>IDENTIFICADO ✓</div>
  <div class="s11-rg" id="s11rg"><small>REGRA 15</small><b>motor Avatar V</b></div>
  <div class="s11-pan" id="s11pan"><span class="s11-leg">SINCRONIA</span><b class="s11-st s11-ruim" id="s11ruim">FORA DE SINCRONIA</b><b class="s11-st s11-bom" id="s11bom">EM SINCRONIA ✓</b>
    <span class="s11-row" style="top:58px">VOZ</span><span class="s11-row" style="top:158px">BOCA</span>
    <div class="s11-tr" style="top:40px">${ALT.map(h => `<i style="height:${h}px"></i>`).join('')}</div>
    <div class="s11-clip" style="top:140px"><div class="s11-tr s11-boca" id="s11boca">${ALT.map(h => `<i style="height:${r(h * 0.75)}px"></i>`).join('')}</div></div>
    <div class="s11-gap" id="s11gap"></div><div class="s11-ph" id="s11ph"></div></div>
  <svg class="s11-cur" id="s11cur" width="56" height="64" viewBox="0 0 28 32"><path d="M3 2 L3 26 L9 20 L13 30 L17 28 L13 18 L22 18 Z" fill="#ffffff" stroke="#0a1626" stroke-width="2" stroke-linejoin="round"/></svg>`);
  // "E nem isso funcionou": o celular com o teste real do Avatar IV; "primeira": 1ª TENTATIVA
  ft('#s11cel', '{opacity:0,y:80,scale:0.92}', '{opacity:1,y:0,scale:1,duration:0.4,ease:"back.out(1.4)"}', S(10) + 0.15);
  ft('#s11pri', '{opacity:0,scale:1.8,rotation:-4}', '{opacity:1,scale:1,rotation:-4,duration:0.32,ease:"back.out(2.2)"}', M.funcionou11);
  to('#s11pri', '{opacity:0,y:-60,duration:0.2}', M.motor11 - 0.15);
  // "O motor de renderização": o seletor e o painel entram; a linha de leitura corre até o fim
  sobe('#s11lab', M.motor11);
  sobe('#s11b1', M.motor11 + 0.08);
  sobe('#s11b2', M.motor11 + 0.16);
  sobe('#s11pan', M.renderizacao11);
  ft('#s11ph', '{x:0}', `{x:760,duration:${r(FIM11 - M.renderizacao11)},ease:"none"}`, M.renderizacao11);
  // "a boca": zoom na boca do Avatar IV; "fora de sincronia": a trilha BOCA se desloca, colchete rosa, círculo e o chip do problema
  ft('#s11z', '{scale:1}', '{scale:1.9,transformOrigin:"197px 386px",duration:0.5,ease:"power3.inOut",immediateRender:false}', M.boca11 - 0.2);
  ft('#s11boca', '{x:0}', '{x:70,duration:0.35,ease:"power2.inOut"}', M.fora11);
  ft('#s11gap', '{opacity:0,scaleX:0.4}', '{opacity:1,scaleX:1,duration:0.25,ease:"back.out(2)"}', M.fora11 + 0.2);
  pop('#s11ruim', M.sincronia11, 1.6);
  ft('#s11ci', '{opacity:0,scale:1.6}', '{opacity:1,scale:1,duration:0.3,ease:"back.out(2)"}', M.sincronia11);
  sobe('#s11pb', M.sincronia11 + 0.15);
  // "Troquei o motor": o cursor clica no AVATAR V e o celular troca para o teste real do Avatar V
  to('#s11z', '{scale:1,duration:0.3,ease:"power2.inOut"}', M.troquei11 - 0.45);
  to('#s11ci', '{opacity:0,duration:0.2}', M.troquei11 - 0.45);
  ft('#s11cur', '{opacity:0,x:820,y:1000}', '{opacity:1,x:760,y:600,duration:0.4,ease:"power2.out"}', M.troquei11 - 0.5);
  ft('#s11cur', '{scale:1}', '{keyframes:[{scale:0.8,duration:0.08},{scale:1,duration:0.12}],immediateRender:false}', M.troquei11 - 0.05);
  ft('#s11sel', '{opacity:0,scale:1.3}', '{opacity:1,scale:1,duration:0.22,ease:"back.out(2)"}', M.troquei11);
  to('#s11b1', '{opacity:0.4,duration:0.2}', M.troquei11);
  to('#s11cur', '{opacity:0,duration:0.2}', M.troquei11 + 0.4);
  obturador(TRC);
  set('#s11tag', '{textContent:"AVATAR V · teste"}', TRC);
  // "ajustei a configuração e resolvi": a trilha BOCA encaixa na VOZ e o painel fica verde
  to('#s11boca', '{x:0,duration:0.5,ease:"power3.inOut"}', M.ajustei11 + 0.1);
  to('#s11gap', '{opacity:0,duration:0.2}', M.ajustei11 + 0.5);
  to('#s11ruim', '{opacity:0,duration:0.15}', M.resolvi11 - 0.05);
  pop('#s11bom', M.resolvi11, 1.6);
  ft('#s11pan', '{borderColor:"#0a1626"}', '{borderColor:"#2f9e5e",duration:0.2,immediateRender:false}', M.resolvi11);
  // "Mais um problema identificado": carimbo IDENTIFICADO ✓ sobre o chip
  ft('#s11id', '{opacity:0,scale:2.4,rotation:-6,filter:"blur(8px)"}', '{opacity:1,scale:1,rotation:-6,filter:"blur(0px)",duration:0.2,ease:"power4.in"}', M.identificado11 - 0.15);
  // "Mais uma regra incorporada ao estúdio": o cartão da regra voa para o SKILL.md, que passa a 15
  pop('#s11rg', M.mais11b, 1.6);
  to('#s11rg', '{x:150,y:-740,scale:0.25,opacity:0,duration:0.45,ease:"power3.in"}', M.incorporada11 + 0.3);
  const POUSO = M.incorporada11 + 0.75;
  set('#skill-n', '{textContent:"15 regras"}', POUSO);
  ft('#skill', '{scale:1}', '{keyframes:[{scale:1.2,duration:0.1},{scale:1,duration:0.25}],ease:"power2.out",immediateRender:false}', POUSO);
  foco('#skill', POUSO + 0.1, { left: 770, top: 140, width: 280, height: 118 }, '#f2c941');
  set('#s11cel', '{opacity:0}', FIM11);
}

// 12. FECHAMENTO (plano aprovado em 17/11/2026). Sem rosto: o baralho do hook volta com um quadro real de cada versão do Reels 1 (o da Uber)
// (v1 a v14), distribuído numa grade; "perdidas": faixa PERDIDA? em cascata; "oportunidades": as faixas caem e as versões ficam verdes;
// "ensinar o sistema": cada versão vira uma linha do SKILL.md grande; "erros": carimbo NÃO SE REPETE ✓. Corte seco para o rosto (H5):
// chip GERAR (cinza, pequeno) e CONSTRUIR (amarelo, grande), o painel do estúdio volta pequeno; "nisso": o GERAR apaga e o foco trava no CONSTRUIR.
if (N >= 12) {
  const CT12 = CORTES[11], FIM12 = E(11), NV = 14;
  const POS = (i) => ({ x: 91 + (i % 7) * 130, y: i < 7 ? 370 : 600 });
  const linhaArq = (i) => `<p id="f12l${i}"><b>${i + 1}.</b><i></i></p>`;
  cena(11, `<div class="f12-grade">${Array.from({ length: NV }, (_, i) => { const q = POS(i); return `<div class="f12-k" id="f12k${i}" style="left:${q.x}px;top:${q.y}px"><img src="assets/img/uber14/v${i + 1}.jpg" alt=""><b class="f12-v">v${i + 1}</b><span class="f12-ok" id="f12ok${i}"></span><span class="f12-p" id="f12p${i}" data-layout-allow-occlusion>PERDIDA?</span></div>`; }).join('')}</div>
  <div class="f12-arq" id="f12arq"><div class="f12-cab"><span class="f12-ic"></span><b>SKILL.md</b><em>15 regras</em></div><div class="f12-ls">${Array.from({ length: NV }, (_, i) => linhaArq(i)).join('')}</div><div class="f12-st" id="f12st" data-layout-allow-occlusion>NÃO SE REPETE ✓</div></div>
  <div class="f12-ger" id="f12ger">GERAR</div>
  <div class="f12-con" id="f12con">CONSTRUIR</div>
  <div class="f12-est" id="f12est"><span class="f12-leg">ESTÚDIO</span><b>HYPERFRAMES</b><b>ELEVENLABS</b><b>WHISPER</b><b class="f12-sk">SKILL.md · 15</b></div>`);
  // "catorze versões": o baralho sai do centro e se distribui na grade, uma carta de cada vez
  for (let i = 0; i < NV; i++) {
    const q = POS(i), dx = r(476 - q.x), dy = r(700 - q.y), rot = r(((i * 37) % 21) - 10);
    ft(`#f12k${i}`, `{opacity:0,x:${dx},y:${dy},rotation:${rot},scale:0.8}`, '{opacity:1,x:0,y:0,rotation:0,scale:1,duration:0.35,ease:"power3.out"}', M.c14a - 0.25 + i * 0.06);
  }
  // "tentativas perdidas": PERDIDA? em cascata
  for (let i = 0; i < NV; i++) ft(`#f12p${i}`, '{opacity:0,scale:1.8,rotation:-14}', '{opacity:1,scale:1,rotation:-14,duration:0.16,ease:"power4.in"}', M.c14b + i * 0.065);
  // "Representam catorze oportunidades": as faixas despencam e as versões ganham a borda verde
  for (let i = 0; i < NV; i++) {
    to(`#f12p${i}`, '{y:260,rotation:20,opacity:0,duration:0.4,ease:"power2.in"}', M.representam12 + i * 0.03);
    ft(`#f12ok${i}`, '{opacity:0,scale:1.15}', '{opacity:1,scale:1,duration:0.2,ease:"back.out(2)"}', M.oportunidades12 - 0.2 + i * 0.04);
  }
  // "de ensinar o sistema": o SKILL.md grande entra e cada versão voa para ele, virando uma linha
  sobe('#f12arq', M.oportunidades12 + 0.2, 0.4);
  for (let i = 0; i < NV; i++) {
    const q = POS(i), t = M.ensinar12 - 0.15 + i * 0.05;
    to(`#f12k${i}`, `{x:${r(420 - q.x)},y:${r(1080 - q.y)},scale:0.15,opacity:0,duration:0.32,ease:"power3.in"}`, t);
    ft(`#f12l${i}`, '{opacity:0,x:-30}', '{opacity:1,x:0,duration:0.2,ease:"power3.out"}', t + 0.28);
  }
  // "a não cometer os mesmos erros": o SKILL.md sobe para o centro (a grade já esvaziou) e o carimbo bate nele
  to('#f12arq', '{y:-300,scale:1.1,duration:0.35,ease:"power3.inOut"}', M.nao12b - 0.35);
  ft('#f12st', '{opacity:0,scale:2.4,rotation:-7,filter:"blur(8px)"}', '{opacity:1,scale:1,rotation:-7,filter:"blur(0px)",duration:0.2,ease:"power4.in"}', M.nao12b);
  // corte seco para o rosto (H5); a etiqueta agora diz AVATAR, depois do twist
  set('#card', '{opacity:1}', CT12);
  cardModo(CT12, 'tela');
  trechoAvatar('av5', 'assets/video/heygen/H5p.mp4', 'assets/video/recorte/H5p.webm', CT12, FIM12);
  set('#vis-tag', '{textContent:"AVATAR",backgroundColor:"#e5484d",color:"#ffffff"}', CT12);
  ['#f12arq', '#f12st'].forEach(sel => set(sel, '{opacity:0}', CT12));
  obturador(CT12);
  // "gerar": chip cinza e pequeno à esquerda; "construir": chip amarelo e grande à direita; "estúdio": o painel do estúdio volta pequeno
  ft('#f12ger', '{opacity:0,x:-60}', '{opacity:1,x:0,duration:0.3,ease:"power3.out"}', M.gerar12 - 0.05);
  ft('#f12con', '{opacity:0,scale:2.2,rotation:4,filter:"blur(10px)"}', '{opacity:1,scale:1,rotation:4,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', M.construir12 - 0.17);
  sobe('#f12est', M.estudio12b - 0.05, 0.35);
  // "está justamente nisso": zoom leve, o GERAR apaga e o foco trava no CONSTRUIR
  ft('#av5,#av5p', '{scale:1}', `{scale:1.08,duration:${r(FIM12 - M.esta12)},ease:"power1.out",immediateRender:false}`, M.esta12);
  to('#f12ger', '{opacity:0.3,scale:0.88,duration:0.3}', M.esta12);
  foco('#f12con', M.justamente12 ?? (M.esta12 + 0.45), { left: 640, top: 675, width: 370, height: 115 }, '#f2c941');
  set('#card', '{opacity:0}', FIM12);
  set('#vis-tag', '{textContent:"CÂMERA",backgroundColor:"#f2c941",color:"#0a1626"}', FIM12);
}

// 13. CTA (plano aprovado em 18/11/2026). O rosto (H6) volta no card de baixo com a cabeça saindo pela borda, como no hook. "você percebeu":
// enquete SIM / NÃO, o cursor passa pelas duas (sem resultado); "as skills": card do repositório no GitHub com as três pastas reais;
// "comenta ESTÚDIO": a palavra se monta letra por letra, o comentário "@você · ESTÚDIO" ganha coração e chega a DM de @seu.perfil.
if (N >= 13) {
  const FIM13 = E(12), LETRAS = [...'ESTÚDIO'];
  const PASTAS = ['reels-narrado-hyperframes', 'hyperframes', 'estilo-tipografia-cinetica'];
  cena(12, `<div class="c13-poll" id="c13poll"><b>VOCÊ PERCEBEU QUE ERA UM AVATAR?</b><div class="c13-bts"><span id="c13sim">SIM</span><span id="c13nao">NÃO</span></div></div>
  <div class="c13-repo" id="c13repo"><div class="c13-rcab"><i></i>Repositório no GitHub<em>skills</em></div>${PASTAS.map((n, i) => `<p id="c13r${i}"><i></i>${n}/<b>SKILL.md</b></p>`).join('')}</div>
  <div class="c13-big" id="c13big">${LETRAS.map((l, i) => `<span id="c13l${i}">${l}</span>`).join('')}</div>
  <div class="c13-com" id="c13com"><i class="c13-av"></i><div><small>@você</small><b>ESTÚDIO</b></div><span class="c13-heart" id="c13heart">♥</span></div>
  <div class="c13-dm" id="c13dm"><small>@seu.perfil · DM</small><b>te mandei o link do repo 🔗</b></div>
  <div class="c13-cta" id="c13cta">COMENTA ESTÚDIO <span id="c13seta">↓</span> · LINK DO REPO NA DM</div>
  <svg class="c13-cur" id="c13cur" width="56" height="64" viewBox="0 0 28 32"><path d="M3 2 L3 26 L9 20 L13 30 L17 28 L13 18 L22 18 Z" fill="#ffffff" stroke="#0a1626" stroke-width="2" stroke-linejoin="round"/></svg>`);
  // o rosto volta no card de baixo, com o pop-out (H6p: 0,15 s antes da voz e o fim segurado); a etiqueta segue AVATAR
  set('#card', '{opacity:1}', S(12));
  cardModo(S(12), 'baixo');
  trechoAvatar('av6', 'assets/video/heygen/H6p.mp4', 'assets/video/recorte/H6p.webm', S(12), FIM13);
  set('#vis-tag', '{textContent:"AVATAR",backgroundColor:"#e5484d",color:"#ffffff"}', S(12));
  // "você percebeu que era um avatar antes de eu revelar?": a enquete; o cursor passa pelo SIM e pelo NÃO
  sobe('#c13poll', M.voce13 - 0.1, 0.35);
  ft('#c13cur', '{opacity:0,x:560,y:860}', '{opacity:1,x:330,y:610,duration:0.4,ease:"power2.out"}', M.percebeu13);
  ft('#c13sim', '{scale:1}', '{scale:1.08,duration:0.2,ease:"power2.out",immediateRender:false}', M.percebeu13 + 0.35);
  to('#c13sim', '{scale:1,duration:0.2}', M.revelar13 - 0.25);
  to('#c13cur', '{x:710,y:610,duration:0.4,ease:"power2.inOut"}', M.revelar13 - 0.3);
  ft('#c13nao', '{scale:1}', '{scale:1.08,duration:0.2,ease:"power2.out",immediateRender:false}', M.revelar13 + 0.1);
  to('#c13cur', '{opacity:0,duration:0.2}', M.e13 - 0.1);
  to('#c13poll', '{opacity:0,y:-60,duration:0.2,ease:"power2.in"}', M.e13 - 0.1);
  // "as skills que uso": o repositório com as três pastas
  sobe('#c13repo', M.e13 + 0.1, 0.35);
  [M.conhecer13, M.skills13, M.produzir13].forEach((t, i) => ft(`#c13r${i}`, '{opacity:0,x:-40}', '{opacity:1,x:0,duration:0.25,ease:"power3.out"}', t));
  to('#c13repo', '{opacity:0,y:-60,duration:0.2,ease:"power2.in"}', M.comenta13 - 0.15);
  // "comenta ESTÚDIO": as letras batem uma a uma; o comentário ganha coração e chega a DM; a chamada fica até o fim
  LETRAS.forEach((_, i) => ft(`#c13l${i}`, '{opacity:0,scale:2.4,y:-30,filter:"blur(8px)"}', '{opacity:1,scale:1,y:0,filter:"blur(0px)",duration:0.2,ease:"power4.in"}', M.comenta13 + 0.05 + i * 0.06));
  const PRONTO = M.comenta13 + 0.05 + (LETRAS.length - 1) * 0.06 + 0.2;
  ft('#c13big', '{scale:1}', '{keyframes:[{scale:1.06,duration:0.1},{scale:1,duration:0.25}],immediateRender:false}', PRONTO);
  sobe('#c13com', PRONTO + 0.05, 0.3);
  ft('#c13heart', '{opacity:0,scale:2.4}', '{opacity:1,scale:1,duration:0.3,ease:"back.out(2.5)"}', PRONTO + 0.3);
  ft('#c13dm', '{opacity:0,y:40,scale:0.9}', '{opacity:1,y:0,scale:1,duration:0.35,ease:"back.out(1.6)"}', PRONTO + 0.5);
  sobe('#c13cta', PRONTO + 0.8, 0.3);
  ft('#c13seta', '{y:0}', `{y:12,duration:0.3,yoyo:true,repeat:${Math.max(1, Math.ceil((FIM13 - PRONTO - 0.8) / 0.3))},ease:"sine.inOut"}`, PRONTO + 0.8);
}

// ---------- legendas (estilo do kit, aprovado num Reels anterior) ----------
// 1 a 3 palavras por vez; número sozinho; troca seca 2 quadros antes da palavra.
// Posição: no rosto cheio, no peito (y 1330); com o visor embaixo, logo acima dele (y 880); sem rosto, faixa de cima (y 300).
const legendas = [];
const Q2 = 2 / 30;
// v4: onde fica a legenda em cada fala, conforme o rosto (tela cheia: peito, y 1250; card embaixo: acima da cabeça, y 900)
const ONDE = (k, t) => k === 0 ? (t < CORTE1 ? 900 : 1250) : k === 1 ? (t < CORTES[1] ? 1250 : 900) : k >= 2 && k <= 6 ? 1400 : k === 7 ? (t < CORTES[7] ? 1250 : 1420) : k === 8 ? 1390 : k === 9 ? 1250 : k === 10 ? 1400 : k === 11 ? (t < CORTES[11] ? 1400 : 1250) : k === 12 ? 900 : 300;
linhas.forEach((l, k) => {
  const pedacos = [];
  l.paginas.forEach((pg, j) => {
    let atual = [];
    const fecha = () => { if (atual.length) pedacos.push(atual); atual = []; };
    pg.forEach((w) => {
      if (w.obj && /\d/.test(w.d)) { fecha(); pedacos.push([w]); return; }
      atual.push(w);
      if (atual.length === 3 || /[.,:;?!]$/.test(w.d)) fecha();
    });
    fecha();
    pg.forEach((w) => { if (w.bum) explode(540, 400, w.t, 12, 300); });
    // v5b: punch alternado na câmera a cada página, nas cenas sem rosto (padrão do motor do Reels 1)
    if (k >= 2 && j > 0) add(`tl.to("#c${k + 1}z",{scale:${j % 2 ? 1.07 : 1},x:${j % 2 ? (rnd() > 0.5 ? 24 : -24) : 0},y:${j % 2 ? -16 : 0},duration:0.3,ease:"power3.out"},${r(pg[0].t - 0.1)});`);
  });
  pedacos.forEach((p, q) => {
    const ini = Math.max(l.S, p[0].t - Q2);
    const prox = q < pedacos.length - 1 ? pedacos[q + 1][0].t - Q2 : l.E;
    const fimFala = (p[p.length - 1].fim ?? p[p.length - 1].t + 0.4) + 0.35;
    const fim = Math.min(prox, q < pedacos.length - 1 ? prox : Math.max(fimFala, ini + 0.4), l.E);
    const txt = p.map(w => w.d).join(' ');
    const cls = p.some(w => w.it) ? ' it' : p.some(w => w.hl) ? ' cor' : '';
    const longo = txt.length > 20 ? ' longo' : '';
    // v3: a legenda que atravessa o corte do hook se divide nele, para trocar de lugar junto com o rosto
    const cx = CORTES[k];
    const partes = cx !== undefined && ini < cx && fim > cx + 0.05 ? [[ini, cx], [cx, fim]] : [[ini, fim]];
    partes.forEach(([a, b]) => legendas.push(`<div class="clip cap-k${cls}${longo}" data-start="${r(a)}" data-duration="${r(b - a)}" data-track-index="2" data-layout-allow-overlap style="top:${ONDE(k, a + 0.01)}px"><span>${txt}</span></div>`));
  });
});

// ---------- áudio ----------
const audios = linhas.map((l, k) => `<audio id="voz${k + 1}" class="clip" data-start="${r(l.A)}" data-duration="${r(l.dur)}" data-track-index="5" data-volume="1" src="${AUDIO}${l.arq}"></audio>`);
const sons = {};
const duracaoSfx = (nome) => parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', `assets/sfx/${nome}.mp3`]).toString());
function som(nome) {
  if (sons[nome]) return sons[nome];
  const e = spawnSync('ffmpeg', ['-hide_banner', '-i', `assets/sfx/${nome}.mp3`, '-af', 'aresample=44100,asetnsamples=441,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
  const v = [...e.matchAll(/pts_time:([\d.]+)[^\n]*\n[^\n]*?RMS_level=(-?[\d.]+|-inf)/g)].map(m => [+m[1], parseFloat(m[2])]).filter(x => isFinite(x[1]));
  const p = v.reduce((a, b) => b[1] > a[1] ? b : a);
  return (sons[nome] = { pico: p[0], inicio: v.find(x => x[1] > p[1] - 30)[0], fim: duracaoSfx(nome) });
}
const sfx = [], agenda = [];
function efeito(nome, t, vol, util) {
  if (!Number.isFinite(t)) throw new Error(`efeito ${nome}: tempo inválido (${t}); a marca da palavra não existe mais?`);
  const s = som(nome), alinha = /^(whoosh|impact|boom|vira|letreiro-trava|trailer|obturador|claquete)/.test(nome.replace(/^tema\//, '')) ? 'pico' : 'inicio';
  const ini = r(Math.max(0, t - s[alinha])), dur = r(Math.min(s.fim, s.inicio + (util ?? s.fim)));
  agenda.push({ nome, evento: r(t), soa: r(ini + s.inicio), vol });
  sfx.push(`<audio id="sfx${sfx.length + 1}" class="clip" data-start="${ini}" data-duration="${dur}" data-track-index="6" data-volume="${vol}" src="assets/sfx/${nome}.mp3"></audio>`);
}
const WHOOSH = ['whoosh-short', 'whoosh-short-grave', 'whoosh-short-agudo']; let wq = 0;
const whoosh = (t, vol) => efeito(WHOOSH[wq++ % WHOOSH.length], t, vol);
linhas.forEach((l, k) => { if (k > 0) { efeito('tema/obturador-a', l.S, 0.3); obturador(l.S); } }); // v2: obturador em cada troca de cena
// 1. hook (v2: sons do tema estúdio, versões escolhidas pela medição em 17/11/2026)
efeito('tema/rec-b', M.um - 0.05, 0.16);                            // cartão v1: bipe de gravação
efeito('tema/timeline-a', M.minuto + 0.1, 0.22, 0.35);              // cronômetro 1:00
efeito('tema/projetor-a', DEAL0, 0.24, 0.62);                       // o leque de quadros de película (para antes do 14)
efeito('tema/trailer-b', POUSO14, 0.42);                            // o 14 pousa: o maior soco do vídeo
efeito('tema/foco-b', POUSO14 + 0.14, 0.2);                         // as cantoneiras de foco travam
efeito('tema/render-a', M.bom - 0.3, 0.2, 1.0);                           // check no v14: render concluído
efeito('tema/obturador-a', CORTE1, 0.32);                           // obturador no corte para o card grande
[M.nao, M.foi, M.que].forEach(t => efeito('tema/timeline-a', t, 0.14, 0.18)); // tachados
// 2. promessa
if (N >= 2) {
  efeito('tema/claquete-b', M.estudio, 0.32);                       // o braço da claquete fecha
  efeito('tema/obturador-a', CORTES[1], 0.3);                       // corte para o card de baixo
  efeito('tema/teclado-b', CORTES[1] + 0.45, 0.2, 0.9);             // o comando no terminal
  efeito('tema/timeline-a', M.e2, 0.16, 0.4);                       // a barra do terminal corre
  efeito('tema/rec-a', M.erro, 0.2);                                // cartão ERRO
  efeito('tema/obturador-b', M.regra, 0.22, 0.25);                  // o cartão vira REGRA
  efeito('tema/foco-b', M.proximo + 0.3, 0.2);                      // a regra trava no SKILL.md
}
// 3. o estúdio
if (N >= 3) {
  efeito('tema/timeline-a', M.tres, 0.18, 0.35);                    // os três encaixes
  efeito('tema/projetor-a', M.juntas - 0.1, 0.18, 0.45);            // a linha liga os três
  efeito('tema/foco-b', M.hyper, 0.18);                             // chip HYPERFRAMES
  efeito('tema/render-b', M.anima + 0.1, 0.14, 0.6);                // os keyframes acendem
  efeito('tema/teclado-b', M.claude3 + 0.2, 0.2, 0.8);              // o Claude Code digita
  efeito('tema/obturador-b', M.tudo, 0.16, 0.25);                   // setas para os três encaixes
  efeito('tema/rec-b', M.eleven, 0.15);                             // chip ELEVENLABS
  efeito('tema/claquete-b', M.local + 0.05, 0.22);                  // selo LOCAL
  [1, 2, 3, 4, 5].forEach(i => efeito('tema/timeline-b', M[`w${i}`], 0.09, 0.12)); // cada palavra encaixa
}
// 4. montado… e péssimo (v7)
if (N >= 4) {
  efeito('tema/projetor-a', M.pronto + 0.2, 0.18, 0.9);              // os clipes voam para as trilhas
  efeito('tema/obturador-b', M.montado - 0.02, 0.2, 0.2);           // o clique em RENDERIZAR
  efeito('tema/render-a', M.montado + 0.08, 0.18, 0.9);              // ✓ MONTADO
  efeito('tema/foco-a', M.problema, 0.2);                           // o foco se perde
  efeito('tema/rec-a', M.problema + 0.15, 0.14);                    // a notificação
  efeito('tema/timeline-a', M.rapido - 0.2, 0.18, 0.5);             // exportando
  efeito('tema/timeline-b', M.rapido + 0.55, 0.1, 0.25);            // o celular sobe
  efeito('tema/trailer-a', M.pessimo + 0.05, 0.36);                 // PÉSSIMO (mais fraco que o 14)
}
// 5. primeira virada
if (N >= 5) {
  [0, 0.55, 1.1].forEach(d => efeito('tema/rec-a', S(4) + 0.3 + d, 0.12));  // o monitor ainda pulsa…
  efeito('tema/timeline-a', M.momentos + 0.1, 0.16, 0.4);           // as faixas PARADO entram
  efeito('tema/obturador-a', M.nada + 0.6, 0.24);                   // fim do congelamento (0,6 s em silêncio antes)
  efeito('tema/obturador-b', M.foi5 - 0.1, 0.22, 0.25);             // corte para o b-roll
  efeito('tema/foco-b', M.verdadeiro, 0.2);                         // chip O VERDADEIRO PROBLEMA
  efeito('tema/teclado-b', M.claude5, 0.18, 0.7);                   // as sessões
  efeito('tema/rebobinar-b', M.correcoes, 0.16, 0.9);               // as correções viram poeira
  efeito('tema/claquete-b', M.anterior, 0.22);                      // COMEÇA DO ZERO
}
// 6. a estratégia
if (N >= 6) {
  efeito('tema/obturador-b', M.estrategia, 0.24, 0.25);             // a chave vira
  [M.corrigir, M.mesmo, M.erro6, M.todo].forEach(t => efeito('tema/timeline-a', t + 0.05, 0.14, 0.15)); // um X por palavra
  efeito('tema/rec-b', M.transformar - 0.05, 0.14);                 // o cursor pega a correção
  efeito('tema/rebobinar-a', M.skill - 0.1, 0.16, 0.5);             // o SKILL.md cresce
  efeito('tema/teclado-b', M.arquivo, 0.18, 0.5);                   // a linha 1 é digitada
  efeito('tema/claquete-a', M.permanentes + 0.1, 0.5);              // cadeado e PERMANENTE
}
// 7. as regras
if (N >= 7) {
  efeito('tema/timeline-a', M.fala7, 0.14, 0.3);                    // linha 1 / ponteiro
  efeito('tema/render-b', M.nenhum + 0.2, 0.14, 0.7);               // o medidor sobe
  efeito('tema/render-a', M.completo + 0.2, 0.16, 0.8);              // gancho dentro do limite
  efeito('tema/projetor-a', M.cada7 + 0.1, 0.16, 0.8);              // as regras rolando
  efeito('tema/trailer-a', M.regra7, 0.3);                          // 14 regras
  efeito('tema/obturador-b', M.e7 - 0.1, 0.22, 0.25);               // volta a sessão 2
  efeito('tema/teclado-a', M.e7 + 0.05, 0.45, 0.6);                 // lendo SKILL.md…
  efeito('tema/foco-b', M.aprendizado, 0.2);                        // 14 regras carregadas
}
// 8. o apresentador
if (N >= 8) {
  efeito('tema/rec-b', M.apresentador, 0.16);                       // CÂMERA pisca
  efeito('tema/obturador-b', M.testei - 0.1, 0.22, 0.25);           // corte para os monitores
  efeito('tema/projetor-a', M.testei + 0.05, 0.16, 0.6);            // os testes entram
  efeito('tema/foco-b', M.desenho, 0.18);                           // zoom na camiseta
  efeito('tema/claquete-b', M.camiseta + 0.25, 0.22);               // ✕
  efeito('tema/foco-a', M.podcast, 0.18);                           // zoom na marca d'água
  efeito('tema/claquete-a', M.agua + 0.15, 0.45);                   // ✕
}
// 9. o gêmeo digital
if (N >= 9) {
  efeito('tema/rec-a', M.proprio, 0.18);                            // chip MEU AVATAR
  efeito('tema/timeline-b', M.gravei - 0.15, 0.12, 0.4);            // REC: a gravação começa
  efeito('tema/timeline-a', M.webcam + 0.05, 0.14, 0.2);            // etapa 1 ✓
  efeito('tema/render-a', M.criou - 0.1, 0.18, 1.0);                // escaneamento e cópia: o gêmeo
  efeito('tema/rec-b', M.voz - 0.05, 0.15);                         // "?"
  efeito('tema/foco-b', M.clone, 0.2);                              // chip CLONE DE VOZ
}
// 10. plot twist (nenhum efeito até o "não sou eu")
if (N >= 10) {
  efeito('glitch-2', M.nao10, 0.3, 0.6);                            // o sinal falha
  efeito('tema/render-b', M.e10 - 0.08, 0.14, 0.6);                 // escaneamento (render-a soou na fala 9, 10 s antes)
  efeito('tema/claquete-b', M.avatar10 - 0.05, 0.3);                // carimbo AVATAR
  efeito('tema/rebobinar-b', FIMVOZ(9) + 0.05, 0.2, 0.8);           // rebobinar
}
// 11. o último aprendizado
if (N >= 11) {
  efeito('tema/rebobinar-a', M.fora11, 0.16, 0.6);                  // as trilhas se desalinham
  efeito('tema/obturador-b', M.troquei11 - 0.05, 0.22, 0.25);       // o clique no AVATAR V
  efeito('tema/render-a', M.resolvi11, 0.18, 1.0);                  // EM SINCRONIA ✓
  efeito('tema/timeline-a', M.identificado11 - 0.05, 0.16, 0.3);    // IDENTIFICADO ✓
  efeito('tema/foco-b', M.incorporada11 + 0.85, 0.2);                // a regra trava no SKILL.md (como na fala 2)
}
// 12. fechamento
if (N >= 12) {
  efeito('tema/projetor-a', M.c14a - 0.25, 0.2, 0.9);               // o baralho volta e se distribui
  [0, 0.3, 0.6].forEach(d => efeito('tema/timeline-b', M.c14b + d, 0.1, 0.15)); // PERDIDA? em cascata
  efeito('tema/projetor-b', M.representam12, 0.16, 0.6);            // as faixas despencam
  efeito('tema/teclado-a', M.ensinar12, 0.35, 0.9);                 // as linhas entram no SKILL.md
  efeito('tema/claquete-b', M.nao12b + 0.2, 0.24);                // NÃO SE REPETE ✓
  efeito('tema/claquete-a', M.construir12 + 0.05, 0.4);             // CONSTRUIR
  efeito('tema/render-b', M.estudio12b, 0.14, 0.6);                 // o painel do estúdio
  efeito('tema/foco-a', M.esta12 + 0.45, 0.18);                     // o foco trava no CONSTRUIR
}
// 13. CTA
if (N >= 13) {
  const PRONTO13 = M.comenta13 + 0.05 + 6 * 0.06 + 0.2;
  efeito('tema/rec-a', M.voce13 - 0.1, 0.16);                       // a enquete entra
  efeito('tema/teclado-b', M.conhecer13, 0.18, 0.8);                // o repositório das skills
  efeito('tema/trailer-a', PRONTO13, 0.32);                         // ESTÚDIO completo (mais fraco que o 14 do hook)
  efeito('tema/render-a', PRONTO13 + 0.5, 0.16, 0.9);              // a resposta chega na DM
}
for (const a of agenda.filter(x => /^(tema\/)?(impact|boom|hook-caixa|carimbo|trailer)/.test(x.nome))) {
  const antes = agenda.filter(b => b !== a && b.soa < a.evento && b.soa > a.evento - 0.5);
  if (antes.length) console.log(`aviso: ${antes.map(b => `${b.nome} em ${b.soa}`).join(', ')} soa nos 0,5 s antes do impacto de ${a.evento} s`);
}
if (MUSICA) audios.push(`<audio id="trilha" class="clip" data-start="0" data-duration="${D}" data-track-index="7" data-volume="0.16" src="${MUSICA}"></audio>`);

// ---------- HTML ----------
const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <!-- Gerado por gerar.mjs: edite lá e rode "node gerar.mjs". -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      :root { --papel:#f4f3ef; --ouro:#c99a0e; --ground:#0a1626; --night:#10233a; --glow:#1556a7; --sun:#f2c941; --azul:#8db8e8; --mut:#a9bfd6; --rosa:#ff8a8a; --verde:#5fcf8e; --ink:#ffffff; --font:"Outfit", sans-serif; --serif:"Playfair Display", serif; --mono:"JetBrains Mono", monospace; }
      * { margin:0; padding:0; box-sizing:border-box; }
      html, body { margin:0; width:1080px; height:1920px; overflow:hidden; background:var(--papel); }
      #root { width:100%; height:100%; font-family:var(--font); color:var(--ground); }
      #bg { position:absolute; inset:0; background:var(--papel); overflow:hidden; }
      #pontos { position:absolute; inset:0; background-image:radial-gradient(circle, rgba(10,22,38,0.15) 2px, transparent 2.6px); background-size:44px 44px; }
      #luz { position:absolute; left:540px; top:1250px; width:1600px; height:1600px; margin:-800px 0 0 -800px; border-radius:50%; background:radial-gradient(circle, rgba(255,214,120,0.75) 0%, rgba(255,228,170,0.4) 32%, rgba(244,243,239,0) 66%); }
      .explosao i { position:absolute; display:block; line-height:0; }
      .explosao { position:absolute; width:0; height:0; }
      .flash { position:absolute; inset:0; opacity:0; }
      .cena, .cena .in, .cena .cam, .cena .mexe, .cena .zoom { position:absolute; inset:0; }
      /* CARD com pop-out */
      #card { position:absolute; border-style:solid; left:140px; top:1130px; width:800px; height:470px; border-radius:40px; overflow:hidden; border:6px solid var(--sun); background:#000; box-shadow:0 40px 90px rgba(10,22,38,0.28), 0 0 0 1px rgba(10,22,38,0.08); z-index:9; }
      .card-vid, .pop-vid { position:absolute; object-fit:cover; }
      #pop { position:absolute; inset:0; z-index:9; pointer-events:none; }
      #card-hud { position:absolute; inset:0; z-index:40; pointer-events:none; }
      .vis-rec { position:absolute; left:34px; top:30px; display:flex; align-items:center; gap:12px; font:800 28px/1 var(--mono); letter-spacing:0.08em; color:#fff; background:rgba(10,22,38,0.72); padding:8px 14px; border-radius:10px; }
      .vis-rec i { display:block; width:20px; height:20px; border-radius:50%; background:#ff3b4a; box-shadow:0 0 14px #ff3b4a; }
      .vis-tag { position:absolute; right:34px; top:30px; font:900 26px/1 var(--font); letter-spacing:0.16em; color:var(--ground); background:var(--sun); padding:10px 16px; border-radius:10px; }
      .vis-tc { position:absolute; left:34px; bottom:30px; font:700 26px/1 var(--mono); color:#fff; letter-spacing:0.06em; background:rgba(10,22,38,0.72); padding:8px 14px; border-radius:10px; }
      /* efeitos do tema */
      .foco { position:absolute; z-index:56; opacity:0; }
      .foco i { position:absolute; width:46px; height:46px; border:0 solid #ffffff; filter:drop-shadow(0 2px 6px rgba(10,22,38,0.35)); }
      .foco i:nth-child(1) { left:0; top:0; border-left-width:7px; border-top-width:7px; }
      .foco i:nth-child(2) { right:0; top:0; border-right-width:7px; border-top-width:7px; }
      .foco i:nth-child(3) { left:0; bottom:0; border-left-width:7px; border-bottom-width:7px; }
      .foco i:nth-child(4) { right:0; bottom:0; border-right-width:7px; border-bottom-width:7px; }
      .obt { position:absolute; left:0; right:0; height:960px; background:var(--ground); transform:scaleY(0); }
      #obt-a { top:0; transform-origin:50% 0%; } #obt-b { bottom:0; transform-origin:50% 100%; }
      /* cena 1: hook */
      .h1-top { position:absolute; left:0; top:0; width:1080px; height:980px; }
      .h1-tit { position:absolute; left:0; right:0; top:170px; text-align:center; }
      .h1-tit b { display:inline-block; font-weight:900; letter-spacing:-0.02em; }
      .h1-l1 { display:block; font-size:58px; line-height:1; color:var(--ground); }
      .h1-l2 { display:block; margin-top:6px; font-size:170px; line-height:1; letter-spacing:-0.04em; }
      .h1-l2 .n { color:var(--ouro); font-variant-numeric:tabular-nums; min-width:200px; }
      .h1-deck { position:absolute; left:540px; top:660px; width:0; height:0; }
      .h1-card { position:absolute; left:-100px; top:-170px; width:200px; height:340px; border-radius:16px; background:linear-gradient(160deg, #1b3a5e 0%, #10233a 70%); border:3px solid rgba(10,22,38,0.9); box-shadow:0 20px 44px rgba(10,22,38,0.35); transform-origin:50% 100%; }
      .h1-card::before, .h1-card::after { content:""; position:absolute; top:10px; bottom:10px; width:14px; background:repeating-linear-gradient(180deg, rgba(244,243,239,0.85) 0 12px, transparent 12px 26px); border-radius:3px; }
      .h1-card::before { left:6px; } .h1-card::after { right:6px; }
      .h1-play { position:absolute; left:50%; top:112px; margin-left:-34px; width:0; height:0; border-left:68px solid rgba(255,255,255,0.75); border-top:40px solid transparent; border-bottom:40px solid transparent; }
      .h1-tl { position:absolute; left:22px; right:22px; bottom:58px; height:10px; border-radius:5px; background:rgba(255,255,255,0.18); }
      .h1-tl i { display:block; width:60%; height:100%; border-radius:5px; background:var(--azul); }
      .h1-v { position:absolute; left:28px; top:16px; font:900 34px/1 var(--font); color:var(--sun); }
      #h1k14 { border-color:var(--sun); box-shadow:0 0 0 4px rgba(242,201,65,0.5), 0 24px 60px rgba(10,22,38,0.4); }
      .h1-crono { position:absolute; left:50px; top:-200px; font:900 64px/1 var(--mono); color:var(--ground); background:var(--sun); padding:12px 20px; border-radius:16px; opacity:0; }
      .h1-ok { position:absolute; left:64px; top:-215px; width:110px; height:110px; border-radius:50%; background:var(--verde); color:var(--ground); font:900 76px/110px var(--font); text-align:center; box-shadow:0 0 40px rgba(95,207,142,0.5); opacity:0; }
      .h1-palp { position:absolute; inset:0; }
      .h1-p { position:absolute; width:fit-content; font:800 36px/1 var(--font); color:#fff; background:rgba(10,22,38,0.82); border:2px solid rgba(255,255,255,0.25); padding:16px 24px; border-radius:16px; opacity:0; white-space:nowrap; }
      .h1-p.p0 { left:24px; top:520px; } .h1-p.p1 { right:20px; top:430px; } .h1-p.p2 { left:24px; top:800px; }
      .h1-p i { position:absolute; left:14px; right:14px; top:50%; height:8px; margin-top:-4px; border-radius:4px; background:var(--rosa); transform-origin:0 50%; transform:scaleX(0); }
      /* cena 2: promessa */
      .p2-claq { position:absolute; right:60px; top:300px; width:340px; opacity:0; z-index:5; }
      .p2-braco { height:46px; border-radius:8px 8px 0 0; background:repeating-linear-gradient(-45deg, #0a1626 0 26px, #f4f3ef 26px 52px); border:4px solid #0a1626; transform-origin:0% 100%; }
      .p2-tab { margin-top:4px; background:#0a1626; color:#f4f3ef; border-radius:0 0 12px 12px; padding:18px 22px; display:grid; grid-template-columns:1fr 1fr; gap:8px 14px; font:700 26px/1 var(--mono); }
      .p2-tab b { grid-column:1 / 3; font:900 44px/1 var(--font); letter-spacing:0.06em; color:var(--sun); }
      .p2-tab em { font-style:normal; color:var(--sun); }
      .p2-term { position:absolute; left:80px; right:80px; top:270px; height:540px; border-radius:24px; background:#0f1b2b; box-shadow:0 30px 70px rgba(10,22,38,0.3); overflow:hidden; opacity:0; }
      .p2-cab { height:58px; background:#16263b; display:flex; align-items:center; gap:12px; padding:0 22px; }
      .p2-cab i { display:block; width:18px; height:18px; border-radius:50%; background:#ff5f57; }
      .p2-cab i:nth-child(2) { background:#febc2e; } .p2-cab i:nth-child(3) { background:#28c840; }
      .p2-cab span { margin-left:auto; font:700 24px/1 var(--mono); color:#8aa0b8; }
      .p2-corpo { padding:34px 34px; }
      .p2-l { font:600 36px/1.35 var(--mono); color:#e8eef5; white-space:nowrap; }
      .p2-l b { color:var(--sun); font-weight:800; }
      .p2-mut { margin-top:22px; font-size:28px; color:#8aa0b8; opacity:0; }
      .p2-l u { display:inline-block; width:18px; height:38px; margin-left:4px; vertical-align:-6px; background:var(--sun); text-decoration:none; }
      .p2-bar { position:absolute; left:34px; right:34px; bottom:40px; height:14px; border-radius:7px; background:rgba(255,255,255,0.1); overflow:hidden; }
      .p2-bar i { display:block; height:100%; background:var(--sun); transform-origin:0 50%; transform:scaleX(0); }
      .p2-flip { position:absolute; left:50%; top:420px; width:440px; height:250px; margin-left:-220px; opacity:0; perspective:900px; z-index:6; }
      .p2-erro, .p2-regra { position:absolute; inset:0; border-radius:26px; padding:26px 32px; box-shadow:0 30px 60px rgba(10,22,38,0.35); backface-visibility:hidden; }
      .p2-erro { background:#e5484d; color:#fff; }
      .p2-regra { background:var(--sun); color:var(--ground); }
      .p2-erro small, .p2-regra small { display:block; font:800 26px/1 var(--mono); letter-spacing:0.1em; opacity:0.85; }
      .p2-erro b, .p2-regra b { display:block; margin-top:14px; font:900 96px/1 var(--font); letter-spacing:-0.02em; }
      .p2-erro span, .p2-regra span { display:block; margin-top:12px; font:700 32px/1 var(--font); }
      /* SKILL.md: o arquivo de regras que fica no canto até o fim */
      .skill { position:absolute; right:40px; top:150px; display:flex; align-items:center; gap:16px; background:#ffffff; border:3px solid var(--ground); border-radius:18px; padding:14px 20px 14px 14px; box-shadow:0 14px 30px rgba(10,22,38,0.22); opacity:0; }
      .skill-ic { position:relative; width:52px; height:64px; border-radius:6px; background:var(--sun); border:3px solid var(--ground); }
      .skill-ic i { position:absolute; left:9px; right:9px; top:16px; height:4px; background:var(--ground); box-shadow:0 10px 0 var(--ground), 0 20px 0 var(--ground); border-radius:2px; }
      .skill b { display:block; font:800 30px/1 var(--mono); color:var(--ground); }
      .skill span { display:block; margin-top:6px; font:800 24px/1 var(--font); color:#7a5a00; }
      /* cena 3: o estúdio */
      .e3-tit { position:absolute; left:0; right:0; top:200px; text-align:center; font:900 110px/1 var(--font); letter-spacing:-0.03em; color:var(--ground); opacity:0; }
      .e3-tit em { font-family:var(--serif); font-style:italic; font-weight:700; color:var(--ouro); }
      .e3-cc { position:absolute; left:90px; right:310px; top:280px; height:200px; border-radius:20px; background:#0f1b2b; box-shadow:0 20px 50px rgba(10,22,38,0.28); overflow:hidden; opacity:0; }
      .e3-cc-cab { height:44px; background:#16263b; display:flex; align-items:center; gap:10px; padding:0 18px; }
      .e3-cc-cab i { display:block; width:14px; height:14px; border-radius:50%; background:#ff5f57; }
      .e3-cc-cab i:nth-child(2) { background:#febc2e; } .e3-cc-cab i:nth-child(3) { background:#28c840; }
      .e3-cc-cab span { margin-left:14px; font:700 20px/1 var(--mono); color:#8aa0b8; }
      .e3-cc p { margin:12px 22px 0; font:600 26px/1.2 var(--mono); color:#e8eef5; white-space:nowrap; opacity:0; }
      .e3-cc p:first-of-type { color:var(--sun); }
      .e3-fios { position:absolute; left:0; top:0; }
      .e3-cod { position:absolute; right:22px; top:22px; font:800 26px/1 var(--mono); color:var(--sun); background:var(--ground); padding:8px 12px; border-radius:10px; opacity:0; }
      .e3-slot { position:absolute; left:90px; right:90px; height:240px; border-radius:26px; background:#ffffff; border:3px dashed rgba(10,22,38,0.35); box-shadow:0 16px 40px rgba(10,22,38,0.12); opacity:0; }
      .e3-n { position:absolute; left:26px; top:24px; width:60px; height:60px; border-radius:50%; background:var(--ground); color:var(--sun); font:900 34px/60px var(--font); text-align:center; }
      .e3-chip { position:absolute; left:26px; bottom:26px; font:900 30px/1 var(--font); letter-spacing:0.06em; color:var(--ground); background:var(--sun); padding:12px 16px; border-radius:12px; opacity:0; }
      .e3-hf, .e3-el, .e3-wh { position:absolute; left:400px; width:560px; height:200px; opacity:0; }
      .e3-hf { top:540px; } .e3-el { top:820px; } .e3-wh { top:1100px; }
      .e3-hf rect { fill:none; stroke:var(--ground); stroke-width:5; }
      .e3-tl { position:absolute; left:0; right:20px; top:150px; height:30px; }
      .e3-tl span { position:absolute; left:20px; right:20px; top:13px; height:4px; background:rgba(10,22,38,0.25); border-radius:2px; }
      .e3-ph { position:absolute; left:20px; top:-8px; width:4px; height:46px; background:#e5484d; border-radius:2px; opacity:0; }
      .e3-tl em { position:absolute; top:3px; width:24px; height:24px; background:rgba(10,22,38,0.25); transform:rotate(45deg); border-radius:4px; }
      .e3-mic { position:absolute; left:0; top:40px; width:70px; height:110px; border-radius:35px; background:var(--ground); }
      .e3-mic i { position:absolute; left:25px; top:118px; width:20px; height:34px; background:var(--ground); border-radius:4px; }
      .e3-onda { position:absolute; left:100px; right:10px; top:40px; height:120px; display:flex; align-items:center; gap:8px; }
      .e3-onda i { display:block; flex:1; border-radius:6px; background:var(--ground); transform-origin:50% 50%; }
      .e3-onda2 { top:90px; height:90px; } .e3-onda2 i { background:var(--ouro); }
      .e3-note { position:absolute; left:0; top:60px; width:80px; height:56px; border-radius:6px; border:5px solid var(--ground); }
      .e3-note i { position:absolute; left:-14px; right:-14px; bottom:-18px; height:10px; border-radius:4px; background:var(--ground); }
      .e3-pal { position:absolute; left:100px; right:0; top:22px; display:flex; gap:8px; }
      .e3-pal span { font:800 24px/1 var(--font); color:#fff; background:var(--ground); padding:8px 10px; border-radius:8px; opacity:0; }
      .e3-local { position:absolute; left:-200px; top:2px; font:900 34px/1 var(--mono); letter-spacing:0.12em; color:#e5484d; border:5px solid #e5484d; padding:8px 14px; border-radius:10px; opacity:0; }
      /* cena 4: montado e péssimo (v7: timeline de edição) */
      .m4-ed { position:absolute; left:80px; right:80px; top:330px; height:840px; border-radius:26px; background:#ffffff; border:3px solid var(--ground); box-shadow:0 26px 60px rgba(10,22,38,0.2); overflow:hidden; opacity:0; }
      .m4-cab { height:64px; background:var(--ground); display:flex; align-items:center; gap:10px; padding:0 22px; }
      .m4-cab i { display:block; width:16px; height:16px; border-radius:50%; background:#ff5f57; }
      .m4-cab i:nth-child(2) { background:#febc2e; } .m4-cab i:nth-child(3) { background:#28c840; }
      .m4-cab span { margin-left:14px; font:700 24px/1 var(--mono); color:#e8eef5; }
      .m4-cab em { margin-left:auto; font:700 24px/1 var(--mono); font-style:normal; color:var(--sun); }
      .m4-regua { position:absolute; left:200px; right:0; top:64px; height:44px; border-bottom:2px solid rgba(10,22,38,0.15); background:repeating-linear-gradient(90deg, rgba(10,22,38,0.35) 0 2px, transparent 2px 70px); background-size:70px 14px; background-repeat:repeat-x; background-position:0 30px; }
      .m4-tr { position:absolute; left:0; right:0; height:210px; border-bottom:2px solid rgba(10,22,38,0.08); }
      .m4-rot { position:absolute; left:0; top:0; bottom:0; width:200px; padding:28px 20px; background:#f0efe9; border-right:2px solid rgba(10,22,38,0.1); }
      .m4-rot b { display:block; font:900 30px/1 var(--font); color:var(--ground); letter-spacing:0.04em; }
      .m4-rot small { display:block; margin-top:10px; font:700 22px/1 var(--mono); color:#7a5a00; }
      .m4-clips { position:absolute; left:210px; right:10px; top:120px; bottom:0; }
      .m4-cv { position:absolute; top:28px; height:150px; border-radius:14px; box-shadow:inset 0 0 0 3px rgba(10,22,38,0.35); opacity:0; }
      .m4-cv i { position:absolute; left:12px; top:12px; width:40px; height:28px; border-radius:6px; background:rgba(255,255,255,0.7); }
      .m4-onda { position:absolute; left:0; right:20px; top:258px; height:150px; display:flex; align-items:center; gap:6px; }
      .m4-onda i { display:block; flex:1; border-radius:5px; background:var(--ground); transform-origin:50% 50%; }
      .m4-pal { position:absolute; left:0; right:0; top:530px; display:flex; gap:10px; }
      .m4-pal span { font:800 30px/1 var(--font); color:#fff; background:var(--ground); padding:14px 14px; border-radius:10px; opacity:0; }
      .m4-rosa { position:absolute; left:200px; right:0; top:108px; bottom:0; background:rgba(229,72,77,0.22); opacity:0; }
      .m4-agulha { position:absolute; left:210px; top:64px; bottom:0; width:5px; background:#e5484d; box-shadow:0 0 0 2px rgba(255,255,255,0.6); }
      .m4-agulha::before { content:""; position:absolute; left:-10px; top:0; border-left:12px solid transparent; border-right:12px solid transparent; border-top:18px solid #e5484d; }
      .m4-veu { position:absolute; inset:0; background:rgba(10,22,38,0.55); opacity:0; }
      .m4-mod { position:absolute; left:90px; right:90px; top:270px; height:250px; border-radius:22px; background:#ffffff; box-shadow:0 30px 70px rgba(10,22,38,0.4); padding:40px 40px; opacity:0; }
      .m4-mod small { display:block; font:700 32px/1 var(--mono); color:var(--ground); }
      .m4-mod .m4-trilho { margin-top:40px; height:22px; border-radius:11px; background:rgba(10,22,38,0.12); overflow:hidden; }
      .m4-mod .m4-trilho i { display:block; height:100%; background:var(--ground); transform-origin:0 50%; transform:scaleX(0); }
      .m4-mod b { display:block; margin-top:22px; font:900 54px/1 var(--mono); color:var(--ground); text-align:right; }
      .m4-btn { position:absolute; left:50%; top:1205px; width:520px; margin-left:-260px; height:110px; border-radius:999px; background:var(--ground); color:#ffffff; font:900 44px/110px var(--font); text-align:center; letter-spacing:0.02em; box-shadow:0 20px 40px rgba(10,22,38,0.25); opacity:0; }
      .m4-cur { position:absolute; left:0; top:0; opacity:0; z-index:50; }
      .m4-toast { position:absolute; left:110px; right:390px; top:240px; height:76px; border-radius:16px; background:#e5484d; color:#fff; font:800 30px/76px var(--font); padding:0 22px; box-shadow:0 16px 34px rgba(229,72,77,0.35); white-space:nowrap; opacity:0; z-index:45; }
      .m4-toast b { margin-right:8px; }
      .cel { position:absolute; left:330px; top:600px; width:420px; height:746px; border-radius:46px; border:12px solid #0a1626; background:#0a1626; overflow:hidden; box-shadow:0 30px 70px rgba(10,22,38,0.35); z-index:12; opacity:0; }
      .cel video { position:absolute; left:0; top:0; width:396px; height:704px; object-fit:cover; }
      .cel-tag { position:absolute; left:18px; top:18px; font:900 30px/1 var(--font); color:var(--ground); background:var(--sun); padding:8px 12px; border-radius:10px; }
      .m4-carimbo { position:absolute; left:0; right:0; top:880px; margin:0 auto; width:fit-content; font:900 120px/1 var(--font); letter-spacing:0.02em; color:#e5484d; border:10px solid #e5484d; padding:12px 30px; border-radius:22px; background:rgba(244,243,239,0.9); transform:rotate(-8deg); z-index:40; opacity:0; }
      /* vídeo de fundo em tela cheia (b-roll), entre o fundo e as cenas */
      .fundo-video { position:absolute; inset:0; z-index:13; opacity:0; }
      .fundo-video video { position:absolute; left:0; top:0; width:1080px; height:1920px; object-fit:cover; }
      .fundo-veu { position:absolute; inset:0; background:linear-gradient(180deg, rgba(10,22,38,0.35) 0%, rgba(10,22,38,0.15) 45%, rgba(10,22,38,0.6) 100%); }
      /* cena 5: primeira virada */
      .cel2 { left:70px; top:340px; width:340px; height:604px; border-radius:38px; border-width:10px; }
      .cel2 video { width:320px; height:584px; }
      .v5-an { position:absolute; left:440px; right:60px; top:340px; height:604px; border-radius:24px; background:#ffffff; border:3px solid var(--ground); padding:26px 0 0; box-shadow:0 20px 50px rgba(10,22,38,0.16); opacity:0; overflow:hidden; }
      .v5-an small { display:block; padding:0 26px; font:800 26px/1 var(--mono); letter-spacing:0.08em; color:var(--ground); }
      .v5-an svg { display:block; margin-top:40px; width:100%; }
      .v5-meta { position:absolute; right:22px; top:92px; font:800 22px/1 var(--font); color:#2f9e5e; }
      .v5-mov { position:absolute; left:26px; right:26px; bottom:30px; }
      .v5-mov em { display:block; font:800 24px/1 var(--font); font-style:normal; letter-spacing:0.1em; color:#55657a; }
      .v5-mov b { display:block; margin-top:10px; font:900 150px/1 var(--font); letter-spacing:-0.04em; color:var(--ground); font-variant-numeric:tabular-nums; }
      .v5-tira { position:absolute; left:60px; right:60px; top:990px; height:230px; display:flex; gap:6px; padding:15px 10px; background:var(--ground); border-radius:16px; opacity:0; }
      .v5-q { flex:1; border-radius:6px; overflow:hidden; }
      .v5-q img { width:100%; height:100%; object-fit:cover; display:block; }
      .v5-par { position:absolute; top:80px; height:70px; background:rgba(229,72,77,0.92); color:#fff; font:900 30px/70px var(--font); font-style:normal; letter-spacing:0.08em; text-align:center; border-radius:10px; transform-origin:0 50%; transform:scaleX(0); }
      .v5-pct { position:absolute; left:0; right:0; top:1250px; text-align:center; font:900 40px/1 var(--font); color:var(--ground); letter-spacing:0.02em; opacity:0; }
      .v5-pct b { font-size:100px; color:#e5484d; vertical-align:-14px; margin-right:10px; }
      .v5-pausa { position:absolute; left:0; right:0; top:560px; text-align:center; font:900 220px/1 var(--font); color:rgba(10,22,38,0.75); opacity:0; }
      .v5-chip { position:absolute; left:0; right:0; top:1180px; margin:0 auto; width:fit-content; font:900 64px/1 var(--font); color:var(--ground); background:var(--sun); padding:24px 34px; border-radius:20px; box-shadow:0 24px 60px rgba(0,0,0,0.45); opacity:0; }
      .v5-c { position:absolute; inset:0; opacity:0; }
      .v5-s { position:absolute; left:70px; right:70px; border-radius:24px; background:#0f1b2b; box-shadow:0 24px 60px rgba(10,22,38,0.3); overflow:hidden; opacity:0; }
      .v5-cab { height:62px; background:#16263b; display:flex; align-items:center; gap:10px; padding:0 22px; }
      .v5-cab i { display:block; width:16px; height:16px; border-radius:50%; background:#ff5f57; }
      .v5-cab i:nth-child(2) { background:#febc2e; } .v5-cab i:nth-child(3) { background:#28c840; }
      .v5-cab span { margin-left:16px; font:800 28px/1 var(--mono); color:var(--sun); }
      .v5-s p { margin:28px 34px 0; font:700 40px/1.2 var(--mono); color:#5fcf8e; opacity:0; }
      .v5-s2 { border:4px solid rgba(229,72,77,0.6); }
      .v5-s p.v5-vazio { color:#e8eef5; opacity:1; }
      .v5-vazio u { display:inline-block; width:20px; height:42px; vertical-align:-8px; background:var(--sun); text-decoration:none; }
      .v5-seta { position:absolute; left:0; right:0; top:790px; text-align:center; font:900 80px/1 var(--font); color:var(--ground); opacity:0; }
      .v5-voa { position:absolute; left:104px; margin:0; font:700 40px/1.2 var(--mono); color:#5fcf8e; white-space:nowrap; opacity:0; z-index:5; }
      .v5-zero { position:absolute; left:0; right:0; top:1020px; margin:0 auto; width:fit-content; font:900 78px/1 var(--font); color:#e5484d; border:9px solid #e5484d; padding:14px 26px; border-radius:20px; background:rgba(15,27,43,0.9); z-index:6; opacity:0; }
      /* cena 6: a estratégia */
      .s6-tog { position:absolute; left:0; right:0; top:520px; text-align:center; opacity:0; }
      .s6-tog span { display:inline-block; width:400px; font:900 34px/1 var(--font); letter-spacing:0.04em; color:var(--ground); }
      .s6-l { text-align:right; padding-right:30px; } .s6-r { text-align:left; padding-left:30px; }
      .s6-l em { position:relative; font-style:normal; } .s6-l em i { position:absolute; left:-6px; right:-6px; top:50%; height:6px; margin-top:-3px; background:#e5484d; transform-origin:0 50%; transform:scaleX(0); }
      .s6-trilho { position:relative; width:500px; height:170px; margin:26px auto 0; border-radius:85px; background:#c9ced6; box-shadow:inset 0 6px 14px rgba(10,22,38,0.2); }
      .s6-trilho i { position:absolute; left:15px; top:15px; width:140px; height:140px; border-radius:50%; background:#ffffff; box-shadow:0 8px 20px rgba(10,22,38,0.3); }
      .s6-cel { position:absolute; width:420px; height:350px; border-radius:30px; background:#ffffff; border:4px solid var(--ground); box-shadow:0 18px 40px rgba(10,22,38,0.16); opacity:0; overflow:hidden; }
      .s6-cel b { position:absolute; left:20px; top:16px; font:900 34px/1 var(--font); color:var(--ground); }
      .s6-tela { position:absolute; left:20px; right:20px; top:66px; height:150px; border-radius:16px; background:var(--ground); padding:24px; }
      .s6-tela i { display:block; height:16px; margin-bottom:16px; border-radius:8px; background:rgba(255,255,255,0.25); }
      .s6-tela i:nth-child(2) { width:70%; } .s6-tela i:nth-child(3) { width:45%; }
      .s6-erro { position:absolute; left:20px; right:20px; bottom:22px; height:84px; border-radius:16px; background:#e5484d; color:#fff; font:900 34px/84px var(--font); text-align:center; }
      .s6-x { position:absolute; left:0; right:0; top:40px; text-align:center; font:900 220px/1 var(--font); color:#e5484d; text-shadow:0 0 0 #fff, 0 6px 20px rgba(229,72,77,0.4); opacity:0; }
      .s6-cont { position:absolute; left:0; right:0; top:1205px; text-align:center; font:900 44px/1 var(--font); color:var(--ground); opacity:0; }
      .s6-cont b { color:#e5484d; font-size:64px; }
      .s6-arr { position:absolute; left:590px; top:1060px; width:400px; height:88px; border-radius:16px; background:#e5484d; color:#fff; font:900 34px/88px var(--font); text-align:center; box-shadow:0 20px 40px rgba(10,22,38,0.3); z-index:20; opacity:0; }
      .s6-cur { position:absolute; left:0; top:0; z-index:30; opacity:0; }
      .s6-file { position:absolute; left:90px; right:90px; top:360px; height:880px; border-radius:28px; background:#ffffff; border:4px solid var(--ground); box-shadow:0 30px 70px rgba(10,22,38,0.25); transform-origin:100% 0%; overflow:hidden; opacity:0; }
      .s6-cab { height:110px; display:flex; align-items:center; gap:18px; padding:0 30px; background:var(--sun); border-bottom:4px solid var(--ground); }
      .s6-cab b { font:900 46px/1 var(--mono); color:var(--ground); }
      .s6-cab span { font:700 32px/1 var(--mono); color:var(--ground); }
      .s6-cab em { margin-left:auto; font-style:normal; font-size:54px; line-height:1; }
      .s6-h { margin:36px 40px 8px; font:800 40px/1 var(--mono); color:#55657a; }
      .s6-li { margin:24px 40px 0; height:56px; font:800 46px/56px var(--mono); color:var(--ground); }
      .s6-bor { color:rgba(10,22,38,0.35); filter:blur(5px); }
      .s6-perm { position:absolute; left:0; right:0; bottom:60px; margin:0 auto; width:fit-content; font:900 90px/1 var(--font); color:#2f9e5e; border:9px solid #2f9e5e; padding:12px 26px; border-radius:20px; background:rgba(255,255,255,0.92); opacity:0; }
      /* cena 7: as regras */
      .r7-a, .r7-b { position:absolute; inset:0; }
      .r7-b { opacity:0; }
      .r7-file { position:absolute; left:90px; right:90px; top:360px; height:560px; border-radius:28px; background:#ffffff; border:4px solid var(--ground); box-shadow:0 26px 60px rgba(10,22,38,0.2); overflow:hidden; }
      .r7-janela { position:absolute; left:0; right:0; top:110px; bottom:0; overflow:hidden; padding:16px 0; }
      .r7-li { height:62px; margin:0 26px; padding:0 14px; border-radius:10px; font:800 36px/62px var(--mono); color:var(--ground); white-space:nowrap; }
      .r7-li b { color:#7a5a00; margin-right:6px; }
      .r7-bor { color:rgba(10,22,38,0.35); filter:blur(5px); }
      .r7-demo { position:absolute; left:90px; right:90px; top:960px; height:380px; border-radius:28px; background:#ffffff; border:3px solid rgba(10,22,38,0.2); box-shadow:0 18px 40px rgba(10,22,38,0.12); opacity:0; }
      .r7-et { position:absolute; left:30px; top:24px; font:800 26px/1 var(--font); font-style:normal; letter-spacing:0.08em; color:#55657a; text-transform:uppercase; }
      .r7-dial svg { position:absolute; left:50%; top:60px; margin-left:-260px; }
      .r7-v { position:absolute; right:40px; bottom:40px; font:900 90px/1 var(--font); color:var(--ground); }
      .r7-trilho { position:absolute; left:40px; right:40px; top:150px; height:54px; border-radius:27px; background:rgba(10,22,38,0.1); overflow:hidden; }
      .r7-trilho i { position:absolute; left:0; top:0; bottom:0; width:100%; background:#2f9e5e; transform-origin:0 50%; }
      .r7-trilho u { position:absolute; left:50%; top:-6px; bottom:-6px; width:6px; background:var(--ground); }
      .r7-mv { position:absolute; left:40px; bottom:40px; font:900 110px/1 var(--font); color:var(--ground); font-variant-numeric:tabular-nums; }
      .r7-meta { position:absolute; right:40px; bottom:56px; font:800 32px/1 var(--font); color:var(--ground); }
      .r7-cel { position:absolute; left:40px; top:30px; width:200px; height:340px; border-radius:30px; border:8px solid var(--ground); background:#0f1b2b; padding:60px 12px 0; text-align:center; }
      .r7-cel p { font:900 24px/1.2 var(--font); color:#ffffff; opacity:0.15; }
      .r7-cel p.r7-g14 { margin-top:10px; font-size:30px; color:var(--sun); }
      .r7-crono { position:absolute; left:290px; right:40px; top:60px; }
      .r7-crono b { display:block; font:900 120px/1 var(--mono); color:var(--ground); }
      .r7-crono span { display:block; margin-top:14px; font:800 30px/1 var(--font); color:#55657a; }
      .r7-crono i { position:absolute; right:0; top:0; width:110px; height:110px; border-radius:50%; background:#2f9e5e; color:#fff; font:900 70px/110px var(--font); font-style:normal; text-align:center; opacity:0; }
      .r7-grade { display:grid; grid-template-columns:repeat(7, 1fr); gap:14px; padding:40px 30px; perspective:900px; }
      .r7-grade i { display:block; height:140px; border-radius:16px; background:#e5484d; color:var(--ground); font:900 44px/140px var(--font); font-style:normal; text-align:center; box-shadow:0 10px 20px rgba(10,22,38,0.15); }
      .r7-sess { top:380px; height:560px; opacity:0; border:4px solid rgba(47,158,94,0.7); }
      .r7-p { margin:40px 40px 0; font:700 44px/1.2 var(--mono); color:#e8eef5; opacity:0; }
      .r7-okt { color:#5fcf8e; font-weight:800; }
      .r7-load { margin:40px 40px 0; height:20px; border-radius:10px; background:rgba(255,255,255,0.12); overflow:hidden; }
      .r7-load i { display:block; height:100%; background:#5fcf8e; transform-origin:0 50%; }
      .r7-prox { position:absolute; left:140px; right:140px; top:1010px; height:220px; border-radius:26px; background:#ffffff; border:4px solid var(--ground); padding:30px 36px; box-shadow:0 20px 40px rgba(10,22,38,0.18); opacity:0; }
      .r7-prox b { font:900 60px/1 var(--font); color:var(--ground); }
      .r7-prox span { margin-left:16px; font:800 34px/1 var(--font); color:#55657a; }
      .r7-load2 { margin:36px 0 0; background:rgba(10,22,38,0.1); } .r7-load2 i { background:#2f9e5e; }
      .r7-prox em { position:absolute; right:30px; top:26px; width:90px; height:90px; border-radius:50%; background:#2f9e5e; color:#fff; font:900 56px/90px var(--font); font-style:normal; text-align:center; opacity:0; }
      /* cena 8: o apresentador */
      .a8-chip { position:absolute; left:0; right:0; top:1040px; margin:0 auto; width:fit-content; font:900 60px/1 var(--font); color:var(--ground); background:var(--sun); padding:20px 30px; border-radius:18px; box-shadow:0 20px 50px rgba(0,0,0,0.4); opacity:0; }
      .a8-mon { position:absolute; left:90px; width:900px; height:510px; border-radius:24px; overflow:hidden; border:5px solid var(--ground); background:#000; box-shadow:0 24px 60px rgba(10,22,38,0.28); z-index:12; opacity:0; }
      .a8-zoom { position:absolute; inset:0; }
      .a8-zoom video { position:absolute; left:0; top:0; width:900px; height:510px; object-fit:cover; }
      .a8-x { position:absolute; right:18px; top:14px; width:90px; height:90px; border-radius:50%; background:#e5484d; color:#fff; font:900 56px/90px var(--font); text-align:center; opacity:0; }
      .a8-circ { position:absolute; left:528px; top:690px; width:240px; height:190px; border:9px solid #e5484d; border-radius:50%; opacity:0; z-index:3; }
      .a8-box { position:absolute; left:730px; top:1220px; width:250px; height:150px; border:9px solid #e5484d; border-radius:16px; opacity:0; z-index:3; }
      .a8-et { position:absolute; font:900 34px/1 var(--font); color:#fff; background:#e5484d; padding:12px 16px; border-radius:12px; opacity:0; z-index:4; }
      /* cena 9: o gêmeo digital */
      .g9-pan { position:absolute; left:110px; top:340px; width:860px; height:120px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:8px; background:#ffffff; border:4px solid var(--ground); border-radius:22px; box-shadow:0 18px 40px rgba(10,22,38,0.18); opacity:0; }
      .g9-leg { position:absolute; left:28px; top:-20px; font:800 24px/1 var(--mono); letter-spacing:0.08em; color:var(--sun); background:var(--ground); padding:8px 14px; border-radius:10px; }
      .g9-st { position:relative; display:flex; align-items:center; gap:10px; font:800 30px/1 var(--font); color:var(--ground); padding:10px 12px; border-radius:14px; }
      .g9-st i { position:relative; width:50px; height:50px; border-radius:50%; background:var(--ground); color:var(--sun); font:900 28px/50px var(--font); font-style:normal; text-align:center; }
      .g9-ok { position:absolute; left:12px; top:50%; margin-top:-25px; width:50px; height:50px; border-radius:50%; background:#2f9e5e; color:#ffffff; font:900 32px/50px var(--font); text-align:center; opacity:0; }
      .g9-hl { position:absolute; inset:-2px; border:4px solid var(--sun); border-radius:14px; background:rgba(242,201,65,0.2); opacity:0; }
      .g9-pan u { display:block; width:30px; height:4px; background:#c9cdd3; border-radius:2px; }
      .g9-slot { position:absolute; left:160px; width:760px; height:428px; box-sizing:border-box; border:5px dashed var(--ouro); border-radius:24px; background:rgba(242,201,65,0.08); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; opacity:0; }
      .g9-slot span { font:900 44px/1 var(--font); letter-spacing:0.06em; color:#7a5a00; }
      .g9-slot small { font:700 28px/1 var(--mono); color:#7a5a00; }
      .g9-slot i { width:22px; height:22px; border-radius:50%; background:var(--ouro); }
      .g9-chip { position:absolute; left:120px; top:462px; font:900 52px/1 var(--font); color:var(--ground); background:var(--sun); padding:16px 24px; border-radius:16px; box-shadow:0 18px 40px rgba(10,22,38,0.3); opacity:0; z-index:5; }
      .g9-fr { position:absolute; left:160px; width:760px; height:428px; box-sizing:border-box; border-radius:24px; overflow:hidden; border:5px solid var(--ground); background:#e7e5df; box-shadow:0 24px 60px rgba(10,22,38,0.25); z-index:12; opacity:0; }
      .g9-gem { border-color:var(--sun); z-index:11; }
      .g9-fr video { position:absolute; left:0; top:0; width:750px; height:418px; object-fit:cover; }
      .g9-vazio { position:absolute; inset:24px; border:4px dashed #9aa3ad; border-radius:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; }
      .g9-vazio b { width:110px; height:110px; border-radius:50%; background:#e5484d; color:#ffffff; font:900 80px/104px var(--font); text-align:center; }
      .g9-vazio span { font:800 34px/1 var(--font); letter-spacing:0.08em; color:#4a5561; }
      .g9-scan { position:absolute; inset:0; background-image:linear-gradient(rgba(21,86,167,0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(21,86,167,0.5) 2px, transparent 2px); background-size:38px 38px; opacity:0; }
      .g9-scan i { position:absolute; left:0; right:0; top:-8px; height:14px; background:#4ea3ff; box-shadow:0 0 30px 10px rgba(78,163,255,0.7); }
      .g9-rec { position:absolute; left:20px; top:18px; display:flex; align-items:center; gap:12px; font:800 30px/1 var(--mono); color:#ffffff; background:rgba(10,22,38,0.82); padding:10px 16px; border-radius:12px; opacity:0; }
      .g9-rec i { width:20px; height:20px; border-radius:50%; background:#e5484d; }
      .g9-tag { position:absolute; right:18px; top:18px; font:900 28px/1 var(--font); letter-spacing:0.06em; color:#ffffff; background:rgba(10,22,38,0.82); padding:10px 14px; border-radius:12px; }
      .g9-tag-y { color:var(--ground); background:var(--sun); opacity:0; }
      .g9-q { position:absolute; left:80px; top:860px; width:140px; height:140px; border-radius:50%; background:var(--sun); color:var(--ground); font:900 110px/140px var(--font); text-align:center; box-shadow:0 18px 40px rgba(10,22,38,0.3); opacity:0; z-index:5; }
      .g9-onda { position:absolute; left:600px; top:1140px; width:290px; height:110px; display:flex; align-items:center; gap:10px; transform-origin:0 50%; opacity:0; z-index:4; }
      .g9-onda i { flex:1; height:100px; border-radius:9px; background:var(--glow); box-shadow:0 0 14px rgba(21,86,167,0.5); }
      .g9-clone { position:absolute; left:210px; top:1262px; display:flex; align-items:center; gap:16px; font:900 46px/1 var(--font); color:var(--ground); background:var(--sun); padding:16px 24px; border-radius:16px; box-shadow:0 18px 40px rgba(10,22,38,0.3); opacity:0; z-index:5; white-space:nowrap; }
      .g9-clone em { font:800 34px/1 var(--mono); font-style:normal; color:var(--sun); background:var(--ground); padding:8px 12px; border-radius:10px; }
      /* cena 10: plot twist */
      .vis-rec i.vis-pausa { position:absolute; left:14px; top:12px; background:#8a929c; box-shadow:none; opacity:0; }
      .vis-tc2 { background:#0a1626; opacity:0; }
      .t10-scan { position:absolute; left:0; top:150px; width:1080px; height:1300px; z-index:12; background-image:linear-gradient(rgba(78,163,255,0.38) 2px, transparent 2px), linear-gradient(90deg, rgba(78,163,255,0.38) 2px, transparent 2px); background-size:46px 46px; opacity:0; pointer-events:none; }
      .t10-scan i { position:absolute; left:0; right:0; top:-8px; height:16px; background:#4ea3ff; box-shadow:0 0 36px 12px rgba(78,163,255,0.75); }
      .t10-gl { position:absolute; inset:0; z-index:12; opacity:0; pointer-events:none; }
      .t10-gl i { position:absolute; left:-100px; right:-100px; mix-blend-mode:difference; }
      #t10b1 { background:#ff2bd6; }
      #t10b2 { background:#22e1ff; }
      #t10b3 { background:rgba(255,255,255,0.85); }
      .t10-st { position:absolute; left:0; right:0; top:640px; margin:0 auto; width:fit-content; font:900 170px/1 var(--font); letter-spacing:0.04em; color:#e5484d; border:14px solid #e5484d; border-radius:26px; padding:14px 40px 10px; background:rgba(255,255,255,0.14); opacity:0; }
      .t10-rew { position:absolute; inset:0; opacity:0; }
      .t10-veu { position:absolute; inset:0; background:rgba(10,22,38,0.92); background-image:repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 6px); }
      .t10-cab { position:absolute; left:0; right:0; top:340px; text-align:center; font:900 52px/1 var(--mono); letter-spacing:0.1em; color:var(--sun); }
      .t10-q { position:absolute; left:250px; top:440px; width:580px; height:1031px; border-radius:28px; overflow:hidden; border:6px solid #ffffff; box-shadow:0 30px 70px rgba(0,0,0,0.5); opacity:0; }
      .t10-q img { display:block; width:100%; height:100%; object-fit:cover; }
      .t10-tc { position:absolute; left:20px; bottom:20px; font:800 34px/1 var(--mono); color:#ffffff; background:rgba(10,22,38,0.85); padding:8px 12px; border-radius:10px; }
      .t10-qs { position:absolute; left:0; right:0; top:420px; margin:0 auto; width:fit-content; font:900 96px/1 var(--font); color:#e5484d; border:10px solid #e5484d; border-radius:18px; padding:8px 24px 4px; background:rgba(255,255,255,0.88); opacity:0; }
      /* cena 11: o último aprendizado */
      .s11-cel { position:absolute; left:70px; top:350px; width:400px; height:712px; box-sizing:border-box; border-radius:40px; border:10px solid var(--ground); background:var(--ground); overflow:hidden; box-shadow:0 30px 70px rgba(10,22,38,0.32); z-index:12; opacity:0; }
      .s11-zoom { position:absolute; inset:0; }
      .s11-zoom video { position:absolute; left:0; top:0; width:380px; height:692px; object-fit:cover; }
      .s11-circ { position:absolute; left:87px; top:311px; width:220px; height:150px; border:8px solid #e5484d; border-radius:50%; opacity:0; }
      .s11-tag { position:absolute; left:14px; top:14px; font:900 26px/1 var(--font); color:var(--ground); background:var(--sun); padding:8px 12px; border-radius:10px; }
      .s11-1a { position:absolute; left:520px; top:600px; font:900 58px/1 var(--font); color:#ffffff; background:#e5484d; padding:18px 24px; border-radius:16px; box-shadow:0 18px 40px rgba(10,22,38,0.3); opacity:0; }
      .s11-lab { position:absolute; left:520px; top:360px; font:800 26px/1 var(--mono); letter-spacing:0.06em; color:#7a5a00; opacity:0; }
      .s11-bt { position:absolute; left:520px; width:490px; height:100px; box-sizing:border-box; border:4px solid var(--ground); border-radius:18px; background:#ffffff; font:900 48px/92px var(--font); text-align:center; color:var(--ground); box-shadow:0 14px 30px rgba(10,22,38,0.16); opacity:0; overflow:hidden; }
      #s11b1 { top:410px; background:var(--ground); color:var(--sun); }
      #s11b2 { top:530px; }
      .s11-sel { position:absolute; inset:0; background:var(--sun); color:var(--ground); opacity:0; }
      .s11-pb { position:absolute; left:520px; top:690px; width:490px; box-sizing:border-box; font:900 34px/1.15 var(--font); color:#ffffff; background:#e5484d; padding:18px 20px; border-radius:16px; opacity:0; }
      .s11-id { position:absolute; left:530px; top:745px; font:900 46px/1 var(--font); color:#2f9e5e; border:9px solid #2f9e5e; border-radius:16px; padding:10px 18px 6px; background:rgba(255,255,255,0.94); opacity:0; }
      .s11-rg { position:absolute; left:560px; top:860px; width:410px; box-sizing:border-box; background:var(--sun); border:4px solid var(--ground); border-radius:18px; padding:16px 22px; box-shadow:0 18px 40px rgba(10,22,38,0.3); opacity:0; }
      .s11-rg small { display:block; font:800 26px/1 var(--mono); letter-spacing:0.08em; color:#7a5a00; }
      .s11-rg b { display:block; margin-top:10px; font:900 48px/1 var(--font); color:var(--ground); }
      .s11-pan { position:absolute; left:70px; top:1095px; width:940px; height:250px; box-sizing:border-box; background:#ffffff; border:4px solid var(--ground); border-radius:22px; box-shadow:0 18px 40px rgba(10,22,38,0.18); opacity:0; }
      .s11-leg { position:absolute; left:26px; top:-20px; font:800 24px/1 var(--mono); letter-spacing:0.08em; color:var(--sun); background:var(--ground); padding:8px 14px; border-radius:10px; }
      .s11-st { position:absolute; right:22px; top:-24px; font:900 30px/1 var(--font); padding:10px 16px; border-radius:12px; opacity:0; }
      .s11-ruim { color:#ffffff; background:#e5484d; }
      .s11-bom { color:#ffffff; background:#2f9e5e; }
      .s11-row { position:absolute; left:26px; font:800 28px/1 var(--mono); color:var(--ground); }
      .s11-tr { position:absolute; left:150px; width:760px; height:80px; display:flex; align-items:center; gap:7px; }
      .s11-tr i { display:block; width:14px; border-radius:7px; background:var(--glow); }
      .s11-clip { position:absolute; left:150px; width:760px; height:80px; overflow:hidden; }
      .s11-clip .s11-tr { left:0; top:0; }
      .s11-boca i { background:var(--ouro); border-radius:5px; }
      .s11-gap { position:absolute; left:430px; top:30px; width:90px; height:200px; box-sizing:border-box; border:5px dashed #e5484d; border-radius:12px; background:rgba(229,72,77,0.08); opacity:0; }
      .s11-ph { position:absolute; left:150px; top:24px; width:4px; height:210px; background:var(--ground); border-radius:2px; }
      .s11-cur { position:absolute; left:0; top:0; z-index:30; opacity:0; }
      /* cena 12: fechamento */
      .f12-k { position:absolute; width:118px; height:210px; border-radius:14px; overflow:hidden; border:4px solid var(--ground); background:var(--ground); box-shadow:0 14px 30px rgba(10,22,38,0.28); opacity:0; }
      .f12-k img { display:block; width:100%; height:100%; object-fit:cover; }
      .f12-v { position:absolute; left:8px; top:8px; font:900 28px/1 var(--font); color:var(--sun); background:rgba(10,22,38,0.85); padding:4px 8px; border-radius:8px; }
      .f12-ok { position:absolute; inset:0; border:6px solid #2f9e5e; border-radius:10px; opacity:0; }
      .f12-p { position:absolute; left:-14px; right:-14px; top:88px; font:900 26px/1 var(--font); text-align:center; color:#ffffff; background:#e5484d; padding:8px 0; box-shadow:0 6px 16px rgba(10,22,38,0.35); opacity:0; }
      .f12-arq { position:absolute; left:140px; top:900px; width:800px; height:440px; box-sizing:border-box; background:#ffffff; border:4px solid var(--ground); border-radius:22px; box-shadow:0 20px 50px rgba(10,22,38,0.22); opacity:0; }
      .f12-cab { display:flex; align-items:center; gap:14px; height:76px; padding:0 22px; background:var(--sun); border-bottom:4px solid var(--ground); border-radius:18px 18px 0 0; }
      .f12-ic { width:36px; height:44px; border-radius:5px; background:#ffffff; border:3px solid var(--ground); }
      .f12-cab b { font:800 36px/1 var(--mono); color:var(--ground); }
      .f12-cab em { margin-left:auto; font:800 30px/1 var(--font); font-style:normal; color:#7a5a00; }
      .f12-ls { display:grid; grid-template-columns:1fr 1fr; grid-auto-flow:column; grid-template-rows:repeat(7, 46px); gap:0 30px; padding:16px 26px; }
      .f12-ls p { margin:0; display:flex; align-items:center; gap:12px; opacity:0; }
      .f12-ls p b { width:46px; font:800 28px/1 var(--mono); color:#7a5a00; }
      .f12-ls p i { display:block; flex:1; height:14px; border-radius:7px; background:#c9cdd3; }
      .f12-st { position:absolute; left:0; right:0; top:170px; margin:0 auto; width:fit-content; font:900 72px/1 var(--font); color:#2f9e5e; border:11px solid #2f9e5e; border-radius:20px; padding:14px 28px 10px; background:rgba(255,255,255,0.95); opacity:0; }
      .f12-ger { position:absolute; left:90px; top:660px; font:900 46px/1 var(--font); letter-spacing:0.04em; color:#4a5561; background:#e3e6ea; border:3px solid #b9c0c8; padding:16px 22px; border-radius:16px; box-shadow:0 14px 30px rgba(10,22,38,0.25); opacity:0; }
      .f12-con { position:absolute; left:650px; top:690px; font:900 50px/1 var(--font); letter-spacing:0.02em; color:var(--ground); background:var(--sun); border:4px solid var(--ground); padding:18px 26px; border-radius:18px; box-shadow:0 18px 40px rgba(10,22,38,0.35); opacity:0; }
      .f12-est { position:absolute; left:110px; top:1340px; width:860px; height:80px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; gap:12px; background:#ffffff; border:4px solid var(--ground); border-radius:20px; box-shadow:0 18px 40px rgba(10,22,38,0.3); opacity:0; }
      .f12-est b { white-space:nowrap; font:900 26px/1 var(--font); letter-spacing:0.04em; color:var(--ground); background:var(--sun); padding:10px 12px; border-radius:10px; }
      .f12-est b.f12-sk { font-family:var(--mono); background:var(--ground); color:var(--sun); }
      .f12-leg { position:absolute; left:24px; top:-20px; font:800 24px/1 var(--mono); letter-spacing:0.08em; color:var(--sun); background:var(--ground); padding:8px 14px; border-radius:10px; }
      /* cena 13: CTA */
      .c13-poll { position:absolute; left:140px; top:360px; width:800px; box-sizing:border-box; padding:34px 30px 34px; background:#ffffff; border:4px solid var(--ground); border-radius:28px; box-shadow:0 22px 50px rgba(10,22,38,0.22); text-align:center; opacity:0; }
      .c13-poll > b { display:block; font:900 46px/1.12 var(--font); color:var(--ground); }
      .c13-bts { display:flex; gap:40px; justify-content:center; margin-top:30px; }
      .c13-bts span { display:block; width:320px; height:100px; box-sizing:border-box; border:4px solid var(--ground); border-radius:22px; background:#f4f3ef; font:900 52px/92px var(--font); color:var(--ground); }
      #c13sim { background:var(--sun); }
      .c13-repo { position:absolute; left:140px; top:350px; width:800px; box-sizing:border-box; background:#0d1117; border:4px solid var(--ground); border-radius:24px; box-shadow:0 22px 50px rgba(10,22,38,0.3); overflow:hidden; opacity:0; }
      .c13-rcab { display:flex; align-items:center; gap:14px; padding:20px 26px; background:#161b22; border-bottom:2px solid #30363d; font:800 32px/1 var(--font); color:#e6edf3; }
      .c13-rcab i { width:34px; height:34px; border-radius:50%; background:#e6edf3; }
      .c13-rcab em { margin-left:auto; font:800 26px/1 var(--mono); font-style:normal; color:var(--sun); }
      .c13-repo p { margin:0; display:flex; align-items:center; gap:16px; padding:20px 26px; border-bottom:2px solid #21262d; font:700 32px/1 var(--mono); color:#e6edf3; opacity:0; }
      .c13-repo p i { width:38px; height:28px; border-radius:4px; background:#54aeff; }
      .c13-repo p b { margin-left:auto; font:800 24px/1 var(--mono); color:var(--ground); background:var(--sun); padding:6px 10px; border-radius:8px; }
      .c13-big { position:absolute; left:0; right:0; top:385px; text-align:center; font:900 148px/1 var(--font); letter-spacing:-0.01em; color:var(--ground); }
      .c13-big span { display:inline-block; opacity:0; }
      .c13-com { position:absolute; left:170px; top:575px; width:740px; box-sizing:border-box; display:flex; align-items:center; gap:18px; padding:18px 24px; background:#ffffff; border:3px solid #d5d8dc; border-radius:22px; box-shadow:0 14px 30px rgba(10,22,38,0.16); opacity:0; }
      .c13-av { width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, #f2c941, #e5484d); }
      .c13-com small { display:block; font:800 28px/1 var(--font); color:#4a5561; }
      .c13-com b { display:block; margin-top:6px; font:900 40px/1 var(--font); color:var(--ground); }
      .c13-heart { margin-left:auto; font:900 64px/1 var(--font); color:#e5484d; opacity:0; }
      .c13-dm { position:absolute; left:250px; top:695px; width:660px; box-sizing:border-box; padding:16px 24px 18px; background:var(--glow); border-radius:26px 26px 26px 6px; box-shadow:0 14px 30px rgba(10,22,38,0.25); opacity:0; }
      .c13-dm small { display:block; font:800 26px/1 var(--font); color:#cfe2ff; }
      .c13-dm b { display:block; margin-top:8px; font:900 38px/1.1 var(--font); color:#ffffff; }
      .c13-cta { position:absolute; left:0; right:0; top:820px; margin:0 auto; width:fit-content; font:900 34px/1 var(--font); letter-spacing:0.03em; color:var(--ground); background:var(--sun); padding:14px 22px; border-radius:14px; border:3px solid var(--ground); opacity:0; }
      .c13-cta span { display:inline-block; }
      .c13-cur { position:absolute; left:0; top:0; z-index:30; opacity:0; }
      /* legendas no estilo do kit */
      .cap-k { position:absolute; left:0; right:0; text-align:center; z-index:60; }
      .cap-k span { display:inline-block; max-width:940px; font:900 64px/1.08 var(--font); text-transform:uppercase; letter-spacing:-0.01em; color:#ffffff; background:rgba(10,22,38,0.92); border:2px solid rgba(255,255,255,0.34); border-radius:18px; padding:14px 26px 12px; box-shadow:0 12px 30px rgba(0,0,0,0.35); }
      .cap-k.cor span { color:var(--sun); }
      .cap-k.longo span { font-size:50px; }
      .cap-k.it span { font-family:var(--serif); font-style:italic; font-weight:700; text-transform:none; font-size:70px; color:var(--sun); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${D}" data-width="1080" data-height="1920">
      <div id="bg" class="clip" data-start="0" data-duration="${D}" data-track-index="0" data-track-kind="graphics" style="z-index:1"><div id="luz"></div><div id="pontos"></div></div>
      <div id="card">${trechosCard.join('')}<div id="card-hud"><div class="vis-rec"><i id="vis-rec"></i><i class="vis-pausa" id="vis-pausa"></i>REC</div><div class="vis-tag" id="vis-tag">CÂMERA</div><div class="vis-tc" id="vis-tc">00:00:00:00</div><div class="vis-tc vis-tc2" id="vis-tc2" data-layout-allow-overlap data-layout-allow-occlusion></div></div></div>
      <div id="pop">${trechosPop.join('')}</div>
      ${cenas.join('\n      ')}
      ${N >= 2 ? `<div id="skill-w" class="clip" data-start="${r(M.proximo + 0.2)}" data-duration="${r(D - M.proximo - 0.2)}" data-track-index="4" data-layout-allow-overlap style="position:absolute;inset:0;z-index:58;pointer-events:none"><div class="skill" id="skill"><div class="skill-ic"><i></i></div><div><b>SKILL.md</b><span id="skill-n">0 regras</span></div></div></div>` : ''}
      ${celular.join('')}
      <div id="fx" class="clip" data-start="0" data-duration="${D}" data-track-index="3" data-track-kind="graphics" data-layout-allow-overlap data-layout-allow-overflow style="position:absolute;inset:0;z-index:55">${explosoes.join('')}${flashes.join('')}${focos.join('')}</div>
      <div id="obturador" class="clip" data-start="0" data-duration="${D}" data-track-index="3" data-track-kind="graphics" data-layout-allow-overlap style="position:absolute;inset:0;z-index:70;pointer-events:none"><div class="obt" id="obt-a"></div><div class="obt" id="obt-b"></div></div>
      <div id="legendas" class="clip" data-start="0" data-duration="${D}" data-track-index="2" data-track-kind="captions" data-layout-allow-overlap style="position:absolute;inset:0;z-index:60">
        ${legendas.join('\n        ')}
      </div>
      ${audios.join('\n      ')}
      ${sfx.join('\n      ')}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true, defaults: { lazy: false } });
      tl.fromTo("#luz",{scale:0.92},{scale:1.08,duration:${D},ease:"sine.inOut"},0);
      ${js.join('\n      ')}
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`;
writeFileSync('index.html', html);
const mk = (ks) => ks.map(k => k + ' ' + r(M[k])).join(' · ');
console.log('hook:', mk(['um', 'minuto', 'precisou', 'catorze', 'versoes', 'bom', 'motivo', 'nao', 'foi', 'que', 'imagina']), '| corte', r(CORTE1), '| pouso14', r(POUSO14));
console.log(linhas.map((l, k) => `fala ${k + 1}: ${r(l.A)}-${r(l.A + l.dur)} s`).join(' | '));
console.log(`duração: ${D} s · falas: ${N} · explosões: ${explosoes.length} · efeitos: ${sfx.length}`);
