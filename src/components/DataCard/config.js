// 시리즈별 메타데이터 설정
export const SERIES_CONFIG = {
  FEDFUNDS: {
    unit: '%',
    label: '금리 (%)',
    color: '#2563eb',
    name: 'Federal Funds Effective Rate',
  },
  T10Y2Y: {
    unit: '%',
    label: '금리차 (%)',
    color: '#dc2626',
    name: '10-Year Treasury Minus 2-Year Treasury',
  },
};

// 기본 설정
export const DEFAULT_CONFIG = {
  unit: '',
  label: 'Value',
  color: '#2563eb',
  name: 'Unknown Series',
};

/**
 * 시리즈 ID로 설정 가져오기
 */
export function getSeriesConfig(seriesId) {
  return SERIES_CONFIG[seriesId] || DEFAULT_CONFIG;
}
