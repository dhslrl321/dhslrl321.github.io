/**
 * 날짜/시간 포맷팅 유틸리티
 */

/**
 * ISO 날짜를 한국어 형식으로 변환
 * @param {string} isoString - ISO 8601 형식 날짜
 * @returns {string} "2024년 1월 1일 오후 2:45:21"
 */
export function formatKoreanDateTime(isoString) {
  if (!isoString) return '';

  const date = new Date(isoString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * YYYY-MM-DD 형식으로 변환
 * @param {string} dateString - 날짜 문자열
 * @returns {string} "2024-01-01"
 */
export function formatDateYYYYMMDD(dateString) {
  if (!dateString) return '';
  return dateString;
}

/**
 * YYYY-MM 형식으로 변환 (차트 X축용)
 * @param {string} dateString - 날짜 문자열
 * @returns {string} "2024-01"
 */
export function formatDateYYYYMM(dateString) {
  if (!dateString) return '';
  return dateString.substring(0, 7);
}

/**
 * 한국어 날짜 형식으로 변환 (툴팁용)
 * @param {string} dateString - 날짜 문자열
 * @returns {string} "2024년 01월 01일"
 */
export function formatKoreanDate(dateString) {
  if (!dateString) return '';

  const [year, month, day] = dateString.split('-');
  return `${year}년 ${month}월 ${day}일`;
}
