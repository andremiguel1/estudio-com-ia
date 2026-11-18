// Gera o index.html do Reels "o teto da Uber" (Reels 1), versão 14: CTA com marca, chaves com teto, PAROU, cofre intacto e botão com brilho (51 a 61 s).
// Versão 13: três regras com checklist, projetos, avisos semanais e painel (38 a 51 s).
// Versão 12: teto depois (Uber) x teto antes (seu projeto) em 33 a 38 s; formas soltas fora do resto.
// Versão 11: orçamento com calendário, selo do CTO, cofre e meses rachados (26 a 33 s).
// Versão 10: duelo em tela dividida com o vídeo de um dev em 7 a 17 s.
// Versão 9: mergulho no monitor, crachás, medidor e placar em 20 a 25 s.
// Versão 8: vídeo do Magnific no fundo do "Mas esse não é o dado mais estranho".
// Versão 7: sem a fala 2 (o gancho emenda no "Agora compara") e com o logo da Uber no cartão e no mergulho.
// Versão 6: gancho em tela dividida (reação embaixo) com o número por extenso.
// Versão 5: som de letreiro analógico no giro do gancho.
// Versão 4: gancho novo (caça-níquel, contracheque, cartão que vira) e sons novos do Magnific.
// Versão 3: a v2 revista com o oficio-motion.md
// (som pelo pico ou pelo começo audível, soco no pouso, câmera que não para, trocas de cena variadas).
// Uso: node gerar.mjs   (rode de novo sempre que trocar uma fala ou um texto)
// Estilo: .claude/skills/estilo-tipografia-cinetica (e o oficio-motion.md ao lado). A v1 e a v2 ficaram em gerar-v1.mjs e gerar-v2.mjs.
import { execFileSync, spawnSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';

const LEAD = 0.25, GAP = 0.25, TAIL = 1.6;
const AUDIO = 'assets/audio/x12/';
const MUSICA = existsSync('assets/audio/trilha.mp3') ? 'assets/audio/trilha.mp3' : null;
const IA = { d: 'IA', s: 'inteligência artificial' };

// Token: 'palavra' com prefixos * (chip), ~ (itálico serifado), ! (explosão) e sufixo @marca,
// ou { d: 'na tela', s: 'falado', hl, cls, m }.
const FALAS = [
  // blocos: [palavras, trechos de voz] em ordem; prende cada grupo de palavras ao seu trecho entre silêncios
  // (o número falado por extenso ocupa 2,8 s e, distribuído por letras, puxava "por mês" e "Não é" para cedo demais)
  { arq: 'fala01.mp3', modo: 'big', topo: 230, blocos: [[1, 2], [2, 1], [1, 1], [12, 1]], paginas: [
    [{ d: 'R$ 8.272', s: 'oito mil duzentos e setenta e dois reais', cls: 'num', m: 'oito' }, 'por', 'mês.@mes'],
    ['Não@nao', 'é', '~salário.@salario'],
    ['É', 'o', 'teto@teto1', 'de', '*UMA@uma', 'ferramenta', 'de', IA, 'na', 'Uber.@uber'] ] },
  // fala02 ("Isso porque a Uber limitou cada ferramenta...") saiu na v7: repetia o gancho em dólar
  // blocos da fala03: Agora | compara | Na mediana... sete mil e quinhentos reais | Só uma ferramenta | já passa esse salário
  { arq: 'fala03.mp3', modo: 'cap', pausa: 0.45, blocos: [[1, 1], [1, 1], [13, 1], [3, 1], [4, 1]], paginas: [
    ['Agora@agora', 'compara.@compara'],
    ['Na', 'mediana,@mediana', 'um', 'analista@analista', 'de', 'sistemas'],
    ['com', 'carteira@carteira', 'assinada', 'no', 'Brasil@brasil'],
    ['ganha', { d: 'R$ 7.500.', s: 'sete mil e quinhentos reais', hl: 1, m: 'sete' }],
    ['Só@so', 'uma', 'ferramenta'],
    ['já', '*!passa@passa', 'esse', 'salário.'] ] },
  { arq: 'fala04.mp3', modo: 'big', topo: 560, glitch: true, pausa: 0.2, paginas: [
    ['mas', 'esse', 'não', 'é', 'o', 'dado', 'mais', '*estranho', 'dessa', 'história.'] ] },
  // blocos da fala05: Antes | a Uber incentivou | todo mundo... máximo | com ranking interno | Em abril | o CTO contou | o orçamento... inteiro | já tinha acabado | Em quatro meses
  { arq: 'fala05.mp3', modo: 'cap', pausa: 0.5, blocos: [[1, 1], [3, 1], [7, 1], [3, 1], [2, 1], [3, 1], [7, 1], [3, 1], [2, 1]], paginas: [
    ['Antes,', 'a', 'Uber', 'incentivou', 'todo@todo', 'mundo'],
    ['a', 'usar@usar', IA, 'ao', '*máximo,@maximo'],
    ['com', 'ranking@ranking', 'interno.'],
    ['Em', 'abril,@abril', 'o', 'CTO@cto', 'contou:'],
    ['o', 'orçamento@orcamento', 'de', IA],
    ['do', 'ano', 'inteiro'],
    ['já', 'tinha', '*acabado.@acabado'],
    ['Em', { d: 'quatro meses.', s: 'quatro meses', hl: 1, m: 'quatro' }] ] },
  // blocos da fala06: E o teto? | Só veio depois | do susto. | E isso tem uma lição para o seu projeto.
  { arq: 'fala06.mp3', modo: 'big', topo: 300, blocos: [[3, 1], [3, 1], [2, 1], [9, 1]], paginas: [
    ['e', 'o', 'teto?@tetoq'],
    ['só', 'veio', 'depois@depois'],
    ['do', '~susto.@susto'],
    ['e', 'isso', 'tem', 'uma', '!lição@licao'],
    ['para', 'o', 'seu', 'projeto.@projeto'] ] },
  // blocos da fala07: Três regras | que podem te proteger | Um | um máximo por mês | para cada projeto | Dois | olhe o seu gasto | toda semana | Três | decida antes... teto
  { arq: 'fala07.mp3', modo: 'cap', pausa: 1.0, blocos: [[2, 1], [4, 1], [1, 1], [4, 1], [3, 1], [1, 1], [4, 1], [2, 1], [1, 1], [9, 1]], paginas: [
    ['Três@tres0', 'regras', 'que', 'podem', 'te', 'proteger.'],
    ['Um:@um', 'um', 'máximo@max1', 'por', 'mês'],
    ['para', 'cada@cada', 'projeto.'],
    ['Dois:@dois', 'olhe', 'o', 'seu', 'gasto@gasto'],
    ['toda@toda', 'semana.@semana'],
    ['Três:@tres', 'decida@decida', 'antes@antes'],
    ['o', 'que', 'acontece'],
    ['quando', 'chegar', 'no', '*teto.@teto'] ] },
  // blocos da fala08: Na Sua Marca | cada chave tem o seu teto em reais | Chegou nele | a chave para | e o seu saldo fica intacto | Teste grátis, sem cartão | Link na bio
  { arq: 'fala08.mp3', modo: 'cap', blocos: [[3, 1], [6, 1], [2, 1], [3, 1], [6, 1], [4, 1], [3, 1]], paginas: [
    ['Na', 'Sua', 'Marca,@sm', 'cada@cadach', 'chave'],
    ['tem', 'o', 'seu', { d: 'teto em reais.', s: 'teto em reais', hl: 1, m: 'reais' }],
    ['Chegou@chegou', 'nele,', 'a', 'chave', 'para,@para'],
    ['e', 'o', 'seu', 'saldo@saldo', 'fica', '~intacto.@intacto'],
    ['Teste@teste', 'grátis,', 'sem', 'cartão.'],
    ['Link@bio', 'na', 'bio.'] ] },
];

// ---------- medição ----------
const duracao = (arq) => parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', AUDIO + arq]).toString());
function silencios(arq) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-i', AUDIO + arq, '-af', 'silencedetect=noise=-38dB:d=0.09', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
  const ini = [...r.matchAll(/silence_start: ([\d.]+)/g)].map(m => +m[1]);
  const fim = [...r.matchAll(/silence_end: ([\d.]+)/g)].map(m => +m[1]);
  return ini.map((s, i) => [s, fim[i] ?? s]);
}
const falado = (t) => typeof t === 'string' ? t.replace(/^[*~!]+/, '').replace(/@.*$/, '') : t.s;
function peso(t) {
  const s = falado(t).replace(/[^\p{L}\p{N} ]/gu, '');
  if (/^CTO$/.test(s)) return 7;
  return s.length + 1;
}
function info(t) {
  if (typeof t !== 'string') return { d: t.d, hl: !!t.hl, cls: t.cls || '', m: t.m, it: false, bum: false };
  let d = t, hl = false, it = false, bum = false, m;
  while (/^[*~!]/.test(d)) { if (d[0] === '*') hl = true; if (d[0] === '~') it = true; if (d[0] === '!') bum = true; d = d.slice(1); }
  const at = d.indexOf('@'); if (at >= 0) { m = d.slice(at + 1); d = d.slice(0, at); }
  return { d, hl, it, bum, m, cls: '' };
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
  const nb = f.blocos ? f.blocos.reduce((s, [p, c]) => [s[0] + p, s[1] + c], [0, 0]) : null;
  if (nb && nb[0] === toks.length && nb[1] === voz.length) {
    let p = 0, c = 0;
    for (const [np, nc] of f.blocos) {
      const tr = voz.slice(c, c + nc), tot = tr.reduce((s, [a, b]) => s + (b - a), 0);
      const local = (fr) => { let x = fr * tot; for (const [a, b] of tr) { if (x <= b - a) return a + x; x -= b - a; } return tr[tr.length - 1][1]; };
      const ts = toks.slice(p, p + np), Wb = ts.reduce((s, t) => s + peso(t), 0); let a = 0;
      for (const t of ts) { tempos.push(A + local(a / Wb)); a += peso(t); }
      p += np; c += nc;
    }
  } else {
    if (f.blocos) console.log(`aviso: ${f.arq} tem ${voz.length} trechos de voz e ${toks.length} palavras; blocos ignorados`);
    for (const t of toks) { tempos.push(A + mapa(acc / W)); acc += peso(t); }
  }
  let i = 0;
  const paginas = f.paginas.map(pg => pg.map(t => { const o = { ...info(t), t: tempos[i++] }; if (o.m) M[o.m] = o.t; return o; }));
  linhas.push({ ...f, A, dur, paginas });
  A += dur + GAP + (f.pausa || 0);
}
linhas.forEach((l, k) => { l.S = k === 0 ? 0 : l.A - 0.15; });
linhas.forEach((l, k) => { l.E = k < linhas.length - 1 ? linhas[k + 1].S : l.A + l.dur + TAIL; });
const D = +linhas[linhas.length - 1].E.toFixed(3);
const r = (x) => +x.toFixed(3);
const S = (k) => linhas[k].S, E = (k) => linhas[k].E;

// ---------- utilidades de animação ----------
let seed = 7;
const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const js = [];
const add = (s) => js.push(s);
const ft = (sel, de, para, t) => add(`tl.fromTo("${sel}",${de},${para},${r(t)});`);
const to = (sel, para, t) => add(`tl.to("${sel}",${para},${r(t)});`);
const entra = (sel, t, d = 0.3) => ft(sel, '{opacity:0,scale:1.12,filter:"blur(14px)"}', `{opacity:1,scale:1,filter:"blur(0px)",duration:${d},ease:"power3.out"}`, t);
const sai = (sel, t, d = 0.18) => to(sel, `{opacity:0,scale:0.9,y:-60,filter:"blur(14px)",duration:${d},ease:"power2.in"}`, t - d);
const sobe = (sel, t, d = 0.32) => ft(sel, '{opacity:0,y:40}', `{opacity:1,y:0,duration:${d},ease:"power3.out"}`, t);
const pop = (sel, t, s = 1.5) => ft(sel, `{opacity:0,scale:${s}}`, '{opacity:1,scale:1,duration:0.32,ease:"back.out(2.2)"}', t);
// slam: t é o POUSO (o power4.in só aparece no fim); explosão, flash, tremor e impacto vão no mesmo t
const slam = (sel, t, s = 2.4) => ft(sel, `{opacity:0,scale:${s},filter:"blur(10px)"}`, '{opacity:1,scale:1,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', t - 0.22);
const barra = (sel, t, d = 0.7, ease = 'power3.out', de = 0) => ft(sel, `{scaleX:${de}}`, `{scaleX:1,duration:${d},ease:"${ease}"}`, t);
const tremor = (sel, t, a = 14) => add(`tl.fromTo("${sel}",{x:0,y:0},{keyframes:[{x:${-a},y:${a / 2}},{x:${a * 0.8},y:${-a / 2}},{x:${-a / 2},y:${a / 3}},{x:${a / 3},y:0},{x:0,y:0}],duration:0.32,ease:"none"},${r(t)});`);
const conta = (sel, t, ate, d = 1, pre = 'R$ ', suf = '', de = 0) => add(`(function(){const o={v:${de}},el=document.querySelector("${sel}");tl.to(o,{v:${ate},duration:${d},ease:"power2.out",onUpdate:()=>{el.textContent="${pre}"+fmt(o.v)+"${suf}";}},${r(t)});})();`);
const flashes = []; const flash = (t, cor = '#ffffff', a = 0.5) => { const id = `fl${flashes.length + 1}`; flashes.push(`<div class="flash" id="${id}" style="background:${cor}"></div>`); ft(`#${id}`, '{opacity:0}', `{keyframes:[{opacity:${a},duration:0.04},{opacity:0,duration:0.24}],ease:"none"}`, t); };

// formas geométricas (confete)
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

// cursor "dev": lista de passos { t, x, y } e cliques
const cursor = [];
const cur = (t, x, y, d = 0.45) => cursor.push(`tl.to("#cur",{x:${x},y:${y},duration:${d},ease:"power2.inOut"},${r(t)});`);
const clique = (t) => cursor.push(`tl.fromTo("#curi",{scale:1},{scale:0.78,duration:0.08,yoyo:true,repeat:1,ease:"power1.inOut"},${r(t)});`);
const mostra = (t, x, y) => { cursor.push(`tl.set("#cur",{x:${x},y:${y}},${r(t)});`); cursor.push(`tl.fromTo("#curi",{opacity:0},{opacity:1,duration:0.2},${r(t)});`); };
const esconde = (t) => cursor.push(`tl.to("#curi",{opacity:0,duration:0.2},${r(t)});`);

