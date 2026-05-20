/**
 * FRED API 클라이언트 (CORS 프록시 경유, 1시간 캐시)
 */
import { cachedFetch, proxyFetchJson } from './dataCache';

const BASE = 'https://api.stlouisfed.org/fred/series/observations';
// 무료 공개 키 (rate limit만 적용)
const API_KEY = '089008ad0f401bb844a1e4adf24ad2bb';

/**
 * FRED 시리즈 관측치를 가져온다.
 * @param {string} seriesId - 예: 'DGS10'
 * @param {string} [observationStart='2018-01-01']
 * @returns {Promise<{date:string, value:number}[]>}
 */
export async function fetchFredSeries(seriesId, observationStart = '2018-01-01') {
  const params = new URLSearchParams({
    series_id: seriesId,
    api_key: API_KEY,
    file_type: 'json',
    observation_start: observationStart,
    sort_order: 'asc',
  });

  const targetUrl = `${BASE}?${params.toString()}`;
  const cacheKey = `fred:${seriesId}:${observationStart}`;

  const json = await cachedFetch(cacheKey, () => proxyFetchJson(targetUrl));

  const observations = json?.observations || [];
  return observations
    .filter(o => o.value !== '.' && o.value != null)
    .map(o => ({ date: o.date, value: parseFloat(o.value) }))
    .filter(o => !isNaN(o.value));
}
