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
    order: 1,
  },
  T10Y2Y: {
    unit: '%',
    label: '금리차 (%)',
    color: '#dc2626',
    name: '장단기 금리차 (10년물 - 2년물)',
    description:
      '10년 만기 국채 금리에서 2년 만기 국채 금리를 뺀 값입니다. 일반적으로 양수(+)는 정상적인 경제 상태를 의미하고, 음수(-)로 전환되면 경기 침체의 선행 지표로 간주됩니다. 역사적으로 금리 역전 후 1-2년 내 경기 침체가 발생한 사례가 많습니다.',
    category: 'macro',
    order: 2,
  },
  VIXCLS: {
    unit: '',
    label: 'VIX 지수',
    color: '#7c3aed',
    name: 'VIX 변동성 지수',
    description:
      'CBOE 변동성 지수(VIX)는 S&P 500 지수 옵션의 내재 변동성을 측정하는 지표로, 시장의 공포 지수라고도 불립니다. VIX가 높을수록 시장의 불확실성과 투자자들의 불안감이 크다는 것을 의미합니다. 일반적으로 20 이상이면 높은 변동성, 30 이상이면 극심한 공포 상태로 해석됩니다.',
    category: 'market',
    order: 1,
  },
  SP500: {
    unit: '',
    label: 'S&P 500',
    color: '#059669',
    name: 'S&P 500 지수',
    description:
      'S&P 500은 미국 주식시장에 상장된 500개 대형 기업의 주가를 추적하는 시가총액 가중 지수입니다. 미국 경제의 건강도를 평가하는 가장 대표적인 지표로, 전 세계 투자자들이 가장 주목하는 벤치마크 지수입니다.',
    category: 'market',
    order: 2,
  },
  NASDAQCOM: {
    unit: '',
    label: 'NASDAQ',
    color: '#0891b2',
    name: 'NASDAQ 종합지수 (대형 기술주)',
    description:
      'NASDAQ 종합지수는 나스닥 거래소에 상장된 모든 주식의 시가총액 가중 지수입니다. 특히 상위 10개 종목(Apple, Microsoft, NVIDIA, Amazon, Meta, Tesla, Alphabet, Broadcom 등)이 지수의 50% 이상을 차지하며, 미국 대형 기술주의 성과를 가장 잘 나타내는 지표입니다.',
    category: 'market',
    order: 3,
  },
  CPIAUCSL: {
    unit: '',
    label: 'CPI',
    color: '#ea580c',
    name: '소비자물가지수 (CPI)',
    description:
      '미국 도시 소비자들이 구매하는 상품과 서비스의 평균 가격 변화를 측정하는 지표입니다. 인플레이션을 측정하는 가장 대표적인 지표로, 연방준비제도의 통화정책 결정에 핵심적인 영향을 미칩니다. CPI가 상승하면 물가가 오르고 있다는 것을 의미하며, 이는 금리 인상 압력으로 작용할 수 있습니다.',
    category: 'macro',
    order: 3,
  },
  CPILFESL: {
    unit: '',
    label: 'Core CPI',
    color: '#f59e0b',
    name: '근원 소비자물가지수 (Core CPI)',
    description:
      '식품과 에너지 가격을 제외한 소비자물가지수입니다. 식품과 에너지 가격은 변동성이 크기 때문에, 근원 CPI는 보다 안정적인 인플레이션 추세를 파악하는 데 유용합니다. 연방준비제도는 통화정책 결정 시 근원 CPI를 중요하게 고려합니다.',
    category: 'macro',
    order: 4,
  },
  DTWEXBGS: {
    unit: '',
    label: 'Dollar Index',
    color: '#16a34a',
    name: '미구 달러 인덱스 (DXY)',
    description:
      '미국 달러의 대외 가치를 측정하는 무역 가중 환율 지수입니다. 주요 무역 상대국 통화 대비 달러의 강세를 나타내며, 지수가 상승하면 달러 가치가 상승, 하락하면 달러 가치가 하락하는 것을 의미합니다. 글로벌 무역과 금융시장에 중요한 영향을 미칩니다.',
    category: 'macro',
    order: 5,
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
