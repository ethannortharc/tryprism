/**
 * FacetSection — collapsible group of 6 facet mini-bars for one Big Five factor.
 *
 * Props:
 *   title      — section header (e.g. "Facet Detail")
 *   facets     — array of { code, name, percentage, band, bandLabel }
 *   color      — CSS color string matching the parent factor
 */

import { useState } from 'react';

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface FacetEntry {
  code: string;
  name: string;
  percentage: number;
  band: 'low' | 'average' | 'high';
  bandLabel: string;
}

interface FacetSectionProps {
  title: string;
  facets: FacetEntry[];
  color: string;
}

export default function FacetSection({ title, facets, color }: FacetSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      data-testid="facet-section"
      style={{
        marginTop: 'var(--space-3)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
    >
      {/* Toggle header */}
      <button
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--space-3) var(--space-4)',
          background: 'var(--bg-elevated)',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          textAlign: 'left',
          letterSpacing: '0.04em',
        }}
      >
        <span>{title}</span>
        <span
          aria-hidden="true"
          style={{
            color: color,
            fontSize: '0.75rem',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform var(--transition-fast)',
          }}
        >
          ▶
        </span>
      </button>

      {/* Facet list — shown when expanded */}
      {expanded && (
        <div
          style={{
            padding: 'var(--space-4)',
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          {facets.map((facet) => {
            const pct = Math.max(0, Math.min(100, Math.round(facet.percentage)));
            return (
              <div key={facet.code}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                    }}
                  >
                    {facet.name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: color,
                        padding: '1px 6px',
                        borderRadius: '8px',
                        background: hexToRgba(color, 0.12),
                        border: `1px solid ${hexToRgba(color, 0.28)}`,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        fontWeight: 600,
                      }}
                    >
                      {facet.bandLabel}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        minWidth: '30px',
                        textAlign: 'right',
                      }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '5px',
                    background: 'var(--bg-elevated)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: color,
                      borderRadius: '3px',
                      opacity: 0.75,
                      transition: 'width 0.6s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
