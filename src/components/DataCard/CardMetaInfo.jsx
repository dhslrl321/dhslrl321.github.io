import styled from 'styled-components';
import { MetaInfo, MetaItem } from './styles';
import { formatKoreanDateTime, formatDateYYYYMMDD } from './formatters';

/**
 * 데이터 카드의 메타 정보 섹션
 */
export default function CardMetaInfo({ item, chartData }) {
  const hasData = chartData && chartData.length > 0;

  return (
    <MetaInfo>
      <MetaItem>
        <strong>시리즈:</strong> {item.seriesName || 'Unknown Series'}
      </MetaItem>
      <MetaItem>
        <strong>ID:</strong> {item.seriesId || item.id}
      </MetaItem>
      <MetaItem>
        <strong>수집 시간:</strong> {formatKoreanDateTime(item.fetchedAt)}
      </MetaItem>
      {hasData && (
        <>
          <MetaItem>
            <strong>데이터 포인트:</strong> {chartData.length}개
          </MetaItem>
          <MetaItem>
            <strong>기간:</strong> {formatDateYYYYMMDD(chartData[0].date)} ~{' '}
            {formatDateYYYYMMDD(chartData[chartData.length - 1].date)}
          </MetaItem>
        </>
      )}
    </MetaInfo>
  );
}
