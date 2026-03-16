/**
 * RadarChart — 9-axis SVG spider/radar chart for Enneagram type scores.
 *
 * Each of the 9 axes represents one Enneagram type.
 * The scores are plotted as a filled polygon.
 * Per-type prismatic CSS variable colors are used for axis labels and the fill.
 */

interface RadarChartProps {
  /** Scores keyed by type number 1–9 */
  scores: Record<number, number>;
  /** Width/height of the SVG in pixels (square) */
  size?: number;
}

const TYPE_COLORS: Record<number, string> = {
  1: 'var(--type-1)',
  2: 'var(--type-2)',
  3: 'var(--type-3)',
  4: 'var(--type-4)',
  5: 'var(--type-5)',
  6: 'var(--type-6)',
  7: 'var(--type-7)',
  8: 'var(--type-8)',
  9: 'var(--type-9)',
};

/**
 * Returns the (x, y) coordinate for a given axis index and value.
 * Axes start at the top (−90°) and go clockwise.
 */
function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  index: number,
  total: number
): [number, number] {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

export default function RadarChart({ scores, size = 320 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38;
  const labelRadius = size * 0.47;
  const total = 9;

  // Normalize scores so max maps to maxRadius
  const values = Array.from({ length: total }, (_, i) => scores[i + 1] ?? 0);
  const maxScore = Math.max(...values, 1);

  // Build polygon points for the filled shape
  const polygonPoints = values
    .map((score, i) => {
      const r = (score / maxScore) * maxRadius;
      const [x, y] = polarToCartesian(cx, cy, r, i, total);
      return `${x},${y}`;
    })
    .join(' ');

  // Build the background grid (3 concentric polygons at 33%, 66%, 100%)
  const gridLevels = [0.33, 0.66, 1.0];

  return (
    <svg
      data-testid="score-chart"
      className="chart"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="Enneagram type score radar chart"
      role="img"
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      {/* Background grid rings */}
      {gridLevels.map((level) => {
        const pts = Array.from({ length: total }, (_, i) => {
          const [x, y] = polarToCartesian(cx, cy, maxRadius * level, i, total);
          return `${x},${y}`;
        }).join(' ');
        return (
          <polygon
            key={level}
            points={pts}
            fill="none"
            stroke="var(--border-default)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis spokes */}
      {Array.from({ length: total }, (_, i) => {
        const [x, y] = polarToCartesian(cx, cy, maxRadius, i, total);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="var(--border-default)"
            strokeWidth="1"
          />
        );
      })}

      {/* Filled score polygon */}
      <polygon
        points={polygonPoints}
        fill="var(--accent-primary)"
        fillOpacity="0.25"
        stroke="var(--accent-primary)"
        strokeWidth="2"
      />

      {/* Score dots and score items */}
      {values.map((score, i) => {
        const r = (score / maxScore) * maxRadius;
        const [x, y] = polarToCartesian(cx, cy, r, i, total);
        const typeNum = i + 1;
        const color = TYPE_COLORS[typeNum];
        return (
          <g key={typeNum}>
            <circle
              cx={x}
              cy={y}
              r={4}
              fill={color}
            />
          </g>
        );
      })}

      {/* Axis labels */}
      {Array.from({ length: total }, (_, i) => {
        const typeNum = i + 1;
        const [x, y] = polarToCartesian(cx, cy, labelRadius, i, total);
        const color = TYPE_COLORS[typeNum];
        return (
          <text
            key={typeNum}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill={color}
            fontSize={size * 0.055}
            fontWeight="600"
          >
            {typeNum}
          </text>
        );
      })}
    </svg>
  );
}
