import { Card, ChartContainer, NoDataMessage } from './styles';
import CardMetaInfo from './CardMetaInfo';
import TimeSeriesChart from './TimeSeriesChart';
import { transformObservationsToChartData, calculateDataStats } from './dataUtils';

/**
 * 데이터 카드 컴포넌트
 * FRED 시계열 데이터를 시각화하는 카드
 */
export default function DataCard({ item }) {
  // 1. 데이터 변환
  const chartData = transformObservationsToChartData(item.payload?.observations);
  const hasData = chartData.length > 0;

  // 2. 통계 계산
  const { hasNegativeValues } = calculateDataStats(chartData);

  // 3. 렌더링
  return (
    <Card>
      {/* 메타 정보 */}
      <CardMetaInfo item={item} chartData={chartData} />

      {/* 차트 또는 빈 메시지 */}
      {hasData ? (
        <ChartContainer>
          <TimeSeriesChart
            chartData={chartData}
            seriesId={item.seriesId}
            hasNegativeValues={hasNegativeValues}
          />
        </ChartContainer>
      ) : (
        <NoDataMessage>차트 데이터를 표시할 수 없습니다.</NoDataMessage>
      )}
    </Card>
  );
}
