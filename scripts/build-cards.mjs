// Renders the GitHub profile cards (Claude Design "GitHub Profile") to SVG with satori.
// Text becomes paths, so the SVGs need no fonts when GitHub shows them as <img>.
// Usage: npm install && npm run cards   (writes assets/*-light.svg and assets/*-dark.svg)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const [, , modulesDir, outDir] = process.argv;
const require = createRequire(path.resolve(modulesDir, "package.json"));
const satori = require('satori').default;

const fontFile = (pkg, file) => fs.readFileSync(path.join(modulesDir, 'node_modules/@fontsource', pkg, 'files', file));
// satori does not fall back between two files of one family, so latin-ext gets its own name.
const font = (name, pkg, weight) => [['latin', name], ['latin-ext', `${name} Ext`]].map(([subset, family]) => ({
  name: family, weight, style: 'normal', data: fontFile(pkg, `${pkg}-${subset}-${weight}-normal.woff`),
}));
const FONTS = [
  ...font('Newsreader', 'newsreader', 400),
  ...font('Instrument Sans', 'instrument-sans', 400),
  ...font('Instrument Sans', 'instrument-sans', 600),
  ...font('JetBrains Mono', 'jetbrains-mono', 400),
];

const THEMES = {
  light: { bg: '#f6f5f1', ink: '#1a1a1a', mut: '#5d5a54', rule: 'rgba(26,26,26,0.14)', sbd: 'rgba(26,26,26,0.18)', acc: '#a0561a',
    fbg: '#1a1a1a', fink: '#f6f5f1', fmut: '#c9c4ba', facc: '#e0995c', onfacc: '#1a1a1a', frule: 'rgba(246,245,241,0.16)', fbd: '#1a1a1a' },
  dark: { bg: '#111217', ink: '#ecebe6', mut: '#a19e97', rule: 'rgba(236,235,230,0.14)', sbd: 'rgba(236,235,230,0.16)', acc: '#c9773a',
    fbg: '#17181d', fink: '#ecebe6', fmut: '#a9a59e', facc: '#d98a4b', onfacc: '#0a0b0e', frule: 'rgba(236,235,230,0.12)', fbd: 'rgba(201,119,58,0.55)' },
};

const SERIF = 'Newsreader, Newsreader Ext';
const SANS = 'Instrument Sans, Instrument Sans Ext';
const MONO = 'JetBrains Mono, JetBrains Mono Ext';

const h = (style, ...children) => ({ type: 'div', props: { style: { display: 'flex', ...style }, children: children.flat() } });
const text = (style, value) => h(style, value);
const arrow = (color, kind) => ({
  type: 'svg',
  props: {
    width: 14, height: 14, viewBox: '0 0 14 14', style: { marginLeft: 6 },
    children: [{ type: 'path', props: { d: kind === 'ne' ? 'M3 11 L11 3 M5 3 H11 V9' : 'M2 7 H12 M8 3 L12 7 L8 11', stroke: color, strokeWidth: 1.6, fill: 'none' } }],
  },
});
const eyebrow = (color, value, extra = {}) => text({ fontFamily: MONO, fontSize: 12, letterSpacing: 1.7, textTransform: 'uppercase', color, ...extra }, value);
const paper = (t, style, ...children) => h({ width: '100%', height: '100%', flexDirection: 'column', background: t.bg, color: t.ink, border: `1px solid ${t.sbd}`, borderRadius: 8, ...style }, ...children);

const hero = (t) => paper(t, { flexDirection: 'row', alignItems: 'flex-end', padding: '36px 40px 34px' },
  h({ flexDirection: 'column', flex: 1 },
    eyebrow(t.acc, 'Software engineer · process automation & AI'),
    text({ fontFamily: SERIF, fontSize: 60, lineHeight: 1, letterSpacing: -1.5, marginTop: 16 }, 'Piotr Romańczuk'),
    text({ fontFamily: SANS, fontSize: 17, lineHeight: 1.55, color: t.mut, marginTop: 18, maxWidth: 500 },
      'I build software for problems I actually have — a guitar studio, an English-tutoring practice, a homelab, a small automation business — and then I run it in production.')),
  h({ flexDirection: 'column', alignItems: 'flex-end', fontFamily: MONO, fontSize: 13, color: t.mut, marginLeft: 24 },
    text({}, 'Warsaw · PL / EN'), text({ color: t.acc, marginTop: 8 }, 'romanczuk.online')));

