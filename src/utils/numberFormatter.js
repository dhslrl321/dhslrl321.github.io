/**
 * 숫자를 보기 좋게 포맷팅하는 유틸리티
 */

/**
 * 숫자에 천 단위 구분자(콤마) 추가
 * @param {number} value - 포맷팅할 숫자
 * @param {number} decimals - 소수점 자릿수 (기본값: 2)
 * @returns {string} 포맷팅된 숫자 문자열
 */
export function formatNumberWithCommas(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) {
    return '―';
  }

  // 큰 숫자 (1000 이상)는 정수로, 작은 숫자는 소수점 표시
  const threshold = 1000;
  const absValue = Math.abs(value);

  if (absValue >= threshold) {
    // 큰 숫자는 소수점 없이 천 단위 구분자만 추가
    return Math.round(value).toLocaleString('en-US');
  } else {
    // 작은 숫자는 소수점 포함
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
}

/**
 * 천명 단위를 한국식 만명 단위로 변환
 * @param {number} valueInThousands - 천명 단위 값 (예: 159552)
 * @returns {string} 한국식 포맷 (예: "15,955만명" 또는 "1억 5,955만명")
 */
export function formatKoreanEmployment(valueInThousands) {
  if (valueInThousands === null || valueInThousands === undefined || isNaN(valueInThousands)) {
    return '―';
  }

  // 천명을 만명 단위로 변환 (10,000 = 1만명)
  // 159,552천명 = 15,955.2만명
  const inManMyeong = valueInThousands / 10;

  // 1억 이상인 경우 (10,000만 = 1억)
  if (Math.abs(inManMyeong) >= 10000) {
    const eok = Math.floor(inManMyeong / 10000);
    const man = Math.round((inManMyeong % 10000) / 10) * 10; // 10 단위로 반올림
    
    if (man === 0) {
      return `${eok.toLocaleString()}억`;
    }
    return `${eok.toLocaleString()}억 ${man.toLocaleString()}만`;
  }
  
  // 1만 이상인 경우
  if (Math.abs(inManMyeong) >= 1) {
    const man = Math.round(inManMyeong);
    return `${man.toLocaleString()}만`;
  }

  // 1만 미만인 경우 (천명 단위 그대로)
  return `${Math.round(valueInThousands).toLocaleString()}천`;
}

/**
 * 시리즈 설정에 따라 적절한 포맷 적용
 * @param {number} value - 포맷팅할 숫자
 * @param {string} seriesId - 시리즈 ID
 * @param {object} config - 시리즈 설정
 * @returns {string} 포맷팅된 숫자 문자열
 */
export function formatValueBySeries(value, seriesId, config) {
  if (value === null || value === undefined || isNaN(value)) {
    return '―';
  }

  // PAYEMS (비농업 고용자 수)는 천 단위로 표시되므로 한국식으로 변환
  if (seriesId === 'PAYEMS') {
    return formatKoreanEmployment(value);
  }

  // UNRATE (실업률)는 소수점 1자리
  if (seriesId === 'UNRATE') {
    return formatNumberWithCommas(value, 1);
  }

  // CPI 계열은 소수점 1자리
  if (seriesId === 'CPIAUCSL' || seriesId === 'CPILFESL') {
    return formatNumberWithCommas(value, 1);
  }

  // S&P 500, NASDAQ은 소수점 없이
  if (seriesId === 'SP500' || seriesId === 'NASDAQCOM') {
    return formatNumberWithCommas(value, 0);
  }

  // 금리 관련은 소수점 2자리
  if (seriesId === 'FEDFUNDS' || seriesId === 'T10Y2Y') {
    return formatNumberWithCommas(value, 2);
  }

  // VIX는 소수점 2자리
  if (seriesId === 'VIXCLS') {
    return formatNumberWithCommas(value, 2);
  }

  // 기본값: 소수점 2자리
  return formatNumberWithCommas(value, 2);
}

/**
 * 변화량 포맷팅 (부호 포함)
 * @param {number} change - 변화량
 * @param {string} seriesId - 시리즈 ID
 * @param {object} config - 시리즈 설정
 * @returns {string} 포맷팅된 변화량 문자열
 */
export function formatChange(change, seriesId, config) {
  if (change === null || change === undefined || isNaN(change)) {
    return '―';
  }

  const formattedValue = formatValueBySeries(Math.abs(change), seriesId, config);
  const sign = change > 0 ? '+' : change < 0 ? '-' : '';

  return `${sign}${formattedValue}`;
}
