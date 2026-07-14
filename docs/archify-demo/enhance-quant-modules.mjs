#!/usr/bin/env node
/**
 * Post-process archify output: clickable nodes + anchored module detail panels.
 * Usage: node enhance-quant-modules.mjs [html] [data.json]
 */
import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve(process.argv[2] ?? 'quant-modules.html');
const dataPath = path.resolve(process.argv[3] ?? 'quant-modules-data.json');

const html = fs.readFileSync(htmlPath, 'utf8');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const upstream = Object.fromEntries(data.modules.map((m) => [m.id, []]));
const downstream = Object.fromEntries(data.modules.map((m) => [m.id, []]));

for (const edge of data.edges) {
  upstream[edge.target].push(edge);
  downstream[edge.source].push(edge);
}

function wrapSvgNodes(source) {
  let out = source;
  for (const mod of data.modules) {
    const label = esc(mod.short).replace(/×/g, '×');
    const re = new RegExp(
      String.raw`(\s*<rect[^>]*class="c-mask"[^/]*\/>\s*<rect[^>]*class="c-[^"]*"[^/]*\/>\s*<text[^>]*>${mod.short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\/text>(?:\s*<text[^>]*>[^<]*<\/text>){0,2})`,
      'm',
    );
    out = out.replace(re, (block) => {
      if (block.includes('module-node')) return block;
      return `
        <g class="module-node" data-module="${mod.id}" role="button" tabindex="0" aria-label="${esc(mod.id)} ${esc(mod.title)}">
          <a href="#detail-${mod.id}" class="module-hit" tabindex="-1">${block}
          </a>
        </g>`;
    });
  }
  return out;
}

function linkSummaryCards(source) {
  let out = source;
  for (const mod of data.modules) {
    const re = new RegExp(
      `(<div class="card">\\s*<div class="card-header">\\s*<div class="card-dot [^"]+"><\\/div>\\s*)<h3>${mod.short.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} · [^<]+<\\/h3>`,
    );
    out = out.replace(
      re,
      `$1<h3><a class="card-link" href="#detail-${mod.id}">${esc(mod.short)} · ${esc(mod.module_type.replace('Module', ''))}</a></h3>`,
    );
  }
  const legendRe = /(<div class="card">\s*<div class="card-header">\s*<div class="card-dot slate"><\/div>\s*)<h3>圖例<\/h3>/;
  out = out.replace(legendRe, `$1<h3>圖例</h3>`);
  return out;
}

function renderList(title, items) {
  if (!items?.length) return '';
  return `<section class="detail-block"><h4>${esc(title)}</h4><ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></section>`;
}

function renderHooks(hooks) {
  if (!hooks?.length) return '';
  return `<section class="detail-block"><h4>Hooks</h4><ul>${hooks
    .map(
      (h) =>
        `<li><code>${esc(h.kind)}</code> <span class="dim">[${h.char_span[0]},${h.char_span[1]})</span> — ${esc(h.note)}</li>`,
    )
    .join('')}</ul></section>`;
}

function renderFlowLinks(edges, direction) {
  if (!edges.length) return '<span class="dim">—</span>';
  return edges
    .map((e) => {
      const peer = direction === 'upstream' ? e.source : e.target;
      const mod = data.modules.find((m) => m.id === peer);
      const title = mod ? mod.short : peer;
      return `<a class="flow-link" href="#detail-${peer}" data-peer="${peer}"><code>${esc(e.type)}</code> → ${esc(title)}</a>`;
    })
    .join('');
}