const vectorDigital = (t) => h({ width: '100%', height: '100%', flexDirection: 'column', padding: '32px 36px', background: t.fbg, color: t.fink, border: `1px solid ${t.fbd}`, borderRadius: 8 },
  h({ justifyContent: 'space-between', alignItems: 'center' },
    eyebrow(t.facc, 'For businesses · my company'),
    text({ fontFamily: MONO, fontSize: 13, color: t.fmut }, 'JDG · Warsaw')),
  text({ fontFamily: SERIF, fontSize: 48, lineHeight: 1, letterSpacing: -1, marginTop: 14 }, 'Vector Digital'),
  text({ fontFamily: SANS, fontSize: 16, lineHeight: 1.55, color: t.fmut, marginTop: 14, maxWidth: 600 },
    'I take repetitive office work off people in small businesses (3–50 people): quotes, reports, invoices, copying data between email and Excel. Process automation and AI on the tools you already use — a free audit first, then a pilot.'),
  h({ alignItems: 'center', marginTop: 22, paddingTop: 18, borderTop: `1px solid ${t.frule}` },
    h({ alignItems: 'center', height: 44, padding: '0 18px', borderRadius: 6, background: t.facc, color: t.onfacc, fontFamily: MONO, fontSize: 15 },
      'vectordigital.pl', arrow(t.onfacc, 'ne')),
    text({ fontFamily: MONO, fontSize: 13, color: t.fmut, marginLeft: 20 }, 'free audit · pilot · rollout')));

const STRUMMY_STATS = ['2,000+ commits', '650+ merged PRs', '62 tables · 199 RLS policies', '3,700+ test cases'];
const strummy = (t) => paper(t, { padding: '32px 36px' },
  h({ justifyContent: 'space-between', alignItems: 'center' },
    eyebrow(t.acc, 'Flagship · live in production'),
    h({ alignItems: 'center', fontFamily: MONO, fontSize: 13, color: t.acc }, 'strummy.online', arrow(t.acc, 'ne'))),
  text({ fontFamily: SERIF, fontSize: 44, lineHeight: 1, letterSpacing: -0.9, marginTop: 14 }, 'Strummy'),
  text({ fontFamily: SANS, fontSize: 16, lineHeight: 1.55, color: t.mut, marginTop: 14, maxWidth: 620 },
    'CRM for guitar teachers — students, lessons, repertoire, assignments and practice logs, run daily in a real teaching studio (mine). Next.js 16 and Supabase with RLS as the security boundary; the production database is self-hosted on my homelab behind a Cloudflare tunnel.'),
  h({ flexWrap: 'wrap', marginTop: 22, paddingTop: 18, borderTop: `1px solid ${t.rule}` },
    STRUMMY_STATS.map((s) => text({ fontFamily: MONO, fontSize: 13, padding: '5px 9px', marginRight: 8, border: `1px solid ${t.rule}`, borderRadius: 4 }, s))));

