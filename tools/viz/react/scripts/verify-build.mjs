// 對 production build 做無頭冒煙驗證：
// 啟動 vite preview，以 Edge/Chrome headless 傾印多個 URL 的 DOM，檢查關鍵渲染標記。
// 僅供本機驗證，不屬於建置流程。用法：node scripts/verify-build.mjs
import { execFileSync, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const reactDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4319;
const BASE = `http://localhost:${PORT}`;

const BROWSERS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];
const browser = BROWSERS.find(existsSync);
if (!browser) {
  console.error('找不到可用的 Edge/Chrome，跳過無頭驗證。');
  process.exit(2);
}

const CASES = [
  {
    name: '預設（焦點鄰域 / ai-native）',
    url: `${BASE}/`,
    expect: ['管線總覽', '模塊與連線', '焦點鄰域', 'AI 計畫失敗的共同缺口', '流向面板', '邊帳本'],
    moduleNodes: 5,
  },
  {
    name: '管線總覽分頁',
    url: `${BASE}/?tab=pipeline`,
    expect: [
      '來源數',
      '技能模塊',
      '背景模塊',
      '結構邊',
      '待覆核',
      '收錄',
      '模塊化',
      '抽邊',
      '技能對齊',
      'Dynamic View',
      '規範限制',
      '資料警示',
    ],
    moduleNodes: 0,
  },
  {
    name: '全圖聚光鏡',
    url: `${BASE}/?mode=full`,
    expect: ['五階 AI 成熟度梯', '每階都以差額決定是否繼續'],
    moduleNodes: 9,
  },
  {
    name: '論證分層',
    url: `${BASE}/?mode=layers`,
    expect: ['核心主張', '方法與機制', '例證與證據'],
    moduleNodes: 9,
  },
  {
    name: '切換來源（quant 焦點鄰域）',
    url: `${BASE}/?source=Review--quant-trading-is-not-prediction`,
    expect: ['量化交易隔離可交易的微小偏差', '微小優勢靠期望值與大量重複形成業務'],
    moduleNodes: 4,
  },
  {
    name: '切換來源（quant 全圖）',
    url: `${BASE}/?source=Review--quant-trading-is-not-prediction&mode=full`,
    expect: ['Renaissance 作為微小優勢規模化的案例', '真正護城河是資料、執行與淘汰紀律'],
    moduleNodes: 9,
  },
];

function dumpDom(url) {
  return execFileSync(
    browser,
    ['--headless', '--disable-gpu', '--virtual-time-budget=9000', '--dump-dom', url],
    { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] },
  );
}

// 啟動 preview server
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: reactDir,
  stdio: 'ignore',
});
await new Promise((r) => setTimeout(r, 3500));

let failed = 0;
try {
  for (const c of CASES) {
    const dom = dumpDom(c.url);
    const missing = c.expect.filter((m) => !dom.includes(m));
    const count = (dom.match(/react-flow__node-moduleNode/g) ?? []).length;
    const countOk = c.moduleNodes === undefined || count === c.moduleNodes;
    const ok = missing.length === 0 && countOk;
    if (!ok) failed += 1;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${c.name}（節點 ${count}）`);
    for (const m of missing) console.log(`  缺少標記：${m}`);
    if (!countOk) console.log(`  節點數不符：預期 ${c.moduleNodes}，實際 ${count}`);
  }
} finally {
  server.kill();
}

if (failed > 0) {
  console.error(`verify-build: ${failed} 個案例未通過`);
  process.exit(1);
}
console.log('verify-build: 全部案例通過');