function renderDetailArticle(mod) {
  const core =
    mod.concept_core ??
    mod.claim ??
    mod.context ??
    '';
  const blocks = [
    core ? `<p class="detail-core">${esc(core)}</p>` : '',
    mod.context && mod.concept_core ? `<section class="detail-block"><h4>案例背景</h4><p>${esc(mod.context)}</p></section>` : '',
    mod.outcome ? `<section class="detail-block"><h4>結果</h4><p>${esc(mod.outcome)}</p></section>` : '',
    mod.transferability ? `<section class="detail-block"><h4>可遷移性</h4><p>${esc(mod.transferability)}</p></section>` : '',
    renderList('步驟', mod.procedure),
    renderList('行動', mod.actions),
    renderList('例示', mod.examples),
    renderList('證據', mod.evidence),
    renderList('約束', mod.constraints),
    renderList('前置', mod.preconditions),
    renderList('失敗模式', mod.failure_modes),
    renderList('假設', mod.assumptions),
    renderList('反論', mod.counterarguments),
    mod.limitation ? `<section class="detail-block"><h4>限制</h4><p>${esc(mod.limitation)}</p></section>` : '',
    renderHooks(mod.hooks),
  ]
    .filter(Boolean)
    .join('\n');

  return `
    <article id="detail-${mod.id}" class="module-detail" data-module="${mod.id}">
      <header class="detail-header">
        <a class="back-link" href="#diagram">↑ 回到圖譜</a>
        <h3>${esc(mod.id)} — ${esc(mod.title)}</h3>
        <p class="detail-sub">${esc(mod.module_type)} · char_span [${mod.char_span[0]},${mod.char_span[1]}) · confidence ${mod.confidence}</p>
      </header>
      <div class="flow-panel">
        <div class="flow-col">
          <span class="flow-label">上游（支撐本模塊）</span>
          <div class="flow-links">${renderFlowLinks(upstream[mod.id], 'upstream')}</div>
        </div>
        <div class="flow-col flow-current">
          <span class="flow-label">本模塊</span>
          <strong>${esc(mod.id)}</strong>
        </div>
        <div class="flow-col">
          <span class="flow-label">下游（本模塊支撐）</span>
          <div class="flow-links">${renderFlowLinks(downstream[mod.id], 'downstream')}</div>
        </div>
      </div>
      <table class="meta-table">
        <tbody>
          <tr><th>semantic_roles</th><td>${esc(mod.semantic_roles.join(' · '))}</td></tr>
          <tr><th>cognitive_level</th><td>${esc(mod.cognitive_level)}</td></tr>
          <tr><th>source_id</th><td><code>${esc(data.source.source_id)}</code></td></tr>
        </tbody>
      </table>
      ${blocks}
    </article>`;
}

const injectCss = `
    .diagram-hint {
      color: var(--text-muted);
      font-size: 0.8rem;
      margin: 0 0 0.75rem 0.25rem;
    }

    .module-node .module-hit { cursor: pointer; text-decoration: none; }
    .module-node:focus-visible { outline: 2px solid var(--frontend-stroke); outline-offset: 2px; border-radius: 8px; }
    .module-node.is-active .c-frontend,
    .module-node.is-active .c-backend,
    .module-node.is-active .c-cloud,
    .module-node.is-active .c-security { stroke-width: 2.5; filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.45)); }

    .card-link { color: inherit; text-decoration: none; }
    .card-link:hover { color: var(--frontend-stroke); text-decoration: underline; }
    .card.is-active { border-color: var(--frontend-stroke); box-shadow: 0 0 0 1px var(--frontend-stroke); }

    .module-details {
      margin-top: 2.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--panel-border);
    }

    .module-details > h2 {
      font-size: 1.125rem;
      font-weight: 700;
      margin-bottom: 0.35rem;
    }

    .module-details > .module-hint {
      color: var(--text-muted);
      font-size: 0.8rem;
      margin-bottom: 1.25rem;
    }

    .module-detail {
      background: var(--panel);
      border: 1px solid var(--panel-border);
      border-radius: 0.75rem;
      padding: 1.25rem 1.5rem;
      margin-bottom: 1rem;
      scroll-margin-top: 1.25rem;
    }

    .module-detail.is-active {
      border-color: var(--frontend-stroke);
      box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.25);
    }

    .detail-header { margin-bottom: 1rem; }
    .back-link {
      display: inline-block;
      font-size: 0.75rem;
      color: var(--text-muted);
      text-decoration: none;
      margin-bottom: 0.35rem;
    }
    .back-link:hover { color: var(--frontend-stroke); }
    .detail-header h3 { font-size: 1rem; font-weight: 700; }
    .detail-sub { color: var(--text-muted); font-size: 0.75rem; margin-top: 0.25rem; }
    .detail-core { color: var(--text); font-size: 0.875rem; line-height: 1.55; margin-bottom: 1rem; }

    .flow-panel {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 0.75rem;
      margin-bottom: 1rem;
      padding: 0.75rem;
      border-radius: 0.5rem;
      background: rgba(15, 23, 42, 0.35);
      border: 1px solid var(--panel-border);
    }

    [data-theme="light"] .flow-panel { background: #f1f5f9; }

    .flow-col { font-size: 0.75rem; }
    .flow-current { text-align: center; align-self: center; padding: 0 0.5rem; }
    .flow-label { display: block; color: var(--text-dim); font-size: 0.7rem; margin-bottom: 0.35rem; }
    .flow-links { display: flex; flex-direction: column; gap: 0.35rem; }
    .flow-link {
      color: var(--text-muted);
      text-decoration: none;
      line-height: 1.4;
    }
    .flow-link:hover { color: var(--frontend-stroke); }
    .flow-link code { color: var(--backend-stroke); font-size: 0.7rem; }

    .meta-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.75rem;
      margin-bottom: 1rem;
    }
    .meta-table th,
    .meta-table td {
      border: 1px solid var(--panel-border);
      padding: 0.4rem 0.55rem;
      text-align: left;
      vertical-align: top;
    }
    .meta-table th {
      width: 9rem;
      color: var(--text-dim);
      font-weight: 600;
      background: rgba(15, 23, 42, 0.25);
    }
    [data-theme="light"] .meta-table th { background: #f8fafc; }

    .detail-block { margin-bottom: 0.85rem; }
    .detail-block h4 {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 0.35rem;
    }
    .detail-block ul {
      list-style: disc;
      padding-left: 1.1rem;
      color: var(--text-muted);
      font-size: 0.75rem;
      line-height: 1.5;
    }
    .detail-block p { color: var(--text-muted); font-size: 0.75rem; line-height: 1.5; }
    .dim { color: var(--text-dim); font-size: 0.75rem; }
`;

