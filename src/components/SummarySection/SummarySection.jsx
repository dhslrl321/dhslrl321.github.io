import * as S from './SummarySection.styles';
import SummaryCard from './SummaryCard';
import { getSeriesConfig } from '../../config/seriesConfig';
import { transformObservationsToChartData } from '../../utils/chartDataUtils';

export default function SummarySection({ data }) {
  const seriesArray = Object.values(data);

  if (seriesArray.length === 0) {
    return null;
  }

  return (
    <S.Container>
      <S.Title>최신 지표 현황</S.Title>
      <S.Grid>
        {seriesArray.map((item) => {
          const config = getSeriesConfig(item.seriesId);
          const chartData = transformObservationsToChartData(item.payload?.observations);

          if (chartData.length === 0) return null;

          const latestData = chartData[chartData.length - 1];
          const previousData = chartData.length > 1 ? chartData[chartData.length - 2] : null;

          return (
            <SummaryCard
              key={item.seriesId}
              seriesId={item.seriesId}
              config={config}
              latestData={latestData}
              previousData={previousData}
            />
          );
        })}
      </S.Grid>
    </S.Container>
  );
}
