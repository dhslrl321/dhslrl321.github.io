/**
 * 경제 지표 시리즈 설정
 */

export const SERIES_CONFIG = {
  FEDFUNDS: {
    unit: '%',
    label: '금리 (%)',
    color: '#2563eb',
    name: '연방기금금리',
    description:
      '미국 연방준비제도(Fed)가 설정하는 단기 금리로, 은행 간 초단기 대출에 적용됩니다. 이 금리는 미국 경제의 통화정책을 나타내는 핵심 지표이며, 금리가 높을수록 긴축 정책, 낮을수록 완화 정책을 의미합니다.',
    category: 'macro',
  },
  T10Y2Y: {
    unit: '%',
    label: '금리차 (%)',
    color: '#dc2626',
    name: '장단기 금리차 (10년물 - 2년물)',
    description:
      '10년 만기 국채 금리에서 2년 만기 국채 금리를 뺀 값입니다. 일반적으로 양수(+)는 정상적인 경제 상태를 의미하고, 음수(-)로 전환되면 경기 침체의 선행 지표로 간주됩니다. 역사적으로 금리 역전 후 1-2년 내 경기 침체가 발생한 사례가 많습니다.',
    category: 'macro',
  },
  VIXCLS: {
    unit: '',
    label: 'VIX 지수',
    color: '#7c3aed',
    name: 'VIX 변동성 지수',
    description:
      'CBOE 변동성 지수(VIX)는 S&P 500 지수 옵션의 내재 변동성을 측정하는 지표로, 시장의 공포 지수라고도 불립니다. VIX가 높을수록 시장의 불확실성과 투자자들의 불안감이 크다는 것을 의미합니다. 일반적으로 20 이상이면 높은 변동성, 30 이상이면 극심한 공포 상태로 해석됩니다.',
    category: 'market',
  },
  SP500: {
    unit: '',
    label: 'S&P 500',
    color: '#059669',
    name: 'S&P 500 지수',
    description:
      'S&P 500은 미국 주식시장에 상장된 500개 대형 기업의 주가를 추적하는 시가총액 가중 지수입니다. 미구 경제의 건강도를 평가하는 가장 대표적인 지표로, 전 세계 투자자들이 가장 주목하는 벤치마크 지수입니다.',
    category: 'market',
  },
};

const DEFAULT_CONFIG = {
  unit: '',
  label: 'Value',
  color: '#2563eb',
  name: 'Unknown Series',
  description: '이 지표에 대한 설명이 없습니다.',
  category: 'other',
};

/**
 * 시리즈 ID로 설정 가져오기
 */
export function getSeriesConfig(seriesId) {
  return SERIES_CONFIG[seriesId] || DEFAULT_CONFIG;
}

/**
 * 카테고리별 데이터 필터링
 */
export function filterDataByCategory(data, category) {
  if (!data || !category) return data;

  return Object.fromEntries(
    Object.entries(data).filter(([seriesId]) => {
      const config = getSeriesConfig(seriesId);
      return config.category === category;
    })
  );
}
