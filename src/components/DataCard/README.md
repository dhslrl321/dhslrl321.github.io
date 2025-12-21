# DataCard Component

FRED API에서 수집한 경제 지표 시계열 데이터를 시각화하는 컴포넌트입니다.

## 📁 파일 구조

```
DataCard/
├── README.md              # 이 문서
├── index.jsx              # 메인 컴포넌트 (진입점)
├── styles.js              # styled-components 스타일 정의
├── config.js              # 시리즈별 설정 (색상, 단위, 라벨)
├── dataUtils.js           # 데이터 변환 및 통계 계산
├── formatters.js          # 날짜/시간 포맷팅 유틸리티
├── CardMetaInfo.jsx       # 메타 정보 섹션 컴포넌트
└── TimeSeriesChart.jsx    # 차트 컴포넌트
```

## 🎯 각 파일의 역할

### `index.jsx` - 메인 컴포넌트
**책임**: 전체 DataCard의 조합 및 렌더링 로직

```jsx
import DataCard from '../components/DataCard';

<DataCard item={seriesData} />
```

**주요 기능**:
- FRED API 데이터를 받아서 처리
- 하위 컴포넌트들을 조합
- 데이터 유무에 따른 UI 분기 처리

---

### `styles.js` - 스타일 정의
**책임**: styled-components를 사용한 컴포넌트 스타일

**포함된 스타일**:
- `Card`: 카드 컨테이너
- `MetaInfo`: 메타 정보 영역
- `MetaItem`: 개별 메타 정보 항목
- `ChartContainer`: 차트 컨테이너
- `NoDataMessage`: 데이터 없음 메시지

---

### `config.js` - 시리즈 설정
**책임**: 각 경제 지표의 메타데이터 관리

**구조**:
```javascript
export const SERIES_CONFIG = {
  SERIES_ID: {
    unit: '단위',      // 예: '%', '억원', 'pts'
    label: 'Y축 라벨',  // 예: '금리 (%)', '금액'
    color: '색상코드',  // 예: '#2563eb'
    name: '시리즈명',   // 예: 'Federal Funds Rate'
  }
};
```

**사용 방법**:
```javascript
import { getSeriesConfig } from './config';

const config = getSeriesConfig('FEDFUNDS');
// { unit: '%', label: '금리 (%)', color: '#2563eb', ... }
```

---

### `dataUtils.js` - 데이터 유틸리티
**책임**: 데이터 변환 및 통계 계산

**주요 함수**:

#### `transformObservationsToChartData(observations)`
FRED API의 observations 배열을 차트 데이터로 변환

```javascript
// Input: FRED API observations
[
  { date: "2024-01-01", value: "5.33" },
  { date: "2024-02-01", value: "." },  // 유효하지 않은 값
]

// Output: 차트 데이터
[
  { date: "2024-01-01", value: 5.33 }
]
```

#### `calculateDataStats(chartData)`
차트 데이터의 통계 계산

```javascript
// Returns:
{
  minValue: -0.5,
  maxValue: 5.33,
  hasNegativeValues: true
}
```

---

### `formatters.js` - 포맷팅 유틸리티
**책임**: 날짜/시간 포맷팅

**주요 함수**:
- `formatKoreanDateTime(isoString)`: ISO 날짜 → "2024년 1월 1일 오후 2:45:21"
- `formatDateYYYYMMDD(date)`: "2024-01-01"
- `formatDateYYYYMM(date)`: "2024-01" (차트 X축용)
- `formatKoreanDate(date)`: "2024년 01월 01일" (툴팁용)

---

### `CardMetaInfo.jsx` - 메타 정보 컴포넌트
**책임**: 데이터 카드 상단의 메타 정보 표시

**표시 정보**:
- 시리즈명
- 시리즈 ID
- 수집 시간
- 데이터 포인트 개수
- 데이터 기간

---

### `TimeSeriesChart.jsx` - 차트 컴포넌트
**책임**: Recharts를 사용한 시계열 차트 렌더링

**주요 기능**:
- 라인 차트 렌더링
- 음수 값 처리 (0 기준선 표시)
- 시리즈별 색상 적용
- 툴팁 포맷팅

---

## 🚀 새로운 경제 지표 추가하기

### 1단계: `config.js`에 시리즈 설정 추가

```javascript
export const SERIES_CONFIG = {
  // 기존 시리즈들...
  
  // 새 시리즈 추가
  UNRATE: {
    unit: '%',
    label: '실업률 (%)',
    color: '#10b981',
    name: 'Unemployment Rate',
  },
};
```

