/**
 * 수집할 FRED 시리즈 설정
 *
 * jamsil 사이트의 매크로/시장 섹션에서 사용.
 * - daily: frequency null
 * - monthly: 'm' (FRED가 데이터를 monthly로만 발표하는 경우)
 */

export const SERIES_TO_FETCH = [
  // ── 매크로: 국채 금리 곡선 ──
  {
    seriesId: 'DGS2',
    seriesName: '2-Year Treasury Constant Maturity',
    observationStart: '2020-01-01',
    frequency: null,
  },
  {
    seriesId: 'DGS10',
    seriesName: '10-Year Treasury Constant Maturity',
    observationStart: '2020-01-01',
    frequency: null,
  },
  {
    seriesId: 'DGS30',
    seriesName: '30-Year Treasury Constant Maturity',
    observationStart: '2020-01-01',
    frequency: null,
  },
  {
    seriesId: 'T10Y2Y',
    seriesName: '10Y - 2Y Treasury Spread',
    observationStart: '2020-01-01',
    frequency: null,
  },

  // ── 매크로: 신용/스트레스/원자재 ──
  {
    seriesId: 'BAMLH0A0HYM2',
    seriesName: 'ICE BofA US High Yield OAS',
    observationStart: '2020-01-01',
    frequency: null,
  },
  {
    seriesId: 'KCFSI',
    seriesName: 'Kansas City Financial Stress Index',
    observationStart: '2018-01-01',
    frequency: 'm',
  },
  {
    seriesId: 'DCOILWTICO',
    seriesName: 'Crude Oil Prices: WTI',
    observationStart: '2020-01-01',
    frequency: null,
  },

  // ── 시장 지수 ──
  {
    seriesId: 'SP500',
    seriesName: 'S&P 500',
    observationStart: '2023-01-01',
    frequency: null,
  },
  {
    seriesId: 'VIXCLS',
    seriesName: 'CBOE Volatility Index',
    observationStart: '2023-01-01',
    frequency: null,
  },
];