// ---------- cenas ----------
const cenas = [];
const rodape = (txt) => `<p class="rodape">${txt}</p>`;
// Troca de cena (ofício: variar o tipo). 'zoom' é o whip do estilo; 'cima' e 'esq' são speed ramp:
// a cena sai acelerando (power4.in, 300 px em 0,2 s) e a próxima chega na mesma direção freando (expo.out),
// com a velocidade casada no corte: 4·300/0,2 = 6.000 px/s = 6,93·390/0,45.
const TROCA = [null, 'nenhum', 'cima', 'nenhum', 'esq', 'zoom', 'cima']; // cena 2: as metades entram pelos lados, à mão
const EIXO = { cima: 'y', esq: 'x' };
function chega(sel, t, tipo) {
  if (tipo === 'nenhum') return; // entrada feita à mão (o mergulho no monitor)
  if (tipo === 'zoom') return entra(sel, t);
  ft(sel, `{${EIXO[tipo]}:390,filter:"blur(16px)"}`, `{${EIXO[tipo]}:0,filter:"blur(0px)",duration:0.45,ease:"expo.out"}`, t);
  ft(sel, '{opacity:0}', '{opacity:1,duration:0.06,ease:"none"}', t);
}
function parte(sel, t, tipo) {
  if (tipo === 'nenhum') return;
  if (tipo === 'zoom') return sai(sel, t);
  to(sel, `{${EIXO[tipo]}:-300,filter:"blur(16px)",duration:0.2,ease:"power4.in"}`, t - 0.2);
}
function cena(k, inner) {
  const id = `c${k + 1}`;
  // camadas: .in (troca de cena) > .cam (câmera) > .mexe (tremor) > .zoom (punch de cada página)
  cenas.push(`<div id="${id}" class="clip cena" data-start="${r(S(k))}" data-duration="${r(E(k) - S(k))}" data-track-index="1" data-track-kind="graphics" data-layout-allow-overlap data-layout-allow-overflow style="z-index:${10 + k}"><div class="in" id="${id}i"><div class="cam" id="${id}c"><div class="mexe" id="${id}m"><div class="zoom" id="${id}z">${inner}</div></div></div></div></div>`);
  // câmera (ofício §3): aproximação em ease-out e, em paralelo, deriva por soma de senos, que nunca chega a parar.
  // A v2 andava de ponto em ponto a cada 0,8 s e freava em cada um (a câmera "truncada").
  // no gancho a deriva é 1,6× maior: entre o confete do número e o "Não é" havia 1,03 s quase parado (meta: < 1 s)
  { const dur = r(E(k) - S(k)), f = k * 1.7, a = k === 0 ? 1.2 : 1;
    for (let q = 0, n = Math.max(2, Math.round(dur / 0.8)); q < n * 3; q++) rnd(); // mantém a sequência de sorteios da v2 (confete e partículas iguais)
    // na tela dividida (cena 2) a câmera fica parada: o vídeo do dev está fora da cena e as metades precisam casar
    if (k !== 1) add(`tl.fromTo("#${id}c",{scale:1},{scale:1.08,duration:${dur},ease:"power1.out"},${r(S(k))});`);
    if (k !== 1) add(`(function(){const el=document.querySelector("#${id}c"),o={t:0};tl.fromTo(o,{t:0},{t:${dur},duration:${dur},ease:"none",onUpdate:()=>{const t=o.t;gsap.set(el,{x:${a}*(13*Math.sin(1.3*t+${r(f)})+7*Math.sin(2.9*t+${r(f * 2.3)})),y:${a}*(11*Math.sin(1.1*t+${r(f + 1)})+6*Math.sin(3.3*t+${r(f * 1.9)})),rotation:0.5*Math.sin(0.9*t+${r(f)})});}},${r(S(k))});})();`); }
  if (k > 0) chega(`#${id}i`, S(k), TROCA[k]);
  if (k < linhas.length - 1) parte(`#${id}i`, E(k), TROCA[k + 1]);
}
const AX = 90, AY = 600; // canto da área de gráficos

// 1. Gancho (v6, pedido do diretor em 15/11): tela dividida só no gancho, 60% em cima (0–1152 px) e 40% embaixo
// (1152–1920 px) com o vídeo de reação (assets/video/hook-reacao.mp4, feito do referencia-reacao-magnific.mp4:
// 1080×768, 0,6 s congelado no começo e 1,6 s no fim, para a testa franzida cair no pouso do número).
// Em cima, o número por extenso entra palavra a palavra com a voz; no "reais" as linhas se fecham e o
// R$ 8.272 pousa com a caixa registradora. Depois: contracheque, X carimbado e o cartão que vira.
// Tempos das palavras medidos na energia da fala01 (x12): oito 0,04 s, mil 0,22, duzentos 0,68, setenta 1,48,
// dois 2,30, fim 2,78. Se a fala01 mudar, meça de novo.
const A0 = linhas[0].A, DH = 300, LH = 128, MEIO = 576;
const DIG = [8, 2, 7, 2];
const POUSO = A0 + 2.78;
const EXT = [[['OITO', A0 + 0.04], ['MIL', A0 + 0.22]], [['DUZENTOS', A0 + 0.68], ['E', A0 + 1.15]], [['SETENTA', A0 + 1.48], ['E', A0 + 1.98]], [['DOIS', A0 + 2.30], ['REAIS', A0 + 2.50]]];
const rolo = (i, d) => `<div class="rolo" id="r${i}" data-layout-allow-occlusion><div class="fita"><b>${d}</b></div></div>`;
const contador = `<div class="contador" id="cont"><div class="rs" id="crs">R$</div>${rolo(0, DIG[0])}<div class="ponto">.</div>${DIG.slice(1).map((d, i) => rolo(i + 1, d)).join('')}<div class="chip-mes" id="cmes">POR MÊS</div></div>`;
const extenso = `<div class="extenso" id="ext">${EXT.map((ln, i) => `<div class="ln" style="top:${i * LH}px">${ln.map(([w], j) => `<span id="e${i}-${j}">${w}</span>`).join(' ')}</div>`).join('')}</div>`;
cena(0, `<div class="foto" id="h1f"><img id="f1" src="assets/img/capa-uber.jpg" style="width:4267px;height:2400px;left:-2191px;top:-250px"></div><div class="veu veu-cheio" id="h1v" data-layout-allow-occlusion></div>
<div class="logo-uber" id="h1u"><img src="assets/img/uber-logo.svg" alt="Uber"></div>
${extenso}
${contador}
<div class="area pers gancho">
  <div class="vira" id="h1c">
    <div class="face" id="h1d"><div class="avatar"></div><div><small>CONTRACHEQUE</small><b>SALÁRIO DE DEV</b><span class="linhas"><i></i><i></i></span></div><div class="xis" id="h1x">✕</div></div>
    <div class="face verso" id="h1i"><div class="robo"><i></i><i></i></div><div><img class="logo-uber-mini" src="assets/img/uber-logo.svg" alt="Uber"><b>1 FERRAMENTA DE IA</b><span>teto por funcionário, por mês</span></div></div>
  </div>
</div>
`);
// o vídeo de reação fica na faixa de baixo; a camada .painel-in faz a aproximação lenta
// rodapé e linha amarela ficam fora da câmera da cena, fixos na tela, acima do vídeo
cenas.push(`<p id="h1r" class="clip rodape rodape-gancho" data-start="0" data-duration="${r(M.uber - 0.2)}" data-track-index="9">US$ 1.500 pela PTAX de venda de 09/11/2026, 13h11. Bloomberg, via TechCrunch, 02/06/2026.</p>`);
cenas.push(`<div id="h1p" class="clip divisa" data-start="0" data-duration="${r(M.uber)}" data-track-index="9"></div>`);
cenas.push(`<video id="h1vid" class="clip" data-start="0" data-duration="7.36" data-track-index="8" muted playsinline src="assets/video/hook-reacao.mp4" style="position:absolute;left:0;top:1152px;width:1080px;height:768px;z-index:12;object-fit:cover"></video>`);
// extenso: a frase inteira já está na tela, apagada, desde o quadro 0 (o gancho se demonstra, como na referência);
// cada palavra acende na hora em que é dita. A pilha fica parada e centrada na metade de cima.
add(`tl.set("#ext",{y:${MEIO - 2 * LH}},0);`);
EXT.forEach((ln, i) => ln.forEach(([, t], j) => ft(`#e${i}-${j}`, '{opacity:0.14,scale:1}', '{keyframes:[{opacity:1,scale:1.12,duration:0.08},{scale:1,duration:0.22}],ease:"power2.out",immediateRender:false}', t - 0.04)));
// no fim do "reais" as linhas se fecham no centro e o número pousa no lugar delas
to('#ext', '{scale:0.35,opacity:0,filter:"blur(14px)",duration:0.18,ease:"power4.in"}', POUSO - 0.18);
slam('#cont', POUSO, 2.2);
slam('#crs', POUSO + 0.06, 2.6);
tremor('#c1m', POUSO + 0.02, 20);
explode(540, 580, POUSO, 18, 440); flash(POUSO, '#f2c941', 0.35);
ft('#cmes', '{clipPath:"inset(0 100% 0 0)"}', '{clipPath:"inset(0 0% 0 0)",duration:0.25,ease:"power3.out"}', M.mes - 0.05);
// "Não é salário": o valor encolhe para baixo da legenda, o contracheque chega e leva o X carimbado
to('#cont', '{y:125,scale:0.46,duration:0.45,ease:"power3.inOut"}', M.nao - 0.35);
ft('#h1c', '{y:620,rotation:-8,opacity:0}', '{y:0,rotation:0,opacity:1,duration:0.5,ease:"back.out(1.5)"}', M.nao - 0.1);
slam('#h1x', M.salario + 0.52, 3);
tremor('#h1c', M.salario + 0.52, 18);
// "É o teto de UMA ferramenta de IA": o cartão vira
ft('#h1c', '{rotationY:0}', '{rotationY:180,duration:0.5,ease:"power3.inOut",immediateRender:false}', M.teto1 - 0.1);
explode(540, 960, M.uma, 14, 360);
// a reação aproxima devagar o gancho inteiro, crescendo para baixo (origem na borda de cima, para não cobrir o rodapé nem a linha amarela); antes do "Uber" a faixa de baixo sai e a foto toma a tela
ft('#h1vid', '{scale:1}', '{scale:1.08,transformOrigin:"50% 0%",duration:6.8,ease:"none"}', 0);
to('#h1vid', '{y:800,duration:0.35,ease:"power3.in"}', M.uber - 0.45);
to('#h1r', '{opacity:0,duration:0.2}', M.uber - 0.45);
to('#h1p', '{y:800,duration:0.35,ease:"power3.in"}', M.uber - 0.45);
// "na Uber": a foto aparece e a câmera mergulha nela até o corte; quando a faixa do vídeo sai, o logo da Uber
// surge sobre a foto, na palavra "Uber", e cresce com o mergulho até o corte (a câmera atravessa o logo)
ft('#h1u', '{opacity:0,scale:0.8,filter:"blur(10px)"}', '{opacity:1,scale:1,filter:"blur(0px)",duration:0.22,ease:"power3.out"}', M.uber - 0.15);
to('#h1u', '{scale:2.6,duration:0.45,ease:"power3.in"}', M.uber + 0.0);
ft('#f1', '{scale:1}', `{scale:1.15,transformOrigin:"2731px 1474px",duration:${r(M.uber - 0.12)},ease:"none"}`, 0);
ft('#h1f', '{opacity:0}', '{opacity:0.35,duration:0.5}', M.teto1);
ft('#h1f', '{opacity:0.35}', '{opacity:0.75,duration:0.3,immediateRender:false}', M.uber - 0.1);
to('#f1', '{scale:1.55,duration:0.7,ease:"power3.in"}', M.uber - 0.1);

// 2. Duelo (v10, pedido do diretor em 15/11): tela dividida ao meio, DEV à esquerda (vídeo de um dev brasileiro
// trabalhando, assets/video/dev-lado.mp4, feito do dev-magnific.mp4: 540×1920, câmera lenta 1,85×, escurecido) e IA à
// direita. Cada palavra da fala traz uma peça nova: curva da mediana, crachá, carteira assinada, Brasil, o valor.
// O <video> fica fora da cena (contêiner sem tempo) e recebe a mesma entrada e saída que ela.
cena(1, `<div class="d2">
  <div class="lado-ia" id="s3ri"><div class="codigo" id="s3cd"></div></div>
  <div class="d2-div" id="s3d0"></div>
  <div class="dev-card" id="s3dc">
    <div class="d2-curva"><svg width="440" height="110" viewBox="0 0 440 110"><path id="s3cvp" d="M10 100 C 120 100, 150 12, 220 12 S 320 100, 430 100" fill="none" stroke="#8db8e8" stroke-width="6" stroke-linecap="round"/><line id="s3cvm" x1="220" y1="6" x2="220" y2="104" stroke="#f2c941" stroke-width="5" stroke-linecap="round"/></svg><span class="d2-med" id="s3md">MEDIANA</span></div>
    <div class="d2-chip" id="s3cr">ANALISTA DE SISTEMAS</div>
    <div class="d2-row" id="s3ct"><i class="clt">CLT</i><span>CARTEIRA ASSINADA</span></div>
    <div class="d2-row" id="s3pn"><svg width="30" height="40" viewBox="0 0 30 40"><path d="M15 2 C7 2 2 8 2 15 C2 25 15 38 15 38 C15 38 28 25 28 15 C28 8 23 2 15 2 Z" fill="#f2c941"/><circle cx="15" cy="15" r="5" fill="#0a1626"/></svg><span>BRASIL</span></div>
    <strong id="s3dv">R$ 0</strong>
  </div>
  <div class="ia-alto" id="s3ib"><div class="robo grande" id="s3rb"><i></i><i></i></div><div class="d2-q" id="s3q">?</div></div>
  <div class="ia-card" id="s3ic"><img class="logo-uber-mini" src="assets/img/uber-logo.svg" alt="Uber"><b>1 FERRAMENTA<br>DE IA</b><span>teto por funcionário</span><strong id="s3iv" class="sol">R$ 0</strong></div>
  <div class="vs" id="s3vs" style="top:830px">VS</div>
  <div class="d2-barras"><div class="trilho"><i id="s3b1" class="azul" style="width:90.7%"></i></div><div class="trilho"><i id="s3b2" class="sol" style="width:100%"></i></div><div class="d2-linha" id="s3ln"></div></div>
  <div class="carimbo" id="s3s" style="top:960px">MAIS QUE O SALÁRIO</div>
</div>${rodape('Novo CAGED, via Portal Salário, 12 meses até 09/2026. Salário base.')}`);
cenas.push(`<div class="lado-dev-video" id="s3vw"><div class="lado-dev-zoom" id="s3vz"><video id="s3vid" class="clip" data-start="${r(S(1))}" data-duration="${r(E(1) - S(1))}" data-track-index="8" muted playsinline src="assets/video/dev-lado.mp4"></video></div><div class="lado-veu"></div></div>`);
// "Agora compara.": a tela se divide; o dev entra pela esquerda, a IA pela direita, e o VS bate no "compara"
ft('#s3vw', '{opacity:0}', '{opacity:1,duration:0.08,ease:"none"}', S(1));
ft('#s3vw', '{x:-540}', '{x:0,duration:0.55,ease:"expo.out"}', S(1));
ft('#s3ri', '{x:540}', '{x:0,duration:0.55,ease:"expo.out"}', S(1));
parte('#s3vw', E(1), TROCA[2]);
// movimento contínuo sem desalinhar as metades: o vídeo aproxima dentro da moldura e o código da IA sobe devagar
ft('#s3vz', '{scale:1}', `{scale:1.14,duration:${r(E(1) - S(1))},ease:"none"}`, S(1));
ft('#s3cd', '{y:0}', `{y:-640,duration:${r(E(1) - S(1))},ease:"none"}`, S(1));
to('#particulas', '{opacity:0,duration:0.3}', S(1) + 0.1); // sem formas soltas daqui em diante (elementos aleatórios foram reprovados)
slam('#s3vs', M.compara + 0.05, 2.4); tremor('#c2m', M.compara + 0.08, 10);
// "Na mediana, um analista de sistemas com carteira assinada no Brasil": uma peça por palavra
sobe('#s3dc', M.mediana - 0.2, 0.3);
ft('#s3cvp', '{strokeDasharray:600,strokeDashoffset:600}', '{strokeDashoffset:0,duration:0.5,ease:"power2.out"}', M.mediana - 0.1);
ft('#s3cvm', '{scaleY:0,svgOrigin:"220 104"}', '{scaleY:1,svgOrigin:"220 104",duration:0.3,ease:"back.out(2)"}', M.mediana + 0.3);
pop('#s3md', M.mediana + 0.35, 1.4);
pop('#s3cr', M.analista, 1.3);
ft('#s3ct', '{opacity:0,x:-60}', '{opacity:1,x:0,duration:0.3,ease:"power3.out"}', M.carteira);
pop('#s3pn', M.brasil, 1.5);
// "ganha R$ 7.500": o valor sobe e a barra do DEV marca a linha dos R$ 7.500
conta('#s3dv', M.sete, 7500, 0.8); barra('#s3b1', M.sete, 0.8);
add(`tl.fromTo("#s3dv",{y:0},{keyframes:[{y:-18},{y:0}],duration:0.35,ease:"power2.out"},${r(M.sete + 0.8)});`);
ft('#s3ln', '{scaleY:0}', '{scaleY:1,duration:0.25,ease:"back.out(2)"}', M.sete + 0.8);
// "Só uma ferramenta": o lado da IA acende e o valor dela sobe até encostar na linha
to('#s3q', '{opacity:0,scale:0.6,duration:0.2}', M.so - 0.1);
ft('#s3rb', '{opacity:0.25,scale:1}', '{keyframes:[{opacity:1,scale:1.18,duration:0.14},{scale:1,duration:0.24}],ease:"power2.out",immediateRender:false}', M.so);
sobe('#s3ic', M.so + 0.1, 0.32);
conta('#s3iv', M.so + 0.1, 7400, r(M.passa - M.so - 0.25), 'R$ ');
ft('#s3b2', '{scaleX:0}', `{scaleX:0.89,duration:${r(M.passa - M.so - 0.15)},ease:"power1.out"}`, M.so);
// "já passa esse salário": a barra da IA rompe a linha, o carimbo bate e o lado do DEV escurece
ft('#s3b2', '{scaleX:0.89}', '{scaleX:1,duration:0.15,ease:"power4.out",immediateRender:false}', M.passa);
conta('#s3iv', M.passa, 8272, 0.3, 'R$ ', '', 7400);
tremor('#s3ln', M.passa, 8); explode(931, 1410, M.passa, 10, 200);
to('#s3dc', '{opacity:0.45,scale:0.94,duration:0.3}', M.passa);
to('#s3vw', '{opacity:0.45,duration:0.3}', M.passa);
to('#s3ic', '{scale:1.06,duration:0.3,ease:"back.out(2)"}', M.passa);
slam('#s3s', M.passa + 0.05, 2.6); explode(540, AY + 760, M.passa + 0.05, 16, 420); tremor('#c2m', M.passa + 0.08, 16); flash(M.passa + 0.05, '#f2c941', 0.25);

