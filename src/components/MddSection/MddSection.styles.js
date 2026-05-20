import styled from 'styled-components';

export const Section = styled.section`
  margin-bottom: 48px;
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
`;

export const SectionDesc = styled.p`
  font-size: 13px;
  color: var(--text-2);
  margin-bottom: 16px;
`;

export const Form = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px;
  background: var(--card);
  border: 1px solid var(--border);
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
  color: var(--text-2);
  font-weight: 500;
`;

export const Input = styled.input`
  height: 38px;
  padding: 0 12px;
  width: ${p => p.$width || 'auto'};
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-elev);
  color: var(--text);
  font-family: inherit;
  color-scheme: dark;

  &::placeholder {
    color: var(--text-3);
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.2);
  }
`;

export const SubmitButton = styled.button`
  height: 38px;
  min-width: 84px;
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-strong);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: var(--accent);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const ErrorBox = styled.div`
  padding: 12px 16px;
  background: rgba(255, 123, 114, 0.12);
  border: 1px solid rgba(255, 123, 114, 0.4);
  border-radius: 8px;
  color: #ff7b72;
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
  color: var(--text);
  font-family: ui-monospace, SFMono-Regular, monospace;
`;

export const MddBadge = styled.div`
  font-size: 14px;
  color: #ff7b72;
  background: rgba(255, 123, 114, 0.14);
  border: 1px solid rgba(255, 123, 114, 0.35);
  padding: 6px 12px;
  border-radius: 8px;

  strong {
    font-size: 18px;
    font-weight: 700;
    margin-left: 4px;
    font-variant-numeric: tabular-nums;
  }
`;

export const PeriodInfo = styled.div`
  font-size: 13px;
  color: var(--text-2);
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, SFMono-Regular, monospace;
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
  color: var(--text-2);

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
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px 8px 0 0;
`;

export const StatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

export const StatItem = styled.div`
  flex: 1;
  min-width: 140px;
  padding: 14px 16px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: var(--text-2);
  margin-bottom: 6px;
`;

export const StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, SFMono-Regular, monospace;
`;

export const StatSub = styled.div`
  font-size: 13px;
  color: var(--text-2);
  margin-top: 2px;
  font-variant-numeric: tabular-nums;
`;

export const LoadingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
`;

export const ShortBlock = styled.div`
  margin-top: 28px;
`;

export const ShortTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
`;

export const ShortNote = styled.p`
  font-size: 13px;
  color: var(--text-3);
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--card);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, SFMono-Regular, monospace;

  th,
  td {
    padding: 10px 14px;
    text-align: right;
    white-space: nowrap;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  thead th {
    background: var(--bg-elev);
    color: var(--text-2);
    font-weight: 600;
    border-bottom: 1px solid var(--border);
  }

  tbody tr + tr td {
    border-top: 1px solid var(--border-soft);
  }

  tbody td {
    color: var(--text);
  }
`;
