# AI-Native Three-View Inline Visualization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one inline interactive visualization for 《How to Make a Company AI-Native》 with maturity journey, full relationship network, and journey-plus-focus views, preserving module and edge provenance.

**Architecture:** Write one self-contained HTML fragment in the current thread visualization directory. Embed the authoritative 9-module/19-edge dataset and type-specific module details as literal JavaScript data, keep one shared state object, and render each view from that state without network or filesystem access at runtime.

**Tech Stack:** HTML fragment, theme-aware CSS, vanilla JavaScript, inline SVG, Codex visualization host utilities, bundled `render.py` verifier.

## Global Constraints

- Output exactly one visualization fragment: `/Users/alex/.codex/visualizations/2026/07/13/019f5cbb-a48a-7ff3-86e3-cae7b76802cf/ai-native-three-view.html`.
- Do not modify `source.md`, `modules.md`, `edges.md`, `DOC/INDEX.md`, or the skill registry.
- Render exactly 9 modules (`M00`–`M08`) and 19 edges (`E00`–`E18`).
- Preserve canonical edge direction: source module points to the supported target module.
- Provide three views sharing `selectedModuleId`: maturity journey, full network, and journey plus relationship focus.
- Show module `module_id` and `char_span`; show edge `edge_id`, type, direction, and `evidence_char_span`.
- Use no `fetch`, XHR, WebSocket, external runtime data, viewport-height layout, fixed positioning, internal scrolling, or horizontal overflow.
- Support 736px and 320px widths with native keyboard-operable buttons and visible host focus styles.
- Treat this as a Dynamic View; projection state never writes back to formal graph data.

---

### Task 1: Embed and validate the authoritative graph

**Files:**
- Read: `DOC/Review/how-to-make-company-ai-native/views/_data.json`
- Read: `DOC/Review/how-to-make-company-ai-native/modules.md`
- Read: `DOC/Review/how-to-make-company-ai-native/edges.md`
- Create: `/Users/alex/.codex/visualizations/2026/07/13/019f5cbb-a48a-7ff3-86e3-cae7b76802cf/ai-native-three-view.html`

**Interfaces:**
- Consumes: `_data.json` records plus type-specific fields in `modules.md`.
- Produces: `DATA`, `MODULE_DETAILS`, `validateData()` and an error-first fragment root `#ai-native-three-view`.

- [ ] **Step 1: Run the source-data preflight**

Run:

```bash
node -e "const d=require('./DOC/Review/how-to-make-company-ai-native/views/_data.json'); const m=new Set(d.modules.map(x=>x.module_id)); const e=new Set(d.edges.map(x=>x.edge_id)); const dangling=d.edges.filter(x=>!m.has(x.source)||!m.has(x.target)); if(d.modules.length!==9||d.edges.length!==19||m.size!==9||e.size!==19||dangling.length) process.exit(1); console.log('PASS 9 modules, 19 edges, 0 dangling')"
```

Expected: `PASS 9 modules, 19 edges, 0 dangling`.

- [ ] **Step 2: Create the literal fragment shell and embedded records**

Create a root containing a tab row, controls host, visual host, detail host, and live status:

```html
<section id="ai-native-three-view" aria-label="How to Make a Company AI-Native 交互知识图">
  <nav class="viz-controls" aria-label="视图切换" id="anv-tabs"></nav>
  <div id="anv-controls"></div>
  <div id="anv-canvas"></div>
  <section class="card" id="anv-detail" aria-live="polite"></section>
  <p class="sr-only" id="anv-status" aria-live="polite"></p>
</section>
```

Embed all records from `_data.json` in `const DATA = { source, modules, edges }`. Embed the exact Analysis, Teaching, Method, and Case fields from `modules.md` keyed by `M00`–`M08` in `const MODULE_DETAILS`. Do not paraphrase or add claims while copying.

- [ ] **Step 3: Add fail-closed validation**

Implement and call:

```js
function validateData(data) {
  const moduleIds = new Set(data.modules.map((module) => module.module_id));
  const edgeIds = new Set(data.edges.map((edge) => edge.edge_id));
  const expectedModules = Array.from({ length: 9 }, (_, index) => `M${String(index).padStart(2, '0')}`);
  const expectedEdges = Array.from({ length: 19 }, (_, index) => `E${String(index).padStart(2, '0')}`);
  const problems = [];
  if (data.modules.length !== 9 || moduleIds.size !== 9) problems.push('模块必须为 9 个且 ID 不重复');
  if (data.edges.length !== 19 || edgeIds.size !== 19) problems.push('边必须为 19 条且 ID 不重复');
  if (expectedModules.some((id) => !moduleIds.has(id))) problems.push('模块 ID 未完整覆盖 M00–M08');
  if (expectedEdges.some((id) => !edgeIds.has(id))) problems.push('边 ID 未完整覆盖 E00–E18');
  if (data.edges.some((edge) => !moduleIds.has(edge.source) || !moduleIds.has(edge.target))) problems.push('存在悬空边端点');
  if (data.modules.some((module) => !Array.isArray(module.char_span) || module.char_span.length !== 2)) problems.push('模块缺少 char_span');
  if (data.edges.some((edge) => !edge.evidence_char_span)) problems.push('边缺少 evidence_char_span');
  return problems;
}
```

