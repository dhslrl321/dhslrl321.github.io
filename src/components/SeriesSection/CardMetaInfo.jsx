import styled from 'styled-components';
import { MetaInfo, MetaItem } from './SeriesSection.styles.js';
import { formatKoreanDateTime, formatDateYYYYMMDD } from '../../utils/dateFormatter';

const SeriesNameWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

export default function CardMetaInfo({ seriesName, chartData, onInfoClick }) {
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