// 3. Open loop (v8, pedido do diretor em 15/11): no fundo, um vídeo do Magnific no lugar das interrogações e das formas soltas
// (assets/video/fundo-estranho.mp4: escritório escuro à noite, engenheiros de costas diante de monitores azuis, câmera
// avançando; feito do fundo-estranho-magnific.mp4 em 1080×1920, escurecido e puxado para o azul). A frase continua a mesma.
// O <video> tem o próprio tempo e fica fora da cena (regra do HyperFrames: o contêiner do vídeo não tem tempo);
// o contêiner recebe a mesma entrada e saída da cena, para os dois andarem juntos.
cena(2, '');
cenas.push(`<div class="fundo-video" id="bg3w"><video id="bg3v" class="clip" data-start="${r(S(2))}" data-duration="${r(E(2) - S(2) + 0.65)}" data-track-index="8" muted playsinline src="assets/video/fundo-estranho.mp4"></video><div class="fundo-veu"></div></div>`);
chega('#bg3w', S(2), TROCA[2]);
// v9: em vez de sair, a câmera mergulha no monitor de código da direita (930, 1250) e a tela dele vira a cena seguinte
to('#bg3w', '{scale:4.6,transformOrigin:"930px 1250px",filter:"blur(6px)",duration:0.6,ease:"power3.in"}', E(2) - 0.05);
to('#bg3w', '{opacity:0,duration:0.12,ease:"none"}', E(2) + 0.5);
flash(E(2) + 0.5, '#8db8e8', 0.4);
flash(S(2) + 0.1, '#ffffff', 0.18);

// 4. Ranking que embaralha, orçamento que esvazia mês a mês, "4 MESES"
const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
// v9 (pedido do diretor em 15/11): "todo mundo" vira uma tela cheia de crachás, "ao máximo" um medidor que estoura
// e "ranking interno" um placar de jogo com trocas de posição e coroa. Nada de número parecido com dado real.
const CRACHAS = 24;
cena(3, `<div class="area pers">
  <div class="crachas" id="s4g">${Array.from({ length: CRACHAS }, (_, i) => `<div class="cracha" id="s4c${i}"><div class="avatar mini" style="background:${['#8db8e8', '#f2c941', '#ff8a8a', '#a9bfd6'][i % 4]}"></div><b>Dev ${String(i + 1).padStart(2, '0')}</b><div class="mini-trilho"><i id="s4b${i}"></i></div></div>`).join('')}</div>
  <div class="medidor-ia" id="s4m"><svg width="760" height="430" viewBox="0 0 760 430"><path d="M110 380 A270 270 0 0 1 380 110" fill="none" stroke="#8db8e8" stroke-width="44"/><path d="M380 110 A270 270 0 0 1 571 189" fill="none" stroke="#f2c941" stroke-width="44"/><path d="M571 189 A270 270 0 0 1 650 380" fill="none" stroke="#ff8a8a" stroke-width="44"/><g id="s4p"><path d="M372 380 L380 150 L388 380 Z" fill="#ffffff"/></g><circle cx="380" cy="380" r="26" fill="#ffffff"/></svg><span class="uso">USO DE IA</span><span class="max" id="s4x">MÁXIMO</span></div>
  <div class="cartao" id="s5a"><div class="cab">RANKING INTERNO · USO DE IA</div><div class="ranking">
    ${[1, 2, 3, 4].map(n => `<span class="pos-fixa" style="top:${(n - 1) * 150 + 30}px">${n}º</span>`).join('')}
    ${[0, 1, 2, 3].map(n => `<div class="rk" id="s5k${n}" style="top:${n * 150}px"><div class="avatar mini" style="background:${['#8db8e8', '#f2c941', '#ff8a8a', '#a9bfd6'][n]}"></div>${n === 2 ? '<svg class="coroa" id="s5cr" width="70" height="52" viewBox="0 0 70 52"><path d="M4 48 L10 12 L24 28 L35 4 L46 28 L60 12 L66 48 Z" fill="#f2c941"/></svg>' : ''}<b>Dev ${['07', '13', '02', '21'][n]}</b><div class="trilho"><i id="s5b${n}" class="${n === 2 ? 'sol' : 'azul'}" style="width:${[70, 62, 96, 84][n]}%"></i></div></div>`).join('')}
  </div></div>
  <div class="calendario" id="s5cal"><div class="cal-aros"><i></i><i></i><i></i></div><div class="cal-ano">2026</div><div class="cal-folhas">${['ABR', 'MAR', 'FEV', 'JAN'].map((m, i) => `<div class="cal-folha" id="s5f${3 - i}"><b>${m}</b><span>1</span></div>`).join('')}</div></div>
  <div class="selo-cto" id="s5cto"><svg width="54" height="74" viewBox="0 0 54 74"><rect x="15" y="2" width="24" height="40" rx="12" fill="#f2c941"/><path d="M6 32 C6 46 16 54 27 54 C38 54 48 46 48 32" fill="none" stroke="#f2c941" stroke-width="5" stroke-linecap="round"/><rect x="24.5" y="54" width="5" height="12" fill="#f2c941"/><rect x="14" y="66" width="26" height="5" rx="2.5" fill="#f2c941"/></svg><div><b>CTO DA UBER</b><span>contou em abril</span></div></div>
  <div class="cofre-tit" id="s5ct">ORÇAMENTO DE IA · 2026</div>
  <div class="cofre" id="s5cof"><div class="cofre-janela"><i id="s5lv"></i></div><div class="cofre-disco"><i></i></div><div class="carimbo-zero" id="s5r0">R$ 0</div></div>
  <div class="faixa-meses" id="s5ms">${MESES.map((m, i) => `<span id="s5m${i}">${m}<svg class="racha" id="s5k${i}x" viewBox="0 0 100 52" preserveAspectRatio="none"><path d="M8 4 L40 24 L30 30 L70 48" fill="none" stroke="#ffffff" stroke-width="3"/></svg></span>`).join('')}<div class="sem-orc" id="s5sem">8 MESES SEM ORÇAMENTO</div></div>
  <div class="mega4" id="s5c" style="top:-20px"><b>4</b><span>MESES</span></div>
</div>${rodape('TechCrunch, 02/06/2026, citando The Information.').replace('<p class="rodape">', '<p class="rodape" id="s4r">')}`);
ft('#s4r', '{opacity:0}', '{opacity:0.9,duration:0.3}', S(3) + 0.6);
// "a Uber incentivou todo mundo": três levas de crachás, a última no "todo"
const LEVAS = [S(3) + 0.7, S(3) + 1.05, M.todo];
for (let i = 0; i < CRACHAS; i++) pop(`#s4c${i}`, LEVAS[Math.floor(i / 8)] + (i % 8) * 0.03, 1.4);
// "a usar IA ao máximo": as barrinhas enchem, o medidor entra e o ponteiro sobe até estourar no "máximo"
for (let i = 0; i < CRACHAS; i++) barra(`#s4b${i}`, M.usar + (i % 8) * 0.02, r(M.maximo - M.usar), 'power1.in');
to('#s4g', '{opacity:0.28,scale:0.96,duration:0.3}', M.usar + 0.3);
ft('#s4m', '{opacity:0,scale:0.82,y:50}', '{opacity:1,scale:1,y:0,duration:0.42,ease:"back.out(1.6)"}', M.usar + 0.3);
ft('#s4p', '{rotation:-88,svgOrigin:"380 380"}', `{rotation:-12,svgOrigin:"380 380",duration:${r(M.maximo - M.usar - 0.6)},ease:"power1.in"}`, M.usar + 0.55);
to('#s4p', '{rotation:74,svgOrigin:"380 380",duration:0.38,ease:"back.out(2.6)"}', M.maximo - 0.05);
ft('#s4x', '{opacity:0.25,scale:1}', '{keyframes:[{opacity:1,scale:1.25,duration:0.1},{scale:1,duration:0.25}],ease:"power2.out",immediateRender:false}', M.maximo);
for (let i = 0; i < CRACHAS; i++) to(`#s4b${i}`, '{backgroundColor:"#ff8a8a",duration:0.12}', M.maximo + (i % 8) * 0.01);
tremor('#s4m', M.maximo + 0.05, 14); flash(M.maximo, '#ff8a8a', 0.14);
// "com ranking interno": crachás e medidor se recolhem e entra o placar, com duas trocas de posição e a coroa
to('#s4g', '{opacity:0,scale:0.6,filter:"blur(12px)",duration:0.25,ease:"power2.in"}', M.ranking - 0.4);
to('#s4m', '{opacity:0,scale:0.6,filter:"blur(12px)",duration:0.25,ease:"power2.in"}', M.ranking - 0.4);
ft('#s5a', '{rotationX:30,y:140,opacity:0}', '{rotationX:0,y:0,opacity:1,duration:0.45,ease:"power3.out"}', M.ranking - 0.3);
[0, 1, 2, 3].forEach(n => barra(`#s5b${n}`, M.ranking - 0.25 + n * 0.05, 0.35));
// troca 1: o 3º sobe para o 1º; troca 2: o 4º sobe para o 2º (linhas a cada 150 px; os números 1º a 4º ficam parados)
ft('#s5k2', '{y:0}', '{y:-300,duration:0.42,ease:"power3.inOut"}', M.ranking);
ft('#s5k0', '{y:0}', '{y:150,duration:0.42,ease:"power3.inOut"}', M.ranking);
ft('#s5k1', '{y:0}', '{y:150,duration:0.42,ease:"power3.inOut"}', M.ranking);
ft('#s5k3', '{y:0}', '{y:-300,duration:0.42,ease:"power3.inOut",immediateRender:false}', M.ranking + 0.45);
ft('#s5k0', '{y:150}', '{y:300,duration:0.42,ease:"power3.inOut",immediateRender:false}', M.ranking + 0.45);
ft('#s5k1', '{y:150}', '{y:300,duration:0.42,ease:"power3.inOut",immediateRender:false}', M.ranking + 0.45);
// nessa cena as formas soltas do fundo saem (elementos aleatórios foram reprovados); voltam na cena seguinte
to('#particulas', '{opacity:0,duration:0.3}', S(3) + 0.4); // v12: não voltam mais (no v9 elas voltavam aqui e apareciam até o fim)
pop('#s5cr', M.ranking + 0.95, 1.8); explode(AX + 220, AY + 140, M.ranking + 0.95, 12, 260);
// v11 (pedido do diretor em 15/11): "Em abril, o CTO contou" vira um calendário arrancando folhas até ABRIL e um selo do CTO;
// "o orçamento de IA do ano inteiro" um cofre que escoa um mês por batida; "já tinha acabado" o carimbo R$ 0 e os 8 meses
// restantes rachados ("8 meses sem orçamento"); "em quatro meses" o 4 gigante com a faixa dos 12 meses embaixo.
// Sem valor em reais no cofre: a fonte não diz quanto era o orçamento.
sai('#s5a', M.abril - 0.4);
sobe('#s5cal', M.abril - 0.45, 0.3);
[0, 1, 2].forEach(i => ft(`#s5f${i}`, '{y:0,rotation:0,opacity:1}', '{y:-160,rotation:-14,opacity:0,duration:0.22,ease:"power2.in",immediateRender:false}', M.abril - 0.3 + i * 0.14));
ft('#s5f3', '{scale:1}', '{keyframes:[{scale:1.1,duration:0.1},{scale:1,duration:0.2}],ease:"power2.out",immediateRender:false}', M.abril + 0.12);
ft('#s5cto', '{opacity:0,x:120}', '{opacity:1,x:0,duration:0.4,ease:"power3.out"}', M.cto - 0.15);
// o cofre entra cheio e escoa um mês por batida (JAN a ABR), quase vazio no ABR e zerado no "acabado"
pop('#s5ct', M.orcamento - 0.35, 1.2);
ft('#s5cof', '{opacity:0,scale:0.8,y:60}', '{opacity:1,scale:1,y:0,duration:0.42,ease:"back.out(1.5)"}', M.orcamento - 0.3);
MESES.forEach((m, i) => ft(`#s5m${i}`, '{opacity:0,y:20}', '{opacity:1,y:0,duration:0.25,ease:"power3.out"}', M.orcamento - 0.2 + i * 0.025));
const PASSO = 0.5, NIVEIS = [0.74, 0.5, 0.27, 0.07];
NIVEIS.forEach((nv, i) => {
  const t = M.orcamento + 0.15 + i * PASSO;
  ft(`#s5m${i}`, '{backgroundColor:"rgba(255,255,255,0.06)",color:"#a9bfd6"}', '{backgroundColor:"#f2c941",color:"#0a1626",duration:0.15,immediateRender:false}', t);
  ft('#s5lv', `{scaleY:${i ? NIVEIS[i - 1] : 1}}`, `{scaleY:${nv},duration:0.3,ease:"power2.in",immediateRender:${i === 0}}`, t);
  explode(AX + 410, AY + 380, t + 0.05, 7, 150);
});
ft('#s5lv', '{scaleY:0.07}', '{scaleY:0,duration:0.2,ease:"power2.in",immediateRender:false}', M.acabado - 0.2);
slam('#s5r0', M.acabado, 2.4); tremor('#s5cof', M.acabado + 0.02, 14);
for (let i = 4; i < 12; i++) {
  ft(`#s5m${i}`, '{backgroundColor:"rgba(255,255,255,0.06)",color:"#a9bfd6"}', '{backgroundColor:"#ff8a8a",color:"#0a1626",duration:0.12,immediateRender:false}', M.acabado + 0.15 + (i - 4) * 0.04);
  ft(`#s5k${i}x`, '{opacity:0}', '{opacity:0.9,duration:0.08,immediateRender:false}', M.acabado + 0.2 + (i - 4) * 0.04);
}
pop('#s5sem', M.acabado + 0.55, 1.5);
// "Em quatro meses": tudo recua, a faixa dos meses desce e o 4 bate grande por cima
// a faixa dos meses e o "8 meses sem orçamento" ficam embaixo do 4: 4 meses de dinheiro, 8 sem
['#s5cal', '#s5cto', '#s5ct', '#s5cof'].forEach(sel => to(sel, '{opacity:0.15,scale:0.9,duration:0.25}', M.quatro - 0.2));
slam('#s5c', M.quatro + 0.05, 2.8); flash(M.quatro + 0.05, '#f2c941', 0.35); explode(540, AY + 300, M.quatro + 0.05, 18, 460); tremor('#c4m', M.quatro + 0.08, 18);

