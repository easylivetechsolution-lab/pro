import React, { useState } from 'react';
import type { LeadSourceStat, TrafficPoint } from '../types/cleaning';

interface SparklineProps {
  values: number[];
  color?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({ values, color = '#0284c7' }) => {
  const safe = values.length > 1 ? values : [10, 12, 11, 14, 16, 15, 19];
  const min = Math.min(...safe);
  const max = Math.max(...safe);
  const span = Math.max(1, max - min);
  const width = 72;
  const height = 26;
  const pts = safe
    .map((v, idx) => {
      const x = (idx / (safe.length - 1)) * width;
      const y = height - 4 - ((v - min) / span) * (height - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-[72px] h-[26px] shrink-0 overflow-visible"
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
      />
    </svg>
  );
};

interface WebsiteTrafficChartProps {
  series: TrafficPoint[];
  height?: number;
}

export const WebsiteTrafficChart: React.FC<WebsiteTrafficChartProps> = ({
  series,
  height = 230,
}) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (series.length === 0) {
    return (
      <div className="h-[220px] flex items-center justify-center text-xs text-slate-500">
        No traffic recorded yet.
      </div>
    );
  }

  const width = 680;
  const padL = 40;
  const padR = 16;
  const padT = 18;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const maxVisits = Math.max(100, ...series.map((d) => d.visits)) * 1.12;
  const maxConv = Math.max(10, ...series.map((d) => d.conversions)) * 1.35;

  const xFor = (i: number) =>
    series.length === 1 ? padL + plotW / 2 : padL + (i / (series.length - 1)) * plotW;
  const yVisitFor = (v: number) => padT + plotH - (v / maxVisits) * plotH;
  const yConvFor = (c: number) => padT + plotH - (c / maxConv) * (plotH * 0.56);

  const visitPoints = series.map((d, i) => `${xFor(i).toFixed(1)},${yVisitFor(d.visits).toFixed(1)}`);
  const convPoints = series.map((d, i) => `${xFor(i).toFixed(1)},${yConvFor(d.conversions).toFixed(1)}`);

  const visitArea = `M ${xFor(0).toFixed(1)},${(padT + plotH).toFixed(1)} L ${visitPoints.join(' L ')} L ${xFor(series.length - 1).toFixed(1)},${(padT + plotH).toFixed(1)} Z`;

  const gridTicks = [0, 0.33, 0.66, 1];
  const labelIndices = new Set<number>([
    0,
    Math.floor((series.length - 1) * 0.25),
    Math.floor((series.length - 1) * 0.5),
    Math.floor((series.length - 1) * 0.75),
    series.length - 1,
  ]);

  const activeIdx = hoverIdx !== null ? hoverIdx : series.length - 1;
  const activePoint = series[activeIdx];
  const activeX = xFor(activeIdx);

  return (
    <div className="relative w-full select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id="crmVisitsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {gridTicks.map((ratio) => {
          const y = padT + plotH - ratio * plotH;
          const val = Math.round(maxVisits * ratio);
          return (
            <g key={ratio}>
              <line
                x1={padL}
                x2={width - padR}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={padL - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-slate-400 text-[10px] font-mono tabular-nums"
              >
                {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
              </text>
            </g>
          );
        })}

        <path d={visitArea} fill="url(#crmVisitsFill)" />

        <polyline
          fill="none"
          stroke="#0284c7"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={visitPoints.join(' ')}
        />

        <polyline
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={convPoints.join(' ')}
        />

        {/* Active vertical crosshair & dots */}
        <line
          x1={activeX}
          x2={activeX}
          y1={padT}
          y2={padT + plotH}
          stroke="#94a3b8"
          strokeDasharray="3 3"
          strokeWidth="1"
        />

        <circle
          cx={activeX}
          cy={yVisitFor(activePoint.visits)}
          r="4.5"
          fill="#0284c7"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <circle
          cx={activeX}
          cy={yConvFor(activePoint.conversions)}
          r="4"
          fill="#f59e0b"
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* X Axis ticks */}
        {series.map((d, i) =>
          labelIndices.has(i) ? (
            <text
              key={d.date}
              x={xFor(i)}
              y={height - 6}
              textAnchor={i === 0 ? 'start' : i === series.length - 1 ? 'end' : 'middle'}
              className="fill-slate-500 text-[10px] font-mono tabular-nums"
            >
              {d.label}
            </text>
          ) : null,
        )}

        {/* Invisible hover columns for snappy interaction */}
        {series.map((d, i) => {
          const colW = plotW / Math.max(1, series.length);
          return (
            <rect
              key={d.date}
              x={xFor(i) - colW / 2}
              y={padT}
              width={colW}
              height={plotH}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoverIdx(i)}
            />
          );
        })}
      </svg>

      {/* Clean Interactive Readout Strip / Tooltip */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 border border-slate-200/80 px-3 py-2 text-xs">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-800 tabular-nums">{activePoint.label}</span>
          <span className="inline-flex items-center gap-1.5 text-slate-600 tabular-nums">
            <span className="w-2 h-2 rounded-full bg-sky-600" aria-hidden="true" />
            Visits: <strong className="text-slate-900">{activePoint.visits.toLocaleString()}</strong>
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-600 tabular-nums">
            <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
            Conversions: <strong className="text-slate-900">{activePoint.conversions}</strong>
          </span>
        </div>
        <span className="text-slate-500 font-mono tabular-nums">
          Bounce {activePoint.bounceRate}% · Est. ${activePoint.revenue.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

interface LeadSourcesDonutProps {
  sources: LeadSourceStat[];
  totalLeads: number;
}

export const LeadSourcesDonut: React.FC<LeadSourcesDonutProps> = ({
  sources,
  totalLeads,
}) => {
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const totalCount = Math.max(
    1,
    sources.reduce((sum, s) => sum + s.leads, 0),
  );

  let runningOffset = 0;
  const segments = sources.map((item) => {
    const ratio = item.leads / totalCount;
    const dash = ratio * circumference;
    const seg = {
      ...item,
      dash,
      offset: runningOffset,
    };
    runningOffset += dash;
    return seg;
  });

  const activeSeg = segments.find((s) => s.source === hoveredSource);

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-5">
      <div className="relative w-[148px] h-[148px] shrink-0">
        <svg viewBox="0 0 148 148" className="w-full h-full -rotate-90">
          <circle
            cx="74"
            cy="74"
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="18"
          />
          {segments.map((seg) => {
            const isHovered = hoveredSource === seg.source;
            return (
              <circle
                key={seg.source}
                cx="74"
                cy="74"
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={isHovered ? '22' : '18'}
                strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
                strokeDashoffset={-seg.offset}
                className="transition-all duration-150 cursor-pointer"
                onMouseEnter={() => setHoveredSource(seg.source)}
                onMouseLeave={() => setHoveredSource(null)}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="font-display text-xl font-bold text-slate-900 tabular-nums">
            {activeSeg ? activeSeg.leads : totalLeads.toLocaleString()}
          </span>
          <span className="text-[11px] font-medium text-slate-500 max-w-[82px] truncate">
            {activeSeg ? activeSeg.source : 'Total Enquiries'}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full space-y-2.5">
        {segments.map((seg) => (
          <button
            key={seg.source}
            type="button"
            onMouseEnter={() => setHoveredSource(seg.source)}
            onMouseLeave={() => setHoveredSource(null)}
            className={`w-full flex items-center justify-between gap-2 text-xs rounded-md px-2 py-1 transition-colors cursor-pointer ${
              hoveredSource === seg.source ? 'bg-sky-50 text-slate-900' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: seg.color }}
                aria-hidden="true"
              />
              <span className="truncate font-medium">{seg.source}</span>
            </span>
            <span className="font-mono font-semibold text-slate-900 tabular-nums shrink-0">
              {seg.share}%
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
