import * as S from './MarketSection.styles';
import { MARKET_INDICES } from '../../config/seriesConfig';
import { calculateDailyWeeklyChange } from '../../utils/changeCalculator';

function formatPct(value) {
  if (value == null || isNaN(value)) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function IndexCard({ index, observations }) {
  const stat = calculateDailyWeeklyChange(observations);
  const day = stat?.dayChangePct;
  const week = stat?.weekChangePct;

  return (
    <S.Card href={index.link} target="_blank" rel="noopener noreferrer">
      <S.CardHeader>
        <S.Name>{index.name}</S.Name>
        <S.SeriesId>{index.seriesId}</S.SeriesId>
      </S.CardHeader>

      <S.ChangesRow>
        <S.ChangeBlock>
          <S.ChangeLabel>전일 대비</S.ChangeLabel>
          <S.ChangeValue $positive={day > 0} $negative={day < 0}>
            {formatPct(day)}
          </S.ChangeValue>
        </S.ChangeBlock>
        <S.Divider />
        <S.ChangeBlock>
          <S.ChangeLabel>전주 대비 (5거래일)</S.ChangeLabel>
          <S.ChangeValue $positive={week > 0} $negative={week < 0}>
            {formatPct(week)}
          </S.ChangeValue>
        </S.ChangeBlock>
      </S.ChangesRow>

      <S.MetaRow>
        <S.MetaText>최신: {stat?.latestDate ?? '—'}</S.MetaText>
        <S.LinkHint>TradingView ↗</S.LinkHint>
      </S.MetaRow>
    </S.Card>
  );
}

export default function MarketSection({ data }) {
  return (
    <S.Section>
      <S.SectionTitle>시장 지수</S.SectionTitle>
      <S.SectionDesc>FRED daily 기준. 카드를 누르면 TradingView 차트로 이동.</S.SectionDesc>
      <S.Grid>
        {MARKET_INDICES.map(idx => (
          <IndexCard
            key={idx.seriesId}
            index={idx}
            observations={data[idx.seriesId]?.payload?.observations}
          />
        ))}
      </S.Grid>
    </S.Section>
  );
}
