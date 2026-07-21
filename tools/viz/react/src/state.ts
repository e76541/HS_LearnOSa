import type {
  CanonicalEdgeType,
  GraphMode,
  LoadedProjection,
  MainTab,
  SourceManifest,
} from './types';
import { CANONICAL_EDGE_TYPES } from './constants';

export interface AppState {
  tab: MainTab;
  manifest: SourceManifest | null;
  manifestError: string | null;
  selectedSourceId: string | null;
  loaded: LoadedProjection | null;
  projectionLoading: boolean;
  projectionError: string | null;
  graphMode: GraphMode;
  selectedModuleId: string | null;
  selectedEdgeId: string | null;
  edgeTypeFilter: Record<CanonicalEdgeType, boolean>;
  showBackground: boolean;
  panelCollapsed: boolean;
}

const baseInitialState: AppState = {
  tab: 'graph',
  manifest: null,
  manifestError: null,
  selectedSourceId: null,
  loaded: null,
  projectionLoading: false,
  projectionError: null,
  graphMode: 'focus',
  selectedModuleId: null,
  selectedEdgeId: null,
  edgeTypeFilter: Object.fromEntries(CANONICAL_EDGE_TYPES.map((t) => [t, true])) as Record<
    CanonicalEdgeType,
    boolean
  >,
  showBackground: true,
  panelCollapsed: false,
};

export const initialState: AppState = baseInitialState;

/** 支援 ?tab=pipeline|graph、?mode=focus|full|layers、?source=<id> 深連結 */
export function createInitialState(): AppState {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  const mode = params.get('mode');
  // 窄螢幕預設收合底部面板，避免覆層遮住圖譜
  const narrow = window.matchMedia('(max-width: 720px)').matches;
  return {
    ...baseInitialState,
    tab: tab === 'pipeline' || tab === 'graph' ? tab : baseInitialState.tab,
    graphMode:
      mode === 'focus' || mode === 'full' || mode === 'layers' ? mode : baseInitialState.graphMode,
    selectedSourceId: params.get('source'),
    panelCollapsed: narrow,
  };
}

export type AppAction =
  | { kind: 'setTab'; tab: MainTab }
  | { kind: 'manifestLoaded'; manifest: SourceManifest }
  | { kind: 'manifestFailed'; error: string }
  | { kind: 'selectSource'; sourceId: string }
  | { kind: 'projectionLoaded'; loaded: LoadedProjection }
  | { kind: 'projectionFailed'; error: string }
  | { kind: 'setGraphMode'; mode: GraphMode }
  | { kind: 'selectModule'; moduleId: string }
  | { kind: 'selectEdge'; edgeId: string }
  | { kind: 'toggleEdgeType'; edgeType: CanonicalEdgeType }
  | { kind: 'setShowBackground'; show: boolean }
  | { kind: 'togglePanel' };

/** 切換來源時沿用相同 module_id；否則選第一個有效技能模塊 */
function pickInitialModule(loaded: LoadedProjection, previousId: string | null): string | null {
  if (previousId && loaded.graphModules.some((m) => m.module_id === previousId)) return previousId;
  const skill = loaded.graphModules.find((m) => m.is_skill_signal && !m.is_background);
  const fallback = loaded.graphModules.find((m) => !m.is_background) ?? loaded.graphModules[0];
  return (skill ?? fallback)?.module_id ?? null;
}

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.kind) {
    case 'setTab':
      return { ...state, tab: action.tab };
    case 'manifestLoaded': {
      const first = action.manifest.sources[0]?.id ?? null;
      const kept =
        state.selectedSourceId &&
        action.manifest.sources.some((s) => s.id === state.selectedSourceId)
          ? state.selectedSourceId
          : first;
      return {
        ...state,
        manifest: action.manifest,
        manifestError: null,
        selectedSourceId: kept,
        projectionLoading: kept !== null,
      };
    }
    case 'manifestFailed':
      return { ...state, manifestError: action.error };
    case 'selectSource':
      if (action.sourceId === state.selectedSourceId) return state;
      return {
        ...state,
        selectedSourceId: action.sourceId,
        loaded: null,
        projectionLoading: true,
        projectionError: null,
        selectedEdgeId: null,
      };
    case 'projectionLoaded': {
      const selectedModuleId = pickInitialModule(action.loaded, state.selectedModuleId);
      return {
        ...state,
        loaded: action.loaded,
        projectionLoading: false,
        projectionError: null,
        selectedModuleId,
        selectedEdgeId: null,
      };
    }
    case 'projectionFailed':
      return { ...state, projectionLoading: false, projectionError: action.error, loaded: null };
    case 'setGraphMode':
      return { ...state, graphMode: action.mode };
    case 'selectModule':
      return { ...state, selectedModuleId: action.moduleId, selectedEdgeId: null };
    case 'selectEdge':
      return { ...state, selectedEdgeId: action.edgeId };
    case 'toggleEdgeType':
      return {
        ...state,
        edgeTypeFilter: {
          ...state.edgeTypeFilter,
          [action.edgeType]: !state.edgeTypeFilter[action.edgeType],
        },
        selectedEdgeId: null,
      };
    case 'setShowBackground': {
      // 隱藏背景時若目前選取的是背景模塊，改選第一個可見技能模塊
      let selectedModuleId = state.selectedModuleId;
      if (!action.show && state.loaded && selectedModuleId) {
        const current = state.loaded.graphModules.find((m) => m.module_id === selectedModuleId);
        if (current?.is_background) {
          selectedModuleId = pickInitialModule(state.loaded, null);
        }
      }
      return { ...state, showBackground: action.show, selectedEdgeId: null, selectedModuleId };
    }
    case 'togglePanel':
      return { ...state, panelCollapsed: !state.panelCollapsed };
    default:
      return state;
  }
}
