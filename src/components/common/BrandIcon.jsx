import styled from 'styled-components';

/**
 * 브랜드 로고 아이콘
 */
export default function BrandIcon() {
  return (
    <IconSvg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 지구본 외곽선 */}
      <circle cx="20" cy="20" r="18" stroke="#2563eb" strokeWidth="2" fill="#EFF6FF" />

      {/* 세로선 (경도선) */}
      <ellipse cx="20" cy="20" rx="6" ry="18" stroke="#2563eb" strokeWidth="1.5" fill="none" />
      <ellipse cx="20" cy="20" rx="12" ry="18" stroke="#2563eb" strokeWidth="1" fill="none" />

      {/* 가로선 (위도선) */}
      <line x1="2" y1="20" x2="38" y2="20" stroke="#2563eb" strokeWidth="1.5" />
      <ellipse cx="20" cy="20" rx="18" ry="6" stroke="#2563eb" strokeWidth="1" fill="none" />
      <ellipse cx="20" cy="20" rx="18" ry="12" stroke="#2563eb" strokeWidth="1" fill="none" />

      {/* 차트 라인 (상승 추세) */}
      <path
        d="M 8 28 L 13 24 L 18 26 L 23 18 L 28 20 L 32 14"
        stroke="#dc2626"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 차트 포인트 */}
      <circle cx="23" cy="18" r="2" fill="#dc2626" />
      <circle cx="32" cy="14" r="2" fill="#dc2626" />
    </IconSvg>
  );
}

/* ---------- Styles ---------- */

const IconSvg = styled.svg`
  width: 32px;
  height: 32px;
  margin-right: 8px;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    margin-right: 6px;
  }
`;
