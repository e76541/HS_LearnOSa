import { useRef } from 'react';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

interface Props<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

/** radiogroup 語義的分段控制，支援左右方向鍵切換 */
export function SegmentedControl<T extends string>({ options, value, onChange, ariaLabel }: Props<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % options.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + options.length) % options.length;
    if (next >= 0) {
      e.preventDefault();
      onChange(options[next].value);
      refs.current[next]?.focus();
    }
  };

  return (
    <div className="segmented" role="radiogroup" aria-label={ariaLabel}>
      {options.map((opt, i) => (
        <button
          key={opt.value}
          ref={(el) => {
            refs.current[i] = el;
          }}
          role="radio"
          aria-checked={value === opt.value}
          tabIndex={value === opt.value ? 0 : -1}
          title={opt.hint}
          className={`segmented__btn${value === opt.value ? ' is-active' : ''}`}
          onClick={() => onChange(opt.value)}
          onKeyDown={(e) => onKeyDown(e, i)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