### 2단계: `scripts/update-data.js`에 수집 로직 추가

```javascript
const seriesToFetch = [
  // 기존 시리즈들...
  
  // 새 시리즈 추가
  {
    seriesId: 'UNRATE',
    seriesName: 'Unemployment Rate',
    observationStart: '2015-06-01',
    frequency: 'm',
  },
];
```

### 3단계: 데이터 수집 및 확인

```bash
npm run update-data
npm run dev
```

**끝!** 추가적인 코드 수정 없이 새로운 지표가 자동으로 표시됩니다.

---

## 🎨 차트 스타일 커스터마이징

### 색상 변경
`config.js`에서 시리즈별 색상 수정:

```javascript
FEDFUNDS: {
  color: '#2563eb',  // 파란색 → 원하는 색상으로 변경
}
```

### 차트 크기 변경
`styles.js`에서 ChartContainer height 수정:

```javascript
export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;  // 300 → 원하는 높이
  margin-top: 16px;
`;
```

### 마진 조정
`TimeSeriesChart.jsx`에서 margin 수정:

```jsx
<LineChart margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
```

---

## 🧪 데이터 흐름

```
1. Dashboard.jsx
   ↓ fetch('/data.json')
   
2. DataCard/index.jsx
   ↓ transformObservationsToChartData()
   
3. 차트 데이터 생성
   [{ date: "2024-01", value: 5.33 }, ...]
   ↓
   
4. 컴포넌트 렌더링
   - CardMetaInfo: 메타 정보 표시
   - TimeSeriesChart: 차트 렌더링
     ↓ getSeriesConfig()
     - config.js에서 색상, 단위 등 가져옴
```

---

## 📝 예제: 완전한 사용 예시

```jsx
// Dashboard.jsx에서
import DataCard from '../components/DataCard';

const seriesData = {
  id: "uuid-1234",
  seriesId: "FEDFUNDS",
  seriesName: "Federal Funds Effective Rate",
  fetchedAt: "2024-01-01T12:00:00Z",
  observationStart: "2015-06-01",
  payload: {
    observations: [
      { date: "2024-01-01", value: "5.33" },
      { date: "2024-02-01", value: "5.33" },
      // ...
    ]
  }
};

<DataCard item={seriesData} />
```

---

## 🐛 트러블슈팅

### 차트가 표시되지 않아요
1. `data.json` 파일이 올바른 형식인지 확인
2. `observations` 배열에 유효한 값이 있는지 확인 (값이 "."가 아닌지)
3. 브라우저 콘솔에서 에러 메시지 확인

### 새 시리즈가 표시되지 않아요
1. `config.js`에 시리즈 설정이 추가되었는지 확인
2. `scripts/update-data.js`에서 데이터 수집이 실행되었는지 확인
3. `npm run update-data` 실행 후 `public/data.json` 확인

### Y축 라벨이 이상해요
1. `config.js`에서 해당 시리즈의 `label` 확인
2. `TimeSeriesChart.jsx`의 `tickFormatter` 확인

---

## 💡 베스트 프랙티스

### 1. 새로운 포맷터 추가 시
`formatters.js`에 함수를 추가하고, JSDoc 주석을 작성하세요:

```javascript
/**
 * 숫자를 천 단위 구분자로 포맷
 * @param {number} value - 포맷할 숫자
 * @returns {string} 포맷된 문자열
 */
export function formatNumber(value) {
  return value.toLocaleString('ko-KR');
}
```

### 2. 새로운 유틸리티 함수 추가 시
`dataUtils.js`에 추가하고, 단일 책임 원칙을 지키세요:

```javascript
/**
 * 데이터의 평균값 계산
 */
export function calculateAverage(chartData) {
  const sum = chartData.reduce((acc, d) => acc + d.value, 0);
  return sum / chartData.length;
}
```

### 3. 컴포넌트 수정 시
- 하나의 컴포넌트는 하나의 책임만
- Props는 명확하게 타입 힌트 제공
- 주석으로 의도를 명확히

---

## 🔗 관련 문서

- [Recharts 공식 문서](https://recharts.org/)
- [FRED API 문서](https://fred.stlouisfed.org/docs/api/fred/)
- [date-fns 문서](https://date-fns.org/)

---

## 📮 질문이나 제안사항

이 컴포넌트에 대한 질문이나 개선 제안이 있다면 이슈를 등록해주세요!
