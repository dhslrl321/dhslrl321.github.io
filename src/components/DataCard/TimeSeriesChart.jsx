import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { formatDateYYYYMM, formatKoreanDate } from './formatters';
import { getSeriesConfig } from './config';

/**
 * 시계열 차트 컴포넌트
 */
export default function TimeSeriesChart({ chartData, seriesId, hasNegativeValues }) {
  const config = getSeriesConfig(seriesId);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
        {/* 그리드 */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

        {/* X축 */}
        <XAxis
          dataKey="date"
          tickFormatter={formatDateYYYYMM}
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />

        {/* Y축 */}
        <YAxis
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
          tickFormatter={(value) => value.toFixed(2)}
          label={{
            value: config.label,
            angle: -90,
            position: 'insideLeft',
            style: { fontSize: '12px', fill: '#6b7280' },
          }}
        />

        {/* 툴팁 */}
        <Tooltip
          labelFormatter={formatKoreanDate}
          formatter={(value) => [value.toFixed(2) + config.unit, config.label]}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '8px 12px',
          }}
        />

        {/* 0 기준선 (음수 값이 있을 때만) */}
        {hasNegativeValues && <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />}

        {/* 라인 */}
        <Line
          type="monotone"
          dataKey="value"
          stroke={config.color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
