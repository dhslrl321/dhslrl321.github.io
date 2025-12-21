import styled from 'styled-components';

/**
 * 최신 데이터 요약 컴포넌트
 */
export default function DataSummary({ chartData, config }) {
  if (!chartData || chartData.length === 0) {
    return null;
  }

  // 최신 데이터
  const latestData = chartData[chartData.length - 1];
  
  // 이전 데이터 (전월 대비 계산용)
  const previousData = chartData.length > 1 ? chartData[chartData.length - 2] : null;
  
  // 변화량 계산
  const change = previousData ? latestData.value - previousData.value : 0;
  const changePercent = previousData ? ((change / Math.abs(previousData.value)) * 100) : 0;
  
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <SummaryContainer>
      <LatestValue>
        <ValueNumber>{latestData.value.toFixed(2)}</ValueNumber>
        <ValueUnit>{config.unit}</ValueUnit>
      </LatestValue>
      
      {previousData && (
        <ChangeInfo isPositive={isPositive} isNegative={isNegative}>
          <ChangeArrow>{isPositive ? '▲' : isNegative ? '▼' : '―'}</ChangeArrow>
          <ChangeText>
            {Math.abs(change).toFixed(2)}{config.unit}
            {change !== 0 && (
              <ChangePercent> ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%)</ChangePercent>
            )}
          </ChangeText>
        </ChangeInfo>
      )}
      
      <LatestDate>{latestData.date}</LatestDate>
    </SummaryContainer>
  );
}

/* ---------- Styles ---------- */

const SummaryContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 12px;
  }
`;

const LatestValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const ValueNumber = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ValueUnit = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #6b7280;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ChangeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${(props) =>
    props.isPositive ? '#fef2f2' : props.isNegative ? '#eff6ff' : '#f9fafb'};
  border-radius: 6px;
`;

const ChangeArrow = styled.span`
  font-size: 12px;
  color: ${(props) =>
    props.isPositive ? '#dc2626' : props.isNegative ? '#2563eb' : '#6b7280'};
`;

const ChangeText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #374151;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ChangePercent = styled.span`
  font-size: 12px;
  color: #6b7280;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const LatestDate = styled.span`
  font-size: 14px;
  color: #9ca3af;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
