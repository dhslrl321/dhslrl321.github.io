import { Card, MetaInfo, MetaItem, ChartContainer, NoDataMessage } from './DataCard.styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

export default function DataCard({ item }) {
  const formatDate = isoString => {
    return new Date(isoString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // FRED 데이터를 차트 형식으로 변환
  const chartData =
    item.payload?.observations
      ?.filter(obs => obs.value !== '.')
      ?.map(obs => ({
        date: obs.date,
        value: parseFloat(obs.value),
      })) || [];

  const hasData = chartData.length > 0;

  return (
    <Card>
      <MetaInfo>
        <MetaItem>
          <strong>시리즈:</strong> {item.seriesName || 'Unknown Series'}
        </MetaItem>
        <MetaItem>
          <strong>ID:</strong> {item.seriesId || item.id}
        </MetaItem>
        <MetaItem>
          <strong>수집 시간:</strong> {formatDate(item.fetchedAt)}
        </MetaItem>
        {hasData && (
          <MetaItem>
            <strong>데이터 포인트:</strong> {chartData.length}개
          </MetaItem>
        )}
      </MetaInfo>

      {hasData ? (
        <ChartContainer>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={date => format(new Date(date), 'yyyy-MM')}
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={['auto', 'auto']} />
              <Tooltip
                labelFormatter={date => format(new Date(date), 'yyyy년 MM월 dd일')}
                formatter={value => [value.toFixed(2) + '%', '금리']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
        <NoDataMessage>차트 데이터를 표시할 수 없습니다.</NoDataMessage>
      )}
    </Card>
  );
}
