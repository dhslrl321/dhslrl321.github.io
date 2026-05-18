import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 24px;
  padding: 12px 0;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding: 8px 0;
  }
`;

export const LastUpdate = styled.div`
  font-size: 13px;
  color: #6b7280;

  @media (max-width: 480px) {
    font-size: 12px;
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
`;

export const Icon = styled.div`
  font-size: ${props => props.$size || '48px'};
`;

export const Text = styled.div`
  font-size: ${props => props.$size || '16px'};
  font-weight: ${props => props.$weight || 'normal'};
  color: ${props => props.$color || '#6b7280'};
  text-align: center;
  word-break: ${props => (props.$breakWord ? 'break-all' : 'normal')};
  max-width: 100%;
  font-family: ${props => (props.$mono ? 'monospace' : 'inherit')};
`;
