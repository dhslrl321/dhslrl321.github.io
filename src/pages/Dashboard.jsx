import { useEffect, useState } from 'react';
import DataCard from '../components/DataCard.jsx';
import styled from 'styled-components';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/data.json', { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
        return r.json();
      })
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>데이터를 불러오는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorIcon>⚠️</ErrorIcon>
        <ErrorText>데이터를 불러오는데 실패했습니다</ErrorText>
        <ErrorDetail>{error}</ErrorDetail>
      </ErrorContainer>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyContainer>
        <EmptyIcon>📭</EmptyIcon>
        <EmptyText>아직 수집된 데이터가 없습니다</EmptyText>
        <EmptyHint>데이터는 매주 월요일 자동으로 수집됩니다</EmptyHint>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Count>총 {data.length}개의 데이터</Count>
        <LastUpdate>
          마지막 업데이트: {new Date(data[data.length - 1].fetchedAt).toLocaleString('ko-KR')}
        </LastUpdate>
      </Header>
      {data
        .slice()
        .reverse()
        .map(item => (
          <DataCard key={item.id} item={item} />
        ))}
    </Container>
  );
}

/* ---------- Styles ---------- */

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 0;
`;

const Count = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
`;

const LastUpdate = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 12px;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
`;

const ErrorText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #dc2626;
`;

const ErrorDetail = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-family: monospace;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 12px;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
`;

const EmptyText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
`;

const EmptyHint = styled.div`
  font-size: 14px;
  color: #6b7280;
`;