If the result is non-empty, replace the canvas with one `.text-destructive` list and do not call any renderer.

- [ ] **Step 4: Read the fragment back and reject escaped markup**

Run:

```bash
rg -n '\\\\"|\\\\n|fetch\\(|XMLHttpRequest|WebSocket' '/Users/alex/.codex/visualizations/2026/07/13/019f5cbb-a48a-7ff3-86e3-cae7b76802cf/ai-native-three-view.html'
```

Expected: no matches.

### Task 2: Implement shared state, tabs, filtering, selection, and provenance detail

**Files:**
- Modify: `/Users/alex/.codex/visualizations/2026/07/13/019f5cbb-a48a-7ff3-86e3-cae7b76802cf/ai-native-three-view.html`

**Interfaces:**
- Consumes: `DATA`, `MODULE_DETAILS`, `validateData()`.
- Produces: `state`, `setActiveView()`, `selectModule()`, `selectEdge()`, `toggleEdgeType()`, `renderTabs()`, `renderControls()`, `renderDetail()`, `render()`.

- [ ] **Step 1: Define the single shared state and immutable lookup maps**

```js
const EDGE_TYPES = ['depends_on', 'elaborates', 'exemplifies', 'motivates', 'solves'];
const state = {
  activeView: 'journey',
  selectedModuleId: 'M01',
  selectedEdgeId: null,
  enabledEdgeTypes: new Set(EDGE_TYPES),
};
const modulesById = new Map(DATA.modules.map((module) => [module.module_id, module]));
const edgesById = new Map(DATA.edges.map((edge) => [edge.edge_id, edge]));
```

- [ ] **Step 2: Implement state transitions**

```js
function setActiveView(view) {
  state.activeView = view;
  state.selectedEdgeId = null;
  render();
}
function selectModule(moduleId) {
  if (!modulesById.has(moduleId)) return;
  state.selectedModuleId = moduleId;
  state.selectedEdgeId = null;
  render();
}
function selectEdge(edgeId) {
  if (!edgesById.has(edgeId)) return;
  state.selectedEdgeId = edgeId;
  renderDetail();
}
function toggleEdgeType(type, enabled) {
  if (enabled) state.enabledEdgeTypes.add(type);
  else state.enabledEdgeTypes.delete(type);
  renderNetwork();
  renderDetail();
}
```

- [ ] **Step 3: Render native tabs and full-network filters**

Use three `<button class="btn">` controls with `aria-pressed`, and five `.form-check` checkboxes with matching `id`/`for`. The labels must be `成熟度旅程`, `完整关系网`, `旅程＋关系聚光`, `依赖`, `详述`, `例示`, `动机`, and `解决`.

- [ ] **Step 4: Render type-aware detail and provenance**

`renderDetail()` must show the selected module title, `module_id`, module type, roles, `[start,end)` span, and every available type-specific field. It must list every incident edge as a native button labeled in the form `E03 · M03 —依赖→ M02`, and selecting one must reveal its evidence span and evidence summary. Use exact stored content; do not synthesize transitions.

- [ ] **Step 5: Verify shared-state identifiers statically**

Run:

```bash
rg -n "activeView: 'journey'|selectedModuleId: 'M01'|enabledEdgeTypes: new Set|function setActiveView|function selectModule|function selectEdge|function toggleEdgeType|aria-live=\"polite\"" '/Users/alex/.codex/visualizations/2026/07/13/019f5cbb-a48a-7ff3-86e3-cae7b76802cf/ai-native-three-view.html'
```

Expected: every pattern is present.

### Task 3: Render the three coordinated views

**Files:**
- Modify: `/Users/alex/.codex/visualizations/2026/07/13/019f5cbb-a48a-7ff3-86e3-cae7b76802cf/ai-native-three-view.html`

**Interfaces:**
- Consumes: shared `state`, `modulesById`, `DATA.edges`, selection functions.
- Produces: `renderJourney()`, `renderNetwork()`, `renderFocus()`, `incidentEdges()`.

