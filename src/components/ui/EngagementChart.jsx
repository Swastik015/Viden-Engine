import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { useApp } from '../../context/AppContext.jsx'

const SERIES = [
  { key: 'total',    label: 'Total',     color: '#0E7490' },
  { key: 'veevaCLM', label: 'Veeva CLM', color: '#1E1B4B' },
  { key: 'email',    label: 'Email',     color: '#D97706' },
  { key: 'display',  label: 'Display',   color: '#A0A6B8' },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-white border border-ink-200 rounded-lg shadow-md
                    px-3 py-2.5 text-xs">
      <div className="font-semibold text-ink-800 mb-1.5">{label}</div>
      {payload.map(entry => (
        <div key={entry.dataKey} className="flex items-center gap-2 mb-0.5">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-ink-600">{entry.name}:</span>
          <span className="font-mono font-semibold text-ink-900">
            {entry.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

function CustomLegend({ payload }) {
  return (
    <div className="flex items-center gap-4 justify-center mt-2">
      {payload.map(entry => (
        <div key={entry.value} className="flex items-center gap-1.5">
          <span
            className="w-3 h-0.5 inline-block rounded"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-ink-500">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function EngagementChart({ height = 220 }) {
  const { getFilteredEngagementData, filters } = useApp()

  const rawData     = getFilteredEngagementData()
  const isSingleSeries = filters.channel !== 'All Channels'

  // Normalise to recharts format
  const chartData = rawData.map(row => {
    if (isSingleSeries) {
      return { week: row.week, [filters.channel]: row.value }
    }
    return row
  })

  // Which series to render
  const activeSeries = isSingleSeries
    ? [{ key: filters.channel, label: filters.channel, color: '#0E7490' }]
    : SERIES

  // Wave dividers (weeks 4 and 7)
  const waveLines =
    filters.wave === 'All Waves'
      ? ['Wk 4', 'Wk 7']
      : []

  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E2E4EC"
            vertical={false}
          />

          <XAxis
            dataKey="week"
            tick={{ fontSize: 10, fill: '#777E94', fontFamily: 'Geist Mono' }}
            axisLine={{ stroke: '#E2E4EC' }}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 10, fill: '#777E94', fontFamily: 'Geist Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => v >= 1000 ? `${v / 1000}k` : v}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend content={<CustomLegend />} />

          {/* Wave divider reference lines */}
          {waveLines.map(week => (
            <ReferenceLine
              key={week}
              x={week}
              stroke="#C8CCD8"
              strokeDasharray="4 3"
              label={{
                value: week === 'Wk 4' ? 'W2 · AHS' : 'W3 · Sustain',
                position: 'top',
                fontSize: 9,
                fill: '#A0A6B8',
                fontFamily: 'Geist',
              }}
            />
          ))}

          {activeSeries.map(series => (
            <Line
              key={series.key}
              type="monotone"
              dataKey={series.key}
              name={series.label}
              stroke={series.color}
              strokeWidth={series.key === 'total' ? 2.5 : 1.8}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              strokeDasharray={
                series.key === 'veevaCLM' ? '5 3' :
                series.key === 'display'  ? '2 2' : undefined
              }
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Wave labels below chart */}
      {filters.wave === 'All Waves' && (
        <div className="flex justify-around mt-1 px-8">
          {['W1 · Launch', 'W2 · AHS peak', 'W3 · Sustain'].map(w => (
            <span key={w} className="text-[10px] font-medium text-ink-400">
              {w}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}