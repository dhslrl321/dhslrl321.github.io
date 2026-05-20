/**
 * 정렬된 시계열({date, value}[])로부터 최신값/변화율 계산
 */

/**
 * 일/주 단위 변화율 (영업일 기준)
 *  - dayChangePct: 가장 최근 → 직전 거래일
 *  - weekChangePct: 가장 최근 → 5거래일 전 (없으면 가장 오래된 값)
 */
export function calcDailyWeekly(series) {
  if (!series || series.length === 0) return null;

  const latest = series[series.length - 1];
  const prev = series[series.length - 2] ?? null;
  const fiveBack = series.length >= 6 ? series[series.length - 6] : series[0];

  const pct = (curr, base) => (base != null && base !== 0 ? ((curr - base) / base) * 100 : null);

  return {
    latestDate: latest.date,
    latestValue: latest.value,
    dayChangePct: prev ? pct(latest.value, prev.value) : null,
    weekChangePct: fiveBack && fiveBack !== latest ? pct(latest.value, fiveBack.value) : null,
  };
}

/**
 * 매크로 지표 변화 (직전 발표 대비 절대값 차이)
 */
export function calcMacro(series) {
  if (!series || series.length === 0) return null;

  const latest = series[series.length - 1];
  const prev = series[series.length - 2] ?? null;

  return {
    latestDate: latest.date,
    latestValue: latest.value,
    prevValue: prev?.value ?? null,
    absChange: prev ? latest.value - prev.value : null,
  };
}
