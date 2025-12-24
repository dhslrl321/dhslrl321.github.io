import styled from 'styled-components';
import { MetaInfo, MetaItem } from './SeriesSection.styles.js';
import { formatKoreanDateTime, formatDateYYYYMMDD } from '../../utils/dateFormatter';

const SeriesNameWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

const TimeRangeButtons = styled.div`
  display: flex;
  gap: 4px;
  margin-left: 8px;
`;

const TimeRangeButton = styled.button`
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid ${props => props.$active ? '#2563eb' : '#d1d5db'};
  background: ${props => props.$active ? '#2563eb' : 'white'};
  color: ${props => props.$active ? 'white' : '#6b7280'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #2563eb;
    background: ${props => props.$active ? '#1d4ed8' : '#f3f4f6'};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function CardMetaInfo({ 
  seriesName, 
  chartData, 
  onInfoClick, 
  timeRange, 
  onTimeRangeChange 
}) {
  const hasData = chartData && chartData.length > 0;

  return (
    <MetaInfo>
      <MetaItem>
        <SeriesNameWrapper>
          <strong>시리즈:</strong> {seriesName}
          {onInfoClick && (
            <InfoButton onClick={onInfoClick} aria-label="지표 설명">
              ?
            </InfoButton>
          )}
          <TimeRangeButtons>
            <TimeRangeButton
              $active={timeRange === '1y'}
              onClick={() => onTimeRangeChange('1y')}
            >
              1년
            </TimeRangeButton>
            <TimeRangeButton
              $active={timeRange === '5y'}
              onClick={() => onTimeRangeChange('5y')}
            >
              5년
            </TimeRangeButton>
            <TimeRangeButton
              $active={timeRange === '10y'}
              onClick={() => onTimeRangeChange('10y')}
            >
              10년
            </TimeRangeButton>
            <TimeRangeButton
              $active={timeRange === 'all'}
              onClick={() => onTimeRangeChange('all')}
            >
              최대
            </TimeRangeButton>
          </TimeRangeButtons>
        </SeriesNameWrapper>
      </MetaItem>
      {hasData && (
        <MetaItem>
          <strong>기간:</strong> {formatDateYYYYMMDD(chartData[0].date)} ~{' '}
          {formatDateYYYYMMDD(chartData[chartData.length - 1].date)}
        </MetaItem>
      )}
    </MetaInfo>
  );
}

const InfoButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid #9ca3af;
  background: white;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-left: 6px;
  padding: 0;

  &:hover {
    background: #f3f4f6;
    border-color: #6b7280;
    color: #6b7280;
  }

  &:active {
    transform: scale(0.95);
  }
`;