- [ ] **Step 1: Implement maturity journey without inventing formal sequence edges**

Use `const JOURNEY_IDS = ['M02', 'M03', 'M04', 'M06', 'M07']`. Render those five modules as ordered stage buttons, plus `M00`, `M01`, `M05`, and `M08` as labeled auxiliary buttons. The connecting stage line is explicitly labeled `阅读顺序（非正式边）`.

- [ ] **Step 2: Implement the complete SVG relationship network**

Use a fixed logical `viewBox`, stable coordinates for all nine nodes, SVG marker arrows, and one `<g>` per enabled edge. Each node must also have a transparent native button overlay or an adjacent native button list so keyboard users can select all nodes. Edge paths must be clickable buttons in the adjacent relationship list, since SVG paths are not used as custom controls.

- [ ] **Step 3: Implement one-hop relationship focus**

```js
function incidentEdges(moduleId) {
  return DATA.edges.filter((edge) => edge.source === moduleId || edge.target === moduleId);
}
function neighborIds(moduleId) {
  return [...new Set(incidentEdges(moduleId).map((edge) => edge.source === moduleId ? edge.target : edge.source))];
}
```

Render the five-stage journey on one side and the selected module plus every one-hop neighbor on the other. Each neighbor is a native button; each connecting edge is listed with ID, direction, and type.

- [ ] **Step 4: Wire the render dispatcher**

```js
function render() {
  renderTabs();
  renderControls();
  if (state.activeView === 'journey') renderJourney();
  if (state.activeView === 'network') renderNetwork();
  if (state.activeView === 'focus') renderFocus();
  renderDetail();
  document.getElementById('anv-status').textContent = `${modulesById.get(state.selectedModuleId).title}，当前视图：${state.activeView}`;
}
```

- [ ] **Step 5: Verify required view and provenance strings**

Run:

```bash
rg -n "const JOURNEY_IDS|function renderJourney|function renderNetwork|function renderFocus|阅读顺序（非正式边）|evidence_char_span|char_span|E18|M08" '/Users/alex/.codex/visualizations/2026/07/13/019f5cbb-a48a-7ff3-86e3-cae7b76802cf/ai-native-three-view.html'
```

Expected: every pattern is present.

### Task 4: Render, inspect, and complete the acceptance audit

**Files:**
- Verify: `/Users/alex/.codex/visualizations/2026/07/13/019f5cbb-a48a-7ff3-86e3-cae7b76802cf/ai-native-three-view.html`
- Temporary render: `/tmp/ai-native-three-view-standalone.html`

**Interfaces:**
- Consumes: completed fragment.
- Produces: verified inline visualization and requirement-by-requirement evidence.

- [ ] **Step 1: Wrap the fragment as standalone HTML**

Run:

```bash
python3 '/Users/alex/.codex/plugins/cache/openai-bundled/visualize/1.0.11/skills/visualize/scripts/render.py' '/Users/alex/.codex/visualizations/2026/07/13/019f5cbb-a48a-7ff3-86e3-cae7b76802cf/ai-native-three-view.html' '/tmp/ai-native-three-view-standalone.html'
```

Expected: destination file is created with no traceback.

- [ ] **Step 2: Open and visually inspect the standalone render**

Inspect at 736px and 320px widths. Confirm no overlap, clipping, internal scroll, or horizontal overflow; verify all three view switches, module selection persistence, all five filters, edge selection, and provenance detail updates.

- [ ] **Step 3: Run the static completion audit**

Run:

```bash
node -e "const fs=require('fs'); const s=fs.readFileSync('/Users/alex/.codex/visualizations/2026/07/13/019f5cbb-a48a-7ff3-86e3-cae7b76802cf/ai-native-three-view.html','utf8'); const required=['M00','M01','M02','M03','M04','M05','M06','M07','M08','E00','E18','renderJourney','renderNetwork','renderFocus','selectedModuleId','evidence_char_span']; const missing=required.filter(x=>!s.includes(x)); if(missing.length){console.error(missing);process.exit(1)} console.log('PASS required identifiers and renderers present')"
```

Expected: `PASS required identifiers and renderers present`.

- [ ] **Step 4: Prove formal graph files are unchanged**

Run:

```bash
git status --short -- 'DOC/Review/how-to-make-company-ai-native/source.md' 'DOC/Review/how-to-make-company-ai-native/modules.md' 'DOC/Review/how-to-make-company-ai-native/edges.md' 'DOC/INDEX.md'
```

Expected: no output.

- [ ] **Step 5: Deliver inline**

Emit exactly this directive for the visual, preceded only by a concise sentence describing what the user can explore:

```text
::codex-inline-vis{file="ai-native-three-view.html"}
```

