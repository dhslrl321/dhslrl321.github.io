import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/**
 * 회전 로딩 스피너.
 *  - $size: 지름 (기본 18px)
 *  - $light: 어두운 배경(파란 버튼 등) 위에서 쓸 때 흰색
 */
const Spinner = styled.span`
  display: inline-block;
  width: ${p => p.$size || '18px'};
  height: ${p => p.$size || '18px'};
  border: 2px solid ${p => (p.$light ? 'rgba(255,255,255,0.4)' : '#2a2f3a')};
  border-top-color: ${p => (p.$light ? '#ffffff' : '#58a6ff')};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

export default Spinner;
