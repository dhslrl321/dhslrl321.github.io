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

export const Form = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 16px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

export const Input = styled.input`
  height: 38px;
  padding: 0 12px;
  width: ${p => p.$width || 'auto'};
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #1a1d23;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;

export const SubmitButton = styled.button`
  height: 38px;
  padding: 0 20px;
  background: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const ErrorBox = styled.div`
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const ResultSymbol = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1a1d23;
`;

export const MddBadge = styled.div`
  font-size: 14px;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 6px 12px;
  border-radius: 8px;

  strong {
    font-size: 18px;
    font-weight: 700;
    margin-left: 4px;
  }
`;

export const PeriodInfo = styled.div`
  font-size: 13px;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
`;

export const ChartLegend = styled.div`
  display: flex;
  gap: 16px;
  margin: 4px 0 8px;
`;

export const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: #6b7280;

  &::before {
    content: '';
    width: 12px;
    height: 3px;
    border-radius: 2px;
    background: ${p => p.$color};
    margin-right: 6px;
  }
`;

export const ChartBox = styled.div`
  width: 100%;
  height: 380px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 8px 8px 0 0;
`;
