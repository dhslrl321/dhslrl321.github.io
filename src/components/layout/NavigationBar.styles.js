import styled from 'styled-components';

export const Nav = styled.nav`
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

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const NavItem = styled.button`
  color: #6b7280;
  font-size: 15px;
  font-weight: 500;
  padding: 0 0 6px;
  transition: color 0.15s ease;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  background: none;
  border: none;
  font-family: inherit;

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
`;

export const CoffeeButton = styled.a`
  color: #f59e0b;
  font-size: 15px;
  font-weight: 600;
  padding: 4px 12px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  text-decoration: none;
  margin-left: auto;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 4px 10px;
  }

  &:hover {
    background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
    color: #d97706;
    transform: translateY(-1px);
  }
`;
