/**
 * 1시간 TTL 캐시 + CORS 프록시 fetch
 *
 * - 메모리 캐시: SPA 내 이동 시 즉시 반환
 * - localStorage 캐시: 새로고침 후에도 1시간 내면 재요청 안 함
 */

import { CLOUDFLARE_WORKER_URL } from '../config/proxy';

const TTL_MS = 60 * 60 * 1000; // 1시간
const KEY_PREFIX = 'jamsil:cache:';

const memoryCache = new Map();

function readPersistent(key) {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (Date.now() - entry.ts > TTL_MS) {
      localStorage.removeItem(KEY_PREFIX + key);
      return null;
    }
    return entry.value;
  } catch {
    return null;
  }
}

function writePersistent(key, value) {
  try {
    localStorage.setItem(KEY_PREFIX + key, JSON.stringify({ ts: Date.now(), value }));
  } catch {
    // 용량 초과 등은 무시 (메모리 캐시로 동작)
  }
}

/**
 * 캐시된 값을 반환하거나, 없으면 loader()를 실행해 캐시에 저장 후 반환
 * @param {string} key - 캐시 키
 * @param {() => Promise<any>} loader - 캐시 미스 시 데이터를 가져오는 함수
 */
export async function cachedFetch(key, loader) {
  const mem = memoryCache.get(key);
  if (mem && Date.now() - mem.ts <= TTL_MS) return mem.value;

  const persisted = readPersistent(key);
  if (persisted != null) {
    memoryCache.set(key, { ts: Date.now(), value: persisted });
    return persisted;
  }

  const value = await loader();
  memoryCache.set(key, { ts: Date.now(), value });
  writePersistent(key, value);
  return value;
}

// CORS 프록시 목록 (앞에서부터 시도, 실패 시 다음으로 폴백)
// Cloudflare Worker 가 설정돼 있으면 최우선.
const PROXIES = [
  ...(CLOUDFLARE_WORKER_URL
    ? [url => `${CLOUDFLARE_WORKER_URL}?url=${encodeURIComponent(url)}`]
    : []),
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`,
];

/**
 * CORS 프록시를 경유해 JSON을 가져온다. 프록시들을 순서대로 시도.
 * @param {string} targetUrl - 실제 대상 URL
 */
export async function proxyFetchJson(targetUrl) {
  let lastError = null;
  for (const wrap of PROXIES) {
    try {
      const res = await fetch(wrap(targetUrl));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw new Error(`모든 프록시 요청 실패: ${lastError?.message ?? 'unknown'}`);
}
