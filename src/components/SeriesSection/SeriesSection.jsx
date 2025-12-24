import { useState } from 'react';
import { Card, ChartContainer, NoDataMessage } from './SeriesSection.styles.js';
import CardMetaInfo from './CardMetaInfo';
import TimeSeriesChart from './TimeSeriesChart/TimeSeriesChart.jsx';
import InfoTooltip from './InfoTooltip/InfoTooltip.jsx';
import { transformObservationsToChartData, calculateDataStats } from '../../utils/chartDataUtils';
import { getSeriesConfig } from '../../config/seriesConfig';

export default function SeriesSection({ item }) {
  const [showInfo, setShowInfo] = useState(false);
  const [timeRange, setTimeRange] = useState('all'); // 'all', '1y', '5y', '10y'
  
  const config = getSeriesConfig(item.seriesId);
  const allChartData = transformObservationsToChartData(item.payload?.observations);
  
  // 기간에 따라 데이터 필터링
  const getFilteredData = () => {
    if (timeRange === 'all') return allChartData;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeRange) {
      case '1y':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      case '5y':
        cutoffDate.setFullYear(now.getFullYear() - 5);
        break;
      case '10y':
        cutoffDate.setFullYear(now.getFullYear() - 10);
        break;
      default:
        return allChartData;
    }
    
    return allChartData.filter(item => new Date(item.date) >= cutoffDate);
  };
  
  const chartData = getFilteredData();
  const { hasNegativeValues } = calculateDataStats(chartData);
  const hasData = chartData.length > 0;

  return (
    <Card>
      <CardMetaInfo
        seriesName={config.name}
        seriesId={item.seriesId}
        chartData={chartData}
        onInfoClick={() => setShowInfo(true)}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      {showInfo && <InfoTooltip description={config.description} onClose={() => setShowInfo(false)} />}

      {hasData ? (
        <ChartContainer>
          <TimeSeriesChart
            data={chartData}
            config={config}
            hasNegativeValues={hasNegativeValues}
            seriesId={item.seriesId}
          />
        </ChartContainer>
      ) : (
        <NoDataMessage>차트 데이터를 표시할 수 없습니다.</NoDataMessage>
      )}
    </Card>
  );
}
