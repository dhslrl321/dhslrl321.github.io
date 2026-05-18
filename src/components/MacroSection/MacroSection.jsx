import * as S from './MacroSection.styles';
import { MACRO_INDICATORS, MACRO_COMPARE_URL } from '../../config/seriesConfig';
import { calculateMacroChange } from '../../utils/changeCalculator';
import { formatKoreanDate } from '../../utils/dateFormatter';

function formatValue(value, decimals) {
  if (value == null || isNaN(value)) return '—';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatAbsChange(change, decimals) {
  if (change == null || isNaN(change)) return null;
  return Math.abs(change).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function MacroCard({ indicator, observations }) {
  const stat = calculateMacroChange(observations);

  return (
    <S.Card href={indicator.link} target="_blank" rel="noopener noreferrer">
      <S.CardHeader>
        <S.Name>{indicator.name}</S.Name>
        <S.SeriesId>{indicator.seriesId}</S.SeriesId>
      </S.CardHeader>

      <S.ValueRow>
        <S.Value>
          {formatValue(stat?.latestValue, indicator.decimals)}
          <S.Unit>{indicator.unit}</S.Unit>
        </S.Value>
        {stat?.absChange != null && (
          <S.Change $positive={stat.absChange > 0} $negative={stat.absChange < 0}>
            {stat.absChange > 0 ? '▲' : stat.absChange < 0 ? '▼' : '―'}{' '}
            {formatAbsChange(stat.absChange, indicator.decimals)}
          </S.Change>
        )}
      </S.ValueRow>

      <S.MetaRow>
        <S.Date>{stat?.latestDate ? formatKoreanDate(stat.latestDate) : '—'}</S.Date>
        <S.LinkHint>FRED ↗</S.LinkHint>
      </S.MetaRow>

      <S.Description>{indicator.description}</S.Description>
    </S.Card>
  );
}

export default function MacroSection({ data }) {
  return (
    <S.Section>
      <S.SectionHeader>
        <div>
          <S.SectionTitle>매크로 지표</S.SectionTitle>
          <S.SectionDesc>국채 금리 곡선, 신용 스프레드, 금융 스트레스, 원유.</S.SectionDesc>
        </div>
        <S.CompareButton href={MACRO_COMPARE_URL} target="_blank" rel="noopener noreferrer">
          📊 비교 차트로 보기 ↗
        </S.CompareButton>
      </S.SectionHeader>
      <S.Grid>
        {MACRO_INDICATORS.map(ind => (
          <MacroCard
            key={ind.seriesId}
            indicator={ind}
            observations={data[ind.seriesId]?.payload?.observations}
          />
        ))}
      </S.Grid>
    </S.Section>
  );
}
