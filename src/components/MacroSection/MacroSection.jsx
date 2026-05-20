import * as S from './MacroSection.styles';
import { MACRO_INDICATORS, MACRO_COMPARE_URL } from '../../config/seriesConfig';
import { calcMacro } from '../../utils/changeCalculator';
import { formatKoreanDate } from '../../utils/dateFormatter';
import { fetchFredSeries } from '../../utils/fredClient';
import { fetchDailySeries } from '../../utils/yahooClient';
import { useSeriesMap } from '../../hooks/useSeriesMap';

function formatValue(value, decimals) {
  if (value == null || isNaN(value)) return '—';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function loadIndicator(ind) {
  return ind.source === 'yahoo'
    ? fetchDailySeries(ind.yahooSymbol, { range: '1mo' })
    : fetchFredSeries(ind.fredId);
}

function MacroCard({ indicator, result }) {
  const stat = result?.data ? calcMacro(result.data) : null;
  const error = result?.error;

  return (
    <S.Card href={indicator.link} target="_blank" rel="noopener noreferrer">
      <S.CardHeader>
        <S.Name>{indicator.name}</S.Name>
        <S.SeriesId>{indicator.note}</S.SeriesId>
      </S.CardHeader>

      <S.ValueRow>
        <S.Value>
          {formatValue(stat?.latestValue, indicator.decimals)}
          <S.Unit>{indicator.unit}</S.Unit>
        </S.Value>
        {stat?.absChange != null && (
          <S.Change $positive={stat.absChange > 0} $negative={stat.absChange < 0}>
            {stat.absChange > 0 ? '▲' : stat.absChange < 0 ? '▼' : '―'}{' '}
            {formatValue(Math.abs(stat.absChange), indicator.decimals)}
          </S.Change>
        )}
      </S.ValueRow>

      <S.MetaRow>
        <S.Date>
          {error ? '불러오기 실패' : stat?.latestDate ? formatKoreanDate(stat.latestDate) : '—'}
        </S.Date>
        <S.LinkHint>{indicator.source === 'yahoo' ? 'Yahoo' : 'FRED'} ↗</S.LinkHint>
      </S.MetaRow>

      <S.Description>{indicator.description}</S.Description>
    </S.Card>
  );
}

export default function MacroSection() {
  const { map } = useSeriesMap(
    MACRO_INDICATORS.map(ind => ({
      key: ind.key,
      load: () => loadIndicator(ind),
    }))
  );

  return (
    <S.Section>
      <S.SectionHeader>
        <div>
          <S.SectionTitle>매크로 지표</S.SectionTitle>
          <S.SectionDesc>
            기준금리, 국채 금리 곡선, 신용 스프레드, 금융 스트레스, 원유. (실시간 · 1시간 캐시)
          </S.SectionDesc>
        </div>
        <S.CompareButton href={MACRO_COMPARE_URL} target="_blank" rel="noopener noreferrer">
          📊 비교 차트로 보기 ↗
        </S.CompareButton>
      </S.SectionHeader>
      <S.Grid>
        {MACRO_INDICATORS.map(ind => (
          <MacroCard key={ind.key} indicator={ind} result={map[ind.key]} />
        ))}
      </S.Grid>
    </S.Section>
  );
}
