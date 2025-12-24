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
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatDateYYYYMM, formatKoreanDate } from '../../../utils/dateFormatter.js';
import { formatValueBySeries } from '../../../utils/numberFormatter.js';

export default function TimeSeriesChart({ data, config, hasNegativeValues, seriesId }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tooltipFormatter = (value) => [
    `${formatValueBySeries(value, seriesId, config)}${config.unit}`,
    config.label,
  ];

  const yAxisFormatter = (value) => {
    // Y축은 간결하게 표시
    if (seriesId === 'PAYEMS') {
      // 비농업 고용자 수: 159552 -> 159.6K
      if (Math.abs(value) >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toFixed(0);
    }

    if (seriesId === 'SP500' || seriesId === 'NASDAQCOM') {
      // 지수는 천 단위 구분
      if (Math.abs(value) >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toFixed(0);
    }

    // 기본: 소수점 1자리
    return value.toFixed(1);
  };

  return (
    <ChartWrapper>
      {isMobile && <MobileLabel>{config.label}</MobileLabel>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: isMobile ? 10 : 5,
            right: 10,
            left: isMobile ? 10 : 20,
            bottom: isMobile ? 5 : 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          
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
          
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '10px' }}
            tickFormatter={yAxisFormatter}
            width={isMobile ? 50 : 60}
            tickCount={6}
            label={
              !isMobile
                ? {
                    value: config.label,
                    angle: -90,
                    position: 'insideLeft',
                    offset: 10,
                    style: { fontSize: '11px', fill: '#6b7280', textAnchor: 'middle' },
                  }
                : undefined
            }
          />
          
          <Tooltip
            labelFormatter={formatKoreanDate}
            formatter={tooltipFormatter}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '12px',
            }}
          />
          
          {hasNegativeValues && (
            <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />
          )}
          
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
