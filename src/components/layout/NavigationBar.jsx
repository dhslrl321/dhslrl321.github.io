import styled from 'styled-components';
import { useState } from 'react';

export default function NavigationBar({ activeTab, onTabChange }) {
  return (
    <NavContainer>
      <NavItem
        href="#"
        className={activeTab === 'recent' ? 'active' : ''}
        onClick={(e) => {
          e.preventDefault();
          onTabChange('recent');
        }}
      >
        경제 지표
      </NavItem>
      <NavItem
        href="#"
        className={activeTab === 'market' ? 'active' : ''}
        onClick={(e) => {
          e.preventDefault();
          onTabChange('market');
        }}
      >
        시장 데이터
      </NavItem>
      <NavItem
        href="https://kbthink.com/investment/trend.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        시장 동향 분석
      </NavItem>
      <CoffeeNavItem
        href="https://buymeacoffee.com/dhslrl321"
        target="_blank"
        rel="noopener noreferrer"
      >
        ☕ Buy me a coffee
      </CoffeeNavItem>
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

const CoffeeNavItem = styled.a`
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

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 4px 10px;
  }

  &:hover {
    background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%);
    color: #d97706;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
