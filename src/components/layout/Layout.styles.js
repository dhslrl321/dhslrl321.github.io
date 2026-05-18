import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Header = styled.header`
  padding: 32px 0 12px 0;

  @media (max-width: 768px) {
    padding: 24px 0 8px 0;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
  color: #1a1d23;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const Tagline = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-top: 6px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: 20px 0 60px;

  @media (max-width: 768px) {
    padding: 16px 0 40px;
  }
`;