// 5. Teto depois x teto antes (v12, pedido do diretor em 15/11): a fatura da Uber cresce, passa direto por onde o teto
// deveria estar ("E o teto? Só veio depois"), o alarme toca e só então a linha do TETO bate, tarde, com o excesso em
// vermelho acima dela ("do susto"). Na lição, a Uber encolhe para a esquerda e entra "SEU PROJETO", com o teto já no
// lugar e a barra parando embaixo dele ("ANTES"). Faturas sem valor em reais.
const LINHAS_FAT = (n) => Array.from({ length: n }, (_, i) => `<p><i style="width:${[62, 48, 70, 55, 40, 66][i % 6]}%"></i><b></b></p>`).join('');
cena(4, `<div class="t-grupo" id="s6u">
  <div class="fat-uber" id="s6fw"><div class="fat-papel">${LINHAS_FAT(22)}</div><div class="fat-excesso" id="s6ex"></div></div>
  <div class="teto-vazio" id="s6tq"><span>TETO ?</span></div>
  <div class="teto-cheio" id="s6tl"><span class="teto-rot">TETO</span><span class="teto-depois" id="s6dp">DEPOIS</span></div>
  <svg class="alerta" id="s6al" width="150" height="132" viewBox="0 0 150 132"><path d="M75 6 L144 126 L6 126 Z" fill="#ff8a8a" stroke="#0a1626" stroke-width="6" stroke-linejoin="round"/><rect x="69" y="44" width="12" height="46" rx="6" fill="#0a1626"/><circle cx="75" cy="106" r="7" fill="#0a1626"/></svg>
  <img class="uber-rot" id="s6ul" src="assets/img/uber-logo.svg" alt="Uber">
</div>
<div class="proj" id="s6p2"><div class="proj-tit"><svg id="s6lp" width="44" height="60" viewBox="0 0 44 60"><path d="M22 3 C11 3 4 11 4 21 C4 29 9 33 12 38 L12 44 L32 44 L32 38 C35 33 40 29 40 21 C40 11 33 3 22 3 Z" fill="#f2c941"/><rect x="13" y="47" width="18" height="5" rx="2" fill="#f2c941"/><rect x="15" y="54" width="14" height="4" rx="2" fill="#f2c941"/></svg><span>SEU PROJETO</span></div>
  <div class="proj-fat"><div class="fat-papel">${LINHAS_FAT(12)}</div><i class="proj-barra" id="s6pb"></i><div class="proj-teto"><span>TETO</span></div><div class="proj-antes" id="s6an">ANTES</div><div class="proj-ok" id="s6ok">✓</div></div>
</div>`);
// "E o teto?": a fatura cresce de baixo para cima e a linha tracejada mostra onde o teto deveria estar
ft('#s6fw', '{clipPath:"inset(78% 0% 0% 0%)"}', `{clipPath:"inset(50% 0% 0% 0%)",duration:${r(M.depois - S(4) - 0.1)},ease:"power1.in"}`, S(4));
ft('#s6tq', '{opacity:0,scaleX:0.6}', '{opacity:1,scaleX:1,duration:0.3,ease:"power3.out"}', M.tetoq - 0.1);
// "Só veio depois": a fatura passa direto pela linha e o pedaço acima dela fica vermelho
ft('#s6fw', '{clipPath:"inset(50% 0% 0% 0%)"}', '{clipPath:"inset(0% 0% 0% 0%)",duration:0.6,ease:"power2.in",immediateRender:false}', M.depois - 0.1);
ft('#s6ex', '{opacity:0}', '{opacity:1,duration:0.35}', M.depois + 0.2);
// "do susto.": o alarme toca e só então o TETO bate, tarde, com o excesso ainda acima
pop('#s6al', M.susto, 1.6); tremor('#s6fw', M.susto + 0.02, 14); flash(M.susto, '#ff8a8a', 0.22);
to('#s6tq', '{opacity:0,duration:0.15}', M.susto + 0.3);
ft('#s6tl', '{scaleX:0}', '{scaleX:1,duration:0.18,ease:"power4.in"}', M.susto + 0.37);
pop('#s6dp', M.susto + 0.6, 1.5); tremor('#s6u', M.susto + 0.56, 10);
to('#s6al', '{opacity:0,scale:0.7,duration:0.2}', M.licao - 0.8);
// "E isso tem uma lição": a Uber encolhe para a esquerda e entra o seu projeto, com o teto já no lugar
to('#s6u', '{x:-262,scale:0.6,duration:0.45,ease:"power3.inOut"}', M.licao - 0.75);
pop('#s6ul', M.licao - 0.4, 1.3);
ft('#s6p2', '{opacity:0,x:200}', '{opacity:1,x:0,duration:0.45,ease:"expo.out"}', M.licao - 0.55);
pop('#s6lp', M.licao, 1.8); explode(640, 690, M.licao + 0.02, 10, 200);
ft('#s6pb', '{scaleY:0}', `{scaleY:0.5,duration:${r(M.projeto - M.licao)},ease:"power2.out"}`, M.licao - 0.1);
pop('#s6ok', M.projeto - 0.1, 1.6);
// "para o seu projeto.": o seu projeto vira o centro e o teto ganha o "ANTES"
to('#s6u', '{opacity:0.35,duration:0.3}', M.projeto - 0.1);
to('#s6p2', '{x:-150,scale:1.08,duration:0.4,ease:"power3.inOut"}', M.projeto - 0.1);
pop('#s6an', M.projeto + 0.1, 1.5);

// 6. Três regras (v13, pedido do diretor em 16/11): um checklist abre as três regras e volta completo no fim (o quadro para
// salvar); cada regra é feita na prática: três projetos ganham o seu teto, quatro avisos semanais chegam, e um painel
// decide antes o que acontece no teto (PARAR), com a barra parando nele. Sem valores em reais.
const REGRAS = ['UM MÁXIMO POR MÊS', 'OLHAR O GASTO TODA SEMANA', 'DECIDIR ANTES O QUE ACONTECE NO TETO'];
cena(5, `<div class="area pers">
  <div class="checklist" id="r7ck"><b>3 REGRAS</b><small>PARA O SEU PROJETO</small>${REGRAS.map((t, i) => `<div class="ck-linha" id="r7l${i}"><i class="ck-caixa"><em id="r7v${i}">✓</em></i><span class="ck-n">${i + 1}</span><span class="ck-txt" id="r7t${i}">${t}</span></div>`).join('')}</div>
  <div class="indicador" id="r7ind">${[0, 1, 2].map(i => `<i id="r7d${i}">${i + 1}</i>`).join('')}</div>
  <div class="r1" id="r1">${['A', 'B', 'C'].map((p, i) => `<div class="proj-linha" id="r1c${i}" style="top:${60 + i * 190}px"><b>PROJETO ${p}</b><small>por mês</small><div class="r1-trilho"><i id="r1b${i}" style="width:${[55, 35, 70][i]}%"></i><span class="r1-teto" id="r1t${i}"></span></div></div>`).join('')}</div>
  <div class="r2" id="r2">${[1, 2, 3, 4].map(s => `<div class="aviso-sem" id="r2a${s}"><svg width="54" height="54" viewBox="0 0 54 54"><circle cx="27" cy="27" r="25" fill="#f2c941"/><path d="M27 13 C20 13 17 18 17 24 L17 31 L13 36 L41 36 L37 31 L37 24 C37 18 34 13 27 13 Z M23 39 C23 42 25 44 27 44 C29 44 31 42 31 39 Z" fill="#0a1626"/></svg><div><b>RESUMO DA SEMANA ${s}</b><span>Projeto A · dentro do teto ✓</span></div></div>`).join('')}</div>
  <div class="r3" id="r3"><div class="r3-painel" id="r3p"><div class="r3-tit">QUANDO CHEGAR NO TETO:</div>${['PARAR', 'AVISAR', 'PEDIR AUTORIZAÇÃO'].map((o, i) => `<div class="r3-op${i === 0 ? ' r3-parar' : ''}" id="r3o${i}">${o}${i === 0 ? '<em id="r3ok">✓</em>' : ''}</div>`).join('')}</div>
    <div class="r3-barra" id="r3bb"><div class="r3-trilho"><i id="r3f"></i></div><div class="r3-parede" id="r3w"><span>TETO</span></div><div class="r3-parou" id="r3s">PAROU</div></div></div>
</div>${rodape('Inspiradas na regra da Uber.')}`);
// "Três regras que podem te proteger": o checklist entra com as três linhas ainda desfocadas
ft('#r7ck', '{opacity:0,scale:0.85,y:60}', '{opacity:1,scale:1,y:0,duration:0.45,ease:"back.out(1.5)"}', S(5) + 0.1);
[0, 1, 2].forEach(i => ft(`#r7l${i}`, '{opacity:0,x:-80}', '{opacity:1,x:0,duration:0.3,ease:"power3.out"}', M.tres0 + 0.45 + i * 0.3));
// o checklist sai e fica o indicador 1 2 3 no topo
to('#r7ck', '{opacity:0,scale:0.6,y:-260,duration:0.35,ease:"power3.in"}', M.um - 0.4);
ft('#r7ind', '{opacity:0,y:-30}', '{opacity:1,y:0,duration:0.3,ease:"power3.out"}', M.um - 0.15);
[[0, M.um], [1, M.dois], [2, M.tres]].forEach(([i, t]) => ft(`#r7d${i}`, '{backgroundColor:"rgba(255,255,255,0.08)",color:"#a9bfd6"}', '{backgroundColor:"#f2c941",color:"#0a1626",duration:0.2,immediateRender:false}', t));
// Regra 1, "um máximo por mês para cada projeto": três projetos, e cada um ganha o seu teto
[0, 1, 2].forEach(i => ft(`#r1c${i}`, '{opacity:0,x:300}', '{opacity:1,x:0,duration:0.4,ease:"expo.out"}', M.um + i * 0.1));
[0, 1, 2].forEach(i => barra(`#r1b${i}`, M.max1 - 0.2 + i * 0.08, 0.6));
mostra(M.max1 + 0.1, 790, 1320);
[772, 962, 1152].forEach((y, i) => { const t = M.cada - 0.2 + i * 0.3; cur(t - 0.2, 790, y, 0.2); clique(t); ft(`#r1t${i}`, '{scaleY:0}', '{scaleY:1,duration:0.22,ease:"back.out(2.4)"}', t + 0.02); });
esconde(M.dois - 0.25);
[0, 1, 2].forEach(i => to(`#r1c${i}`, '{x:-1100,duration:0.3,ease:"power3.in"}', M.dois - 0.35 + i * 0.05));
// Regra 2, "olhe o seu gasto toda semana": quatro avisos, um por semana
[M.dois + 0.4, M.gasto - 0.1, M.toda, M.semana + 0.15].forEach((t, i) => ft(`#r2a${i + 1}`, '{opacity:0,y:-120,scale:0.94}', '{opacity:1,y:0,scale:1,duration:0.35,ease:"back.out(1.4)"}', t));
[1, 2, 3, 4].forEach(s => to(`#r2a${s}`, '{y:-900,opacity:0,duration:0.3,ease:"power3.in"}', M.tres - 0.35 + (s - 1) * 0.04));
// Regra 3, "decida antes o que acontece quando chegar no teto": escolhe PARAR antes, e a barra para no teto
ft('#r3p', '{opacity:0,rotationX:30,y:120}', '{opacity:1,rotationX:0,y:0,duration:0.45,ease:"power3.out"}', M.tres - 0.05);
[0, 1, 2].forEach(i => ft(`#r3o${i}`, '{opacity:0,x:-60}', '{opacity:1,x:0,duration:0.25,ease:"power3.out"}', M.tres + 0.15 + i * 0.12));
ft('#r3bb', '{opacity:0,y:40}', '{opacity:1,y:0,duration:0.3,ease:"power3.out"}', M.tres + 0.3);
ft('#r3w', '{opacity:0,scaleY:0}', '{opacity:1,scaleY:1,duration:0.3,ease:"back.out(2)"}', M.tres + 0.35);
mostra(M.tres + 0.1, 760, 1340); cur(M.decida - 0.25, 560, 785, 0.4); clique(M.antes);
ft('#r3o0', '{backgroundColor:"rgba(242,201,65,0)",color:"#ffffff"}', '{backgroundColor:"#f2c941",color:"#0a1626",duration:0.15,immediateRender:false}', M.antes + 0.08);
pop('#r3ok', M.antes + 0.12, 1.8);
esconde(M.antes + 0.7);
ft('#r3f', '{scaleX:0}', `{scaleX:0.85,duration:${r(M.teto - M.antes - 0.3)},ease:"power1.in"}`, M.antes + 0.3);
tremor('#r3w', M.teto, 12); flash(M.teto, '#ffffff', 0.15);
slam('#r3s', M.teto + 0.05, 2.4); explode(AX + 760, AY + 620, M.teto + 0.05, 12, 260);
// no fim, o checklist volta completo: as três regras escritas e marcadas (o quadro para salvar)
to('#r3', '{opacity:0,scale:0.9,duration:0.25,ease:"power2.in"}', M.teto + 0.35);
to('#r7ind', '{opacity:0,duration:0.2}', M.teto + 0.35);
to('#r7ck', '{opacity:1,scale:1,y:0,duration:0.35,ease:"back.out(1.4)"}', M.teto + 0.45);
[0, 1, 2].forEach(i => { ft(`#r7t${i}`, '{filter:"blur(9px)",opacity:0.5}', '{filter:"blur(0px)",opacity:1,duration:0.25,immediateRender:false}', M.teto + 0.55 + i * 0.15); pop(`#r7v${i}`, M.teto + 0.6 + i * 0.15, 1.8); });

