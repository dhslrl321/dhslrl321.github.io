/**
 * FRED API 관측 데이터를 차트 데이터로 변환
 * @param {Array} observations - FRED API의 observations 배열
 * @returns {Array} 차트에 사용할 데이터 배열
 */
export function transformObservationsToChartData(observations) {
  if (!observations || !Array.isArray(observations)) {
    return [];
  }

  return observations
    .filter((obs) => obs.value !== '.') // 유효하지 않은 값 제거
    .map((obs) => ({
      date: obs.date,
      value: parseFloat(obs.value),
    }));
}

/**
 * 차트 데이터의 통계 계산
 * @param {Array} chartData - 변환된 차트 데이터
 * @returns {Object} 최소값, 최대값, 음수 포함 여부
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

  return {
    minValue,
    maxValue,
    hasNegativeValues: minValue < 0,
  };
}
