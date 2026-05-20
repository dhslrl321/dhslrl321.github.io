/**
 * jamsil 사이트 콘텐츠 설정
 */

const fredUrl = id => `https://fred.stlouisfed.org/series/${id}`;
const tvUrl = sym => `https://www.tradingview.com/symbols/${sym}/`;

// ─────────────────────────────────────────────
// 매크로 지표
//  - source 'yahoo': 장중 실시간 (15분 지연), 국채 금리
//  - source 'fred' : 일/월 단위 발표
//  - fredId: FRED 비교차트 및 카드 링크용 (yahoo 항목도 대응 FRED 시리즈 보유)
// ─────────────────────────────────────────────
export const MACRO_INDICATORS = [
  {
    key: 'FEDFUNDS',
    name: '기준금리 (FFR)',
    note: 'FEDFUNDS',
    unit: '%',
    decimals: 2,
    source: 'fred',
    fredId: 'FEDFUNDS',
    description: 'Fed 가 설정하는 정책금리. 통화정책 방향(긴축/완화)을 직접 보여줌.',
    link: fredUrl('FEDFUNDS'),
  },
  {
    key: 'DGS5',
    name: '5년 국채 금리',
    note: '^FVX',
    unit: '%',
    decimals: 2,
    source: 'yahoo',
    yahooSymbol: '^FVX',
    fredId: 'DGS5',
    description: '5년 만기 미국 국채 수익률. 중기 금리 기대를 반영. (실시간, 15분 지연)',
    link: fredUrl('DGS5'),
  },
  {
    key: 'DGS10',
    name: '10년 국채 금리',
    note: '^TNX',
    unit: '%',
    decimals: 2,
    source: 'yahoo',
    yahooSymbol: '^TNX',
    fredId: 'DGS10',
    description: '10년 만기 미국 국채 수익률. 장기 성장·물가 기대의 대표 지표. (실시간, 15분 지연)',
    link: fredUrl('DGS10'),
  },
  {
    key: 'DGS30',
    name: '30년 국채 금리',
    note: '^TYX',
    unit: '%',
    decimals: 2,
    source: 'yahoo',
    yahooSymbol: '^TYX',
    fredId: 'DGS30',
    description: '30년 만기 미국 국채 수익률. 초장기 금리 추세. (실시간, 15분 지연)',
    link: fredUrl('DGS30'),
  },
  {
    key: 'T10Y2Y',
    name: '장단기 금리차 (10Y - 2Y)',
    note: 'T10Y2Y',
    unit: '%p',
    decimals: 2,
    source: 'fred',
    fredId: 'T10Y2Y',
    description: '10년물 - 2년물. 마이너스(역전)는 경기침체 선행 신호로 작동해왔음.',
    link: fredUrl('T10Y2Y'),
  },
  {
    key: 'BAMLH0A0HYM2',
    name: 'High Yield 스프레드',
    note: 'BAMLH0A0HYM2',
    unit: '%',
    decimals: 2,
    source: 'fred',
    fredId: 'BAMLH0A0HYM2',
    description:
      'ICE BofA US High Yield 채권의 옵션조정 스프레드. 신용 위험·시장 스트레스의 핵심 지표.',
    link: fredUrl('BAMLH0A0HYM2'),
  },
  {
    key: 'KCFSI',
    name: 'KCFSI (캔자스시티 금융스트레스)',
    note: 'KCFSI',
    unit: '',
    decimals: 2,
    source: 'fred',
    fredId: 'KCFSI',
    description: '캔자스시티 연은의 금융시장 스트레스 지수. 0 이상이면 평균 이상의 스트레스.',
    link: fredUrl('KCFSI'),
  },
  {
    key: 'DCOILWTICO',
    name: 'WTI 원유 가격',
    note: 'DCOILWTICO',
    unit: '$',
    decimals: 2,
    source: 'fred',
    fredId: 'DCOILWTICO',
    description: 'WTI 원유 현물 가격(달러/배럴). 글로벌 인플레와 수요 동향의 선행 지표.',
    link: fredUrl('DCOILWTICO'),
  },
  {
    key: 'USDKRW',
    name: '원/달러 환율',
    note: 'USDKRW=X',
    unit: '원',
    decimals: 2,
    source: 'yahoo',
    yahooSymbol: 'USDKRW=X',
    fredId: 'DEXKOUS',
    description: '1달러당 원화 가치. 상승은 원화 약세(달러 강세)를 의미. (실시간, 15분 지연)',
    link: fredUrl('DEXKOUS'),
  },
];

// 화면의 달러 금액을 원화로 환산할 때 쓰는 환율 심볼
export const FX_USDKRW_SYMBOL = 'USDKRW=X';

// 매크로 비교 차트 (FRED 시리즈 기준으로 한 번에 보기)
export const MACRO_COMPARE_URL = `https://fred.stlouisfed.org/graph/?id=${MACRO_INDICATORS.map(m => m.fredId).join(',')}`;

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
    yahooSymbol: null,
  },
  {
    id: 'VIX',
    name: 'VIX 변동성지수',
    note: '^VIX',
    link: tvUrl('TVC-VIX'),
    yahooSymbol: '^VIX',
  },
  {
    id: 'SP500',
    name: 'S&P 500',
    note: '^GSPC',
    link: tvUrl('SP-SPX'),
    yahooSymbol: '^GSPC',
  },
  {
    id: 'QQQ',
    name: 'QQQ (NASDAQ-100 ETF)',
    note: 'QQQ',
    link: tvUrl('NASDAQ-QQQ'),
    yahooSymbol: 'QQQ',
  },
  {
    id: 'XLP',
    name: 'XLP (필수소비재 ETF)',
    note: 'XLP',
    link: tvUrl('AMEX-XLP'),
    yahooSymbol: 'XLP',
  },
  {
    id: 'XLY',
    name: 'XLY (임의소비재 ETF)',
    note: 'XLY',
    link: tvUrl('AMEX-XLY'),
    yahooSymbol: 'XLY',
  },
  {
    id: 'RSHB',
    name: 'RSHB',
    note: 'RSHB',
    link: tvUrl('RSHB'),
    yahooSymbol: 'RSHB',
  },
  {
    id: 'RSLV',
    name: 'RSLV',
    note: 'RSLV',
    link: tvUrl('RSLV'),
    yahooSymbol: 'RSLV',
  },
];
