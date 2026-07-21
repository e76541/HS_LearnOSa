import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import type { LaneNodeData, ModuleNodeData } from '../graph/buildFlow';

type ModuleFlowNode = Node<ModuleNodeData, 'moduleNode'>;
type LaneFlowNode = Node<LaneNodeData, 'laneNode'>;

/** 模塊節點：中文標題 + 角落 module_id + 低干擾型別色籤；background 為黃色虛線框 */
export function ModuleNode({ data, sourcePosition, targetPosition }: NodeProps<ModuleFlowNode>) {
  const { module: m, dimmed, selected, onPath, isRoot } = data;
  const classes = [
    'module-node',
    m.is_background ? 'is-background' : '',
    selected ? 'is-selected' : '',
    dimmed ? 'is-dimmed' : '',
    onPath && !selected ? 'is-on-path' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div
      className={classes}
      aria-label={`模塊 ${m.module_id}：${m.title}${m.is_background ? '（背景）' : ''}`}
    >
      <Handle type="target" position={targetPosition ?? Position.Top} isConnectable={false} />
      <span className="module-node__id">{m.module_id}</span>
      <div className="module-node__title">{m.title}</div>
      <div className="module-node__meta">
        <span className="module-node__type">{m.module_type}</span>
        {m.is_background && <span className="module-node__bg-badge">背景</span>}
        {isRoot && <span className="module-node__root-badge">概念根</span>}
      </div>
      <Handle type="source" position={sourcePosition ?? Position.Bottom} isConnectable={false} />
    </div>
  );
}

/** 論證分層的分層背景帶（不可互動） */
export function LaneNode({ data }: NodeProps<LaneFlowNode>) {
  return (
    <div className="lane-node" style={{ width: data.width, height: data.height }}>
      <span className="lane-node__label">{data.label}</span>
    </div>
  );
}
