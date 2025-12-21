import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
`;

export const MetaItem = styled.div`
  font-size: 13px;
  color: #6b7280;

  strong {
    color: #374151;
    font-weight: 600;
    margin-right: 8px;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 16px;
`;

export const NoDataMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #9ca3af;
  font-size: 14px;
`;

export const Timestamp = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 12px;
`;

export const Payload = styled.pre`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.6;
  color: #374151;
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
  }
`;
