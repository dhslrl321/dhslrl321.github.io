import styled from 'styled-components';

export const Container = styled.section`
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const SummaryCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 8px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

export const SeriesName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const Date = styled.div`
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const ValueSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LatestValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

export const ValueNumber = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ValueUnit = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #6b7280;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ChangeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: ${(props) =>
    props.$isPositive ? '#fef2f2' : props.$isNegative ? '#eff6ff' : '#f9fafb'};
  border-radius: 6px;
  align-self: flex-start;
`;

export const ChangeArrow = styled.span`
  font-size: 12px;
  color: ${(props) =>
    props.$isPositive ? '#dc2626' : props.$isNegative ? '#2563eb' : '#6b7280'};
`;

export const ChangeText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #374151;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
