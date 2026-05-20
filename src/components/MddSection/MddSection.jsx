import { useState } from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import * as S from './MddSection.styles';
import { fetchDailySeries } from '../../utils/yahooClient';
import { computeDrawdown } from '../../utils/mdd';

const today = () => new Date().toISOString().slice(0, 10);

function toUnix(dateStr) {
  return Math.floor(new Date(dateStr + 'T00:00:00Z').getTime() / 1000);
}

function formatTick(date) {
  return date?.slice(0, 7);
}

export default function MddSection() {
  const [ticker, setTicker] = useState('SPY');
  const [start, setStart] = useState('2020-01-01');
  const [end, setEnd] = useState(today());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // { symbol, dd }

  const run = async () => {
    const sym = ticker.trim().toUpperCase();
    if (!sym) {
      setError('티커를 입력하세요');
      return;
    }
    if (new Date(start) >= new Date(end)) {
      setError('시작일이 종료일보다 빨라야 합니다');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const series = await fetchDailySeries(sym, {
        period1: toUnix(start),
        period2: toUnix(end),
      });
      if (series.length === 0) {
        throw new Error('해당 기간 데이터가 없습니다');
      }
      setResult({ symbol: sym, dd: computeDrawdown(series) });
    } catch (e) {
      setError(e.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    run();
  };

  const dd = result?.dd;

  return (
    <S.Section>
      <S.SectionTitle>MDD 분석 (최대 낙폭)</S.SectionTitle>
      <S.SectionDesc>
        티커와 기간을 선택하면 해당 구간의 최대 낙폭(peak→trough)과 낙폭 추이를 보여줍니다. 데이터:
        Yahoo Finance (실시간 · 1시간 캐시).
      </S.SectionDesc>

      <S.Form onSubmit={onSubmit}>
        <S.Field>
          <S.Label>티커</S.Label>
          <S.Input
            value={ticker}
            onChange={e => setTicker(e.target.value)}
            placeholder="예: SPY, QQQ, AAPL, ^GSPC"
            $width="160px"
          />
        </S.Field>
        <S.Field>
          <S.Label>시작일</S.Label>
          <S.Input type="date" value={start} max={end} onChange={e => setStart(e.target.value)} />
        </S.Field>
        <S.Field>
          <S.Label>종료일</S.Label>
          <S.Input
            type="date"
            value={end}
            min={start}
            max={today()}
            onChange={e => setEnd(e.target.value)}
          />
        </S.Field>
        <S.SubmitButton type="submit" disabled={loading}>
          {loading ? '불러오는 중…' : 'MDD 조회'}
        </S.SubmitButton>
      </S.Form>

      {error && <S.ErrorBox>⚠️ {error}</S.ErrorBox>}

      {dd && (
        <>
          <S.ResultHeader>
            <S.ResultSymbol>{result.symbol}</S.ResultSymbol>
            <S.MddBadge>
              MDD <strong>{dd.mddPct.toFixed(2)}%</strong>
            </S.MddBadge>
            <S.PeriodInfo>
              {dd.peakDate} ({dd.peakValue?.toFixed(2)}) → {dd.troughDate} (
              {dd.troughValue?.toFixed(2)})
            </S.PeriodInfo>
          </S.ResultHeader>

          <S.ChartLegend>
            <S.LegendItem $color="#2563eb">가격</S.LegendItem>
            <S.LegendItem $color="#dc2626">낙폭(%)</S.LegendItem>
          </S.ChartLegend>
          <S.ChartBox>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dd.underwater} margin={{ top: 8, right: 12, left: 8, bottom: 8 }}>
                <defs>
                  <linearGradient id="ddFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity={0.04} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatTick}
                  stroke="#9ca3af"
                  style={{ fontSize: 11 }}
                  minTickGap={48}
                />
                <YAxis
                  yAxisId="price"
                  orientation="left"
                  stroke="#2563eb"
                  style={{ fontSize: 11 }}
                  domain={['auto', 'auto']}
                  width={56}
                />
                <YAxis
                  yAxisId="dd"
                  orientation="right"
                  stroke="#dc2626"
                  style={{ fontSize: 11 }}
                  width={48}
                  tickFormatter={v => `${v.toFixed(0)}%`}
                  domain={['auto', 0]}
                />
                <Tooltip
                  labelStyle={{ color: '#6b7280' }}
                  formatter={(v, name) =>
                    name === 'drawdown' ? [`${v.toFixed(2)}%`, '낙폭'] : [v.toFixed(2), '가격']
                  }
                />
                <Area
                  yAxisId="dd"
                  type="monotone"
                  dataKey="drawdown"
                  stroke="#dc2626"
                  strokeWidth={1.3}
                  fill="url(#ddFill)"
                />
                <Line
                  yAxisId="price"
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={1.6}
                  dot={false}
                />
                {dd.peakDate && (
                  <ReferenceDot
                    yAxisId="price"
                    x={dd.peakDate}
                    y={dd.peakValue}
                    r={4}
                    fill="#16a34a"
                    stroke="white"
                  />
                )}
                {dd.troughDate && (
                  <ReferenceDot
                    yAxisId="price"
                    x={dd.troughDate}
                    y={dd.troughValue}
                    r={4}
                    fill="#dc2626"
                    stroke="white"
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </S.ChartBox>
        </>
      )}
    </S.Section>
  );
}
