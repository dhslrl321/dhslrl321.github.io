/**
 * jamsil 사이트 콘텐츠 설정
 */

const fredUrl = id => `https://fred.stlouisfed.org/series/${id}`;
const tvUrl = sym => `https://www.tradingview.com/symbols/${sym}/`;

// ─────────────────────────────────────────────
// 매크로 지표 (FRED)
// ─────────────────────────────────────────────
export const MACRO_INDICATORS = [
  {
    seriesId: 'DGS2',
    name: '2년 국채 금리',
    unit: '%',
    decimals: 2,
    description: '2년 만기 미국 국채 수익률. 단기 금리 정책 기대를 반영.',
    link: fredUrl('DGS2'),
  },
  {
    seriesId: 'DGS10',
    name: '10년 국채 금리',
    unit: '%',
    decimals: 2,
    description: '10년 만기 미국 국채 수익률. 장기 성장·물가 기대의 대표 지표.',
    link: fredUrl('DGS10'),
  },
  {
    seriesId: 'DGS30',
    name: '30년 국채 금리',
    unit: '%',
    decimals: 2,
    description: '30년 만기 미국 국채 수익률. 초장기 금리 추세를 보여줌.',
    link: fredUrl('DGS30'),
  },
  {
    seriesId: 'T10Y2Y',
    name: '장단기 금리차 (10Y - 2Y)',
    unit: '%p',
    decimals: 2,
    description: '10년물 - 2년물. 마이너스(역전)는 경기침체 선행 신호로 작동해왔음.',
    link: fredUrl('T10Y2Y'),
  },
  {
    seriesId: 'BAMLH0A0HYM2',
    name: 'High Yield 스프레드',
    unit: '%',
    decimals: 2,
    description: 'ICE BofA US High Yield 채권의 옵션조정 스프레드. 신용 위험·시장 스트레스의 핵심 지표.',
    link: fredUrl('BAMLH0A0HYM2'),
  },
  {
    seriesId: 'KCFSI',
    name: 'KCFSI (캔자스시티 금융스트레스)',
    unit: '',
    decimals: 2,
    description: '캔자스시티 연은의 금융시장 스트레스 지수. 0 이상이면 평균 이상의 스트레스.',
    link: fredUrl('KCFSI'),
  },
  {
    seriesId: 'DCOILWTICO',
    name: 'WTI 원유 가격',
    unit: '$',
    decimals: 2,
    description: 'WTI 원유 현물 가격(달러/배럴). 글로벌 인플레와 수요 동향의 선행 지표.',
    link: fredUrl('DCOILWTICO'),
  },
];

// 매크로 비교 차트 (한 번에 다 보기)
export const MACRO_COMPARE_URL = `https://fred.stlouisfed.org/graph/?id=${MACRO_INDICATORS.map(m => m.seriesId).join(',')}`;

// ─────────────────────────────────────────────
// 시장 (지수 + ETF + 외부 지표)
// FRED 데이터 있으면 전일/전주 % 표시, 없으면 링크만
// ─────────────────────────────────────────────
export const MARKET_ITEMS = [
  {
    id: 'FEAR_GREED',
    name: '공포 & 탐욕 지수',
    note: 'CNN',
    link: 'https://www.cnn.com/markets/fear-and-greed',
    fredSeriesId: null,
  },
  {
    id: 'VIX',
    name: 'VIX 변동성지수',
    note: 'VIXCLS',
    link: tvUrl('TVC-VIX'),
    fredSeriesId: 'VIXCLS',
  },
  {
    id: 'SP500',
    name: 'S&P 500',
    note: 'SP500',
    link: tvUrl('SP-SPX'),
    fredSeriesId: 'SP500',
  },
  {
    id: 'QQQ',
    name: 'QQQ (NASDAQ-100 ETF)',
    note: 'NASDAQ-100',
    link: tvUrl('NASDAQ-QQQ'),
    fredSeriesId: null,
  },
  {
    id: 'XLP',
    name: 'XLP (필수소비재 ETF)',
    note: 'Consumer Staples',
    link: tvUrl('AMEX-XLP'),
    fredSeriesId: null,
  },
  {
    id: 'XLY',
    name: 'XLY (임의소비재 ETF)',
    note: 'Consumer Discretionary',
    link: tvUrl('AMEX-XLY'),
    fredSeriesId: null,
  },
  {
    id: 'RSHB',
    name: 'RSHB',
    note: 'ETF',
    link: tvUrl('RSHB'),
    fredSeriesId: null,
  },
  {
    id: 'RSLV',
    name: 'RSLV',
    note: 'ETF',
    link: tvUrl('RSLV'),
    fredSeriesId: null,
  },
];
