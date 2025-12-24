import * as S from './SummarySection.styles';
import { formatValueBySeries, formatChange } from '../../utils/numberFormatter';

export default function SummaryCard({ config, latestData, previousData, seriesId }) {
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
          <S.ValueNumber>
            {formatValueBySeries(latestData.value, seriesId, config)}
          </S.ValueNumber>
          <S.ValueUnit>{config.unit}</S.ValueUnit>
        </S.LatestValue>

        {previousData && (
          <S.ChangeInfo $isPositive={isPositive} $isNegative={isNegative}>
            <S.ChangeArrow $isPositive={isPositive} $isNegative={isNegative}>
              {isPositive ? '▲' : isNegative ? '▼' : '―'}
            </S.ChangeArrow>
            <S.ChangeText>
              {formatChange(change, seriesId, config)}
              {config.unit}
            </S.ChangeText>
          </S.ChangeInfo>
        )}
      </S.ValueSection>
    </S.SummaryCard>
  );
}
