import { useEffect, useState } from 'react';
import DataCard from '../components/DataCard';
import styled from 'styled-components';

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/data.json', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
        return r.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
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

  const seriesArray = Object.values(data);

  if (seriesArray.length === 0) {
    return (
      <EmptyContainer>
        <EmptyIcon>📭</EmptyIcon>
        <EmptyText>아직 수집된 데이터가 없습니다</EmptyText>
        <EmptyHint>데이터는 매주 월요일 자동으로 수집됩니다</EmptyHint>
      </EmptyContainer>
    );
  }

  // 최신 업데이트 시간 찾기
  const latestUpdate = seriesArray.reduce((latest, item) => {
    const itemDate = new Date(item.fetchedAt);
    return itemDate > latest ? itemDate : latest;
  }, new Date(0));

  return (
    <Container>
      <Header>
        <Count>총 {seriesArray.length}개의 지표</Count>
        <LastUpdate>
          마지막 업데이트: <br className="mobile-break" />
          {latestUpdate.toLocaleString('ko-KR')}
        </LastUpdate>
      </Header>
      {seriesArray
        .sort((a, b) => new Date(b.fetchedAt) - new Date(a.fetchedAt))
        .map((item) => (
          <DataCard key={item.seriesId} item={item} />
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
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-bottom: 12px;
    padding: 8px 0;
    gap: 8px;
  }

  .mobile-break {
    display: none;

    @media (max-width: 480px) {
      display: block;
    }
  }
`;

const Count = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #374151;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const LastUpdate = styled.div`
  font-size: 14px;
  color: #6b7280;
  text-align: right;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
  padding: 20px;

  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 3px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #6b7280;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 12px;
  padding: 20px;

  @media (max-width: 768px) {
    min-height: 300px;
    padding: 16px;
  }
`;

const ErrorIcon = styled.div`
  font-size: 48px;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const ErrorText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #dc2626;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ErrorDetail = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-family: monospace;
  text-align: center;
  word-break: break-all;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 12px;
  padding: 20px;

  @media (max-width: 768px) {
    min-height: 300px;
    padding: 16px;
  }
`;

const EmptyIcon = styled.div`
  font-size: 64px;

  @media (max-width: 768px) {
    font-size: 52px;
  }
`;

const EmptyText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const EmptyHint = styled.div`
  font-size: 14px;
  color: #6b7280;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
