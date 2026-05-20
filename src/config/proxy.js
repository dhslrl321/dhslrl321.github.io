/**
 * CORS 프록시 설정
 *
 * Cloudflare Worker URL 을 아래에 넣으면 최우선으로 사용.
 * 형식: 대상 URL 을 ?url= 쿼리로 받는 Worker
 *   예) https://jamsil-proxy.<account>.workers.dev
 *
 * 비워두면 공개 프록시(불안정)로 폴백한다.
 */
export const CLOUDFLARE_WORKER_URL = 'https://jamsil-proxy.dhslrl321.workers.dev/';
