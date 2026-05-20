/**
 * Yahoo Finance chart API 클라이언트 (CORS 프록시 경유, 1시간 캐시)
 */
import { cachedFetch, proxyFetchJson } from './dataCache';

const BASE = 'https://query1.finance.yahoo.com/v8/finance/chart';

/**
 * 일별 시계열을 가져온다.
 * @param {string} symbol - Yahoo 심볼 (예: 'SPY', '^VIX', 'CL=F')
 * @param {object} [opts]
 * @param {string} [opts.range='1y'] - period1/period2가 없을 때 사용 ('5d','1mo','1y','5y','max')
 * @param {number} [opts.period1] - 시작 unix초
 * @param {number} [opts.period2] - 종료 unix초
 * @returns {Promise<{date:string, value:number}[]>}
 */
export async function fetchDailySeries(symbol, opts = {}) {
  const params = new URLSearchParams({ interval: '1d', events: 'div,splits' });
  if (opts.period1 != null && opts.period2 != null) {
    params.set('period1', String(opts.period1));
    params.set('period2', String(opts.period2));
  } else {
    params.set('range', opts.range ?? '1y');
  }

  const targetUrl = `${BASE}/${encodeURIComponent(symbol)}?${params.toString()}`;
  const cacheKey = `yahoo:${symbol}:${params.toString()}`;

  const json = await cachedFetch(cacheKey, () => proxyFetchJson(targetUrl));

  const result = json?.chart?.result?.[0];
  if (!result) {
    const msg = json?.chart?.error?.description || '데이터 없음';
    throw new Error(`${symbol}: ${msg}`);
  }

  const timestamps = result.timestamp || [];
  const adjclose = result.indicators?.adjclose?.[0]?.adjclose;
  const close = result.indicators?.quote?.[0]?.close;
  const values = adjclose || close || [];

  const series = [];
  for (let i = 0; i < timestamps.length; i++) {
    const v = values[i];
    if (v == null || isNaN(v)) continue;
    series.push({
      date: new Date(timestamps[i] * 1000).toISOString().slice(0, 10),
      value: v,
    });
  }
  return series;
}
