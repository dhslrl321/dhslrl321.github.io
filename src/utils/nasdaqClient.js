/**
 * Nasdaq 공매도(short interest) API 클라이언트 (CORS 프록시 경유, 1시간 캐시)
 */
import { cachedFetch, proxyFetchJson } from './dataCache';

const BASE = 'https://api.nasdaq.com/api/quote';

/**
 * 종목의 최근 공매도 현황을 가져온다.
 * @param {string} symbol - 예: 'NVDA'
 * @returns {Promise<{headers:object, rows:object[]}>}
 *   rows: { settlementDate, interest, avgDailyShareVolume, daysToCover }
 */
export async function fetchShortInterest(symbol) {
  const sym = symbol.trim().toUpperCase();
  const target = `${BASE}/${encodeURIComponent(sym)}/short-interest?assetClass=stocks`;
  const json = await cachedFetch(`nasdaq:si:${sym}`, () => proxyFetchJson(target));

  const table = json?.data?.shortInterestTable;
  if (!table?.rows?.length) {
    const msg =
      json?.message ||
      json?.status?.bCodeMessage?.[0]?.errorMessage ||
      'Nasdaq 상장 종목만 공매도 데이터를 지원합니다';
    throw new Error(msg);
  }
  return { headers: table.headers, rows: table.rows };
}
