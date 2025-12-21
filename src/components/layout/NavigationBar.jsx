import styled from 'styled-components';

export default function NavigationBar() {
  return (
    <NavContainer>
      <NavItem href="#" className="active">
        최근 수집 데이터
      </NavItem>
      <NavItem href="#" className="disabled">
        거시지표 (준비중)
      </NavItem>
      <NavItem href="#" className="disabled">
        시장 데이터 (준비중)
      </NavItem>
      <NavItem href="#" className="disabled">
        AI 분석 (준비중)
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
`;

const NavItem = styled.a`
  color: #6b7280;
  font-size: 15px;
  font-weight: 500;
  padding-bottom: 6px;
  transition: color 0.15s ease;
  cursor: pointer;

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
