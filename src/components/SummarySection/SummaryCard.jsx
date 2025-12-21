import * as S from './SummarySection.styles';

export default function SummaryCard({ config, latestData, previousData }) {
  if (!latestData) return null;

  const change = previousData ? latestData.value - previousData.value : 0;
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <S.SummaryCard>
      <S.CardHeader>
        <S.SeriesName>{config.name}</S.SeriesName>
        <S.Date>{latestData.date}</S.Date>
      </S.CardHeader>

      <S.ValueSection>
        <S.LatestValue>
          <S.ValueNumber>{latestData.value.toFixed(2)}</S.ValueNumber>
          <S.ValueUnit>{config.unit}</S.ValueUnit>
        </S.LatestValue>

        {previousData && (
          <S.ChangeInfo $isPositive={isPositive} $isNegative={isNegative}>
            <S.ChangeArrow $isPositive={isPositive} $isNegative={isNegative}>
              {isPositive ? '▲' : isNegative ? '▼' : '―'}
            </S.ChangeArrow>
            <S.ChangeText>
              {isPositive ? '+' : ''}
              {change.toFixed(2)}
              {config.unit}
            </S.ChangeText>
          </S.ChangeInfo>
        )}
      </S.ValueSection>
    </S.SummaryCard>
  );
}