// 7. CTA (v14, pedido do diretor em 16/11): "Na <sua-marca>" a marca bate grande com brilho e vira o cabeçalho;
// "cada chave tem o seu teto" três chaves ganham o selo TETO R$ 50/mês (ILUSTRAÇÃO); "chegou nele, a chave para"
// a Ferramenta C bate no teto, trava com cadeado e as chamadas batem na parede; "o seu saldo fica intacto" volta o
// cofre da cena do orçamento, cheio, com o carimbo INTACTO; "Teste grátis, sem cartão" o botão com brilho passando.
const CHAVES = [['PROJETO A', 0.45], ['PROJETO B', 0.3], ['FERRAMENTA C', 0.6]];
const CADEADO = '<svg width="40" height="44" viewBox="0 0 40 44"><path d="M11 20 V13 a9 9 0 0 1 18 0 V20" fill="none" stroke="#ff8a8a" stroke-width="5"/><rect x="4" y="19" width="32" height="24" rx="6" fill="#ff8a8a"/></svg>';
cena(6, `<div class="area pers">
  <div class="marca-big" id="c8m1"><span class="marca-luz"><span class="marca-sombra">sua<b>marca</b></span><span class="lux">sua</span><b class="lux">marca</b></span></div>
  ${CHAVES.map(([n], i) => `<div class="proj-linha" id="c8k${i}" style="top:${110 + i * 180}px"><div class="ilus">ILUSTRAÇÃO</div><b>${n}</b><span class="c8-selo" id="c8s${i}">TETO R$ 50/mês</span><div class="r1-trilho"><i id="c8b${i}" style="width:100%"></i><span class="r1-teto" id="c8t${i}"></span>${i === 2 ? `<span class="c8-cad" id="c8cad">${CADEADO}</span>${[0, 1, 2].map(q => `<i class="c8-q" id="c8q${q}"><em id="c8x${q}">✕</em></i>`).join('')}` : ''}</div>${i === 2 ? '<div class="c8-parou" id="c8par">PAROU</div>' : ''}</div>`).join('')}
  <div class="cofre-tit" id="c8ct">SEU SALDO</div>
  <div class="cofre" id="c8cf"><div class="cofre-janela"><i></i></div><div class="cofre-disco" id="c8dk"><i></i></div><div class="carimbo-ok" id="c8in">INTACTO ✓</div></div>
  <div class="fim" id="s8f"><div class="cta" id="s8c">TESTE GRÁTIS, SEM CARTÃO<i class="brilho" id="c8br"></i></div><div class="bio" id="s8l">LINK NA BIO <b id="s8a">↑</b></div></div>
</div>${rodape('Condições da oferta: escreva aqui as regras do teste grátis da sua marca.')}`);
// "Na <sua-marca>": a marca bate grande, o brilho passa e ela encolhe para o cabeçalho, onde fica até o fim
const POUSO_SM = Math.max(S(6) + 0.3, M.sm - 0.12);
slam('#c8m1', POUSO_SM, 2.2); flash(POUSO_SM, '#f2c941', 0.18);
ft('#c8m1 .lux', '{backgroundPosition:"100% 0%"}', '{backgroundPosition:"0% 0%",duration:0.7,ease:"power2.inOut"}', POUSO_SM + 0.08);
to('#c8m1', '{y:-285,scale:0.42,duration:0.4,ease:"power3.inOut"}', M.cadach - 0.3);
// "cada chave tem o seu teto em reais": três chaves entram, cada uma ganha o selo e a linha do teto
CHAVES.forEach(([, v], i) => {
  ft(`#c8k${i}`, '{opacity:0,x:300}', '{opacity:1,x:0,duration:0.4,ease:"expo.out"}', M.cadach - 0.05 + i * 0.12);
  ft(`#c8b${i}`, '{scaleX:0}', `{scaleX:${v},duration:0.6,ease:"power3.out"}`, M.cadach + 0.2 + i * 0.12);
  pop(`#c8s${i}`, M.reais - 0.25 + i * 0.1, 1.8);
  ft(`#c8t${i}`, '{scaleY:0}', '{scaleY:1,duration:0.22,ease:"back.out(2.4)"}', M.reais - 0.25 + i * 0.1);
  ft(`#c8t${i}`, '{scaleY:1}', '{keyframes:[{scaleY:1.3},{scaleY:1}],duration:0.35,immediateRender:false}', M.reais + 0.35 + i * 0.08);
});
// "Chegou nele, a chave para": as outras saem, a Ferramenta C sobe ao centro, enche até o teto e trava
const FOCO = M.chegou - 0.2;
to('#c8k0', '{opacity:0,y:-120,duration:0.3,ease:"power2.in"}', FOCO);
to('#c8k1', '{opacity:0,y:-60,duration:0.3,ease:"power2.in"}', FOCO + 0.04);
to('#c8k2', '{y:-220,scale:1.12,duration:0.45,ease:"power3.inOut"}', FOCO);
ft('#c8b2', '{scaleX:0.6}', `{scaleX:0.8,duration:${r(M.para - FOCO - 0.3)},ease:"power1.in",immediateRender:false}`, FOCO + 0.3);
to('#c8b2', '{backgroundColor:"#ff8a8a",duration:0.12}', M.para);
tremor('#c7m', M.para, 12); flash(M.para, '#ff8a8a', 0.18);
pop('#c8cad', M.para + 0.02, 1.8);
slam('#c8par', M.para + 0.05, 2.4);
// as chamadas batem na parede do teto e viram X (a fila se acumula)
[0, 1, 2].forEach(q => {
  const bate = M.para + 0.12 + q * 0.15;
  ft(`#c8q${q}`, '{opacity:0,x:0}', `{opacity:1,x:${600 - q * 40},duration:0.28,ease:"power2.in"}`, bate - 0.28);
  pop(`#c8x${q}`, bate, 1.8);
});
to('#c8k2', '{opacity:0,y:-420,duration:0.3,ease:"power2.in"}', M.saldo - 0.35);
// "e o seu saldo fica intacto": o cofre volta cheio, o disco gira e o carimbo verde bate
ft('#c8ct', '{opacity:0,y:20}', '{opacity:1,y:0,duration:0.3,ease:"power3.out"}', M.saldo - 0.2);
ft('#c8cf', '{opacity:0,scale:0.7,y:80}', '{opacity:1,scale:1,y:0,duration:0.45,ease:"back.out(1.6)"}', M.saldo - 0.2);
ft('#c8dk', '{rotation:0}', '{rotation:-270,duration:0.6,ease:"power3.out"}', M.saldo);
ft('#c8in', '{opacity:0,scale:2.2,rotation:-8,filter:"blur(10px)"}', '{opacity:1,scale:1,rotation:-8,filter:"blur(0px)",duration:0.22,ease:"power4.in"}', M.intacto - 0.22);
tremor('#c8cf', M.intacto + 0.02, 10); explode(AX + 450, AY + 486, M.intacto, 12, 300);
to('#c8ct', '{opacity:0,duration:0.2}', M.teste - 0.3);
to('#c8cf', '{y:-200,opacity:0,duration:0.25,ease:"power2.in"}', M.teste - 0.3);
// "Teste grátis, sem cartão": o botão bate, o cursor clica e o brilho passa (de novo no "Link na bio" e no fim)
slam('#s8c', M.teste + 0.05, 2.2); explode(540, AY + 190, M.teste + 0.05, 18, 460); flash(M.teste + 0.05, '#f2c941', 0.3);
[M.teste + 0.3, M.bio + 0.6, D - 0.9].forEach(t => ft('#c8br', '{x:-240,skewX:-20}', '{x:1100,skewX:-20,duration:0.7,ease:"power2.inOut"}', t));
ft('#c8m1 .lux', '{backgroundPosition:"100% 0%"}', '{backgroundPosition:"0% 0%",duration:0.7,ease:"power2.inOut",immediateRender:false}', D - 0.9);
mostra(M.teste + 0.1, 760, 1450); cur(M.teste + 0.25, 640, AY + 190, 0.4); clique(M.teste + 0.75);
ft('#s8c', '{scale:1}', '{keyframes:[{scale:0.93},{scale:1.04},{scale:1}],duration:0.3,immediateRender:false}', M.teste + 0.75);
sobe('#s8l', M.bio);
add(`tl.fromTo("#s8a",{y:0},{keyframes:[{y:-18},{y:0}],duration:0.5,repeat:${Math.max(1, Math.floor((D - M.bio - 0.3) / 0.5) - 1)},ease:"sine.inOut"},${r(M.bio + 0.3)});`);
esconde(D - 0.6);

// ---------- legendas ----------
const legendas = [];
linhas.forEach((l, k) => {
  l.paginas.forEach((pg, j) => {
    if (k === 0 && j === 0) return; // no gancho, o número e o "por mês" são o caça-níquel e o chip da cena 1
    const ini = k === 0 && j === 0 ? 0 : j === 0 ? Math.max(l.S, pg[0].t - 0.12) : pg[0].t - 0.1;
    const fim = j < l.paginas.length - 1 ? l.paginas[j + 1][0].t - 0.1 : l.E;
    const id = `p${k + 1}-${j + 1}`;
    const palavras = pg.map((w, i) => `<span class="w${w.hl ? ' hl' : ''}${w.it ? ' it' : ''}${w.cls ? ' ' + w.cls : ''}" id="${id}-${i + 1}">${w.d}</span>`).join(' ');
    legendas.push(`<div id="${id}" class="clip pg ${l.modo}${l.glitch ? ' glitch' : ''}" data-start="${r(ini)}" data-duration="${r(fim - ini)}" data-track-index="2" data-layout-allow-overlap style="top:${l.topo ?? 250}px"><div class="pgi" id="${id}i">${palavras}</div></div>`);
    pg.forEach((w, i) => {
      const sel = `#${id}-${i + 1}`, t = Math.max(0, w.t - 0.04);
      if (w.cls === 'num') { ft(sel, '{opacity:1,scale:1.35,filter:"blur(6px)"}', '{opacity:1,scale:1,filter:"blur(0px)",duration:0.3,ease:"power4.in"}', 0); return; }
      if (l.modo === 'big') ft(sel, '{opacity:0,scale:1.6,filter:"blur(10px)"}', '{opacity:1,scale:1,filter:"blur(0px)",duration:0.24,ease:"power4.out"}', t);
      else if (w.hl) ft(sel, '{opacity:0,scale:1.5,rotation:-6}', '{opacity:1,scale:1,rotation:0,duration:0.3,ease:"back.out(2.4)"}', t);
      else ft(sel, '{opacity:0,y:30,filter:"blur(6px)"}', '{opacity:1,y:0,filter:"blur(0px)",duration:0.24,ease:"power3.out"}', t);
      if (w.bum) explode(540, (l.topo ?? 250) + 60, t + 0.05, 12, 300);
      if (w.it) add(`tl.fromTo("${sel}",{rotation:0},{keyframes:[{rotation:-4},{rotation:3},{rotation:0}],duration:0.5},${r(t + 0.25)});`);
    });
    if (l.glitch) {
      add(`tl.fromTo("#${id}i",{x:0,textShadow:"0px 0 rgba(255,80,110,0.9), 0px 0 rgba(80,210,255,0.9)"},{keyframes:[{x:-10,textShadow:"-9px 0 rgba(255,80,110,0.9), 9px 0 rgba(80,210,255,0.9)"},{x:8,textShadow:"7px 0 rgba(255,80,110,0.9), -7px 0 rgba(80,210,255,0.9)"},{x:-4,textShadow:"-3px 0 rgba(255,80,110,0.9), 3px 0 rgba(80,210,255,0.9)"},{x:0,textShadow:"0px 0 rgba(255,80,110,0.9), 0px 0 rgba(80,210,255,0.9)"}],duration:0.4,repeat:3,ease:"none"},${r(ini + 0.1)});`);
    }
    if (j > 0 && k !== 1) add(`tl.to("#c${k + 1}z",{scale:${j % 2 ? 1.07 : 1},x:${j % 2 ? (rnd() > 0.5 ? 24 : -24) : 0},y:${j % 2 ? -18 : 0},duration:0.3,ease:"power3.out"},${r(ini)});`);
    if (fim - ini > 0.5) add(`tl.fromTo("#${id}i",{scale:1},{scale:1.06,duration:${r(fim - ini - 0.2)},ease:"none"},${r(ini + 0.02)});`);
    // página sai encolhendo com desfoque (a próxima já está entrando)
    if (!(k === linhas.length - 1 && j === l.paginas.length - 1)) to(`#${id}i`, '{scale:0.86,y:-40,opacity:0,filter:"blur(12px)",duration:0.16,ease:"power2.in"}', fim - 0.17);
  });
});

// ---------- partículas de fundo (movimento contínuo) ----------
const fundo = [];
for (let i = 0; i < 42; i++) {
  const x = r(rnd() * 1000 + 20), y = r(rnd() * 1820 + 40), tam = r(24 + rnd() * 40), op = r(0.22 + rnd() * 0.4);
  fundo.push(`<i id="bp${i}" style="left:${x}px;top:${y}px;opacity:${op}">${forma(Math.floor(rnd() * 5), tam, CORES[Math.floor(rnd() * 3)])}</i>`);
  add(`tl.fromTo("#bp${i}",{x:0,y:0,rotation:0},{x:${r((rnd() - 0.5) * 600)},y:${r(-500 - rnd() * 900)},rotation:${r((rnd() - 0.5) * 2160)},duration:${D},ease:"none"},0);`);
}

