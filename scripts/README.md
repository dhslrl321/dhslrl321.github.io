# Scripts 폴더 구조

데이터 수집 스크립트의 리팩토링된 구조입니다.

## 📁 디렉토리 구조

```
scripts/
├── config/
│   └── seriesConfig.js          # 수집할 시리즈 설정
│
├── lib/
│   ├── fredApiClient.js         # FRED API 클라이언트
│   ├── dataParser.js            # 데이터 파싱 및 변환
│   └── fileUtils.js             # 파일 읽기/쓰기 유틸리티
│
└── update-data.js               # 메인 스크립트
```

## 🎯 리팩토링 원칙

### 1. **관심사의 분리**
- **API Client**: FRED API 통신만 담당
- **Data Parser**: 데이터 변환 및 통계 계산
- **File Utils**: 파일 입출력
- **Config**: 수집 대상 시리즈 설정

### 2. **단일 책임 원칙**
각 모듈은 하나의 명확한 책임만 가짐

### 3. **재사용성**
순수 함수로 작성하여 테스트 및 재사용 용이

## 📦 모듈 설명

### config/seriesConfig.js
**역할**: 수집할 시리즈 설정 관리

```javascript
export const SERIES_TO_FETCH = [
  {
    seriesId: 'FEDFUNDS',
    seriesName: 'Federal Funds Effective Rate',
    observationStart: '2015-06-01',
    frequency: null,
  },
  // ...
];
```

### lib/fredApiClient.js
**역할**: FRED API 통신

**주요 메서드**:
- `getTodayDate()`: 현재 날짜 반환
- `fetchSeriesObservations(seriesId, observationStart, frequency)`: 단일 시리즈 가져오기
- `fetchMultipleSeries(seriesList)`: 여러 시리즈 배치 가져오기

**특징**:
- 클래스 기반 설계
- 에러 처리 내장
- 진행 상황 로깅

### lib/dataParser.js
**역할**: 데이터 변환 및 통계

**주요 함수**:
- `transformApiResult(result)`: API 결과 → 데이터 객체
- `transformResultsToDataJson(results, existingData)`: 결과 배열 → data.json 형식
- `calculateDataStatistics(data)`: 통계 계산
- `printStatistics(stats)`: 통계 출력

**특징**:
- 순수 함수
- UUID 자동 생성
- 상세한 통계 정보

### lib/fileUtils.js
**역할**: 파일 시스템 작업

**주요 함수**:
- `ensureFile(filePath, defaultContent)`: 파일 없으면 생성
- `readJsonFile(filePath)`: JSON 파일 읽기
- `writeJsonFile(filePath, data)`: JSON 파일 쓰기

**특징**:
- 에러 처리 내장
- 깔끔한 포맷팅 (2 space indent)

### update-data.js
**역할**: 메인 실행 스크립트

**실행 흐름**:
1. 파일 준비 및 기존 데이터 로드
2. API 클라이언트 생성
3. 데이터 수집
4. 데이터 변환
5. 파일 저장
6. 통계 출력
7. 에러 체크

## 🚀 사용 방법

### 기본 실행
```bash
npm run update-data
```

### 환경 변수
```bash
API_KEY=your_fred_api_key npm run update-data
```

## 🔧 새로운 시리즈 추가

`scripts/config/seriesConfig.js`에 추가:

```javascript
{
  seriesId: 'UNRATE',
  seriesName: 'Unemployment Rate',
  observationStart: '2015-06-01',
  frequency: 'm',
}
```

그리고 `src/config/seriesConfig.js`에도 UI 설정 추가.

## 📊 출력 예시

```
============================================================
FRED 데이터 수집 시작
============================================================
시작 시간: 2025-12-21T...
데이터 파일: /path/to/data.json
수집할 시리즈: 3개

Fetching FEDFUNDS...
  Requesting data from 2015-06-01 to 2025-12-21
  Latest data point: 2025-11-01
  Total observations: 127
✓ Successfully fetched FEDFUNDS

...

============================================================
데이터 수집 통계
============================================================
총 시리즈: 3
성공적으로 수집: 3
최종 업데이트: 2025-12-21T...

시리즈별 요약:
------------------------------------------------------------

FEDFUNDS (Federal Funds Effective Rate)
  전체 관측치: 127
  유효 관측치: 127
  최신 날짜: 2025-11-01
  최신 값: 4.58

...

완료 시간: 2025-12-21T...
============================================================
```

## 🧪 테스트

각 모듈을 독립적으로 테스트 가능:

```javascript
import { FredApiClient } from './lib/fredApiClient.js';

const client = new FredApiClient('your-api-key');
const data = await client.fetchSeriesObservations('FEDFUNDS', '2024-01-01');
console.log(data);
```

## 💡 확장 가능성

### 1. 다른 데이터 소스 추가
`lib/` 폴더에 새로운 클라이언트 추가:
- `alphaVantageClient.js`
- `yahooFinanceClient.js`

### 2. 데이터 검증 추가
`dataParser.js`에 검증 함수 추가:
```javascript
export function validateData(data) {
  // 데이터 검증 로직
}
```

### 3. 캐싱 추가
동일한 날짜의 재요청 방지

## 🔄 마이그레이션

기존 `update-data.js`를 사용하던 코드는 그대로 작동합니다.
새로운 구조는 100% 하위 호환됩니다.

## 📝 주의사항

1. **API 키**: 환경 변수 또는 `.env` 파일 사용 권장
2. **Rate Limiting**: FRED API는 요청 제한이 있으므로 배치 처리 시 주의
3. **에러 처리**: 일부 시리즈 실패 시에도 다른 시리즈는 계속 수집
