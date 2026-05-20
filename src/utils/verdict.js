/**
 * 티커 분석 데이터로 "판단" 카드 목록을 생성.
 * 각 카드: { key, label, value, level: 'good'|'warn'|'bad', detail }
 *  - good(초록): 위험 낮음 / 저평가
 *  - warn(노랑): 중립
 *  - bad(빨강): 위험 높음 / 과열
 */
export function buildVerdicts({ dd, stats, shortPct, vix }) {
  const cards = [];

  // 52주 위치 (0~100%)
  let pos52 = null;
  if (stats?.price && stats?.week52High != null && stats?.week52Low != null) {
    const span = stats.week52High - stats.week52Low;
    if (span > 0) pos52 = ((stats.price - stats.week52Low) / span) * 100;
  }

  // MDD 대비 현재 낙폭 위치 (0~1, 1이면 역대 최대 낙폭 수준)
  let mddRatio = null;
  if (dd && dd.mddPct < 0) {
    mddRatio = Math.min(1, dd.currentDrawdown / dd.mddPct);
  }

  // ── 종합 상태 ──
  if (pos52 != null || mddRatio != null) {
    let label = '중립';
    let level = 'warn';
    if (mddRatio != null && mddRatio > 0.66) {
      label = '위험';
      level = 'bad';
    } else if (pos52 != null && pos52 > 75) {
      label = '과열';
      level = 'bad';
    } else if (pos52 != null && pos52 < 25) {
      label = '저평가';
      level = 'good';
    }
    cards.push({ key: 'state', label: '종합 상태', value: label, level, detail: '낙폭·52주 종합' });
  }

  // ── 현재 Drawdown ──
  if (dd) {
    const cur = dd.currentDrawdown;
    const level = cur > -10 ? 'good' : cur > -25 ? 'warn' : 'bad';
    cards.push({
      key: 'dd',
      label: '현재 Drawdown',
      value: `${cur.toFixed(1)}%`,
      level,
      detail: `MDD ${dd.mddPct.toFixed(1)}%`,
    });
  }

  // ── 과거 MDD 대비 위치 ──
  if (mddRatio != null) {
    const level = mddRatio > 0.66 ? 'bad' : mddRatio > 0.33 ? 'warn' : 'good';
    const word = level === 'bad' ? '높음' : level === 'warn' ? '중간' : '낮음';
    cards.push({
      key: 'mddpos',
      label: 'MDD 대비 위치',
      value: `위험 ${word}`,
      level,
      detail: `${(mddRatio * 100).toFixed(0)}% 수준`,
    });
  }

  // ── 52주 위치 ──
  if (pos52 != null) {
    const word = pos52 > 75 ? '고점권' : pos52 < 25 ? '저점권' : '중간';
    const level = pos52 > 75 ? 'bad' : pos52 < 25 ? 'good' : 'warn';
    cards.push({
      key: 'pos52',
      label: '52주 위치',
      value: word,
      level,
      detail: `${pos52.toFixed(0)}%`,
    });
  }

  // ── 공매도 압력 ──
  if (shortPct != null) {
    const level = shortPct > 8 ? 'bad' : shortPct > 3 ? 'warn' : 'good';
    const word = level === 'bad' ? '높음' : level === 'warn' ? '중간' : '낮음';
    cards.push({
      key: 'short',
      label: '공매도 압력',
      value: word,
      level,
      detail: `비중 ${shortPct.toFixed(2)}%`,
    });
  }

  // ── 시장 리스크 (VIX) ──
  if (vix != null) {
    const level = vix > 25 ? 'bad' : vix > 15 ? 'warn' : 'good';
    const word = level === 'bad' ? '높음' : level === 'warn' ? '중립' : '낮음';
    cards.push({
      key: 'vix',
      label: '시장 리스크',
      value: word,
      level,
      detail: `VIX ${vix.toFixed(1)}`,
    });
  }

  return cards;
}
