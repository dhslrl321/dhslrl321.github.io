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
import { useEffect, useState } from 'react';
import styled from 'styled-components';

/**
 * 시계열 차트 컴포넌트
 */
export default function TimeSeriesChart({ chartData, seriesId, hasNegativeValues }) {
  const config = getSeriesConfig(seriesId);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // X축에 표시할 틱 개수 계산 (모바일: 4개, 데스크톱: 8개)
  const tickCount = isMobile ? 4 : 8;

  return (
    <ChartWrapper>
      {isMobile && <MobileLabel>{config.label}</MobileLabel>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: isMobile ? 10 : 5,
            right: 10,
            left: 0,
            bottom: isMobile ? 5 : 10,
          }}
        >
          {/* 그리드 */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* X축 */}
          <XAxis
            dataKey="date"
            tickFormatter={formatDateYYYYMM}
            stroke="#6b7280"
            style={{ fontSize: isMobile ? '10px' : '11px' }}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? 'end' : 'middle'}
            height={isMobile ? 50 : 40}
            interval="preserveStartEnd"
            minTickGap={isMobile ? 40 : 60}
          />

          {/* Y축 */}
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '10px' }}
            tickFormatter={(value) => value.toFixed(1)}
            width={40}
            tickCount={6}
            label={
              !isMobile
                ? {
                    value: config.label,
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: '11px', fill: '#6b7280', textAnchor: 'middle' },
                  }
                : undefined
            }
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
              fontSize: '12px',
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
    </ChartWrapper>
  );
}

/* ---------- Styles ---------- */

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MobileLabel = styled.div`
  position: absolute;
  top: -2px;
  left: 10px;
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
  z-index: 10;
`;