const CARDS = {
  'home-ops': { eyebrow: 'Homelab · public repo', title: 'home-ops', stack: 'Postgres 17 · Hono · Python · systemd',
    body: 'Agents on Linux, Windows and a Raspberry Pi ship logs and metrics to one Postgres. GPU job queue for local LLMs, nightly backups, a daily-brief console. Tailscale only.' },
  portfolio: { eyebrow: 'Personal card', title: 'romanczuk.online', stack: 'Next.js 16 · Tailwind · Vercel',
    body: 'Bilingual business card with vCard and QR, a portfolio with live GitHub activity via ISR, and generated OG images.' },
};
const card = (c, side) => (t) => h({ width: '100%', height: '100%', [side === 'left' ? 'paddingRight' : 'paddingLeft']: 5 }, paper(t, { padding: '26px 28px' },
  eyebrow(t.acc, c.eyebrow),
  text({ fontFamily: SERIF, fontSize: 30, lineHeight: 1.05, letterSpacing: -0.45, marginTop: 12 }, c.title),
  text({ fontFamily: SANS, fontSize: 15, lineHeight: 1.55, color: t.mut, marginTop: 10 }, c.body),
  text({ fontFamily: MONO, fontSize: 13, color: t.mut, marginTop: 'auto', paddingTop: 16 }, c.stack)));

const igsw = (t) => paper(t, { flexDirection: 'row', alignItems: 'center', padding: '22px 28px' },
  h({ flexDirection: 'column', flex: 1 },
    eyebrow(t.mut, 'Frozen · lives on privately'),
    text({ fontFamily: SERIF, fontSize: 26, lineHeight: 1.1, marginTop: 8 }, 'instagram-stories-webhook'),
    text({ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: t.mut, marginTop: 6 }, 'Scheduled Stories publishing on the Meta Graph API — queue with retries, FFmpeg media pipeline.')),
  h({ flexDirection: 'column', alignItems: 'flex-end', fontFamily: MONO, fontSize: 13, lineHeight: 1.7, color: t.mut, marginLeft: 20 },
    text({}, 'Next.js 16'), text({}, 'Supabase'), text({}, 'Vitest · Playwright')));

const TOOLBOX = [
  ['Product', 'TypeScript · React · Next.js · Tailwind · Vue'],
  ['Data', 'PostgreSQL · Supabase · Drizzle'],
  ['Infra', 'Linux · Docker · systemd · Tailscale · Cloudflare · Vercel'],
  ['Quality', 'Playwright · Vitest · Jest · GitHub Actions'],
  ['Also', 'Python · C# / .NET · PowerShell · Ollama'],
];
const toolbox = (t) => paper(t, { padding: '26px 32px 18px' },
  eyebrow(t.acc, 'Toolbox', { marginBottom: 12 }),
  TOOLBOX.map(([k, v]) => h({ alignItems: 'center', padding: '11px 0', borderTop: `1px solid ${t.rule}` },
    eyebrow(t.mut, k, { width: 136, fontSize: 11.5 }),
    text({ fontFamily: SANS, fontSize: 16 }, v.replaceAll(' · ', '\u00a0\u00a0·\u00a0\u00a0')))));

const footer = (t) => h({ width: '100%', height: '100%', alignItems: 'center', padding: '0 2px', borderTop: `1px solid ${t.rule}`, color: t.mut, fontFamily: SANS, fontSize: 14 },
  text({ fontFamily: MONO, fontSize: 13, color: t.ink }, 'p.romanczuk@gmail.com'),
  text({ marginLeft: 24 }, 'Warsaw'),
  text({ marginLeft: 24, color: t.acc }, 'romanczuk.online'));

// [file, component, width, height] — heights fit the content at that width.
const ASSETS = [
  ['hero', hero, 830, 250],
  ['vector-digital', vectorDigital, 830, 312],
  ['strummy', strummy, 830, 318],
  ['home-ops', card(CARDS['home-ops'], 'left'), 415, 268],
  ['portfolio', card(CARDS.portfolio, 'right'), 415, 268],
  ['igsw', igsw, 830, 126],
  ['toolbox', toolbox, 830, 300],
  ['footer', footer, 830, 48],
];

fs.mkdirSync(outDir, { recursive: true });
for (const [name, component, width, height] of ASSETS) {
  for (const [key, t] of Object.entries(THEMES)) {
    const svg = await satori(component(t), { width, height, fonts: FONTS });
    fs.writeFileSync(path.join(outDir, `${name}-${key}.svg`), svg);
  }
  console.log(`${name}: ${width}×${height}`);
}
