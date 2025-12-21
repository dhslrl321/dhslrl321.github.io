import * as S from './Dashboard.styles';
import SeriesSection from '../components/SeriesSection/SeriesSection.jsx';
import SummarySection from '../components/SummarySection/SummarySection.jsx';
import { useEconomicData } from '../hooks/useEconomicData';
import { filterDataByCategory } from '../config/seriesConfig';

function LoadingState() {
  return (
    <S.StateContainer>
      <S.Spinner />
      <S.Text>데이터를 불러오는 중...</S.Text>
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

function EmptyState() {
  return (
    <S.StateContainer $gap="12px">
      <S.Icon $size="64px">📭</S.Icon>
      <S.Text $size="18px" $weight="600" $color="#374151">
        아직 수집된 데이터가 없습니다
      </S.Text>
      <S.Text $size="14px">데이터는 매주 월요일 자동으로 수집됩니다</S.Text>
    </S.StateContainer>
  );
}

export default function Dashboard({ activeTab }) {
  const { data, loading, error } = useEconomicData();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  const allSeries = Object.values(data);
  if (allSeries.length === 0) return <EmptyState />;

  const category = activeTab === 'market' ? 'market' : 'macro';
  const filteredData = filterDataByCategory(data, category);
  const filteredSeries = Object.values(filteredData);

  const latestUpdate = allSeries.reduce((latest, item) => {
    const itemDate = new Date(item.fetchedAt);
    return itemDate > latest ? itemDate : latest;
  }, new Date(0));

  return (
    <S.Container>
      <S.Header>
        <S.Count>총 {filteredSeries.length}개의 시리즈</S.Count>
        <S.LastUpdate>
          마지막 업데이트: {latestUpdate.toLocaleString('ko-KR')}
        </S.LastUpdate>
      </S.Header>

      <SummarySection data={filteredData} />

      <S.ChartSection>
        <S.SectionTitle>상세 차트</S.SectionTitle>
        {filteredSeries
          .sort((a, b) => new Date(b.fetchedAt) - new Date(a.fetchedAt))
          .map((item) => (
            <SeriesSection key={item.seriesId} item={item} />
          ))}
      </S.ChartSection>
    </S.Container>
  );
}
