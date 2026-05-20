import * as S from './MarketSection.styles';
import { MARKET_ITEMS } from '../../config/seriesConfig';
import { calcDailyWeekly } from '../../utils/changeCalculator';
import { fetchDailySeries } from '../../utils/yahooClient';
import { useSeriesMap } from '../../hooks/useSeriesMap';

function formatPct(value) {
  if (value == null || isNaN(value)) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function MarketCard({ item, result }) {
  const stat = result?.data ? calcDailyWeekly(result.data) : null;
  const error = result?.error;
  const hasData = stat != null;
  const day = stat?.dayChangePct;
  const week = stat?.weekChangePct;

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
        <S.NoData>
          {error ? '불러오기 실패' : item.yahooSymbol ? '불러오는 중…' : '외부 사이트에서 확인 →'}
        </S.NoData>
      )}

      <S.MetaRow>
        <S.MetaText>{hasData ? `최신: ${stat.latestDate}` : ''}</S.MetaText>
        <S.LinkHint>{item.id === 'FEAR_GREED' ? 'CNN' : 'TradingView'} ↗</S.LinkHint>
      </S.MetaRow>
    </S.Card>
  );
}

export default function MarketSection() {
  const { map } = useSeriesMap(
    MARKET_ITEMS.filter(it => it.yahooSymbol).map(it => ({
      key: it.id,
      load: () => fetchDailySeries(it.yahooSymbol, { range: '1mo' }),
    }))
  );

  return (
    <S.Section>
      <S.SectionTitle>주식 시장</S.SectionTitle>
      <S.SectionDesc>
        전일/전주 % 는 실시간 (1시간 캐시). 카드 클릭 시 외부 차트로 이동.
      </S.SectionDesc>
      <S.Grid>
        {MARKET_ITEMS.map(item => (
          <MarketCard key={item.id} item={item} result={map[item.id]} />
        ))}
      </S.Grid>
    </S.Section>
  );
}
