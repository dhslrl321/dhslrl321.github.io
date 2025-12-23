/**
 * FRED 데이터 수집 스크립트
 * 
 * 역할:
 * - FRED API에서 경제 지표 데이터 수집
 * - public/data.json에 저장
 * - GitHub Actions에서 자동 실행
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { FredApiClient } from './lib/fredApiClient.js';
import { transformResultsToDataJson, calculateDataStatistics, printStatistics } from './lib/dataParser.js';
import { ensureFile, readJsonFile, writeJsonFile } from './lib/fileUtils.js';
import { SERIES_TO_FETCH } from './config/seriesConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '..', 'public', 'data.json');
const FRED_API_KEY = process.env.API_KEY || '089008ad0f401bb844a1e4adf24ad2bb';

async function main() {
  console.log('='.repeat(60));
  console.log('FRED 데이터 수집 시작');
  console.log('='.repeat(60));
  console.log(`시작 시간: ${new Date().toISOString()}`);
  console.log(`데이터 파일: ${DATA_FILE}`);
  console.log(`수집할 시리즈: ${SERIES_TO_FETCH.length}개\n`);

  // 1. 파일 준비
  ensureFile(DATA_FILE);
  const existingData = readJsonFile(DATA_FILE);

  // 2. API 클라이언트 생성
  const fredClient = new FredApiClient(FRED_API_KEY);

  // 3. 데이터 수집
  const results = await fredClient.fetchMultipleSeries(SERIES_TO_FETCH);

  // 4. 데이터 변환
  const updatedData = transformResultsToDataJson(results, existingData);

  // 5. 파일 저장
  writeJsonFile(DATA_FILE, updatedData);

  // 6. 통계 계산 및 출력
  const stats = calculateDataStatistics(updatedData);
  printStatistics(stats);

  console.log(`\n완료 시간: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  // 7. 실패한 시리즈가 있으면 경고
  const failedCount = results.filter((r) => !r.success).length;
  if (failedCount > 0) {
    console.warn(`\n⚠️  경고: ${failedCount}개의 시리즈 수집 실패`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('\n❌ 스크립트 실행 중 오류 발생:');
  console.error(error);
  process.exit(1);
});
