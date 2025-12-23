import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 12px 0;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding: 8px 0;
    gap: 8px;
  }
`;

export const Count = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #374151;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const LastUpdate = styled.div`
  font-size: 14px;
  color: #6b7280;
  text-align: right;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const ChartSection = styled.section`
  margin-top: 32px;

  @media (max-width: 768px) {
    margin-top: 24px;
  }
`;

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

export const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: ${props => props.$gap || '16px'};
  padding: 20px;

  @media (max-width: 768px) {
    min-height: 300px;
    padding: 16px;
  }
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 3px;
  }
`;

export const Icon = styled.div`
  font-size: ${props => props.$size || '48px'};

  @media (max-width: 768px) {
    font-size: ${props => props.$size === '64px' ? '52px' : '40px'};
  }
`;

export const Text = styled.div`
  font-size: ${props => props.$size || '16px'};
  font-weight: ${props => props.$weight || 'normal'};
  color: ${props => props.$color || '#6b7280'};
  text-align: center;
  word-break: ${props => props.$breakWord ? 'break-all' : 'normal'};
  max-width: 100%;
  font-family: ${props => props.$mono ? 'monospace' : 'inherit'};

  @media (max-width: 768px) {
    font-size: ${props => {
      if (props.$size === '18px') return '16px';
      if (props.$size === '16px') return '14px';
      if (props.$size === '14px') return '13px';
      return props.$size;
    }};
  }
`;
