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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
`;

export const Card = styled.a`
  display: flex;
  flex-direction: column;
  padding: 18px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    background: var(--card-hover);
    border-color: var(--accent);
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
  color: var(--text);
`;

export const SeriesId = styled.div`
  font-size: 11px;
  color: var(--text-3);
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
  color: var(--text);
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, SFMono-Regular, monospace;
`;

export const Unit = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-2);
  margin-left: 4px;
`;

const up = '#ff7b72';
const down = '#58a6ff';

export const Change = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, SFMono-Regular, monospace;
  color: ${p => (p.$positive ? up : p.$negative ? down : 'var(--flat)')};
  background: ${p =>
    p.$positive
      ? 'rgba(255, 123, 114, 0.14)'
      : p.$negative
        ? 'rgba(88, 166, 255, 0.14)'
        : 'var(--flat-bg)'};
`;

export const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Date = styled.span`
  font-size: 12px;
  color: var(--text-2);
`;

export const LinkHint = styled.span`
  font-size: 11px;
  color: var(--accent);
  font-weight: 500;
`;

export const Description = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-3);
  border-top: 1px solid var(--border-soft);
  padding-top: 10px;
`;
