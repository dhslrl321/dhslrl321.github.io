import * as S from './EtfSection.styles';
import { MARKET_ETFS } from '../../config/seriesConfig';

export default function EtfSection() {
  return (
    <S.Section>
      <S.SectionTitle>대표 ETF</S.SectionTitle>
      <S.SectionDesc>
        TradingView로 바로 이동. 카드 클릭 시 일/주/월 변동을 차트에서 확인 가능.
      </S.SectionDesc>
      <S.Grid>
        {MARKET_ETFS.map(etf => (
          <S.Card key={etf.ticker} href={etf.link} target="_blank" rel="noopener noreferrer">
            <S.Ticker>{etf.ticker}</S.Ticker>
            <S.Name>{etf.name}</S.Name>
            <S.LinkHint>TradingView ↗</S.LinkHint>
          </S.Card>
        ))}
      </S.Grid>
    </S.Section>
  );
}
