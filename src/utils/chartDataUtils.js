/**
 * 차트 데이터 변환 유틸리티
 */

/**
 * FRED API observations를 차트 데이터로 변환
 * @param {Array} observations - FRED API의 observations 배열
 * @returns {Array} 차트용 데이터 배열 [{date, value}, ...]
 */
export function transformObservationsToChartData(observations) {
  if (!observations || !Array.isArray(observations)) {
    return [];
  }

  return observations
    .filter((obs) => obs.value !== '.')
    .map((obs) => ({
      date: obs.date,
      value: parseFloat(obs.value),
    }));
}

/**
 * 차트 데이터의 통계 계산
 * @param {Array} chartData - 차트 데이터 배열
 * @returns {Object} {minValue, maxValue, hasNegativeValues}
 */
export function calculateDataStats(chartData) {
  if (!chartData || chartData.length === 0) {
    return {
      minValue: 0,
      maxValue: 0,
      hasNegativeValues: false,
    };
  }

  const values = chartData.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const hasNegativeValues = minValue < 0;

  return {
    minValue,
    maxValue,
    hasNegativeValues,
  };
}
