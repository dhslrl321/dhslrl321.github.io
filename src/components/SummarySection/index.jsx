import styled from 'styled-components';
import { getSeriesConfig } from '../DataCard/config';
import { transformObservationsToChartData } from '../DataCard/dataUtils';

/**
 * 전체 데이터 요약 섹션
 */
export default function SummarySection({ data }) {
  const seriesArray = Object.values(data);

  if (seriesArray.length === 0) {
    return null;
  }

  return (
    <SummaryContainer>
      <SummaryTitle>최신 지표 현황</SummaryTitle>
      <SummaryGrid>
        {seriesArray.map((item) => {
          const config = getSeriesConfig(item.seriesId);
          const chartData = transformObservationsToChartData(item.payload?.observations);

          if (chartData.length === 0) return null;

          const latestData = chartData[chartData.length - 1];
          const previousData = chartData.length > 1 ? chartData[chartData.length - 2] : null;
          const change = previousData ? latestData.value - previousData.value : 0;
          const isPositive = change > 0;
          const isNegative = change < 0;

          return (
            <SummaryCard key={item.seriesId}>
              <CardHeader>
                <SeriesName>{config.name}</SeriesName>
                <LatestDate>{latestData.date}</LatestDate>
              </CardHeader>

              <ValueSection>
                <LatestValue>
                  <ValueNumber>{latestData.value.toFixed(2)}</ValueNumber>
                  <ValueUnit>{config.unit}</ValueUnit>
                </LatestValue>

                {previousData && (
                  <ChangeInfo isPositive={isPositive} isNegative={isNegative}>
                    <ChangeArrow isPositive={isPositive} isNegative={isNegative}>
                      {isPositive ? '▲' : isNegative ? '▼' : '―'}
                    </ChangeArrow>
                    <ChangeText>
                      {isPositive ? '+' : ''}
                      {change.toFixed(2)}
                      {config.unit}
                    </ChangeText>
                  </ChangeInfo>
                )}
              </ValueSection>
            </SummaryCard>
          );
        })}
      </SummaryGrid>
    </SummaryContainer>
  );
}

/* ---------- Styles ---------- */

const SummaryContainer = styled.section`
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const SummaryCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 8px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const SeriesName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const LatestDate = styled.div`
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const ValueSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LatestValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const ValueNumber = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ValueUnit = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #6b7280;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ChangeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: ${(props) =>
    props.isPositive ? '#fef2f2' : props.isNegative ? '#eff6ff' : '#f9fafb'};
  border-radius: 6px;
  align-self: flex-start;
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
