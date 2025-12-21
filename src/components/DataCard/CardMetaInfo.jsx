import styled from 'styled-components';
import { MetaInfo, MetaItem } from './styles';
import { formatKoreanDateTime, formatDateYYYYMMDD } from './formatters';
import { getSeriesConfig } from './config';
import InfoTooltip from './InfoTooltip';

/**
 * 데이터 카드의 메타 정보 섹션
 */
export default function CardMetaInfo({ item, chartData }) {
  const hasData = chartData && chartData.length > 0;
  const config = getSeriesConfig(item.seriesId);

  return (
    <MetaInfo>
      <MetaItem>
        <SeriesNameWrapper>
          <strong>시리즈:</strong> {config.name}
          <InfoTooltip description={config.description} />
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

/* ---------- Styles ---------- */

const SeriesNameWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;
