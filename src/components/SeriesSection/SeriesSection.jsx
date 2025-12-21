import { useState } from 'react';
import { Card, ChartContainer, NoDataMessage } from './SeriesSection.styles.js';
import CardMetaInfo from './CardMetaInfo';
import TimeSeriesChart from './TimeSeriesChart/TimeSeriesChart.jsx';
import InfoTooltip from './InfoTooltip/InfoTooltip.jsx';
import { transformObservationsToChartData, calculateDataStats } from '../../utils/chartDataUtils';
import { getSeriesConfig } from '../../config/seriesConfig';

export default function SeriesSection({ item }) {
  const [showInfo, setShowInfo] = useState(false);
  
  const config = getSeriesConfig(item.seriesId);
  const chartData = transformObservationsToChartData(item.payload?.observations);
  const { hasNegativeValues } = calculateDataStats(chartData);
  const hasData = chartData.length > 0;

  return (
    <Card>
      <CardMetaInfo
        seriesName={config.name}
        seriesId={item.seriesId}
        chartData={chartData}
        onInfoClick={() => setShowInfo(true)}
      />

      {showInfo && <InfoTooltip description={config.description} />}

      {hasData ? (
        <ChartContainer>
          <TimeSeriesChart
            data={chartData}
            config={config}
            hasNegativeValues={hasNegativeValues}
          />
        </ChartContainer>
      ) : (
        <NoDataMessage>차트 데이터를 표시할 수 없습니다.</NoDataMessage>
      )}
    </Card>
  );
}
