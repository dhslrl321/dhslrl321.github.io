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
  margin-bottom: 14px;
`;

export const Name = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1a1d23;
`;

export const SeriesId = styled.div`
  font-size: 11px;
  color: #9ca3af;
  font-family: ui-monospace, SFMono-Regular, monospace;
`;

export const ChangesRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  margin-bottom: 8px;
`;

export const ChangeBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 6px;
`;

export const ChangeLabel = styled.div`
  font-size: 11px;
  color: #9ca3af;
`;

const dirColor = {
  up: { fg: '#dc2626', bg: '#fef2f2' },
  down: { fg: '#2563eb', bg: '#eff6ff' },
  flat: { fg: '#6b7280', bg: '#f3f4f6' },
};

export const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  align-self: flex-start;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${p => dirColor[p.$dir].fg};
  background: ${p => dirColor[p.$dir].bg};

  span {
    font-size: 10px;
  }
`;

export const NoData = styled.div`
  padding: 18px 0;
  color: #9ca3af;
  font-size: 13px;
  margin-bottom: 8px;
`;

export const LoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 0;
  margin-bottom: 8px;
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f3f4f6;
  padding-top: 10px;
`;

export const MetaText = styled.span`
  font-size: 11px;
  color: #9ca3af;
  font-family: ui-monospace, SFMono-Regular, monospace;
`;

export const LinkHint = styled.span`
  font-size: 11px;
  color: #2563eb;
  font-weight: 500;
`;
