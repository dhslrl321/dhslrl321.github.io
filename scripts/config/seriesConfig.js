/**
 * 수집할 시리즈 설정
 */

export const SERIES_TO_FETCH = [
  {
    seriesId: 'FEDFUNDS',
    seriesName: 'Federal Funds Effective Rate',
    observationStart: '2015-06-01',
    frequency: null,
  },
  {
    seriesId: 'T10Y2Y',
    seriesName: '10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant Maturity',
    observationStart: '2015-06-01',
    frequency: 'm', // monthly
  },
  {
    seriesId: 'VIXCLS',
    seriesName: 'CBOE Volatility Index: VIX',
    observationStart: '2015-06-01',
    frequency: 'm', // monthly
  },
  {
    seriesId: 'SP500',
    seriesName: 'S&P 500',
    observationStart: '2015-06-01',
    frequency: 'm', // monthly
  },
];
