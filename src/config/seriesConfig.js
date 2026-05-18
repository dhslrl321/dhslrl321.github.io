/**
 * jamsil 사이트 콘텐츠 설정
 *
 * - macro: 매크로 지표 (FRED 월간/분기 발표)
 * - indices: 지수 (FRED daily, 전일/전주 % 표시)
 * - etfs: 대표 ETF (FRED 미수집, TradingView 링크만)
 */

const fredUrl = id => `https://fred.stlouisfed.org/series/${id}`;
const tvUrl = sym => `https://www.tradingview.com/symbols/${sym}/`;

export const MACRO_INDICATORS = [
  {
    seriesId: 'FEDFUNDS',
    name: '연방기금금리',
    unit: '%',
    decimals: 2,
    description:
      'Fed가 설정하는 단기 정책금리. 통화정책의 방향(긴축/완화)을 가장 직접적으로 보여주는 지표.',
    link: fredUrl('FEDFUNDS'),
  },
  {
    seriesId: 'T10Y2Y',
    name: '장단기 금리차 (10Y - 2Y)',
    unit: '%p',
    decimals: 2,
    description:
      '10년물에서 2년물 금리를 뺀 값. 음수 전환(역전)은 역사적으로 1~2년 내 경기 침체의 선행 지표로 작동.',
    link: fredUrl('T10Y2Y'),
  },
  {
    seriesId: 'CPIAUCSL',
    name: '소비자물가지수 (CPI)',
    unit: '',
    decimals: 2,
    description:
      '미국 도시 소비자가 구매하는 상품·서비스의 평균 가격 변화. 인플레이션 측정의 대표 지표.',
    link: fredUrl('CPIAUCSL'),
  },
  {
    seriesId: 'CPILFESL',
    name: '근원 CPI (Core CPI)',
    unit: '',
    decimals: 2,
    description:
      '식품·에너지를 제외한 CPI. 변동성이 큰 항목을 빼서 안정적인 인플레이션 추세를 보여줌. Fed가 중요시함.',
    link: fredUrl('CPILFESL'),
  },
  {
    seriesId: 'PAYEMS',
    name: '비농업 고용자수 (NFP)',
    unit: '천명',
    decimals: 0,
    description:
      '미국 비농업 부문의 총 고용자 수. 매월 첫째 금요일 발표. 노동시장의 건강도를 측정.',
    link: fredUrl('PAYEMS'),
  },
  {
    seriesId: 'UNRATE',
    name: '실업률',
    unit: '%',
    decimals: 1,
    description: '경제활동인구 중 실업자 비율. 4% 이하면 완전고용 상태로 간주. 급상승은 침체 신호.',
    link: fredUrl('UNRATE'),
  },
];

export const MARKET_INDICES = [
  {
    seriesId: 'SP500',
    name: 'S&P 500',
    unit: '',
    decimals: 2,
    link: tvUrl('SP-SPX'),
  },
  {
    seriesId: 'NASDAQCOM',
    name: 'NASDAQ Composite',
    unit: '',
    decimals: 2,
    link: tvUrl('NASDAQ-IXIC'),
  },
  {
    seriesId: 'DJIA',
    name: 'Dow Jones',
    unit: '',
    decimals: 2,
    link: tvUrl('DJ-DJI'),
  },
  {
    seriesId: 'VIXCLS',
    name: 'VIX 변동성지수',
    unit: '',
    decimals: 2,
    link: tvUrl('TVC-VIX'),
  },
  {
    seriesId: 'DGS10',
    name: '10Y 국채 금리',
    unit: '%',
    decimals: 2,
    link: tvUrl('TVC-TNX'),
  },
  {
    seriesId: 'DTWEXBGS',
    name: '달러 인덱스 (DXY)',
    unit: '',
    decimals: 2,
    link: tvUrl('TVC-DXY'),
  },
];

export const MARKET_ETFS = [
  { ticker: 'SPY', name: 'S&P 500 ETF', link: tvUrl('AMEX-SPY') },
  { ticker: 'QQQ', name: 'NASDAQ-100 ETF', link: tvUrl('NASDAQ-QQQ') },
  { ticker: 'DIA', name: 'Dow ETF', link: tvUrl('AMEX-DIA') },
  { ticker: 'IWM', name: 'Russell 2000 ETF (중소형주)', link: tvUrl('AMEX-IWM') },
  { ticker: 'TLT', name: '20+년 장기 국채 ETF', link: tvUrl('NASDAQ-TLT') },
  { ticker: 'HYG', name: '하이일드 회사채 ETF', link: tvUrl('AMEX-HYG') },
  { ticker: 'GLD', name: '금 ETF', link: tvUrl('AMEX-GLD') },
  { ticker: 'USO', name: '원유 ETF (WTI)', link: tvUrl('AMEX-USO') },
  { ticker: 'XLK', name: '기술주 섹터 ETF', link: tvUrl('AMEX-XLK') },
  { ticker: 'XLF', name: '금융주 섹터 ETF', link: tvUrl('AMEX-XLF') },
  { ticker: 'XLE', name: '에너지 섹터 ETF', link: tvUrl('AMEX-XLE') },
  { ticker: 'SOXX', name: '반도체 ETF', link: tvUrl('NASDAQ-SOXX') },
];