const injectHtml = `
    <section class="module-details" id="module-details">
      <h2>模塊詳情</h2>
      <p class="module-hint">點擊圖中節點、摘要卡標題或流向連結，可在此區塊查看完整內容與上下游關係。</p>
      ${data.modules.map(renderDetailArticle).join('\n')}
    </section>
`;

const injectJs = `
    (function () {
      function moduleFromHash() {
        var h = (location.hash || '').replace(/^#/, '');
        return /^detail-(M\\d{2})$/.test(h) ? h.slice(7) : null;
      }

      function setActive(id) {
        document.querySelectorAll('.module-node').forEach(function (n) {
          n.classList.toggle('is-active', n.dataset.module === id);
        });
        document.querySelectorAll('.module-detail').forEach(function (n) {
          n.classList.toggle('is-active', n.dataset.module === id);
        });
        document.querySelectorAll('.cards .card').forEach(function (card) {
          var link = card.querySelector('.card-link');
          card.classList.toggle('is-active', !!(link && id && link.getAttribute('href') === '#detail-' + id));
        });
      }

      function onNavigate() {
        var id = moduleFromHash();
        setActive(id);
        if (id) {
          var el = document.getElementById('detail-' + id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      document.querySelectorAll('.module-node').forEach(function (node) {
        node.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            location.hash = 'detail-' + node.dataset.module;
          }
        });
      });

      window.addEventListener('hashchange', onNavigate);
      onNavigate();
    })();
`;

let out = html;
out = wrapSvgNodes(out);
out = linkSummaryCards(out);
out = out.replace(
  '<div class="diagram-container">',
  '<p class="diagram-hint">提示：點擊圖中模塊節點可跳到下方詳情與流向面板。</p>\n    <div class="diagram-container" id="diagram">',
);
out = out.replace('    .footer {', `${injectCss}\n\n    .footer {`);
out = out.replace('    <!-- Footer -->', `${injectHtml}\n\n    <!-- Footer -->`);
out = out.replace('</body>', `  <script>${injectJs}\n  </script>\n</body>`);

fs.writeFileSync(htmlPath, out);
console.log(`Enhanced: ${htmlPath}`);
