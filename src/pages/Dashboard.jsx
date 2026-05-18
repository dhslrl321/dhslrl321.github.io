import * as S from './Dashboard.styles';
import MacroSection from '../components/MacroSection/MacroSection.jsx';
import MarketSection from '../components/MarketSection/MarketSection.jsx';
import { useEconomicData } from '../hooks/useEconomicData';

function LoadingState() {
  return (
    <S.StateContainer>
      <S.Spinner />
      <S.Text>데이터 불러오는 중...</S.Text>
    </S.StateContainer>
  );
}

function ErrorState({ error }) {
  return (
    <S.StateContainer $gap="12px">
      <S.Icon>⚠️</S.Icon>
      <S.Text $size="18px" $weight="600" $color="#dc2626">
        데이터를 불러오는데 실패했습니다
      </S.Text>
      <S.Text $size="14px" $mono $breakWord>
        {error}
      </S.Text>
    </S.StateContainer>
  );
}

export default function Dashboard() {
  const { data, loading, error } = useEconomicData();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  const latestUpdate = Object.values(data).reduce((latest, item) => {
    const d = new Date(item.fetchedAt);
    return d > latest ? d : latest;
  }, new Date(0));

  return (
    <S.Container>
      <S.Header>
        <S.LastUpdate>데이터 갱신: {latestUpdate.toLocaleString('ko-KR')}</S.LastUpdate>
      </S.Header>

      <MacroSection data={data} />
      <MarketSection data={data} />
    </S.Container>
  );
}
