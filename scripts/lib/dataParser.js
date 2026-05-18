/**
 * 데이터 파싱 및 변환 유틸리티
 */
import crypto from 'crypto';

/**
 * API 결과를 데이터 객체로 변환
 * @param {Object} result - fetchMultipleSeries의 결과 객체
 * @returns {Object|null} 변환된 데이터 객체
 */
export function transformApiResult(result) {
  if (!result.success) {
    return null;
  }

  return {
    id: crypto.randomUUID(),
    seriesId: result.seriesId,
    seriesName: result.seriesName,
    fetchedAt: new Date().toISOString(),
    observationStart: result.observationStart,
    frequency: result.frequency,
    payload: result.payload,
  };
}

/**
 * API 결과 배열을 data.json 형식으로 변환
 * @param {Array<Object>} results - API 결과 배열
 * @param {Object} existingData - 기존 데이터 (병합용)
 * @returns {Object} seriesId를 키로 하는 객체
 */
export function transformResultsToDataJson(results, existingData = {}) {
  const data = { ...existingData };

  for (const result of results) {
    const transformed = transformApiResult(result);
    if (transformed) {
      data[result.seriesId] = transformed;
    }
  }

  return data;
}

/**
 * 데이터 통계 계산
 * @param {Object} data - data.json 형식의 데이터
 * @returns {Object} 통계 정보
 */
export function calculateDataStatistics(data) {
  const series = Object.values(data);

  const stats = {
    totalSeries: series.length,
    successfulFetches: series.filter(s => s.payload?.observations).length,
    latestUpdate: null,
    seriesSummary: [],
  };

  // 최신 업데이트 시간
  if (series.length > 0) {
    const latestDate = series.reduce((latest, item) => {
      const itemDate = new Date(item.fetchedAt);
      return itemDate > latest ? itemDate : latest;
    }, new Date(0));
    stats.latestUpdate = latestDate.toISOString();
  }

  // 각 시리즈 요약
  for (const item of series) {
    const observations = item.payload?.observations || [];
    const validObservations = observations.filter(obs => obs.value !== '.');
    const latestObservation = validObservations[validObservations.length - 1];

    stats.seriesSummary.push({
      seriesId: item.seriesId,
      seriesName: item.seriesName,
      totalObservations: observations.length,
      validObservations: validObservations.length,
      latestDate: latestObservation?.date || null,
      latestValue: latestObservation?.value || null,
    });
  }

  return stats;
}

/**
 * 통계를 콘솔에 출력
 * @param {Object} stats - 통계 객체
 */
export function printStatistics(stats) {
  console.log('\n' + '='.repeat(60));
  console.log('데이터 수집 통계');
  console.log('='.repeat(60));
  console.log(`총 시리즈: ${stats.totalSeries}`);
  console.log(`성공적으로 수집: ${stats.successfulFetches}`);
  console.log(`최종 업데이트: ${stats.latestUpdate || 'N/A'}`);
  console.log('\n시리즈별 요약:');
  console.log('-'.repeat(60));

  for (const summary of stats.seriesSummary) {
    console.log(`\n${summary.seriesId} (${summary.seriesName})`);
    console.log(`  전체 관측치: ${summary.totalObservations}`);
    console.log(`  유효 관측치: ${summary.validObservations}`);
    console.log(`  최신 날짜: ${summary.latestDate || 'N/A'}`);
    console.log(`  최신 값: ${summary.latestValue || 'N/A'}`);
  }

  console.log('\n' + '='.repeat(60));
}
