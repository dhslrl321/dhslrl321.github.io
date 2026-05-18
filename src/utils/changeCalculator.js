/**
 * FRED observations 배열에서 최신값과 변화율 계산
 */

function parseObservations(observations) {
  if (!Array.isArray(observations)) return [];
  return observations
    .filter(o => o.value !== '.' && o.value != null)
    .map(o => ({ date: o.date, value: parseFloat(o.value) }))
    .filter(o => !isNaN(o.value));
}

/**
 * 일/주 단위 변화율 계산 (영업일 기준)
 *  - daily change: 가장 최근 → 직전 거래일 (5거래일 이내만 유효로 간주)
 *  - weekly change: 가장 최근 → 5거래일 전 (없으면 가능한 가장 가까운 것)
 */
export function calculateDailyWeeklyChange(observations) {
  const points = parseObservations(observations);
  if (points.length === 0) return null;

  const latest = points[points.length - 1];
  const prev = points[points.length - 2] ?? null;
  const fiveBack = points[points.length - 6] ?? points[0];

  const pct = (curr, base) => (base != null && base !== 0 ? ((curr - base) / base) * 100 : null);

  return {
    latestDate: latest.date,
    latestValue: latest.value,
    dayChangePct: prev ? pct(latest.value, prev.value) : null,
    weekChangePct: fiveBack && fiveBack !== latest ? pct(latest.value, fiveBack.value) : null,
  };
}

/**
 * 매크로 지표 변화율 (월간/분기 데이터용)
 *  - latest: 가장 최근 발표값
 *  - prev: 직전 발표값
 *  - change: 절대값 차이 (% 아님 — 단위가 % 또는 absolute)
 */
export function calculateMacroChange(observations) {
  const points = parseObservations(observations);
  if (points.length === 0) return null;

  const latest = points[points.length - 1];
  const prev = points[points.length - 2] ?? null;

  return {
    latestDate: latest.date,
    latestValue: latest.value,
    prevValue: prev?.value ?? null,
    absChange: prev ? latest.value - prev.value : null,
  };
}
