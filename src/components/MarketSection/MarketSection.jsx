import * as S from './MarketSection.styles';
import { MARKET_ITEMS } from '../../config/seriesConfig';
import { calculateDailyWeeklyChange } from '../../utils/changeCalculator';

function formatPct(value) {
  if (value == null || isNaN(value)) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function MarketCard({ item, observations }) {
  const stat = observations ? calculateDailyWeeklyChange(observations) : null;
  const day = stat?.dayChangePct;
  const week = stat?.weekChangePct;
  const hasData = stat != null;

  return (
    <S.Card href={item.link} target="_blank" rel="noopener noreferrer">
      <S.CardHeader>
        <S.Name>{item.name}</S.Name>
        <S.SeriesId>{item.note}</S.SeriesId>
      </S.CardHeader>

      {hasData ? (
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
      ) : (
        <S.NoData>외부 사이트에서 확인 →</S.NoData>
      )}

      <S.MetaRow>
        <S.MetaText>{hasData ? `최신: ${stat.latestDate}` : ''}</S.MetaText>
        <S.LinkHint>
          {item.id === 'FEAR_GREED' ? 'CNN' : 'TradingView'} ↗
        </S.LinkHint>
      </S.MetaRow>
    </S.Card>
  );
}

export default function MarketSection({ data }) {
  return (
    <S.Section>
      <S.SectionTitle>주식 시장</S.SectionTitle>
      <S.SectionDesc>
        FRED daily 데이터가 있으면 전일/전주 % 표시. 카드 클릭 시 외부 차트로 이동.
      </S.SectionDesc>
      <S.Grid>
        {MARKET_ITEMS.map(item => (
          <MarketCard
            key={item.id}
            item={item}
            observations={item.fredSeriesId ? data[item.fredSeriesId]?.payload?.observations : null}
          />
        ))}
      </S.Grid>
    </S.Section>
  );
}