// ---------- áudio ----------
const audios = linhas.map((l, k) => `<audio id="voz${k + 1}" class="clip" data-start="${r(l.A)}" data-duration="${r(l.dur)}" data-track-index="5" data-volume="1" src="${AUDIO}${l.arq}"></audio>`);
// Cada arquivo tem um trecho mudo antes do som (o "error" só soa aos 0,60 s; na v2 ele era cortado antes de tocar).
// Por isso o tempo passado a efeito() é o do EVENTO na tela, e o arquivo começa antes:
//   'pico' (whoosh, impacto): o pico cai no evento; 'inicio' (pop, clique, erro, ding): o som começa a soar no evento.
// Medida: janelas de 10 ms; início = primeira a até 30 dB do pico.
const sons = {};
function som(nome) {
  if (sons[nome]) return sons[nome];
  const e = spawnSync('ffmpeg', ['-hide_banner', '-i', `assets/sfx/${nome}.mp3`, '-af', 'aresample=44100,asetnsamples=441,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level', '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
  const v = [...e.matchAll(/pts_time:([\d.]+)[^\n]*\n[^\n]*?RMS_level=(-?[\d.]+|-inf)/g)].map(m => [+m[1], parseFloat(m[2])]).filter(x => isFinite(x[1]));
  const p = v.reduce((a, b) => b[1] > a[1] ? b : a);
  return (sons[nome] = { pico: p[0], inicio: v.find(x => x[1] > p[1] - 30)[0], fim: duracaoSfx(nome) });
}
const duracaoSfx = (nome) => parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', `assets/sfx/${nome}.mp3`]).toString());
const sfx = [], agenda = [];
// util: quanto do som tocar depois do começo audível (padrão: até o fim do arquivo)
function efeito(nome, t, vol, util) {
  if (!Number.isFinite(t)) throw new Error(`efeito ${nome}: tempo inválido (${t}); a marca da palavra não existe mais?`);
  const s = som(nome), alinha = /^(whoosh|impact|boom|vira|letreiro-trava)/.test(nome) ? 'pico' : 'inicio';
  const ini = r(Math.max(0, t - s[alinha])), dur = r(Math.min(s.fim, s.inicio + (util ?? s.fim)));
  agenda.push({ nome, evento: r(t), soa: r(ini + s.inicio), vol });
  sfx.push(`<audio id="sfx${sfx.length + 1}" class="clip" data-start="${ini}" data-duration="${dur}" data-track-index="6" data-volume="${vol}" src="assets/sfx/${nome}.mp3"></audio>`);
}
// o mesmo whoosh 10 vezes em 68 s cansa (ofício: não repetir o arquivo em ~20 s); grave e agudo são o mesmo som com o tom mudado
const WHOOSH = ['whoosh-short', 'whoosh-short-grave', 'whoosh-short-agudo']; let wq = 0;
const whoosh = (t, vol) => efeito(WHOOSH[wq++ % WHOOSH.length], t, vol);
// gancho (v6): o extenso entra em silêncio sobre a voz (o diretor recusou o giro de caça-níquel e o de letreiro);
// o soco é a caixa registradora no pouso do número, que ele aprovou
efeito('hook-caixa-b', POUSO, 0.5);                                 // o R$ cai: o maior soco do vídeo (escalada)
efeito('whoosh-short-agudo', M.mes + 0.1, 0.22);                    // chip "por mês"
efeito('whoosh-short-grave', M.nao + 0.2, 0.26);                    // o contracheque chega
linhas.forEach((l, k) => { if (k > 0 && k !== 2) whoosh(k === 3 ? l.S + 0.5 : l.S, 0.32); }); // na cena 4, o corte é o pico do mergulho // pico no corte de cena
efeito('carimbo-b', M.salario + 0.52, 0.5);                         // o X é carimbado no contracheque
efeito('vira-cartao-b', M.teto1 + 0.15, 0.4);                      // o cartão vira (pico no meio do giro)
efeito('click', M.teste + 0.83, 0.35);                              // fundo do clique no botão
[0, 1, 2].forEach(i => efeito('click-soft', M.tres0 + 0.45 + i * 0.3, 0.18)); // linhas do checklist
efeito('pop', M.um, 0.22);                                          // entram os projetos
[0, 1, 2].forEach(i => efeito('click-soft', M.cada - 0.18 + i * 0.3, 0.22)); // cada projeto ganha o teto
[M.dois + 0.4, M.gasto - 0.1, M.toda, M.semana + 0.15].forEach((t, i) => efeito(i % 2 ? 'notification' : 'ping', t, 0.2)); // um aviso por semana
efeito('click', M.antes, 0.3);                                      // escolhe PARAR
[0, 1, 2].forEach(i => efeito('click-soft', M.teto + 0.6 + i * 0.15, 0.2)); // checklist final
efeito('boom-b', M.compara + 0.05, 0.24);                           // o VS bate no "compara"
[M.mediana + 0.3, M.analista, M.carteira, M.brasil].forEach(t => efeito('click-soft', t, 0.2)); // uma peça por palavra
efeito('whoosh-short-agudo', M.so + 0.1, 0.22);                     // o lado da IA acende
efeito('boom-a', M.passa + 0.05, 0.32);                             // "mais que o salário" pousa
efeito('glitch-2', S(2) + 0.1, 0.2, 0.68);
[S(3) + 0.7, S(3) + 1.05, M.todo].forEach((t, i) => efeito('pop', t, [0.2, 0.22, 0.25][i])); // levas de crachás
efeito('whoosh-short-grave', M.maximo, 0.3);                        // o ponteiro estoura no "máximo"
[M.ranking + 0.4, M.ranking + 0.85].forEach(t => efeito('click-soft', t, 0.3)); // as linhas do placar chegam
efeito('chime', M.ranking + 0.95, 0.22, 1.0);                       // coroa no 1º lugar
[0, 1, 2].forEach(i => efeito('click-soft', M.abril - 0.3 + i * 0.14, 0.18)); // folhas do calendário
efeito('whoosh-short-grave', M.orcamento + 0.3, 0.26);              // o dinheiro começa a escoar
[0, 1, 2, 3].forEach(i => efeito('click-soft', M.orcamento + 0.15 + i * 0.5, 0.16)); // um mês por batida
efeito('carimbo-b', M.acabado, 0.45);                               // carimbo R$ 0
efeito('boom-b', M.quatro + 0.05, 0.36);                            // "4 meses" pousa (abaixo do gancho: escalada)
efeito('error', M.susto, 0.24);                                     // o alarme do susto
efeito('boom-a', M.susto + 0.55, 0.3);                              // só então o TETO bate, tarde
efeito('pop', M.licao - 0.55, 0.24);                                // entra o seu projeto
efeito('click-soft', M.projeto - 0.1, 0.24);                        // o check embaixo do teto
efeito('boom-a', M.teto, 0.28);                                     // a barra bate no teto e para
efeito('pop', POUSO_SM, 0.3);                                       // a marca bate
efeito('whoosh-short-agudo', M.cadach - 0.1, 0.2);                  // a marca vira cabeçalho
[0, 1, 2].forEach(i => efeito('click-soft', M.cadach + 0.05 + i * 0.12, 0.2)); // as três chaves entram
efeito('pop', M.reais - 0.25, 0.22);                                // os selos do teto
efeito('error', M.para, 0.2);                                       // a chave para
[0, 1, 2].forEach(q => efeito('click-soft', M.para + 0.12 + q * 0.15, 0.16)); // as chamadas batem na parede
efeito('chime', M.intacto, 0.25, 1.3);                              // saldo intacto
efeito('boom-b', M.teste + 0.05, 0.35);                             // CTA pousa
// ofício (antecipação): nada nos 0,5 s antes de um impacto
for (const a of agenda.filter(x => /^(impact|boom|hook-caixa)/.test(x.nome))) {
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
      :root { --ground:#0a1626; --night:#10233a; --glow:#1556a7; --sun:#f2c941; --azul:#8db8e8; --mut:#a9bfd6; --rosa:#ff8a8a; --ink:#ffffff; --font:"Outfit", sans-serif; --serif:"Playfair Display", serif; --mono:"JetBrains Mono", monospace; }
      * { margin:0; padding:0; box-sizing:border-box; }
      html, body { margin:0; width:1080px; height:1920px; overflow:hidden; background:var(--ground); }
      #root { width:100%; height:100%; font-family:var(--font); color:var(--ink); }
      #bg { position:absolute; inset:0; background:var(--ground); overflow:hidden; }
      .glow { position:absolute; width:1300px; height:1300px; margin:-650px 0 0 -650px; border-radius:50%; }
      #glow1 { left:30%; top:30%; background:radial-gradient(circle, rgba(21,86,167,0.55) 0%, rgba(21,86,167,0.14) 42%, rgba(10,22,38,0) 70%); }
      #glow2 { left:75%; top:72%; background:radial-gradient(circle, rgba(242,201,65,0.16) 0%, rgba(242,201,65,0.05) 40%, rgba(10,22,38,0) 70%); }
      #grao { position:absolute; inset:0; opacity:0.07; background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>"); }
      #particulas i, .explosao i { position:absolute; display:block; line-height:0; }
      .explosao { position:absolute; width:0; height:0; }
      .flash { position:absolute; inset:0; opacity:0; }
      .cena, .cena .in, .cena .cam, .cena .mexe, .cena .zoom { position:absolute; inset:0; }
      .foto { position:absolute; inset:0; overflow:hidden; opacity:0.35; }
      .foto img { position:absolute; }
      .veu { position:absolute; inset:0; }
      .veu-cheio { background:linear-gradient(180deg, rgba(10,22,38,0.92) 0%, rgba(10,22,38,0.7) 40%, rgba(10,22,38,0.6) 70%, rgba(10,22,38,0.92) 100%); }
      .area { position:absolute; left:90px; right:90px; top:600px; height:820px; }
      .pers { perspective:1600px; }
      .rodape { position:absolute; left:110px; right:110px; top:1452px; font:400 28px/1.35 var(--font); color:var(--mut); text-align:center; opacity:0.9; }
      /* legendas */
      .pg { position:absolute; left:80px; right:80px; text-align:center; z-index:60; }
      .pg .w { display:inline-block; }
      .pg.cap { font:800 74px/1.12 var(--font); letter-spacing:-0.025em; }
      .pg.big { font:900 100px/1.02 var(--font); letter-spacing:-0.03em; text-transform:uppercase; }
      .pg .hl { background:var(--sun); color:var(--ground); border-radius:12px; padding:0 0.14em; }
      .pg.big .hl { background:none; color:var(--sun); padding:0; }
      .pg .it { font-family:var(--serif); font-style:italic; font-weight:700; color:var(--sun); text-transform:none; letter-spacing:-0.01em; }
      .pg .num { display:block; font:900 236px/1 var(--font); color:var(--sun); letter-spacing:-0.05em; margin-bottom:6px; text-shadow:0 0 80px rgba(242,201,65,0.35); }
      /* cartões */
      .cartao { background:rgba(16,35,58,0.94); border:1px solid rgba(255,255,255,0.13); border-radius:36px; padding:52px; position:relative; box-shadow:0 40px 90px rgba(0,0,0,0.35); }
      .cab { font:600 28px/1 var(--font); letter-spacing:0.18em; color:var(--sun); margin-bottom:44px; }
      .ilus { position:absolute; right:36px; top:-20px; font:700 26px/1 var(--font); letter-spacing:0.12em; color:var(--ground); background:var(--mut); padding:10px 16px; border-radius:999px; }
      .rot { display:flex; justify-content:space-between; align-items:baseline; font:600 38px/1.2 var(--font); color:var(--mut); margin-bottom:18px; gap:20px; }
      .rot b { font:800 52px/1 var(--font); color:var(--azul); font-variant-numeric:tabular-nums; white-space:nowrap; }
      .rot b small { font:500 30px/1 var(--font); color:var(--mut); }
      .sol { color:var(--sun); }
      .trilho { height:44px; border-radius:999px; background:rgba(255,255,255,0.08); overflow:hidden; }
      .trilho i { display:block; height:100%; border-radius:999px; transform-origin:0 50%; background:var(--azul); }
      .trilho i.sol { background:var(--sun); }
      .linha { margin-bottom:46px; }
      .avatar { width:110px; height:110px; border-radius:50%; background:radial-gradient(circle at 50% 36%, #dce7f3 0 22%, transparent 23%), radial-gradient(ellipse at 50% 100%, #dce7f3 0 46%, transparent 47%), #2a4a6f; flex:none; }
      .avatar.grande { width:150px; height:150px; margin:0 auto 22px; }
      .avatar.mini { width:64px; height:64px; }
      .robo { width:110px; height:110px; border-radius:28px; background:var(--sun); position:relative; flex:none; }
      .robo i { position:absolute; top:38px; width:20px; height:30px; border-radius:10px; background:var(--ground); }
      .robo i:first-child { left:28px; } .robo i:last-child { right:28px; }
      .robo.grande { width:150px; height:150px; margin:0 auto 22px; border-radius:36px; }
      .robo.grande i { top:52px; width:26px; height:40px; } .robo.grande i:first-child { left:38px; } .robo.grande i:last-child { right:38px; }
      /* cena 1 */
      .dev, .ia { position:absolute; left:60px; right:60px; top:150px; display:flex; gap:34px; align-items:center; padding:40px 44px; }
      .contador { position:absolute; left:0; right:0; top:430px; opacity:0; display:flex; justify-content:center; align-items:flex-start; z-index:30; transform-origin:50% 40%; filter:drop-shadow(0 0 36px rgba(242,201,65,0.32)); }
      .rolo { position:relative; height:300px; overflow:hidden; font:900 300px/300px var(--font); letter-spacing:-0.04em; color:var(--sun); font-variant-numeric:tabular-nums; -webkit-mask-image:linear-gradient(180deg, transparent 0%, #000 16%, #000 84%, transparent 100%); mask-image:linear-gradient(180deg, transparent 0%, #000 16%, #000 84%, transparent 100%); }
      .rolo .fita b { display:block; height:300px; text-align:center; }
      .ponto { font:900 300px/300px var(--font); color:var(--sun); margin:0 -0.01em 0 0.01em; }
      .contador .rs { position:absolute; left:120px; top:-96px; font:900 120px/1 var(--font); color:var(--sun); opacity:0; }
      .chip-mes { position:absolute; left:0; right:0; top:318px; margin:0 auto; width:fit-content; background:var(--sun); color:var(--ground); font:900 64px/1 var(--font); padding:20px 34px; border-radius:16px; clip-path:inset(0 100% 0 0); }
      .vira { position:absolute; left:60px; right:60px; top:235px; height:210px; transform-style:preserve-3d; opacity:0; }
      .face { position:absolute; inset:0; display:flex; gap:30px; align-items:center; padding:28px 40px; background:rgba(16,35,58,0.97); border:1px solid rgba(255,255,255,0.14); border-radius:36px; box-shadow:0 40px 90px rgba(0,0,0,0.4); backface-visibility:hidden; -webkit-backface-visibility:hidden; }
      .face.verso { transform:rotateY(180deg); border-color:rgba(242,201,65,0.6); }
      .face small { display:block; font:700 26px/1 var(--font); letter-spacing:0.16em; color:var(--sun); margin-bottom:12px; }
      .face b { display:block; font:900 50px/1.04 var(--font); letter-spacing:-0.02em; }
      .face span { display:block; font:500 32px/1.2 var(--font); color:var(--mut); margin-top:10px; }
      .face .linhas i { display:block; height:16px; border-radius:8px; background:rgba(255,255,255,0.14); margin-top:12px; width:320px; }
      .face .linhas i + i { width:220px; }
      .face .xis { top:-55px; }
      .marca-big { position:absolute; left:0; right:0; top:230px; text-align:center; opacity:0; }
      .marca-luz { display:inline-block; font:800 150px/1 var(--font); letter-spacing:-0.04em; position:relative; }
      .marca-sombra { position:absolute; left:0; top:0; white-space:nowrap; color:#f2c941; filter:blur(22px); opacity:0.5; }
      .marca-sombra b { font-weight:800; }
      .marca-luz .lux { background:linear-gradient(100deg, #ffffff 40%, #fff3b0 50%, #ffffff 60%); background-size:300% 100%; background-position:100% 0%; -webkit-background-clip:text; background-clip:text; color:transparent; }
      .marca-luz b.lux { font-weight:800; background-image:linear-gradient(100deg, #f2c941 40%, #ffffff 50%, #f2c941 60%); }
      .c8-selo { display:inline-block; margin-left:18px; vertical-align:6px; font:900 26px/1 var(--font); color:var(--ground); background:var(--sun); padding:9px 14px; border-radius:10px; opacity:0; }
      .c8-cad { position:absolute; left:80%; margin-left:22px; top:-2px; opacity:0; }
      .c8-q { position:absolute; left:6px; top:6px; width:28px; height:28px; border-radius:50%; background:#ffffff; opacity:0; }
      .c8-q em { position:absolute; left:-8px; top:-8px; width:44px; height:44px; border-radius:50%; background:#ffffff; box-shadow:0 0 0 4px #0a1626; font:900 30px/44px var(--font); font-style:normal; text-align:center; color:#e0465a; opacity:0; }
      .c8-parou { position:absolute; left:50%; top:196px; width:300px; margin-left:-150px; text-align:center; background:var(--rosa); color:var(--ground); font:900 54px/1 var(--font); padding:18px 0; border-radius:16px; opacity:0; }
      .carimbo-ok { position:absolute; left:50%; top:50%; width:540px; margin:-66px 0 0 -270px; text-align:center; font:900 84px/112px var(--font); color:#5fcf8e; border:10px solid #5fcf8e; border-radius:24px; background:rgba(10,22,38,0.82); opacity:0; }
      #s8c { position:relative; overflow:hidden; }
      .brilho { position:absolute; left:0; top:0; bottom:0; width:140px; background:linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0)); transform:translateX(-300px); }
      .checklist { position:absolute; left:0; right:0; top:40px; padding:40px 44px 30px; background:rgba(16,35,58,0.96); border:1px solid rgba(242,201,65,0.5); border-radius:36px; box-shadow:0 40px 90px rgba(0,0,0,0.45); opacity:0; }
      .checklist > b { display:block; font:900 72px/1 var(--font); letter-spacing:-0.03em; }
      .checklist > small { display:block; font:700 28px/1 var(--font); letter-spacing:0.16em; color:var(--sun); margin:12px 0 26px; }
      .ck-linha { display:flex; align-items:center; gap:18px; padding:18px 0; border-top:1px solid rgba(255,255,255,0.1); opacity:0; }
      .ck-caixa { position:relative; flex:none; width:54px; height:54px; border-radius:12px; border:4px solid var(--sun); }
      .ck-caixa em { position:absolute; inset:0; font:900 40px/46px var(--font); font-style:normal; text-align:center; color:var(--sun); opacity:0; }
      .ck-n { flex:none; font:900 40px/1 var(--font); color:var(--sun); width:30px; }
      .ck-txt { font:800 32px/1.15 var(--font); filter:blur(9px); opacity:0.5; }
      .indicador { position:absolute; left:50%; top:-112px; width:240px; margin-left:-120px; display:flex; justify-content:space-between; opacity:0; }
      .indicador i { display:block; width:62px; height:62px; border-radius:50%; font:900 34px/62px var(--font); font-style:normal; text-align:center; background:rgba(255,255,255,0.08); color:var(--mut); }
      .proj-linha { position:absolute; left:0; right:0; height:160px; padding:26px 34px; background:rgba(16,35,58,0.96); border:1px solid rgba(255,255,255,0.13); border-radius:28px; opacity:0; }
      .proj-linha b { font:900 40px/1 var(--font); }
      .proj-linha small { margin-left:16px; font:600 28px/1 var(--font); color:var(--mut); }
      .r1-trilho { position:absolute; left:34px; right:34px; top:92px; height:40px; border-radius:999px; background:rgba(255,255,255,0.08); }
      .r1-trilho i { position:absolute; left:0; top:0; height:100%; border-radius:999px; background:var(--azul); transform-origin:0 50%; }
      .r1-teto { position:absolute; left:80%; top:-16px; width:10px; height:72px; margin-left:-5px; border-radius:5px; background:var(--sun); box-shadow:0 0 26px rgba(242,201,65,0.7); transform-origin:50% 50%; transform:scaleY(0); }
      .aviso-sem { display:flex; align-items:center; gap:24px; margin-bottom:22px; padding:26px 30px; background:rgba(246,239,227,0.97); color:#10233a; border-radius:28px; box-shadow:0 20px 50px rgba(0,0,0,0.35); opacity:0; }
      .aviso-sem b { display:block; font:900 36px/1 var(--font); }
      .aviso-sem span { display:block; font:700 30px/1.2 var(--font); color:#2f8a5b; margin-top:8px; }
      .r2 { position:absolute; left:0; right:0; top:40px; }
      .r3-painel { position:absolute; left:0; right:0; top:40px; padding:30px 40px 36px; background:rgba(16,35,58,0.96); border:1px solid rgba(255,255,255,0.13); border-radius:32px; opacity:0; }
      .r3-tit { font:800 32px/1 var(--font); letter-spacing:0.08em; color:var(--sun); margin-bottom:24px; }
      .r3-op { position:relative; height:90px; margin-top:16px; border:3px solid rgba(255,255,255,0.35); border-radius:999px; font:900 40px/84px var(--font); text-align:center; opacity:0; }
      .r3-op em { position:absolute; right:30px; top:0; font:900 44px/84px var(--font); font-style:normal; opacity:0; }
      .r3-barra { position:absolute; left:0; right:0; top:560px; height:160px; opacity:0; }
      .r3-trilho { position:absolute; left:0; right:0; top:50px; height:54px; border-radius:999px; background:rgba(255,255,255,0.08); }
      .r3-trilho i { position:absolute; left:0; top:0; width:100%; height:100%; border-radius:999px; background:var(--sun); transform-origin:0 50%; transform:scaleX(0); }
      .r3-parede { position:absolute; left:85%; top:20px; width:16px; height:114px; margin-left:-8px; border-radius:6px; background:#ffffff; opacity:0; }
      .r3-parede span { position:absolute; left:50%; top:-44px; width:120px; margin-left:-60px; text-align:center; font:900 32px/1 var(--font); color:#ffffff; }
      .r3-parou { position:absolute; right:60px; top:126px; background:var(--rosa); color:var(--ground); font:900 46px/1 var(--font); padding:16px 26px; border-radius:14px; opacity:0; }
      .t-grupo { position:absolute; left:0; top:0; width:1080px; height:1920px; transform-origin:540px 980px; }
      .fat-uber { position:absolute; left:290px; width:500px; top:560px; height:840px; }
      .fat-papel { position:absolute; inset:0; background:#f6efe3; border-radius:10px; padding:26px 30px; overflow:hidden; box-shadow:0 30px 70px rgba(0,0,0,0.45); }
      .fat-papel p { display:flex; justify-content:space-between; align-items:center; height:36px; border-bottom:2px dashed rgba(51,64,79,0.22); }
      .fat-papel p i { display:block; height:12px; border-radius:6px; background:rgba(51,64,79,0.35); }
      .fat-papel p b { display:block; width:70px; height:12px; border-radius:6px; background:rgba(51,64,79,0.5); }
      .fat-excesso { position:absolute; left:0; right:0; top:0; height:378px; border-radius:10px 10px 0 0; background:rgba(255,138,138,0.62); mix-blend-mode:multiply; opacity:0; }
      .teto-vazio { position:absolute; left:250px; width:580px; top:932px; height:0; border-top:6px dashed rgba(255,255,255,0.85); opacity:0; }
      .teto-vazio span { position:absolute; right:-6px; top:-58px; font:900 40px/1 var(--font); color:#ffffff; }
      .teto-cheio { position:absolute; left:250px; width:580px; top:926px; height:14px; border-radius:7px; background:var(--sun); box-shadow:0 0 40px rgba(242,201,65,0.7); transform-origin:0 50%; transform:scaleX(0); }
      .teto-rot { position:absolute; left:-10px; top:-66px; font:900 42px/1 var(--font); color:var(--sun); background:var(--ground); padding:8px 14px; border-radius:10px; }
      .teto-depois { position:absolute; right:0; top:28px; background:var(--rosa); color:var(--ground); font:900 34px/1 var(--font); padding:10px 18px; border-radius:10px; opacity:0; }
      .alerta { position:absolute; left:720px; top:600px; opacity:0; }
      .uber-rot { position:absolute; left:440px; top:480px; width:200px; filter:brightness(0) invert(1); opacity:0; }
      .proj { position:absolute; left:560px; width:460px; top:620px; opacity:0; }
      .proj-tit { display:flex; align-items:center; gap:14px; font:900 46px/1 var(--font); letter-spacing:-0.02em; margin-bottom:22px; }
      .proj-fat { position:relative; height:620px; }
      .proj-fat .fat-papel { padding:22px 26px; }
      .proj-barra { position:absolute; left:26px; right:26px; bottom:0; height:100%; border-radius:10px 10px 0 0; background:rgba(141,184,232,0.55); transform-origin:50% 100%; transform:scaleY(0); }
      .proj-teto { position:absolute; left:-20px; right:-20px; top:45%; height:12px; margin-top:-6px; border-radius:6px; background:var(--sun); box-shadow:0 0 30px rgba(242,201,65,0.6); }
      .proj-teto span { position:absolute; left:10px; top:-58px; font:900 36px/1 var(--font); color:var(--sun); background:var(--ground); padding:7px 12px; border-radius:10px; }
      .proj-antes { position:absolute; right:-10px; top:45%; margin-top:20px; background:var(--sun); color:var(--ground); font:900 36px/1 var(--font); padding:10px 18px; border-radius:10px; opacity:0; }
      .proj-ok { position:absolute; left:50%; bottom:110px; width:110px; height:110px; margin-left:-55px; border-radius:50%; background:#5fcf8e; color:var(--ground); font:900 70px/110px var(--font); text-align:center; opacity:0; }
      .calendario { position:absolute; left:0; top:0; width:300px; height:262px; border-radius:24px; background:#f6efe3; box-shadow:0 30px 70px rgba(0,0,0,0.45); opacity:0; }
      .cal-aros { position:absolute; left:0; right:0; top:-14px; display:flex; justify-content:space-around; padding:0 50px; }
      .cal-aros i { display:block; width:14px; height:34px; border-radius:7px; background:#33404f; }
      .cal-ano { height:58px; border-radius:24px 24px 0 0; background:var(--rosa); color:#fff; font:900 34px/58px var(--font); text-align:center; letter-spacing:0.08em; }
      .cal-folhas { position:relative; height:204px; }
      .cal-folha { position:absolute; inset:0; background:#f6efe3; border-radius:0 0 24px 24px; text-align:center; color:#10233a; transform-origin:50% 0%; }
      .cal-folha b { display:block; font:900 96px/1 var(--font); margin-top:26px; letter-spacing:-0.03em; }
      .cal-folha span { display:block; font:700 40px/1 var(--font); color:#6b7a8c; margin-top:8px; }
      .selo-cto { position:absolute; left:340px; top:46px; width:560px; display:flex; align-items:center; gap:26px; padding:26px 30px; background:rgba(16,35,58,0.96); border:1px solid rgba(242,201,65,0.5); border-radius:28px; opacity:0; }
      .selo-cto b { display:block; font:900 52px/1 var(--font); letter-spacing:-0.02em; }
      .selo-cto span { display:block; font:500 32px/1.2 var(--font); color:var(--mut); margin-top:8px; }
      .cofre-tit { position:absolute; left:0; right:0; top:296px; text-align:center; font:700 30px/1 var(--font); letter-spacing:0.16em; color:var(--sun); opacity:0; }
      .cofre { position:absolute; left:170px; width:560px; top:346px; height:280px; border-radius:36px; border:6px solid var(--sun); background:#10233a; box-shadow:0 40px 90px rgba(0,0,0,0.5); opacity:0; }
      .cofre-janela { position:absolute; left:34px; top:30px; width:360px; height:208px; border-radius:18px; background:rgba(255,255,255,0.06); overflow:hidden; }
      .cofre-janela i { position:absolute; inset:0; transform-origin:50% 100%; background:repeating-linear-gradient(-18deg, #f2c941 0 26px, #d9ab2a 26px 31px); }
      .cofre-disco { position:absolute; right:40px; top:80px; width:100px; height:100px; border-radius:50%; border:8px solid var(--sun); }
      .cofre-disco i { position:absolute; left:50%; top:8px; width:8px; height:34px; margin-left:-4px; border-radius:4px; background:var(--sun); }
      .carimbo-zero { position:absolute; left:50%; top:50%; width:360px; margin:-80px 0 0 -180px; text-align:center; font:900 120px/140px var(--font); color:var(--rosa); border:10px solid var(--rosa); border-radius:24px; background:rgba(10,22,38,0.75); transform:rotate(-10deg); opacity:0; }
      .faixa-meses { position:absolute; left:0; right:0; top:646px; display:grid; grid-template-columns:repeat(6, 1fr); gap:10px; }
      .faixa-meses span { position:relative; font:800 30px/52px var(--font); text-align:center; border-radius:12px; background:rgba(255,255,255,0.06); color:var(--mut); overflow:hidden; opacity:0; }
      .faixa-meses .racha { position:absolute; inset:0; width:100%; height:100%; opacity:0; }
      .sem-orc { position:absolute; left:50%; top:126px; width:fit-content; transform:translateX(-50%); white-space:nowrap; background:var(--rosa); color:var(--ground); font:900 38px/1 var(--font); padding:16px 26px; border-radius:14px; opacity:0; }
      .d2 { position:absolute; inset:0; }
      .lado-ia { position:absolute; left:542px; top:0; width:538px; height:1920px; overflow:hidden; background:radial-gradient(ellipse at 50% 42%, rgba(242,201,65,0.16) 0%, rgba(10,22,38,0) 60%), #0b1a2e; }
      .codigo { position:absolute; left:0; right:0; top:0; height:2600px; background:repeating-linear-gradient(90deg, transparent 0 40px, rgba(141,184,232,0.08) 40px 150px, transparent 150px 190px, rgba(242,201,65,0.06) 190px 260px, transparent 260px 538px), repeating-linear-gradient(0deg, transparent 0 14px, rgba(10,22,38,1) 14px 30px); opacity:0.35; }
      .lado-dev-zoom { position:absolute; inset:0; transform-origin:50% 35%; }
      .d2-div { position:absolute; left:538px; top:0; width:4px; height:1366px; background:var(--sun); opacity:0.85; }
      .lado-dev-video { position:absolute; left:0; top:0; width:538px; height:1920px; overflow:hidden; z-index:10; opacity:0; }
      .lado-dev-video video { position:absolute; left:0; top:0; width:540px; height:1920px; object-fit:cover; }
      .lado-veu { position:absolute; inset:0; background:linear-gradient(180deg, rgba(10,22,38,0.4) 0%, rgba(10,22,38,0.12) 38%, rgba(10,22,38,0.7) 54%, rgba(10,22,38,0.92) 100%); }
      .dev-card { position:absolute; left:30px; width:478px; top:990px; opacity:0; }
      .d2-curva { position:relative; height:112px; margin-bottom:10px; }
      .d2-curva svg { position:absolute; left:19px; top:0; }
      .d2-med { position:absolute; left:255px; top:-6px; font:800 26px/1 var(--font); letter-spacing:0.12em; color:var(--sun); opacity:0; }
      .d2-chip { display:inline-block; margin-left:19px; background:var(--azul); color:var(--ground); font:800 30px/1 var(--font); padding:13px 20px; border-radius:12px; opacity:0; }
      .d2-row { display:flex; align-items:center; gap:14px; margin:14px 0 0 19px; font:800 30px/1 var(--font); opacity:0; }
      .d2-row .clt { display:inline-block; width:46px; height:60px; border-radius:6px; background:#1556a7; border:2px solid var(--azul); font:900 15px/60px var(--font); font-style:normal; text-align:center; color:#fff; }
      #s3dv { display:block; margin:18px 0 0 19px; font:900 84px/1 var(--font); color:var(--azul); font-variant-numeric:tabular-nums; }
      .ia-alto { position:absolute; left:542px; width:538px; top:560px; text-align:center; }
      .ia-alto .robo { margin:0 auto; opacity:0.25; }
      .d2-q { font:900 150px/1 var(--font); color:var(--sun); opacity:0.5; margin-top:14px; }
      .ia-card { position:absolute; left:572px; width:478px; top:1010px; opacity:0; }
      .ia-card .logo-uber-mini { height:36px; margin-bottom:14px; }
      .ia-card b { display:block; font:900 50px/1.04 var(--font); letter-spacing:-0.02em; }
      .ia-card span { display:block; font:500 30px/1.2 var(--font); color:var(--mut); margin-top:10px; }
      .ia-card strong { display:block; margin-top:22px; font:900 84px/1 var(--font); font-variant-numeric:tabular-nums; }
      .d2-barras { position:absolute; left:60px; right:60px; top:1384px; display:flex; flex-direction:column; gap:10px; }
      .d2-barras .trilho { height:22px; }
      .d2-linha { position:absolute; left:90.7%; top:-12px; bottom:-12px; width:6px; margin-left:-3px; border-radius:3px; background:#ffffff; transform-origin:50% 50%; transform:scaleY(0); }
      .fundo-video { position:absolute; inset:0; z-index:11; opacity:0; }
      .fundo-video video { position:absolute; left:0; top:0; width:1080px; height:1920px; object-fit:cover; }
      .fundo-veu { position:absolute; inset:0; background:linear-gradient(180deg, rgba(10,22,38,0.5) 0%, rgba(10,22,38,0.42) 45%, rgba(10,22,38,0.75) 100%); }
      .logo-uber { position:absolute; left:50%; top:1380px; width:520px; margin-left:-260px; opacity:0; transform-origin:50% 50%; }
      .logo-uber img, .logo-uber-mini { display:block; width:100%; height:auto; filter:brightness(0) invert(1); }
      .logo-uber-mini { width:auto; height:34px; margin-bottom:10px; }
      .extenso { position:absolute; left:0; right:0; top:0; height:${4 * LH}px; transform-origin:50% 50%; z-index:30; }
      .extenso .ln { position:absolute; left:0; right:0; text-align:center; font:900 124px/128px var(--font); letter-spacing:-0.035em; color:#ffffff; }
      .extenso .ln span { display:inline-block; opacity:0.14; }
      .extenso .ln:nth-child(4) span:last-child { color:var(--sun); }
      .rodape-gancho { top:1084px; font-size:24px; line-height:1.25; z-index:13; }
      .divisa { position:absolute; left:0; right:0; top:1148px; height:5px; background:var(--sun); opacity:0.85; z-index:13; }
      .dev b, .ia b { display:block; font:900 54px/1.05 var(--font); letter-spacing:-0.02em; }
      .ia span, .dev .linhas { display:block; font:500 32px/1.2 var(--font); color:var(--mut); margin-top:10px; }
      .dev .linhas i { display:block; height:16px; border-radius:8px; background:rgba(255,255,255,0.14); margin-top:12px; width:320px; }
      .dev .linhas i + i { width:220px; }
      .dev { opacity:0; }
      .ia { opacity:0; border-color:rgba(242,201,65,0.5); }
      .xis { position:absolute; left:0; right:0; top:60px; text-align:center; font:900 360px/1 var(--font); color:var(--rosa); text-shadow:0 0 60px rgba(255,138,138,0.45); opacity:0; }
      .etiqueta { position:absolute; right:40px; top:390px; background:var(--sun); color:var(--ground); font:900 50px/1 var(--font); padding:22px 30px; border-radius:16px; transform-origin:50% -40px; box-shadow:0 20px 50px rgba(0,0,0,0.4); opacity:0; }
      /* cena 2 */
      .painel .cab { margin-bottom:40px; }
      .lim { margin-bottom:44px; }
      .slider { position:relative; height:36px; border-radius:999px; background:rgba(255,255,255,0.08); }
      .slider i { position:absolute; left:0; top:0; width:100%; height:100%; border-radius:999px; background:var(--sun); transform-origin:0 50%; }
      .slider em { position:absolute; left:-6px; top:-12px; width:60px; height:60px; border-radius:50%; background:var(--ink); box-shadow:0 6px 20px rgba(0,0,0,0.45); }
      .chip-grande { position:absolute; left:0; right:0; top:640px; margin:0 auto; width:fit-content; background:var(--sun); color:var(--ground); font:900 70px/1 var(--font); padding:30px 44px; border-radius:22px; letter-spacing:-0.01em; opacity:0; }
      /* cena 3 */
      .vcard { position:absolute; top:0; width:400px; height:560px; border-radius:36px; background:rgba(16,35,58,0.95); border:1px solid rgba(255,255,255,0.13); text-align:center; padding:44px 26px; }
      #s3d { left:0; } #s3i { right:0; border-color:rgba(242,201,65,0.55); }
      .vcard b { display:block; font:900 72px/1 var(--font); }
      .vcard span { display:block; font:500 30px/1.3 var(--font); color:var(--mut); margin:14px 0 26px; }
      .vcard strong { display:block; font:900 66px/1 var(--font); color:var(--azul); font-variant-numeric:tabular-nums; }
      .vcard strong.sol { color:var(--sun); }
      .vs { position:absolute; left:50%; top:230px; width:120px; height:120px; margin-left:-60px; border-radius:50%; background:var(--ink); color:var(--ground); font:900 50px/120px var(--font); text-align:center; }
      .duelo { position:absolute; left:0; right:0; top:610px; display:flex; flex-direction:column; gap:20px; }
      .carimbo { position:absolute; left:50%; top:400px; margin-left:-430px; width:860px; text-align:center; background:var(--sun); color:var(--ground); font:900 76px/1 var(--font); letter-spacing:-0.02em; padding:34px 0; border-radius:22px; box-shadow:0 30px 80px rgba(0,0,0,0.5); opacity:0; }
      /* cena 4 */
      .interroga { position:absolute; font:900 160px/1 var(--font); color:var(--sun); }
      /* cena 5 */
      .ranking { position:relative; height:600px; }
      .rk { position:absolute; left:84px; right:0; display:flex; align-items:center; gap:22px; height:110px; }
      .rk b { font:800 38px/1 var(--font); width:150px; flex:none; }
      .rk .avatar.mini { width:76px; height:76px; }
      .rk .trilho { height:52px; }
      .pos-fixa { position:absolute; left:0; font:900 48px/1 var(--font); color:var(--mut); }
      .coroa { position:absolute; left:-2px; top:-36px; width:80px; height:58px; opacity:0; }
      .crachas { position:absolute; left:-30px; right:-30px; top:-20px; display:grid; grid-template-columns:repeat(4, 1fr); gap:14px; }
      .cracha { background:rgba(16,35,58,0.95); border:1px solid rgba(255,255,255,0.13); border-radius:18px; padding:11px 12px 11px; text-align:center; opacity:0; }
      .cracha .avatar.mini { width:44px; height:44px; margin:0 auto 6px; }
      .cracha b { display:block; font:800 24px/1 var(--font); margin-bottom:8px; }
      .mini-trilho { height:10px; border-radius:5px; background:rgba(255,255,255,0.1); overflow:hidden; }
      .mini-trilho i { display:block; height:100%; border-radius:5px; background:var(--sun); transform-origin:0 50%; transform:scaleX(0); }
      .medidor-ia { position:absolute; left:50%; top:170px; width:820px; margin-left:-410px; padding:20px 30px 30px; background:rgba(10,22,38,0.92); border:1px solid rgba(255,255,255,0.14); border-radius:36px; text-align:center; opacity:0; box-shadow:0 40px 90px rgba(0,0,0,0.5); }
      .medidor-ia .uso { display:block; font:700 30px/1 var(--font); letter-spacing:0.18em; color:var(--mut); margin-top:-10px; }
      .medidor-ia .max { position:absolute; right:40px; top:40px; font:900 46px/1 var(--font); color:var(--rosa); opacity:0.25; }
      .rk .pos { font:900 44px/1 var(--font); color:var(--mut); width:70px; }
      .rk .trilho { flex:1; }
      #s5b { position:absolute; left:0; right:0; top:0; opacity:0; }
      .orc-tit { position:relative; display:inline-block; font:900 66px/1 var(--font); letter-spacing:-0.02em; margin-bottom:40px; }
      .orc-tit i { position:absolute; left:-10px; right:-10px; top:50%; height:12px; margin-top:-6px; background:var(--sun); border-radius:6px; transform-origin:0 50%; transform:scaleX(0); }
      .bateria { height:120px; border-radius:26px; border:5px solid rgba(255,255,255,0.4); padding:10px; margin-bottom:40px; }
      .bateria i { display:block; height:100%; border-radius:16px; background:var(--sun); transform-origin:0 50%; }
      .meses { display:grid; grid-template-columns:repeat(6, 1fr); gap:14px; }
      .meses span { font:800 34px/1 var(--font); text-align:center; padding:18px 0; border-radius:14px; background:rgba(255,255,255,0.06); color:var(--mut); }
      .mega4 { position:absolute; left:0; right:0; top:140px; text-align:center; opacity:0; }
      .mega4 b { display:block; font:900 520px/0.85 var(--font); color:var(--sun); letter-spacing:-0.05em; text-shadow:0 0 120px rgba(242,201,65,0.4); }
      .mega4 span { display:block; font:900 110px/1 var(--font); letter-spacing:0.04em; }
      /* cena 6 */
      .recibo-caixa { position:absolute; left:290px; width:500px; top:560px; height:1300px; overflow:hidden; }
      .recibo, .pedaco { background:#f6efe3; color:#33404f; padding:30px 34px; font:500 32px/1 var(--mono); box-shadow:0 30px 70px rgba(0,0,0,0.45); }
      .recibo p, .pedaco p { display:flex; justify-content:space-between; padding:14px 0; border-bottom:2px dashed rgba(51,64,79,0.25); }
      .pedaco { position:absolute; left:290px; width:500px; top:1380px; opacity:0; }
      .regua { position:absolute; left:120px; right:120px; top:1368px; height:22px; border-radius:8px; background:var(--sun); transform-origin:0 50%; box-shadow:0 0 40px rgba(242,201,65,0.6); }
      /* cena 7 */
      .leque { position:absolute; left:0; right:0; top:120px; height:460px; }
      .carta { position:absolute; left:50%; top:0; width:300px; height:420px; margin-left:-150px; border-radius:30px; background:var(--night); border:4px solid var(--sun); transform-origin:50% 120%; opacity:0; }
      #s7l1 { margin-left:-430px; } #s7l3 { margin-left:130px; }
      .carta b { display:block; font:900 240px/420px var(--font); color:var(--sun); text-align:center; }
      .regra { position:absolute; left:0; right:0; top:20px; opacity:0; }
      .regra .n { font:900 210px/0.9 var(--font); color:var(--sun); }
      .regra .tit { font:900 96px/1 var(--font); letter-spacing:-0.03em; margin:18px 0 70px; }
      .medidor { position:relative; height:70px; border-radius:999px; background:rgba(255,255,255,0.08); }
      .medidor i { position:absolute; left:0; top:0; height:100%; border-radius:999px; background:var(--azul); transform-origin:0 50%; }
      .medidor i.sol { background:var(--sun); }
      .medidor u { position:absolute; top:76px; width:3px; height:18px; background:rgba(255,255,255,0.3); }
      .medidor .marca { position:absolute; top:-26px; bottom:-26px; width:8px; margin-left:-4px; background:var(--ink); border-radius:4px; }
      .medidor .marca.parede { width:16px; margin-left:-8px; }
      .medidor .marca span { position:absolute; top:-46px; left:50%; width:120px; margin-left:-60px; text-align:center; font:800 30px/1 var(--font); letter-spacing:0.14em; color:var(--ink); }
      .cal { display:flex; flex-direction:column; gap:14px; }
      .sem { display:flex; gap:12px; align-items:center; }
      .sem i { width:96px; height:58px; border-radius:12px; background:rgba(255,255,255,0.07); }
      .sem b { font:900 54px/1 var(--font); color:var(--sun); margin-left:16px; opacity:0; }
      .para { display:inline-block; margin-top:60px; background:var(--rosa); color:var(--ground); font:900 62px/1 var(--font); padding:26px 36px; border-radius:16px; opacity:0; }
      /* cena 8 */
      .chaves .linha { margin-bottom:42px; }
      .campo { display:inline-block; min-width:96px; padding:2px 8px; border-radius:8px; border:2px solid rgba(242,201,65,0.6); font:700 30px/1.2 var(--mono); color:var(--ink); }
      .campo u { text-decoration:none; opacity:0; }
      .campo s { display:inline-block; width:3px; height:28px; background:var(--sun); vertical-align:middle; margin-left:2px; text-decoration:none; }
      .aviso { font:600 30px/1.3 var(--font); color:var(--rosa); margin-top:16px; opacity:0; }
      .saldo { position:absolute; left:0; right:0; top:760px; margin:0 auto; width:fit-content; font:800 46px/1 var(--font); color:var(--ground); background:var(--azul); padding:22px 30px; border-radius:16px; opacity:0; }
      .fim { position:absolute; left:0; right:0; top:120px; display:flex; flex-direction:column; align-items:center; }
      .cta { background:var(--sun); color:var(--ground); font:900 56px/1 var(--font); padding:42px 54px; border-radius:999px; white-space:nowrap; box-shadow:0 0 110px rgba(242,201,65,0.45); opacity:0; }
      .bio { margin-top:64px; font:800 58px/1 var(--font); letter-spacing:0.06em; opacity:0; }
      .bio b { display:inline-block; color:var(--sun); }
      .marca-sm { margin-top:140px; font:800 84px/1 var(--font); letter-spacing:-0.03em; opacity:0; }
      .marca-sm b { color:var(--sun); font-weight:800; }
      /* cursor */
      #cur { position:absolute; left:0; top:0; }
      #curi { position:relative; opacity:0; transform-origin:0 0; }
      #curi span { position:absolute; left:40px; top:44px; background:var(--sun); color:var(--ground); font:800 32px/1 var(--font); padding:8px 14px; border-radius:10px; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${D}" data-width="1080" data-height="1920">
      <div id="bg" class="clip" data-start="0" data-duration="${D}" data-track-index="0" data-track-kind="graphics" style="z-index:1"><div class="glow" id="glow1"></div><div class="glow" id="glow2"></div><div id="grao"></div></div>
      <div id="particulas" class="clip" data-start="0" data-duration="${D}" data-track-index="0" data-track-kind="graphics" data-layout-allow-overlap data-layout-allow-overflow style="position:absolute;inset:0;z-index:5">${fundo.join('')}</div>
      ${cenas.join('\n      ')}
      <div id="fx" class="clip" data-start="0" data-duration="${D}" data-track-index="3" data-track-kind="graphics" data-layout-allow-overlap data-layout-allow-overflow style="position:absolute;inset:0;z-index:55">${explosoes.join('')}${flashes.join('')}</div>
      <div id="legendas" class="clip" data-start="0" data-duration="${D}" data-track-index="2" data-track-kind="captions" data-layout-allow-overlap style="position:absolute;inset:0;z-index:60">
        ${legendas.join('\n        ')}
      </div>
      <div id="ponteiro" class="clip" data-start="0" data-duration="${D}" data-track-index="4" data-track-kind="graphics" data-layout-allow-overlap data-layout-allow-overflow style="position:absolute;inset:0;z-index:80"><div id="cur"><div id="curi"><svg width="56" height="64" viewBox="0 0 28 32"><path d="M3 2 L3 26 L9 20 L13 30 L17 28 L13 18 L22 18 Z" fill="#ffffff" stroke="#0a1626" stroke-width="2" stroke-linejoin="round"/></svg><span>dev</span></div></div></div>
      ${audios.join('\n      ')}
      ${sfx.join('\n      ')}
    </div>
    <script>
      const fmt = (v) => String(Math.round(v)).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
      const tl = gsap.timeline({ paused: true, defaults: { lazy: false } });
      tl.set("#cur",{x:540,y:1500},0);
      tl.fromTo("#glow1",{x:0,y:0,scale:0.9},{x:300,y:500,scale:1.2,duration:${D},ease:"sine.inOut"},0);
      tl.fromTo("#glow2",{x:0,y:0},{x:-420,y:-700,duration:${D},ease:"sine.inOut"},0);
      ${js.join('\n      ')}
      ${cursor.join('\n      ')}
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`;
writeFileSync('index.html', html);
console.log('cta:', ['sm', 'cadach', 'reais', 'chegou', 'para', 'saldo', 'intacto', 'teste', 'bio'].map(k => k + ' ' + r(M[k])).join(' · '), '| S(6)', r(S(6)), 'D', D);
console.log('regras:', ['tres0', 'um', 'max1', 'cada', 'dois', 'gasto', 'toda', 'semana', 'tres', 'decida', 'antes', 'teto'].map(k => k + ' ' + r(M[k])).join(' · '), '| S(5)', r(S(5)), 'E(5)', r(E(5)));
console.log('recibo:', ['tetoq', 'depois', 'susto', 'licao', 'projeto'].map(k => k + ' ' + r(M[k])).join(' · '), '| S(4)', r(S(4)), 'E(4)', r(E(4)));
console.log('orçamento:', ['abril', 'cto', 'orcamento', 'acabado', 'quatro'].map(k => k + ' ' + r(M[k])).join(' · '), '| E(3)', r(E(3)));
console.log('trecho 7–17 s:', ['agora', 'compara', 'mediana', 'analista', 'carteira', 'brasil', 'sete', 'so', 'passa'].map(k => k + ' ' + r(M[k])).join(' · '), '| S(1)', r(S(1)), 'E(1)', r(E(1)));
console.log('trecho 20–25 s:', ['todo', 'usar', 'maximo', 'ranking', 'abril'].map(k => k + ' ' + r(M[k])).join(' · '), '| S(3)', r(S(3)), '| A fala05', r(linhas[3].A));
console.log('gancho:', ['mes', 'nao', 'salario', 'teto1', 'uma', 'uber'].map(k => k + ' ' + r(M[k])).join(' · '));
console.log(linhas.map((l, k) => `fala ${k + 1}: ${r(l.A)}-${r(l.A + l.dur)} s`).join(' | '));
console.log(`duração total: ${D} s · música: ${MUSICA ? 'sim' : 'não'} · explosões: ${explosoes.length} · efeitos: ${sfx.length}`);
