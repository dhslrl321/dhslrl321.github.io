import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;

  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 20px;
    padding-bottom: 16px;
  }
`;

export const MetaItem = styled.div`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  word-break: break-word;

  strong {
    color: #374151;
    font-weight: 600;
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    font-size: 13px;

    strong {
      margin-right: 6px;
    }
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 350px;
  margin-top: 20px;
  margin-left: -30px;
  margin-right: -20px;
  padding-right: 20px;

  @media (max-width: 768px) {
    height: 280px;
    margin-top: 16px;
    margin-left: -20px;
    margin-right: -10px;
    padding-right: 10px;
  }

  @media (max-width: 480px) {
    height: 250px;
    margin-left: -16px;
  }
`;

export const NoDataMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #9ca3af;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 40px 16px;
    font-size: 13px;
  }
`;
