import styled from 'styled-components';

export default function NavigationBar() {
  return (
    <NavContainer>
      <NavItem href="#" className="active">
        경제 지표
      </NavItem>
      <NavItem href="#" className="disabled">
        시장 데이터 (준비중)
      </NavItem>
      <NavItem href="https://kbthink.com/investment/trend.html" target="_blank" rel="noopener noreferrer">
        시장 동향 분석
      </NavItem>
    </NavContainer>
  );
}

/* ---------- Styles ---------- */

const NavContainer = styled.nav`
  display: flex;
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid #e1e4eb;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    gap: 16px;
    padding: 12px 0;
  }

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const NavItem = styled.a`
  color: #6b7280;
  font-size: 15px;
  font-weight: 500;
  padding-bottom: 6px;
  transition: color 0.15s ease;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 14px;
    padding-bottom: 4px;
  }

  &:hover {
    color: #2563eb;
  }

  &.active {
    color: #2563eb;
    border-bottom: 2px solid #2563eb;
  }

  &.disabled {
    color: #d1d5db;
    cursor: not-allowed;

    &:hover {
      color: #d1d5db;
    }
  }
`;
