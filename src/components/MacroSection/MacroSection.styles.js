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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
`;

export const Card = styled.a`
  display: flex;
  flex-direction: column;
  padding: 18px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
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

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1d23;
`;

export const SeriesId = styled.div`
  font-size: 11px;
  color: #9ca3af;
  font-family: ui-monospace, SFMono-Regular, monospace;
`;

export const ValueRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
  min-height: 36px;
`;

export const Value = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #1a1d23;
  font-variant-numeric: tabular-nums;
`;

export const Unit = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin-left: 4px;
`;

export const Change = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${p => (p.$positive ? '#dc2626' : p.$negative ? '#2563eb' : '#6b7280')};
  background: ${p => (p.$positive ? '#fef2f2' : p.$negative ? '#eff6ff' : '#f3f4f6')};
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Date = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const LinkHint = styled.span`
  font-size: 11px;
  color: #2563eb;
  font-weight: 500;
`;

export const Description = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: #9ca3af;
  border-top: 1px solid #f3f4f6;
  padding-top: 10px;
`;
