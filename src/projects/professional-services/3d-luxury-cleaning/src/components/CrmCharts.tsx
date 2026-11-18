import React from 'react';
import type { TrafficPoint, LeadSourceStat } from '../types/cleaning';

interface SparklineProps {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  values,
  color = '#0284c7',
  width = 96,
  height = 32,
}) => {
  if (!values || values.length === 0) {
    return <div style={{ width, height }} className="bg-slate-50 rounded" />;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const padding = 2;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  const points = values.map((val, idx) => {
    const x = padding + (idx / Math.max(1, values.length - 1)) * innerWidth;
    const y = height - padding - ((val - min) / range) * innerHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible inline-block">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
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
  height = 200,
}) => {
  if (!series || series.length === 0) {
    return (
      <div style={{ height }} className="flex items-center justify-center text-xs text-slate-400">
        No traffic telemetry available
      </div>
    );
  }

  const maxVisits = Math.max(...series.map((p) => p.visits), 10);
  const maxConv = Math.max(...series.map((p) => p.conversions), 1);

  return (
    <div className="w-full flex flex-col justify-end gap-2 pt-4" style={{ height }}>
      <div className="flex items-end justify-between gap-1 h-full w-full">
        {series.map((pt, i) => {
          const vHeight = Math.max(6, Math.round((pt.visits / maxVisits) * 80));
          const cHeight = Math.max(3, Math.round((pt.conversions / maxConv) * 35));

          return (
            <div
              key={i}
              className="group relative flex-1 flex flex-col items-center justify-end h-full min-w-0"
              title={`${pt.label || pt.date}: ${pt.visits} visits, ${pt.conversions} conversions ($${pt.revenue.toLocaleString()})`}
            >
              <div
                className="w-full max-w-[14px] bg-emerald-500 rounded-t-sm transition-all duration-300"
                style={{ height: `${cHeight}%` }}
              />
              <div
                className="w-full max-w-[14px] bg-sky-500/80 rounded-t-sm -mt-1 group-hover:bg-sky-400 transition-all duration-300"
                style={{ height: `${vHeight}%` }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-100">
        <span>{series[0]?.label || series[0]?.date || 'Start'}</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" /> Visits
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Conversions
          </span>
        </div>
        <span>{series[series.length - 1]?.label || series[series.length - 1]?.date || 'Recent'}</span>
      </div>
    </div>
  );
};

interface LeadSourcesDonutProps {
  sources: (LeadSourceStat | { source: string; leads: number; conversionRate: number; pct?: number })[];
  totalLeads: number;
}

const DONUT_COLORS = ['#0284c7', '#0ea5e9', '#38bdf8', '#818cf8', '#a855f7', '#64748b'];

export const LeadSourcesDonut: React.FC<LeadSourcesDonutProps> = ({
  sources,
  totalLeads,
}) => {
  if (!sources || sources.length === 0) {
    return <div className="text-xs text-slate-400 py-6 text-center">No source attribution yet</div>;
  }

  return (
    <div className="space-y-3 pt-2">
      <div className="space-y-2">
        {sources.map((item, idx) => {
          const color = DONUT_COLORS[idx % DONUT_COLORS.length];
          const pct = totalLeads > 0 ? Math.round((item.leads / totalLeads) * 100) : 0;

          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  {item.source}
                </span>
                <span className="font-mono text-slate-500 text-[11px]">
                  {item.leads} leads ({pct}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
