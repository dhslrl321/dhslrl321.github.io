/**
 * 최대 낙폭(Maximum Drawdown) 계산
 */

/**
 * 가격 시계열로부터 낙폭(underwater) 곡선과 MDD를 계산.
 * @param {{date:string, value:number}[]} series - 오름차순 정렬된 가격 시계열
 * @returns {{
 *   underwater: {date:string, value:number, drawdown:number}[],
 *   mddPct: number,         // 최대 낙폭 (음수 %, 예: -33.7)
 *   peakDate: string|null,  // MDD 직전 고점 날짜
 *   troughDate: string|null,// MDD 저점 날짜
 *   peakValue: number|null,
 *   troughValue: number|null
 * }}
 */
export function computeDrawdown(series) {
  if (!series || series.length === 0) {
    return {
      underwater: [],
      mddPct: 0,
      peakDate: null,
      troughDate: null,
      peakValue: null,
      troughValue: null,
    };
  }

  let peak = series[0].value;
  let peakDate = series[0].date;

  let mddPct = 0;
  let mddPeakDate = series[0].date;
  let mddPeakValue = series[0].value;
  let troughDate = series[0].date;
  let troughValue = series[0].value;

  const underwater = series.map(point => {
    if (point.value > peak) {
      peak = point.value;
      peakDate = point.date;
    }
    const drawdown = ((point.value - peak) / peak) * 100; // 음수 또는 0

    if (drawdown < mddPct) {
      mddPct = drawdown;
      mddPeakDate = peakDate;
      mddPeakValue = peak;
      troughDate = point.date;
      troughValue = point.value;
    }

    return { date: point.date, value: point.value, drawdown };
  });

  return {
    underwater,
    mddPct,
    peakDate: mddPeakDate,
    troughDate,
    peakValue: mddPeakValue,
    troughValue,
  };
}
