import styled from 'styled-components';

export const Section = styled.section`
  margin-bottom: 48px;
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1a1d23;
  margin-bottom: 4px;
`;

export const SectionDesc = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
`;

export const Card = styled.a`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    border-color: #c7d2fe;
  }
`;

export const Ticker = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1a1d23;
  letter-spacing: 0.5px;
`;

export const Name = styled.div`
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
`;

export const LinkHint = styled.span`
  font-size: 11px;
  color: #2563eb;
  font-weight: 500;
  margin-top: 4px;
`;
