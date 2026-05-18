/**
 * 수집할 FRED 시리즈 설정
 *
 * - 지수(daily): frequency null → 영업일 기준 일별 데이터
 * - 매크로(monthly): 월간 발표
 */

export const SERIES_TO_FETCH = [
  // ── 매크로 지표 (월간 발표) ──
  {
    seriesId: 'FEDFUNDS',
    seriesName: 'Federal Funds Effective Rate',
    observationStart: '2015-06-01',
    frequency: null,
  },
  {
    seriesId: 'T10Y2Y',
    seriesName: '10Y - 2Y Treasury Spread',
    observationStart: '2015-06-01',
    frequency: 'm',
  },
  {
    seriesId: 'CPIAUCSL',
    seriesName: 'CPI All Items',
    observationStart: '2015-06-01',
    frequency: 'm',
  },
  {
    seriesId: 'CPILFESL',
    seriesName: 'Core CPI',
    observationStart: '2015-06-01',
    frequency: 'm',
  },
  {
    seriesId: 'PAYEMS',
    seriesName: 'Total Nonfarm Payrolls',
    observationStart: '2015-06-01',
    frequency: 'm',
  },
  {
    seriesId: 'UNRATE',
    seriesName: 'Unemployment Rate',
    observationStart: '2015-06-01',
    frequency: 'm',
  },

  // ── 시장 지수 (영업일별) ──
  {
    seriesId: 'SP500',
    seriesName: 'S&P 500',
    observationStart: '2023-01-01',
    frequency: null,
  },
  {
    seriesId: 'NASDAQCOM',
    seriesName: 'NASDAQ Composite',
    observationStart: '2023-01-01',
    frequency: null,
  },
  {
    seriesId: 'DJIA',
    seriesName: 'Dow Jones Industrial Average',
    observationStart: '2023-01-01',
    frequency: null,
  },
  {
    seriesId: 'VIXCLS',
    seriesName: 'CBOE Volatility Index',
    observationStart: '2023-01-01',
    frequency: null,
  },
  {
    seriesId: 'DGS10',
    seriesName: '10-Year Treasury Yield',
    observationStart: '2023-01-01',
    frequency: null,
  },
  {
    seriesId: 'DTWEXBGS',
    seriesName: 'Dollar Index (DXY proxy)',
    observationStart: '2023-01-01',
    frequency: null,
  },
];
