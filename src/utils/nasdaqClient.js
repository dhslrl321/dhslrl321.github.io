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

// "5,473,270,924,976" / "$225.125" → number
function parseNum(raw) {
  if (raw == null) return null;
  const n = parseFloat(String(raw).replace(/[$,%\s]/g, ''));
  return isNaN(n) ? null : n;
}

/**
 * 시가총액·현재가·추정 발행주식수를 가져온다.
 *  - 발행주식수 = 시가총액 / 현재가 (nasdaq 미제공이라 추정)
 * @param {string} symbol
 * @returns {Promise<{marketCap:number|null, price:number|null, sharesOutstanding:number|null}>}
 */
export async function fetchQuoteStats(symbol) {
  const sym = symbol.trim().toUpperCase();
  const summaryUrl = `${BASE}/${encodeURIComponent(sym)}/summary?assetClass=stocks`;
  const infoUrl = `${BASE}/${encodeURIComponent(sym)}/info?assetClass=stocks`;

  const [summary, info] = await Promise.all([
    cachedFetch(`nasdaq:sum:${sym}`, () => proxyFetchJson(summaryUrl)),
    cachedFetch(`nasdaq:info:${sym}`, () => proxyFetchJson(infoUrl)),
  ]);

  const marketCap = parseNum(summary?.data?.summaryData?.MarketCap?.value);
  const price = parseNum(info?.data?.primaryData?.lastSalePrice);
  const sharesOutstanding = marketCap && price ? marketCap / price : null;

  return { marketCap, price, sharesOutstanding };
}
