import { format } from 'date-fns';

/**
 * ISO 날짜를 한국어 형식으로 포맷
 */
export function formatKoreanDateTime(isoString) {
  return new Date(isoString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷
 */
export function formatDateYYYYMMDD(date) {
  return format(new Date(date), 'yyyy-MM-dd');
}

/**
 * 날짜를 YYYY-MM 형식으로 포맷 (차트 X축용)
 */
export function formatDateYYYYMM(date) {
  return format(new Date(date), 'yyyy-MM');
}

/**
 * 날짜를 한국어 형식으로 포맷 (툴팁용)
 */
export function formatKoreanDate(date) {
  return format(new Date(date), 'yyyy년 MM월 dd일');
}
