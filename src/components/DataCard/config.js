// 시리즈별 메타데이터 설정
export const SERIES_CONFIG = {
  FEDFUNDS: {
    unit: '%',
    label: '금리 (%)',
    color: '#2563eb',
    name: '기준금리(FED)',
    description:
      '미국 중앙은행이 정하는 기준 금리로, 현재 통화정책 방향을 보여줍니다. 금리가 높으면 긴축, 낮으면 완화로 주식·대출·예금 전반에 영향을 줍니다.',
  },
  T10Y2Y: {
    unit: '%',
    label: '금리차 (%)',
    color: '#dc2626',
    name: '장단기 금리차 (10년물 - 2년물)',
    description:
      '10년 국채 금리와 2년 국채 금리의 차이로, 미래 경기 전망을 미리 보여주는 지표입니다. 양수면 정상, 음수(금리 역전)면 경기 침체 가능성이 높아졌다는 신호로 봅니다.',
  },
};

// 기본 설정
export const DEFAULT_CONFIG = {
  unit: '',
  label: 'Value',
  color: '#2563eb',
  name: 'Unknown Series',
  description: '이 지표에 대한 설명이 없습니다.',
};

/**
 * 시리즈 ID로 설정 가져오기
 */
export function getSeriesConfig(seriesId) {
  return SERIES_CONFIG[seriesId] || DEFAULT_CONFIG;
}
